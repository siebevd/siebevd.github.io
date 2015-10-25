var gulp = require('gulp'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'), // Fixes watch task on error
    notify = require('gulp-notify'), // Get Mac Notifications when a task is finished
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    prefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css')
    source = require('vinyl-source-stream'), // Transforming browserify so we can use it with gulp
    browserify = require('browserify'),
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    assign = require('lodash.assign'),
    gutil = require('gulp-util');



/* Basic setup
----------------------------*/

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      port: 8080
    }));
});



/* Javascript
----------------------------*/

var browserifyOpts = {
  entries: './js/app.js',
  debug:true
};

var opts = assign({}, watchify.args, browserifyOpts);
var watchJs = watchify(browserify(opts));

gulp.task('browserify',brwsrfy);
watchJs.on('update', brwsrfy); // Watch for updates happening on any of the required files
watchJs.on('log', gutil.log); // output build logs to terminal


function brwsrfy() {
  return watchJs.bundle()
    .on("error", notify.onError(function (error) {
      return "ERROR: " + error.message;
      this.emit('end');
    }))
    .pipe(source('app.js')) // Give the new compiled file a name, app.js in this case
    .pipe(buffer()) // Transform to a stream we can use in gulp
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./js'));
}


/* Css
----------------------------*/

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

gulp.task('default', ['webserver','styles','watch','browserify']);


/* Watch
----------------------------*/


gulp.task('watch', function() {
  // Watch sass files
  gulp.watch('scss/**/**.scss', ['styles']);
});
