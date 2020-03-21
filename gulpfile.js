const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("./package.json"));

const gulp = require("gulp");
const pug = require("gulp-pug");
const less = require("gulp-less");
const minifyCSS = require("gulp-csso");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

const dest = "./build";

const html = () => {
  return gulp
    .src("./src/template.pug")
    .pipe(rename("index.html"))
    .pipe(
      pug({
        locals: {
          name: pkg.author + "/" + pkg.name
        },
        pretty: true
      })
    )
    .pipe(gulp.dest(dest));
};

const css = () => {
  return gulp
    .src("./src/styles.less")
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dest));
};

const js = () => {
  return gulp.src("./src/remark.js")
  .pipe(rename('remark.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dest));
};

const copy = () => {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest(dest + "/assets/"));
};

exports.default = gulp.series(html, css, js, copy);

exports.watch = () => {
  return gulp.watch(
    ["./src/*.md", "./src/*.less", "./src/*.pug"],
    gulp.series(html, css, js, copy)
  );
};
