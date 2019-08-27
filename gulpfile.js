const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('jasmine', function() {
  return gulp.src(['src/**/*.html', 'helper/**/*.js', 'spec/**/*Spec.js'], {cwd: '.'})
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
});

gulp.task('headless', function() {
    return gulp.src(['src/**/*.html', 'spec/**/*Spec.js'], {cwd: 'src'})
      .pipe(jasmineBrowser.specRunner({ console: true }))
      .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
  });