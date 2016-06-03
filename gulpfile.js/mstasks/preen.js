var gulp = require('gulp');

// Bower unused files remove - preen
gulp.task('preen', function(cb) {
	var preen = require('preen');
	preen.preen({}, cb);
});
