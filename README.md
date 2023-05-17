## LP用テンプレート
* gulp利用

### 入れているプラグイン

#### sass関係
* sass
Dart Sassを使えるようにする
* gulp-sass
sassのコンパイル
* gulp-sourcemaps
ソースマップ作成
* gulp-clean-css
ファイル内の不要な空白や改行、コメントなどを削除
※gulp-sourcemapsとgulp-clean-cssは記述の順番注意
* gulp-clean-css
cssを圧縮

#### エラー関係
* gulp-plumber
watch中にエラーが発生してもwatchが止まらないようにする
* gulp-notify
エラー発生時のアラート出力

#### js関係
* gulp-uglify
JavaScriptを圧縮git 

#### 画像圧縮
* gulp-imagemin（7.x系）
* imagemin-mozjpeg（9.x系）
.jpeg圧縮
* imagemin-pngquant
.png圧縮
* gulp-changed
圧縮済みの画像ファイルに対して再度画像を圧縮しないようにする
（このプラグインだけ未確認…）

#### 自動リロード
* browser-sync

#### ejs
* gulp-ejs
* gulp-rename
出力ファイルのファイル名変更
