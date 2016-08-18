
var path = require('path');

gulp.task("aigis", function() {

    var configPath = path.join(gulp.config.projectDir, gulp.config.configDir, 'aigis_config.yml');

    return gulp.src(configPath, {allowEmpty: true})
        .pipe(gulp.plugins.aigis());
});