require('babel/register')({
  ignore: /node_modules\/[^brew]/
})
require('babel/polyfill')

var babelify       = require('babelify'),
    browserify     = require('browserify'),
    concat         = require('gulp-concat'),
    gulp           = require('gulp'),
    gutil          = require('gulp-util'),
    mocha          = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    path           = require('path'),
    sequence       = require('run-sequence'),
    size           = require('gulp-size')

var testService = require('./service/index')

gulp.task('build', function(done) {

})

gulp.task('build-sdk', function(done) {

  var bundler = browserify({
    bundleExternal: true,
    cache: {},
    debug: true,
    entries: [
      './sdk/index.js'
    ],
    extensions: [],
    fullPaths: true,
    insertGlobals: false,
    packageCache: {},
    standalone: '{{lowercase appName}}'
  })

  bundler
    .transform(babelify.configure({
      blacklist: ["useStrict"]
    }))
    .bundle()
    .on('error', function() {
      console.log(arguments)
    })
    .pipe(source('{{lowercase appName}}.js'))
    .pipe(gulp.dest('build/sdk/'))
    .on('end', function() {
      console.log('build/{{lowercase appName}}.js created.')
      done()
    })

})

gulp.task('mocha', function() {

  return gulp
    .src([
      './test/helpers/runner.js',
      './test/unit/**/*.js',
      './test/integration/**/*.js',
      './test/sdk/**/*.js'
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))

})

gulp.task('test-server-start', function(done) {

  testService.start()

  setTimeout(done, 1000)

})

gulp.task('test-server-stop', function(done) {

  testService.stop()

  done()

})

gulp.task('t', function(done) {

  sequence('test-server-start', 'mocha', 'test-server-stop', done)

})

gulp.task('test', ['t'])
