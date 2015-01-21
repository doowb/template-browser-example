'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('example', function () {
  var bundler = browserify('./src/app.js', { debug: true })
    .require('./package.json', { expose: '/package.json' })
    .exclude('coffee-script')
    .exclude('toml');

  var bundle = function () {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./js/'));
  };

  return bundle();
});

gulp.task('default', ['example']);
