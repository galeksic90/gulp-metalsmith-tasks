
var util = require('util');

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

