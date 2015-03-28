var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var deploy = require('gulp-gh-pages');

watchify.args.extensions = ['.coffee'];

var bundler = watchify(browserify('./src/App.coffee', watchify.args));
bundler.transform('coffeeify');

gulp.task('build-js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    // optional, remove if you dont want sourcemaps
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

function buildStatic() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('dist'));
}

function buildStylus() {
  return gulp.src('assets/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist'));
}

gulp.task('webserver', function() {

  var stylWatcher = gulp.watch('assets/**/*.styl', ['build-stylus']);
  var imageWatcher = gulp.watch('assets/**/*', ['build-static']);

  gulp.src('dist')
    .pipe(webserver({
      port: 3456,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('build-static', function() {
  return buildStatic();
});

gulp.task('build-stylus', function () {
  return buildStylus();
});

gulp.task('default', ['build-stylus', 'build-static', 'build-js', 'webserver']);

gulp.task('build', ['build-stylus', 'build-static'], function() {
  bundle();
});

gulp.task('deploy', ['build'], function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy({
      cacheDir: './tmp'
    }));
});