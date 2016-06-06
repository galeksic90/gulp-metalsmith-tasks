
var path = require('path');


// finds all small images in css in build dir, then replaces them into base64 and overwrites css
gulp.task('styles:scss', function() {
    var srcDir = path.join(gulp.config.projectDir, gulp.config.roots.src, gulp.config.srcRoots.scss);
    var dstDir = path.join(gulp.config.projectDir, gulp.config.roots.build, gulp.config.srcRoots.styles);

    var includes = gulp.config.styles.includes.slice();
    for (var i in includes) {
        includes[i] = gulp.config.projectDir + includes[i];
    }

    var processors = [];

    for (var processor in gulp.config.styles.processors) {
        if (gulp.config.styles.processors[processor]) {
            processors.push(require(processor)(gulp.config.styles.processors[processor]));
        }
    }

    return gulp.src(srcDir + '/*.scss')
        .pipe(gulp.plugins.sourcemaps.init())
        .pipe(gulp.plugins.sass({includePaths: includes
                        , precision: 6
                        , onError: function(err) {
                            return console.log(err);
                            }}))
        .pipe(gulp.plugins.postcss(processors))
        .pipe(gulp.plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(dstDir));
});



