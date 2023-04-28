
import gulp from 'gulp';
const { src, series, dest, parallel, watch, task } = gulp;

import jshint from 'gulp-jshint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import rimraf from 'gulp-rimraf';
import header from 'gulp-header';
import resume from 'gulp-resume';
import imagemin from 'gulp-imagemin';

const paths = {
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

task('default', series(clean, parallel(lint, scripts, images, buildResume)));
task('prod', parallel(
    lint, scripts, images,
    // buildResume
));
task('dev', series(clean, parallel(lint, scripts, images, buildResume), startWatch));
