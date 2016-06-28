

gulp.task('nodemon', function () {

    gulp.config.nodemon.cwd = gulp.config.projectDir;

    gulp.plugins.nodemon(gulp.config.nodemon);
});
