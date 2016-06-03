
var fs = require('fs-extra');

var composerJson = {
    "repositories": [
        {
            "type": "package",
            "package": {
                "name": "wordpress",
                "type": "webroot",
                "version": "4.5.2",
                "dist": {
                    "type": "zip",
                    "url": "https://codeload.github.com/WordPress/WordPress/zip/4.5.2"
                },
                "require" : {
                    "fancyguy/webroot-installer": "1.0.0"
                }
            }
        }
    ],
    "require": {
        "wordpress": "4.*",
        "fancyguy/webroot-installer": "1.0.0"
    },
    "extra": {
        "webroot-dir": "public",
        "webroot-package": "wordpress"
    }
};

gulp.config.libWordpressDir = wpDir = './lib/wordpress';

gulp.task('wordpress:install', function(cb) {
    fs.ensureDir(wpDir, function() {
        fs.writeFile(wpDir + '/composer.json', JSON.stringify(composerJson), function() {
            var composer = require('gulp-composer');
            composer({
                "working-dir": wpDir,
                async: false
            });
            cb();
        });
    })
});

gulp.task('wordpress:remove', function(cb) {
    fs.emptyDir(wpDir, cb);
});

gulp.task('wordpress:reset', gulp.series('wordpress:remove', 'wordpress:install'));

