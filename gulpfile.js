var gulp = require('gulp')
var less = require('gulp-less')
var path = require('path')
var watch = require('gulp-watch')
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');


var paths = {
    scripts: ['./components/vue/dist/vue.js', './components/jquery/dist/jquery.min.js', './js/**/*.js'],
}

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});


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
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch('less/**/*', ['less', 'prefixer'])
})