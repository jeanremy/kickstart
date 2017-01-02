'use strict';
var gulp 			  = require('gulp'),
	requireDir 		= require('require-dir'),
	browserSync 	= require('browser-sync');
 

var paths = {
  sass: ['sass/**/*.scss', 'sass/**/*._scss', 'sass/*.scss'],
  js: 'js/**/*.js',
  images: 'img/*',
  icones: 'img/sprite/icons/*.svg'
};

var url = "voeux2017.dev/";


requireDir('./gulp-tasks');

// Static Server + watching scss/html files
gulp.task('default', ['sass', 'scripts'], function() {

    browserSync.init({
        open: 'external',
        host: url,
        proxy: url,
        browser: 'Chrome' // "Firefox"
    });

    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.icones, ['sprite']);
});