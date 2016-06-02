var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var spawn = require('process').spawn;

var config = require('../../../config').gulp.serve;

var runSequence = require('run-sequence');

// Min serve
gulp.task('min', function(cb) {
	return runSequence('build:min', 'serve:devserver', cb);
});

// Watch Files For Changes & Reload
gulp.task('default', function(cb) {
	return runSequence('build:all', 'serve:devserver', 'serve:watch', cb);
});

// Run development server on port first available port starting at 3000
gulp.task('serve:devserver', function() {
	var browserSync = require('browser-sync');
	return browserSync({
		open: true,
		notify: false,
		ghostMode: false,
		// https: true,
		server: {
			baseDir: config.dir
		}
	});
});


gulp.task('serve:watch', function() {
	var browserSync = require('browser-sync');
	var reload = browserSync.reload;
	gulp.watch([config.watch.images], ['images']);
	gulp.watch([config.watch.scripts], ['scripts']);
	gulp.watch([config.watch.styles], ['styles']);
	gulp.watch([config.watch.layouts], ['build:html', reload]);
	gulp.watch([config.watch.content], ['build:html', reload]);
	gulp.watch([config.watch.static], ['build:static', reload]);
});


