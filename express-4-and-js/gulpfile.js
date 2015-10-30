var gulp = require('gulp'),
    ss = require('socketstream/gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade'),
  	uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    remember = require('gulp-remember'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten');

require('./app');

ss.client.set({
  serveDebugInfo: true
});


gulp.task('default', ['pack-all']);
gulp.task('live', ['live-assets','live-reload','serve']);
