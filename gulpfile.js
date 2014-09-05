// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
    cmq = require('gulp-combine-media-queries');

/* 
 * Handle error to avoid break or sending a scss file in css folder
 * https://github.com/gulpjs/gulp/issues/259
*/
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Sass
gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
      .pipe(plumber({
        errorHandler: handleError
      }))
      .pipe(sass({ 
        style: 'expanded',
        noCache: true
      }))
      .pipe(plumber.stop())        
      .pipe(gulp.dest('css'))
});

// Postprocess
gulp.task('postprocess', function() {
  return gulp.src('css/main.css')
    .pipe(cmq())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
});

// Scripts
gulp.task('scripts', function() {  
    return gulp.src(['js/*.js', '!js/vendor/**', '!js/main.min.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
});

// Images
gulp.task('images', function() {
  return gulp.src(['img/original/*.png', 'img/original/*.jpg'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/'))
});




  // Default task
gulp.task('default', function() {

    // Watch .scss files
    gulp.watch('sass/*.scss', ['sass']);

    // Watch main.css files
    gulp.watch('css/main.css', ['postprocess']);

    // Watch .js files
    gulp.watch('js/*.js', ['scripts']);

    // Watch image files
    gulp.watch('img/original/*', ['images']);

    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['css/main.css', 'js/main.js', 'img/original/**']).on('change', livereload.changed);
});
