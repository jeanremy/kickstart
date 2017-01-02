var gulp 		= require('gulp'),
	  imagemin 	= require('gulp-imagemin'),
    svgSprite   = require('gulp-svg-sprite'),
    svg2png     = require('gulp-svg2png'),
    size        = require('gulp-size'),
	  cache 		= require('gulp-cache');






// Copy all static images
gulp.task('images', function() {
  return gulp.src(['img/*.png', 'img/*.jpg'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/optimized/'))
});


// Sprite
var changeEvent = function(evt) {
  gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};
