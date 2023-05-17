const { src, dest, watch, series, parallel } = require('gulp');

const ejs = require("gulp-ejs"); //EJS
const rename = require("gulp-rename"); //ファイル出力時にファイル名を変える

// scss
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");    // エラーが発生しても強制終了させない
const notify = require("gulp-notify");      // エラー発生時のアラート出力
// const purgecss = require("gulp-purgecss");  // 未使用スタイル削除
const cleanCSS = require("gulp-clean-css"); // 圧縮
const sourcemaps = require("gulp-sourcemaps");  // ソースマップ作成

// js圧縮
const uglify = require("gulp-uglify");

// 画像圧縮
const imagemin = require("gulp-imagemin"); // ロスレス圧縮
const imageminMozjpeg = require("imagemin-mozjpeg"); //.jpegを圧縮（不可逆圧縮）
const imageminPngquant = require("imagemin-pngquant"); //.pngを圧縮（不可逆圧縮）
const imageminChanged = require("gulp-changed"); //圧縮済みの画像ファイルに対して再度画像を圧縮しないようにする

// ブラウザリロード
const browserSync = require("browser-sync");

// 参照元パス
const srcPath = {
 css: 'src/assets/scss/**/*.scss',
 js: 'src/assets/js/*.js',
 img: 'src/assets/img/**/*',
//  html: 'src/**/*.html',
//  php: 'src/**/*.php',
 ejs: 'src/**/!(_)*.ejs' // !(_)はコンポーネントファイル（_header.ejsなど）以外の意味
}

// 出力先パス
const destPath = {
 css: 'dist/assets/css/',
 js: 'dist/assets/js/',
 img: 'dist/assets/img/',
//  html: 'dist/',
//  php: 'dist/',
 ejs: 'dist/'
}

// copyFiles
// const copyFiles = () =>
//   src(srcPath.html)
//   .pipe(dest(destPath.html));

const ejsFiles = () => {
	return src(srcPath.ejs) //コンパイル元
  .pipe(
    plumber({errorHandler: notify.onError('Error:<%= error.message %>')})
  )
	.pipe(ejs())
	.pipe(rename({ extname: ".html" }))
	.pipe(dest(destPath.ejs))     //コンパイル先
}

// cssFiles
const cssFiles = () => {
  return src(srcPath.css) //コンパイル元
  .pipe(sourcemaps.init())//gulp-sourcemapsを初期化
  .pipe(
    plumber({errorHandler: notify.onError('Error:<%= error.message %>')})
  )
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(cleanCSS()) // CSS圧縮
  .pipe(sourcemaps.write('./'))  //ソースマップの出力
  .pipe(dest(destPath.css))     //コンパイル先
}

// jsFiles
const jsFiles = () => {
  return src(srcPath.js)
  .pipe(
    //エラーが出ても処理を止めない //エラー出力設定
    plumber({errorHandler: notify.onError('Error:<%= error.message %>')})
  )
  .pipe(uglify()) // js圧縮
  .pipe(dest(destPath.js))
}

//画像圧縮
const imgImagemin = () => {
 return src(srcPath.img)
   .pipe(imageminChanged(destPath.img))
   .pipe(
     imagemin([
        imageminPngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
         imageminMozjpeg({ quality: 65 }),
         imagemin.svgo(),
         imagemin.optipng(),
         imagemin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
   .pipe(dest(destPath.img))
}

// browserSync
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}
const browserSyncOption = {
  server: {baseDir: "./"},       // 基準とするディレクトリを指定
  startPath: "dist/index.html",  // 開きたいパス
  notify: false,                 // ブラウザ更新時に出てくる通知を非表示にする
  open: "external",              // ローカルIPアドレスでサーバを立ち上げる
}
const browserSyncReload = (done) => { //リロード
  browserSync.reload();
  done();
}

// watch
const watchFiles = () => {
  // watch(srcPath.html, series(copyFiles, browserSyncReload))
  watch('src/**/*.ejs', series(ejsFiles, browserSyncReload))
  watch(srcPath.css, series(cssFiles, browserSyncReload))
  watch(srcPath.js, series(jsFiles, browserSyncReload))
  watch(srcPath.img, series(imgImagemin, browserSyncReload))
  // watch(srcPath.php, series(browserSyncReload))
 }

exports.default = series(series(ejsFiles, cssFiles, jsFiles, imgImagemin), parallel(watchFiles, browserSyncFunc));
// copyFiles,
