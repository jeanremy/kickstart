var gulp = require('gulp');

gulp.task('critical', function() {
  return  gulp.src(url)
    .pipe(critical({
      base: url,
      inline: true,
      width: 320,
      height: 480,
      minify: true
    }))
    .pipe(gulp.dest('dist'));
});