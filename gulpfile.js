var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()
var gulpUglify = require('gulp-uglify') // 監看
var plumber = require('gulp-plumber') // 載入 gulp-plumber
var stylus = require('gulp-stylus') // stylus
var connect = require('gulp-connect') //虛擬伺服器

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  })
})
gulp.task('stylus', function() {
  gulp
    .src('style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./'))
})

gulp.task('pug', function() {
  gulp
    .src('*.pug') // 传入管道的文件
    .pipe(plumber())
    .pipe(
      plugins.pug({
        pretty: true // 默认为false，表示是否美化HTML
      })
    )
    .pipe(gulp.dest('./')) // dest:destination
})

// 定義名稱為 default 的 gulp 工作
gulp.task('default')

// 即時監看檔案

gulp.task('watch', function() {
  gulp.watch('*pug', ['pug'])
  gulp.watch(['*.html'], ['html'])
  gulp.watch(['*.styl'], ['stylus'])
  gulp.watch(['*.css'], ['css'])
})

gulp.task('html', function() {
  gulp
    .src('*.html')
    .pipe(gulp.dest('./'))
    .pipe(connect.reload())
})
gulp.task('css', function() {
  gulp
    .src('*.css')
    .pipe(gulp.dest('./'))
    .pipe(connect.reload())
})
// 定義名稱為 default 的 gulp 工作
gulp.task('default', ['pug', 'stylus', 'connect', 'watch'])
