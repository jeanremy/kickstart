var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	autoprefixer 	= require('gulp-autoprefixer'),
	minifycss 		= require('gulp-minify-css'),
	sourcemaps 		= require('gulp-sourcemaps'),
    pxtorem 		= require('gulp-pxtorem');

gulp.task('sass', function() {
	return gulp.src(['sass/**/*.scss', 'sass/**/*._scss', 'sass/*.scss'])
        .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(pxtorem({
			root_value: 16,
			unit_precision: 5,
			prop_white_list: [],
			replace: false,
			media_query: false
		}))
		.pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream:true}));
});