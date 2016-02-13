var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var imagemin = require('gulp-imagemin');
var header = require('gulp-header');
var exec = require('child_process').exec;


var paths = {
  JS: [
        'Gulpfile.js',
        'assets/js/plugins/*.js',
        '!assets/js/vendor/*.js',
        '!assets/js/scripts*.js',
        'assets/js/**/*.js'
      ]
};

gulp.task('lint', function() {
  return gulp.src(paths.JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.JS.slice(1))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*.{png,jpg,jpeg}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('assets/images'));
});

gulp.task('resume', function(cb) {
  exec('resume export -t elegant -f html resume', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    gulp.src('resume.html')
      .pipe(header('---\n---\n'))
      .pipe(gulp.dest('.'));

    cb(err);
  });
});

gulp.task('clean', function() {
  return gulp.src(['assets/js/scripts*.js', 'resume.html'], {read: false})
    .pipe(rimraf());
});

gulp.task('watch', function() {
  gulp.watch(paths.JS, ['lint', 'scripts']);
  gulp.watch('resume.json', ['resume']);
});

gulp.task('default', ['clean', 'lint', 'scripts', 'images', 'resume']);
gulp.task('dev', ['default', 'watch']);
