var gulp = require('gulp');

var config = require('../../../config').build;

gulp.task('pagespeed', function(cb) {
	var pagespeed = require('psi');
	// get the PageSpeed Insights report
	pagespeed(config.website, config.options, function(err, data) {
		// console.log(data.score);
		// console.log(data.pageStats);
	});

	// output a formatted report to the terminal
	pagespeed.output(config.website, config.options, function(err) {
		cb()
	});
});
