
var path = require('path');
var fs = require('fs-extra');
var del = require('del');

gulp.task('projects:new', function(cb) {
    var name = gulp.requireArgv('project-name', cb);
    var newDir = path.join(gulp.config.projectsDirFull, name);

    fs.stat(newDir, function(err, stat) {
        if (stat && !err) {
            gulp.logError('projects:new: directory exists!')
            return;
        }

        fs.ensureDir(newDir, function() {
            fs.writeFileSync(path.join(newDir, 'config.yml'), '');
            cb();
        });
    });
});

gulp.task('projects:delete', function(cb) {
    var projDir = path.join(gulp.config.projectsDirFull, gulp.requireArgv('project-name', cb));
    del(projDir).then(function() {
        cb();
    });
});

gulp.task('projects:copy', function(cb) {
    var srcDir = path.join(gulp.config.projectsDirFull,gulp.requireArgv('from-project', cb));
    var dstDir = path.join(gulp.config.projectsDirFull, gulp.requireArgv('to-project', cb));

    fs.copy(srcDir, dstDir, function(err) {
        if (err) {
            gulp.logError(err.message);
            return;
        }

        cb();
    })
});
