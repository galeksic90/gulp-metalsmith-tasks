// ==== GULPFILE ==== //


gulp = require('gulp');
gulp.config = require('./../lib/loadconfig');
gulp.plugins = require('gulp-load-plugins')({ camelize: true });

var requireDir = require('require-dir');

requireDir('./tasks/global'); //tasks which don't depend on project/config

gulp.task('default', function(cb) {
    gulp.log('No project is found!');
});

if (gulp.config.isLoaded) {
    requireDir('./tasks');

    gulp.task('rebuild:full', gulp.series('build', 'content', 'layouts:copy', 'styles' , 'images', 'scripts' , 'layouts'));

    gulp.task('rebuild', gulp.series('build:static', 'content', 'layouts:copy', 'styles' , 'images', 'scripts' , 'layouts'));

    gulp.task('dist', gulp.series('rebuild:full', 'dist:clean', 'dist:copy', 'dist:configs'));

    if (gulp.config.nodemon.script) {
        gulp.task('default', gulp.series('rebuild:full', gulp.parallel('nodemon', 'serve')));
    } else {
        gulp.task('default', gulp.series('rebuild:full', 'serve'));
    }
}
