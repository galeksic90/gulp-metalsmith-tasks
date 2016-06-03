// ==== THEME ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').theme
;

// Copy PHP source files to the `build` folder
gulp.task('theme-php', function() {
  return gulp.src(config.php.src)
  .pipe(plugins.changed(config.php.dest))
  .pipe(gulp.dest(config.php.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-lang', function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-styles', function() {
    return gulp.src(config.styles.src)
        .pipe(plugins.changed(config.styles.dest))
        .pipe(gulp.dest(config.styles.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-imgs', function() {
    return gulp.src(config.imgs.src)
        .pipe(plugins.changed(config.imgs.dest))
        .pipe(gulp.dest(config.imgs.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('theme-fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(plugins.changed(config.fonts.dest))
        .pipe(gulp.dest(config.fonts.dest));
});

// All the theme tasks in one
gulp.task('theme', ['theme-lang', 'theme-php', 'theme-styles', 'theme-imgs']);
