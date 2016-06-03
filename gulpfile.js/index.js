// ==== GULPFILE ==== //

var requireDir = require('require-dir');
gulp = require('gulp');
gulp.gutil = require('gulp-util');
gulp.config = require('./loadconfig');

requireDir('./tasks/global'); //tasks which don't depend on project/config

if (gulp.config.isLoaded) {
    requireDir('./tasks');
}


