
var connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    _ = require('lodash');

gulp.task('connect', function() {
    var phpServerOptions = {
        base: gulp.config.libWordpressDir + '/public',
        port: gulp.config.serve.port // - 1
    };

    /*

    var browserSyncOptions = {
        port: gulp.config.serve.port,
        ui: {
            port: gulp.config.serve.ui.port,
            weinre: {
                port: gulp.config.serve.ui.weinre.port
            }
        },
        proxy: '127.0.0.1:' + gulp.config.serve.port - 1
    };

    connect.server(phpServerOptions, function (){
        browserSync(browserSyncOptions);
    });

    gulp.watch(gulp.config.libWordpressDir + '/public /** /* .php').on('change', function () {
        browserSync.reload();
    });
    */

    connect.server(phpServerOptions);
});