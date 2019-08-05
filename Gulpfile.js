const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json'));

function html() {
    return gulp.src('./src/template.pug')
        .pipe(rename('index.html'))
        .pipe(pug({
            locals: {
                name: 'cowglow/' + pkg.name
            },
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
}

function css() {
    return gulp.src('./src/styles.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build'))
}

function js() {
    return gulp.src('./bower_components/remark/remark.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./build'))
}

function copy() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets/'))
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.copy = copy;

exports.default = gulp.parallel(html, css, js, copy);
