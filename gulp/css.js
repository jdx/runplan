var gulp = require('gulp')
var stylus = require('gulp-stylus')
var plumber = require('gulp-plumber')

gulp.task('css:build', function () {
  return gulp.src('css/app.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('public'))
})

gulp.task('css:watch', ['css:build'], function () {
  gulp.watch('css/**/*.styl', ['css:build'])
})
