var gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade'),
  	uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten');

// use the gulp orchestrator
(function(ss) {
  ss.tasks.use(gulp);
  ss.start = function() {}; // may go into ss.useGulp(gulp) with line above

  // set specific start-server and other defaults
  require('./app');
  ss.tasks.defaults();

  ss.client.set({
    serveDebugInfo: true
  });

})(require('socketstream'));


gulp.task('default', ['pack-all']);
gulp.task('live', ['live-assets','live-reload','serve','serve-debug']);

gulp.task('serve-debug', function() {
  var ss = require('socketstream'),
      app = ss.app;

  // Showing stack errors
  app.set('showStackError', true);
  // Environment dependent middleware
  require('express-debug')(app, {/* settings */});
  // Disable views cache
  app.set('view cache', false);
});
