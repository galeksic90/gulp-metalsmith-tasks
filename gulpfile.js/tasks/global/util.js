
var util = require('util');
var fs = require('fs');
var YAML = require('yamljs');

gulp.log = gulp.plugins.util.log;
gulp.logError = function(msg) {
    if (msg && msg.message) {
        msg = msg.message;
    }
    gulp.log(gulp.plugins.util.colors.red('error: ' + msg));
};


gulp.requireArgv = function(k, cb) {
    if (!gulp.config.argv[k]) {
        gulp.logError(' no --' + k + ' argument');
        cb();
        process.exit(1);
    }
    return gulp.config.argv[k];
};


gulp.task('showconfig', function(cb) {
    gulp.log(util.inspect(gulp.config, {colors: true, depth: 4}));
    cb();
});

gulp.task('exportconfig', function(cb) {
    if (!gulp.config.isLoaded) {
        gulp.logError(' no project loaded!');
        cb();
        process.exit(1);
    }
    var fn = gulp.config.projectDir + '/config/exportedConfig.yml';
    var data = YAML.stringify(gulp.config);
    fs.writeFile(fn, data, function(err) {
        if (!err) {
            gulp.log('Config exported to ' + fn);
        } else {
            gulp.logError(err);
        }
        cb();
    });
});
