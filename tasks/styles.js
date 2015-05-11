var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var config = require('../../../config').build;

var runSequence = require('run-sequence');

//
// Main styles tasks
//

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {
	// For best performance, don't add Sass partials to `gulp.src`
	return gulp.src(config.src)
		.pipe($.changed('src/static/styles/', {
			extension: '.css'
		}))
		.pipe($.if('*.scss', $.sass({
				errLogToConsole: true,
				includePaths: require('node-neat').includePaths
			})
			.on('error', console.error.bind(console))
		))
		.pipe($.autoprefixer(config.autoprefixer))
		.pipe($.size({
			title: 'styles'
		}))
		.pipe(gulp.dest(config.dest));
});

//
// Uncss, base64, minify & concat all files
//

gulp.task('styles:min', function() {
	var filterUncss = $.filter(['**/*', '!ignored.css']);
	var filterMain = $.filter(['**/*', '!images.css']);
	var filterImages = $.filter(['!**/*', 'images.css']);
	return gulp.src([config.dest + '/**/*.css'])
		.pipe($.size({
			title: 'styles:min    - before '
		}))

	/// remove unused css - uncss
	.pipe(filterUncss)
		.pipe($.size({
			title: 'styles:uncss  - before '
		}))
		.pipe($.uncss({
			html: config.uncss.html,
			ignore: config.uncss.ignore,
			timeout: config.uncss.timeout
		}))
		.pipe($.size({
			title: 'styles:uncss  - after  '
		}))
		.pipe(filterUncss.restore())

	/// convert all images to base64
	.pipe($.size({
			title: 'styles:base64 - before '
		}))
		.pipe($.base64({
			baseDir: config.base64.src,
			maxImageSize: config.base64.maxImageSize,
			// debug: true
		}))
		.pipe($.size({
			title: 'styles:base64 - after  '
		}))

	/// minify all files
	.pipe($.size({
			title: 'styles:minify - before '
		}))
		.pipe($.minifyCss())
		.pipe($.size({
			title: 'styles:minify - after  '
		}))

	// concat main files into main.min.css
	.pipe(filterMain)
		.pipe($.clean())
		.pipe($.concat('main.min.css'))
		.pipe($.size({
			title: 'styles:concat - main   '
		}))
		.pipe(filterMain.restore())

	// concat images into images.min.css
	.pipe(filterImages)
		.pipe($.clean())
		.pipe($.concat('images.min.css'))
		.pipe($.size({
			title: 'styles:concat - images '
		}))
		.pipe(filterImages.restore())

	.pipe($.size({
		title: 'styles:min    - after  '
	}))

	.pipe(gulp.dest(config.dest));
});


//
// Inject all style files
//

gulp.task('styles:inject', function() {
	return gulp.src(config.inject.src)
		.pipe($.inject(gulp.src([config.dest + '/*.css'], {
			read: false
		}), {
			ignorePath: config.inject.ignore
		}))
		.pipe(gulp.dest(config.inject.dest));
});

//
// CSS & SCSS Tests
//

gulp.task('styles:csslint', function() {
	return gulp.src(config.dest + '/*.css')
		.pipe($.csslint())
		.pipe($.csslint.reporter());
});

gulp.task('styles:scsslint', function() {
	return gulp.src(config.scss + '/**/*.scss')
		.pipe($.scssLint({
			customReport: $.scssStylish
		}));
});
