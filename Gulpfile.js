const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
// const connect = require('gulp-connect');

function html(){
    return gulp.src('./src/template.pug')
        .pipe(pug({
            globals: {
                name: function() {
                    return 'working on it';
                }
            }
        }))
        .pipe(gulp.dest('./build'))
}

function css() {
    return gulp.src('./src/styles.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build'))
}

// function server() {
//     connect.server({
//         root: './build',
//         livereload: true
//     })
// }

exports.html = html;
exports.css = css;
// exports.server = server;

exports.default = gulp.parallel(html, css)
