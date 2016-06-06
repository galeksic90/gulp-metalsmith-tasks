

var path = require('path');

// copy layouts to build
gulp.task('layouts:copy', function() {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.layouts);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.layouts);
    var source = srcDir + '/**/*.jade';

    return gulp.src(source).pipe(gulp.dest(dstDir));
});