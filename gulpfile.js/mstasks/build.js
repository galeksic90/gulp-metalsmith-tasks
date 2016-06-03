var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var smith = require('gulp-metalsmith-build');

var config = require('../../../config.js').gulp.build;

var runSequence = require('run-sequence');

var noHtml = $.filter(['**/*', '!html5.appcache', '!sitemap.xml']);

// Generate assets
gulp.task('build:assets', function(cb) {
	return runSequence('styles', 'scripts', cb);
});

// Generate assets - min
gulp.task('build:assets:min', function(cb) {
	return runSequence('images', 'styles:min', 'scripts:min', cb);
});

// Generate assets - min
gulp.task('build:inject', function(cb) {
	return runSequence('styles:inject', 'scripts:inject', cb);
});

// Generate html
gulp.task('build:html', ['build:inject'], function(cb) {
	return smith.build(cb);
});

// Generate all
gulp.task('build:all', function(cb) {
	return runSequence('clean', 'build:assets', 'build:html', cb);
});

// Generate min
gulp.task('build:min', function(cb) {
	return runSequence('build:all', 'build:assets:min', 'build:html',
		'build:manifest', 'build:sitemap', 'build:sizereport', 'pagespeed',
		cb);
});

// Copy static files to public
gulp.task('build:static', function() {
	// For best performance, don't add Sass partials to `gulp.src`
	return gulp.src(config.src + '/**/*')
		.pipe(gulp.dest(config.dest))
		.pipe($.size({
			title: 'build:static'
		}));
});

gulp.task('build:manifest', function() {
	return gulp.src(config.dest + '/**/*')
		.pipe(noHtml)
		.pipe($.manifest({
			hash: true,
			preferOnline: true,
			// timestamp: true,
			network: ['http://*', 'https://*', '*'],
			filename: 'html5.appcache'
		}))
		.pipe(gulp.dest(config.src));
});

gulp.task('build:sitemap', function() {
	return gulp.src(config.dest + '/**/*.html')
		.pipe($.sitemap({
			siteUrl: 'http://www.vaer.rs'
		}))
		.pipe(gulp.dest(config.src));
});

gulp.task('build:sizereport', function() {
	return gulp.src(config.src + '/**/*')
		// .pipe(noHtml)
		.pipe($.sizereport({
			gzip: true,
			'*': {
				'maxSize': 204800
			},
		}));
});
