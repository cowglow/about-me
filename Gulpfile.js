const {dest, parallel, series, src} = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');


function css() {
    return src('./src/styles.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(dest('./build'))
}

exports.css = css;
exports.default = series(
    parallel(css)
);
