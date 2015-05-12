var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('../../../config').gulp.images;

var runSequence = require('run-sequence');

// Optimize Images files
gulp.task('images:min', function() {
	return gulp.src(config.src + '/**/*')
		.pipe($.changed(config.dest))
		.pipe($.size({
			title: 'images:min - before'
		}))
		.pipe($.imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe($.size({
			title: 'images:min -  after'
		}))
		.pipe(gulp.dest(config.dest));
});

// Convert and resize retina @2 images to half size
gulp.task('images:retina', function() {
	return gulp.src(config.src + '/**/*@2x.{jpg,png}')
		.pipe($.changed(config.src))
		.pipe($.size({
			title: 'images:retina - before'
		}))
		.pipe($.unretina())
		.pipe($.size({
			title: 'images:retina -  after'
		}))
		.pipe(gulp.dest(config.src));
});

gulp.task('images', function(cb) {
	runSequence('images:min', 'images:retina', cb);
});
