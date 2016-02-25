var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var livereload = require('gulp-livereload');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'))
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('css/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

// Watch task
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('index.html', ['html']);
  gulp.watch('js/**', ['scripts']);
  gulp.watch('css/*.css', ['styles']);
});

// Default task
gulp.task('default', ['jshint', 'watch']);

// Build task
gulp.task('build', ['jshint', 'html', 'scripts', 'styles']);