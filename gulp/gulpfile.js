'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sassLint    = require('gulp-sass-lint'),
    sourcemaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    htmlmin     = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();

var scripts = [
  '../assets/js/lib/headroom/headroom.min.js',
  '../assets/js/lib/headroom/jQuery.headroom.js',
  '../assets/js/app.js'
];

gulp.task('html', function() {
  return gulp.src('../*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../dist'));
});

// Linter
gulp.task('sass-lint', function() {
  return gulp.src('../assets/scss/**/*.scss')
  .pipe(sassLint({
    configFile: '.scss-lint-config.yml'
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
});

// Configure CSS tasks.
gulp.task('sass', gulp.series('sass-lint'), function () {
  return gulp.src('../assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.', {sourceRoot:'../../assets/scss',includeContent: false}))
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: '../dist/',
    browser: "google chrome"
  });
  done();
});

gulp.task('default', gulp.series(gulp.parallel('html', 'sass', 'js'), 'browser-sync',
  function watcher(done) {
    gulp.watch('../*.html', gulp.parallel('html'));
    gulp.watch('../assets/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('../assets/js/**/*.js', gulp.parallel('js'));
    gulp.watch('../*.html').on('change', browserSync.reload);
  }
));
