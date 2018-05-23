"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  sassLint = require("gulp-sass-lint"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  prefix = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  htmlmin = require("gulp-htmlmin"),
  browserSync = require("browser-sync").create();

var scripts = ["../assets/js/app.js"];

gulp.task("html", function() {
  return gulp
    .src("../*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("../docs"));
});

// Lint Sass
gulp.task("sass-lint", function() {
  return gulp
    .src("../assets/scss/**/*.scss")
    .pipe(
      sassLint({
        configFile: ".scss-lint-config.yml"
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// Compile Sass
gulp.task("sass-compile", function() {
  return gulp
    .src("../assets/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["node_modules/superior-scss/src"]
      }).on("error", sass.logError)
    )
    .pipe(prefix("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      sourcemaps.write(".", {
        sourceRoot: "../../assets/scss",
        includeContent: false
      })
    )
    .pipe(gulp.dest("../docs/css"))
    .pipe(browserSync.stream());
});

// Run Compile Sass and Sass linter
gulp.task("sass", gulp.series("sass-compile", "sass-lint"));

// Configure JS.
gulp.task("js", function() {
  return gulp
    .src(scripts)
    .pipe(uglify())
    .pipe(concat("app.js"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("../docs/js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: "../docs/",
    browser: "google chrome"
  });
  done();
});

// Static Server + watching scss/html files
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("html", "sass", "js"),
    "browser-sync",
    function watcher(done) {
      gulp.watch("../*.html", gulp.parallel("html"));
      gulp.watch("../assets/scss/**/*.scss", gulp.parallel("sass"));
      gulp.watch("../assets/js/**/*.js", gulp.parallel("js"));
      gulp.watch("../*.html").on("change", browserSync.reload);
    }
  )
);
