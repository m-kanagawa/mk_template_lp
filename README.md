## LP用テンプレート
* gulp利用

### 入れているプラグイン

#### sass関係
* sass<br>Dart Sassを使えるようにする
* gulp-sass<br>sassのコンパイル
* gulp-sourcemaps<br>ソースマップ作成
* gulp-clean-css<br>ファイル内の不要な空白や改行、コメントなどを削除
※gulp-sourcemapsとgulp-clean-cssは記述の順番注意
* gulp-clean-css<br>cssを圧縮

#### エラー関係
* gulp-plumber<br>watch中にエラーが発生してもwatchが止まらないようにする
* gulp-notify<br>エラー発生時のアラート出力

#### js関係
* gulp-uglify<br>JavaScriptを圧縮git 

#### 画像圧縮
* gulp-imagemin（7.x系）<br>
* imagemin-mozjpeg（9.x系）<br>.jpeg圧縮
* imagemin-pngquant<br>.png圧縮
* gulp-changed<br>圧縮済みの画像ファイルに対して再度画像を圧縮しないようにする
（このプラグインだけ未確認…）

#### 自動リロード
* browser-sync<br>
#### ejs
* gulp-ejs<br>
* gulp-rename<br>出力ファイルのファイル名変更
