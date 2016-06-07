

var path = require('path');
var metalsmith_task = require('../../lib/metalsmith_task');

// copy layouts to build
gulp.task('layouts:copy', function() {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.layouts);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.layouts);
    var source = srcDir + '/**/*.jade';

    return gulp.src(source).pipe(gulp.dest(dstDir));
});

var msFunc = function(cb) {
    metalsmith_task.build(path.join(gulp.config.projectDir, gulp.config.roots.build), gulp.config.layouts.metalsmith, function () {
        console.log(arguments);
        cb();
    });
}

gulp.task('layouts:metalsmith',msFunc);
gulp.task('layouts:ms', msFunc);

var jadeFunc = function(plugin, filter, options) {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.layouts);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build);
    var source = srcDir + '/**/*.jade';

    return gulp.src(source)
        .pipe(gulp.plugins.filter(filter))
        //.pipe(gulp.plugins.print())
        .pipe(plugin(options))
        .pipe(gulp.dest(dstDir));
}

gulp.task('layouts:jade', function() {
    return jadeFunc(gulp.plugins.jade, gulp.config.layouts.jade.filter, gulp.config.layouts.jade.options);
});

gulp.task('layouts:jadephp', function() {
    return jadeFunc(gulp.plugins.jadePhp, gulp.config.layouts.jadephp.filter, gulp.config.layouts.jadephp.options);
});