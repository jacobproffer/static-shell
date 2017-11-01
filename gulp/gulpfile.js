'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
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

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'sass', 'js'], function() {

    browserSync.init({
        server: '../dist/',
        browser: "google chrome"
    });

    gulp.watch('../*.html', ['html']);
    gulp.watch('../assets/scss/**/*.scss', ['sass']);
    gulp.watch('../assets/js/**/*.js', ['js']);
    gulp.watch('../*.html').on('change', browserSync.reload);
});

gulp.task('html', function() {
  return gulp.src('../*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../dist'));
});

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('../assets/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
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

gulp.task('default', ['html', 'sass', 'js', 'serve']);
