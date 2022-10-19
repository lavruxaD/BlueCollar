const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const webp = require("gulp-webp");
const webpHtml = require("gulp-webp-html");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const babel = require("gulp-babel");
const webpack = require('webpack-stream');

function html() {
  return src("app/*.html")
    .pipe(webpHtml())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist/"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
  .pipe(scss({ outputStyle: "compressed" }))
  .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        grid: true,
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(["app/js/main.js"])
  .pipe(babel())
  .pipe(webpack({
    mode: "development"
  }))
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/img/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/img"))
    .pipe(webp())
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}

function cleanDist() {
  return del("dist");
}

function build() {
  return src(
    [
      "app/css/style.min.css",
      "app/fonts/**/*",
      "app/js/main.min.js",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.*", "!app/js/main.min.js"], scripts);
  watch(["app/img/**.*"]).on("change", browserSync.reload);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, html, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);

