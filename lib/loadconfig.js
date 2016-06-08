/*


 Load options from projects config.yml

 sync

 the config file must be in the project root dir or in its subdirectory <project root dir>/config/config.yml

 name of config file and config dir can be overriden by env GULP_CONFIG, GULP_CONFIG_DIR, but they must remain in root

 if a value in config begins with @ that string is used to include filename at hat point. ex: {key: '@config2.yml'}

 */

var path = require('path');
var fs = require('fs');
var YAML = require('yamljs');
var _ = require('lodash');
var gutil = require('gulp-util');
var argv = require('minimist')(process.argv.slice(2));
var tildify = require('tildify');

var startDir = process.env.INIT_CWD;
var gulpDir = process.cwd();
var activeConfig = argv.config || process.env.GULP_CONFIG || 'config';
var configDir = argv.configdir || process.env.GULP_CONFIG_DIR || 'config';
var projectsDir = argv.projectsdir || process.env.GULP_PROJECTS_DIR || 'projects';

// defaults:
var config = {
    argv: argv,
    startDir: startDir,
    gulpDir: gulpDir,
    activeConfig: activeConfig,
    projectsDir: projectsDir,
    projectsDirFull: path.join(gulpDir, projectsDir),
    configDir: configDir,
    roots: {
        src: 'src',
        build: 'build',
        dist: 'dist'
    },
    srcRoots: {
        scss: 'scss',
        styles: 'styles',
        scripts: 'scripts',
        scriptsVendors: 'scripts/vendors',
        scriptsPlugins: 'scripts/plugins',
        layouts: 'layouts',
        content: 'content',
        static: 'static',
        imgs: 'imgs'
    },
    serve: {
        php: {
            port: 8000
        },
        port: 3000
    },
    images: {
        min: {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
        },
        unretina: {
            lwip: true
        },
        base64: {
            options: {
                maxImageSize: 14 * 1024
            }
        }
    },
    styles: {
        includes: ['/bower_components', '/node_modules', '/src/scss/1-Settings', '/src/scss/2-Tools', '/src/scss/3-Generic', '/src/scss/4-Base', '/src/scss/5-Objects', '/src/scss/6-Components', '/src/scss/7-Trumps'],
        processors: {
            autoprefixer: [
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ],
            cssnano: {
                safe: true
            }
        }
    },
    scripts: {
        vendors: [],
        plugins: [],
        project: [
            '/src/scripts/**/*.js'
        ],
        minify: {
            uglify: {},
            dest: 'scripts.min.js',
            inBuild: false
        }
    },
    layouts: {
        engine: 'jadephp',
        metalsmith: {
            source: 'content',
            dest: '',
            metadata: {},
            loadmetadata: {},
            redirect: {},
            ignore: ['.DS_Store'],
            prismic: {},
            collections: {},
            writemetadata: {},
            markdown: {},
            permalinks: {},
            templates: {
                engine: "jade",
                directory: "layouts"
            },
            htmlminifier: {},
            htmlbeautifier: {use: true}
        },
        jade: {
            filter: ['**/*', '!**/*.inc.jade'],
            options: {
                pretty: true
            }
        },
        pug: {
            filter: ['**/*', '!**/*.inc.jade'],
            options: {
                pretty: true
            }
        },
        jadephp: {
            filter: ['**/*', '!**/*.inc.jade'],
            options: {
                extension: '.php',
                pretty: true
            }
        },
        htmlsplit: {
            src: '/**/*.php',
            options: {}
        }
    }
};

function tryRead(filename, logErrors) {
    var content, err = false;
    try {
        //console.log('tryRead: ' + filename);
        content = fs.readFileSync(filename, 'utf-8')
    } catch(e) {
        if (logErrors) {
            gutil.log('config file not found: ', gutil.colors.red(filename));
        }
        err = true;
    }
    if (!err) {
        gutil.log('Loaded config file', gutil.colors.green(tildify(filename)));
        content = YAML.parse(content);
    }
    return content;
}

function buildFilename (pathName) {
    return path.join(pathName , activeConfig + '.yml');
}

function loadConfigFile (fromDir) {
    var filename, content, baseDir = fromDir;

    // ./config.yml
    filename = buildFilename(fromDir);
    content = tryRead(filename);
    if (content) {
        extendConfig(baseDir, filename, content);
        return;
    }

    // ./config/config.yml
    fromDir = path.join(fromDir, configDir);
    filename = buildFilename(fromDir);
    content = tryRead(filename);
    if (content) {
        extendConfig(baseDir, filename, content);
        return;
    }

    var prevDir = path.resolve(baseDir, "..");
    if (prevDir == path.sep || prevDir.indexOf(gulpDir) < 0 || prevDir.split(path.sep).pop() == projectsDir) {
        return;
    }
    loadConfigFile(prevDir);
}

function traverse(o , callback) {
    var nv;
    for (var i in o) {
        if (typeof(o[i])=="string") {
            nv = callback(i, o[i]);
            if (nv) {
                o[i] = nv;
            }
        } else if (typeof(o[i])=="object") {
            traverse(o[i], callback);
        }
    }
};

function loadIncludes(obj) {
    traverse(config, function(k, v) {
        if (v.charAt(0) == '@') {
            return tryRead(path.join(config.projectDir , config.configDir, v.substr(1)), true);
        }
        return false;
    });
}


// ensure we have gulpdir/projectsDir/projectDir
function fixProjectDir (baseDir){
    var projDir = path.relative(path.join(gulpDir ,projectsDir), baseDir).split(path.sep)[0];
    return path.join(gulpDir, projectsDir, projDir);
}

function extendConfig(baseDir, filename, content) {
    config.isLoaded = true;
    config.projectDir = fixProjectDir(baseDir);
    config.projectDirName = config.projectDir.split(path.sep).pop();
    config.configFilename = filename;
    _.merge(config, content);

    loadIncludes();
}

loadConfigFile(startDir);

module.exports = config;