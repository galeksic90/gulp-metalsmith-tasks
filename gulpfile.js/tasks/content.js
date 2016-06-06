


var path = require('path');

// copy content to build
gulp.task('content:copy', function() {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.content);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.content);
    var source = srcDir + '/**/*';

    return gulp.src(source).pipe(gulp.dest(dstDir));
});

