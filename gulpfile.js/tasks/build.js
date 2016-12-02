
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

gulp.task('build:sitemap', function(cb) {
    var buildSrc = path.join(gulp.config.projectDir, gulp.config.roots.build, '**/*.html');
    var distDir = path.join(gulp.config.projectDir, gulp.config.roots.dist);

    if (!distDir) {
        cb();
        return;
    }

    var pubDir = distDir;
    if (gulp.config.dist.public) {
        pubDir = path.join(distDir, gulp.config.dist.public);
    }

    return gulp.src(buildSrc, {
            read: false
        })
        //.pipe(gulp.plugins.debug())
        .pipe(gulp.plugins.sitemap({
            siteUrl: gulp.config.siteUrl
        }))
        .pipe(gulp.dest(pubDir))
        //.pipe(gulp.plugins.debug());
});


gulp.task('build', gulp.series('build:clean', 'build:static'));
