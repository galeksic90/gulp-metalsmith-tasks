var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('../../../config').gulp.scripts;

$.series = require('stream-series');
var runSequence = require('run-sequence');



gulp.task('scripts', function() {
	var vendor = gulp.src(config.vendor.src)
		.pipe($.changed(config.vendor.dest))
		.pipe($.size({
			title: 'scripts:vendors'
		}))
		.pipe(gulp.dest(config.vendor.dest))

	var plugins = gulp.src(config.plugins.src)
		.pipe($.changed(config.plugins.dest))
		.pipe($.size({
			title: 'scripts:plugins'
		}))
		.pipe(gulp.dest(config.plugins.dest))

	var project = gulp.src(config.project.src)
		.pipe($.changed(config.project.dest))
		.pipe($.size({
			title: 'scripts:project'
		}))
		.pipe(gulp.dest(config.project.dest));

	return $.series(vendor, plugins, project);
});

gulp.task('scripts:min', function() {
	return gulp.src([
			config.vendor.dest + '/*.js',
			config.plugins.dest + '/*.js',
			config.project.dest + '/*.js',
			config.vendor.dest,
			config.plugins.dest
		])
		.pipe($.size({
			title: 'script:uglify - before'
		}))
		.pipe($.clean())
		.pipe($.concat('script.min.js'))
		.pipe($.uglify())
		.pipe($.size({
			title: 'script:uglify -  after'
		}))
		.pipe(gulp.dest(config.project.dest));
});

gulp.task('scripts:inject', function() {
	var vendorsStream = gulp.src([config.vendor.dest + '/*.js', ], {
		read: false
	});
	var pluginsStream = gulp.src([config.plugins.dest + '/*.js', ], {
		read: false
	});
	var projectStream = gulp.src([config.project.dest + '/*.js', ], {
		read: false
	});

	return gulp.src(config.inject.src)
		.pipe($.inject($.series(vendorsStream, pluginsStream, projectStream), {
			ignorePath: config.inject.ignore
		}))
		.pipe(gulp.dest(config.inject.dest));
});

// Lint JavaScript
gulp.task('scripts:jshint', function() {
	return gulp.src(config.project.dest + '/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
});
