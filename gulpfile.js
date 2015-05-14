var gulp = require('gulp')
var less = require('gulp-less')
var path = require('path')
var watch = require('gulp-watch')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber');

gulp.task('default', function() {
  // place code for your default task here
})



gulp.task('less', function () {
    return gulp.src('less/main.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('public/css'))
})

gulp.task('prefixer', ['less'], function() {
    return gulp.src('public/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'))
})

gulp.task('watch', function() {
    gulp.watch('less/**/*', ['less', 'prefixer'])
})