var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Clean Output Directory

gulp.task('clean', function() {
  return gulp.src(['public', 'src/static/styles', 'src/static/scripts'], {
      read: false
    })
    .pipe($.clean());
});
gulp.task('clean:public', function() {
  return gulp.src(['public'], {
      read: false
    })
    .pipe($.clean());
});
gulp.task('clean:images', function() {
  return gulp.src(['src/static/imgs'], {
      read: false
    })
    .pipe($.clean());
});
gulp.task('clean:styles', function() {
  return gulp.src(['src/static/styles'], {
      read: false
    })
    .pipe($.clean());
});
gulp.task('clean:scripts', function() {
  return gulp.src(['src/static/scripts'], {
      read: false
    })
    .pipe($.clean());
});
