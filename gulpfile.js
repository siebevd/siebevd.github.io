var gulp = require('gulp'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'), // Fixes watch task on error
    notify = require('gulp-notify'), // Get Mac Notifications when a task is finished
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    prefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');


/* Basic setup
----------------------------*/

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      port: 8080
    }));
});



gulp.task('styles', function(){
    gulp.src('scss/style.scss')
        .pipe(plumber({errorHandler: notify.onError("<%= error.fileName %> [<%= error.lineNumber %>]: <%= error.message %>")}))
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(rename({suffix: '.min', basename:'style'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'));
});


/* Commands
----------------------------*/

gulp.task('default', ['webserver','styles','watch']);


/* Watch
----------------------------*/


gulp.task('watch', function() {
  // Watch sass files
  gulp.watch('scss/**/**.scss', ['styles']);
});
