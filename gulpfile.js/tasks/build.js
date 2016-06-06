
var fs = require('fs-extra');
var path = require('path');

gulp.task('build:clean', function(cb) {
    var dir = path.join(gulp.config.projectDir, gulp.config.roots.build);

    fs.emptyDir(dir, cb);
});

gulp.task('build:static', function(cb) {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.static);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build);

    fs.copy(srcDir, dstDir, cb);
});

