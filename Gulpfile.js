const { src, series, dest, parallel, watch } = require('gulp');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var imagemin = require('gulp-imagemin');
var header = require('gulp-header');
var resume = require('gulp-resume');

var paths = {
    JS: [
        'Gulpfile.js',
        'assets/js/vendor/jquery-1.9.1.min.js',
        'assets/js/vendor/modernizr-2.7.1.custom.min.js',
        'assets/js/plugins/jquery.fitvids.js',
        'assets/js/plugins/jquery.magnific-popup.js',
        'assets/js/plugins/responsive-nav.js',
        'assets/js/plugins/simpleJekyllSearch.js',
        'assets/js/_main.js',
        'assets/js/_redirects.js',
    ]
};

function lint(cb) {
    return src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
}

function clean(cb) {
    return src(['assets/js/scripts*.js', 'resume.html'], {read: false, allowEmpty: true})
        .pipe(rimraf());
}

function scripts(cb) {
    return src(paths.JS.slice(1))
        .pipe(concat('scripts.js'))
        .pipe(dest('assets/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('assets/js'));
}

function images(cb) {
    return src('assets/images/**/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(dest('assets/images'));
}

function buildResume() {
    return src('resume.json')
        .pipe(resume({
            format: 'html',
            theme: 'elegant'
        }))
        .pipe(header('---\n---\n'))
        .pipe(rename('resume.html'))
        .pipe(dest('.'));
}

function startWatch() {
    watch(paths.JS, parallel(lint, scripts));
    watch('resume.json', buildResume);
}

exports.default = series(clean, parallel(lint, scripts, images));
exports.prod = parallel(scripts, images);
exports.dev = series(exports.default, startWatch);
