var semver = require('semver');
var path = require('path');
var fs = require('fs');

function inc(importance) {
    var version = JSON.parse(fs.readFileSync(path.join(gulp.config.projectDir, 'package.json'))).version;
    console.log(version);

    // get all the files to bump version in
    return gulp.src([path.join(gulp.config.projectDir, 'package.json'),
                     path.join(gulp.config.projectDir, 'bower.json')
        ])
        // bump the version number in those files
        .pipe(gulp.plugins.bump({
            type: importance
        }))
        // save it back to filesystem
        .pipe(gulp.dest(gulp.config.projectDir))
        // commit the changed version number
        .pipe(gulp.plugins.git.commit('Release v' + semver.inc(
                version,
                importance)))
        // read only one file to get the version number
        .pipe(gulp.plugins.filter('package.json'))
        // **tag it in the repository**
        .pipe(gulp.plugins.tagVersion());
}

gulp.task('tag:patch', function() {
    process.chdir(gulp.config.projectDir);
    return inc('patch');
});
gulp.task('tag:feature', function() {
    process.chdir(gulp.config.projectDir);
    return inc('minor');
});
gulp.task('tag:release', function() {
    process.chdir(gulp.config.projectDir);
    return inc('major');
});

gulp.task('git:push', function() {
    return gulp.plugins.git.push('origin', 'master', {
        args: " --tags"
    }, function(err) {
        if (err) throw err;
    });
});

gulp.task('git:add', function() {
    return gulp.src('./**')
        .pipe(gulp.plugins.git.add());
});

gulp.task('git:commit-initial', function() {
    return gulp.src('./*')
        .pipe(gulp.plugins.git.commit('initial commit'));
});

gulp.task('git:init-dist-begin', function(cb) {
    var distDir = path.join(gulp.config.projectDir, gulp.config.roots.dist);
    process.chdir(distDir);

    gulp.plugins.git.init(function(err) {
        if (err) throw err;
        gulp.plugins.git.addRemote('origin', gulp.config.dist.gitRemote, function (err) {
            if (err) throw err;
            cb();
        });
    });
});



gulp.task('git:init-dist', gulp.series('git:init-dist-begin', 'git:add', 'git:commit-initial', 'git:push'));
