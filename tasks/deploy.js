var gulp = require('gulp');
var semver = require('semver');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var gitFiles = $.filter(['**/*', '!node_modules', '!public']);
var gitCache = $.filter(['html5.manifest', 'sitemap.xml']);


/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe($.bump({
      type: importance
    }))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    .pipe($.addSrc([
      './src/static/html5.appcache',
      './src/static/sitemap.xml'
    ]))
    // commit the changed version number
    .pipe($.git.commit('Release v' + semver.inc(
      require('../../package.json').version,
      importance)))
    // read only one file to get the version number
    .pipe($.filter('package.json'))
    // **tag it in the repository**
    .pipe($.tagVersion());
}

gulp.task('tag:patch', function() {
  return inc('patch');
})
gulp.task('tag:feature', function() {
  return inc('minor');
})
gulp.task('tag:release', function() {
  return inc('major');
})

gulp.task('git:push', function() {
  return $.git.push('origin', 'master', {
    args: " --tags"
  }, function(err) {
    if (err) throw err;
  });
});

//
// Deploy
//
gulp.task('deploy:patch', function(cb) {
  return runSequence('tag:patch', 'git:push', cb);
});
gulp.task('deploy:feature', function(cb) {
  return runSequence('tag:feature', 'git:push', cb);
});
gulp.task('deploy:release', function(cb) {
  return runSequence('tag:release', 'git:push', cb);
});
