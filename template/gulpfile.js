var babelify       = require('babelify'),
    concat         = require('gulp-concat'),
    gulp           = require('gulp'),
    gutil          = require('gulp-util'),
    mocha          = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    path           = require('path'),
    sequence       = require('run-sequence'),
    size           = require('gulp-size')

gulp.task('build', function(done) {

})

gulp.task('mocha-server-run', function() {

  return gulp
    .src([
      './test/helpers/runner.js',
      './test/unit/**/*.js',
      './test/integration/**/*.js'
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))

})

gulp.task('t', [
  'mocha-server-run'
])

gulp.task('test', ['t'])
