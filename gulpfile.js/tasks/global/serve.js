


var connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    _ = require('lodash');

gulp.task('serve:wordpress', function() {
    var phpServerOptions = {
        base: gulp.config.libWordpressDir + '/public',
        port: gulp.config.serve.php.port
    };

    var browserSyncOptions = {
        proxy: '127.0.0.1:' + gulp.config.serve.php.port,
        port: gulp.config.serve.port
    };

    connect.server(phpServerOptions, function (){
        browserSync(browserSyncOptions);
    });

    //gulp.watch(gulp.config.libWordpressDir + '/public /** /* .php').on('change', function () {
//        browserSync.reload();
  //  });

});


//gulp.task('default', gulp.series('serve:wordpress'));
