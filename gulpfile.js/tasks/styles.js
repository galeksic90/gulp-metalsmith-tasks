
var path = require('path');


// finds all small images in css in build dir, then replaces them into base64 and overwrites css
gulp.task('styles:scss', function() {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.scss);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.styles);

    var includes = gulp.config.styles.includes.slice();
    for (var i in includes) {
        includes[i] = gulp.config.projectDir + includes[i];
    }

    var processors = [];

    for (var processor in gulp.config.styles.processors) {
        if (gulp.config.styles.processors[processor]) {
            processors.push(require(processor)(gulp.config.styles.processors[processor]));
        }
    }

    return gulp.src(srcDir + '/*.scss')
        .pipe(gulp.plugins.sourcemaps.init())
        .pipe(gulp.plugins.sass({includePaths: includes
                        , precision: 6
                        , onError: function(err) {
                            return console.log(err);
                            }}))
        .pipe(gulp.plugins.postcss(processors))
        .pipe(gulp.plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(dstDir));
});



//
// Inject all style files
//

gulp.task('styles:inject', function() {
    var layoutsDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.layouts);
    var styles = path.join(gulp.config.projectsDir, gulp.config.projectDirName, gulp.config.roots.build, gulp.config.srcRoots.styles) + '/*.css';
    var ignorePath = path.join(gulp.config.projectsDir, gulp.config.projectDirName, gulp.config.roots.build);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.styles);

    var sources = gulp.src(styles, {read: false})
        .pipe(gulp.dest(dstDir, {cwd: ignorePath}));
        //.pipe(gulp.plugins.debug());

    return gulp.src(layoutsDir + '/**/*.jade')
        .pipe(gulp.plugins.inject(sources, {quiet: true}))
        //.pipe(gulp.plugins.debug())
        .pipe(gulp.dest(layoutsDir));
});

//
// CSS & SCSS Tests
//

gulp.task('styles:csslint', function() {
    var cssDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.styles);

    return gulp.src(cssDir + '/**/*.css')
        .pipe(gulp.plugins.csslint())
        .pipe(gulp.plugins.csslint.reporter());
});

gulp.task('styles:scsslint', function() {
    var scssDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.scss);

    return gulp.src(scssDir + '/**/*.scss')
        .pipe(gulp.plugins.sassLint())
        .pipe(gulp.plugins.sassLint.format());
        //.pipe(gulp.plugins.sassLint.failOnError());
});

gulp.task('styles', gulp.series('styles:scss', 'styles:inject', 'aigis'));
