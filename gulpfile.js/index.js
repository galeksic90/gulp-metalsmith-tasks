// ==== GULPFILE ==== //


gulp = require('gulp');
gulp.config = require('./loadconfig');
gulp.plugins = require('gulp-load-plugins')({ camelize: true });

var requireDir = require('require-dir');

requireDir('./tasks/global'); //tasks which don't depend on project/config

if (gulp.config.isLoaded) {
    requireDir('./tasks');
}


