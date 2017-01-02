var gulp 		= require('gulp'),
	uglify 		= require('gulp-uglify'),
    concat 		= require('gulp-concat'),
    jslint 		= require('gulp-jslint'),    
	browserSync = require('browser-sync'),
    plumber     = require('gulp-plumber');
    browserify 	= require('gulp-browserify');



gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src('js/main.js', { read: false })
    .pipe(plumber())
    // as an object 
    // .pipe(jslint({
    //     // these directives can 
    //     // be found in the official 
    //     // JSLint documentation. 
    //     node: true,
    //     evil: true,
    //     nomen: true,

    //     // you can also set global 
    //     // declarations for all source 
    //     // files like so: 
    //     global: [],
    //     predef: [],
    //     // both ways will achieve the 
    //     // same result; predef will be 
    //     // given priority because it is 
    //     // promoted by JSLint 

    //     // pass in your prefered 
    //     // reporter like so: 
    //     reporter: 'default',
    //     // ^ there's no need to tell gulp-jslint 
    //     // to use the default reporter. If there is 
    //     // no reporter specified, gulp-jslint will use 
    //     // its own. 

    //     // specifiy custom jslint edition 
    //     // by default, the latest edition will 
    //     // be used 
    //     edition: '2014-07-08',

    //     // specify whether or not 
    //     // to show 'PASS' messages 
    //     // for built-in reporter 
    //     errorsOnly: true
    // }))

    // error handling: 
    // to handle on error, simply 
    // bind yourself to the error event 
    // of the stream, and use the only 
    // argument as the error object 
    // (error instanceof Error) 
    .pipe(browserify({
        insertGlobals : true,
        debug : true
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('js'))
	.pipe(browserSync.reload({stream:true}));
});
