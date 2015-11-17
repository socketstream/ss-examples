var gulp = require('gulp'),
    ss = require('socketstream/gulp');

require('./app');

ss.client.set({
  serveDebugInfo: true
});

gulp.task('watch', function() {
    gulp.watch('_demo/client/tags/*.tag', ['riot']);
    gulp.watch('_demo/client/**/*').on('change', function(file) {
        ss.client.reloadCached();
        ss.livereload.changed(file);
    });
});

gulp.task('default', ['pack-all']);
gulp.task('live', ['live-assets','watch','serve']);
