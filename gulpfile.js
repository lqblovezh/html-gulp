var gulp = require('gulp')
var rev = require('gulp-rev') //给文件添加版本号
var revReplace = require('gulp-rev-replace') //更新引用
var useref = require('gulp-useref') //通过规则实现文件合并
var filter = require('gulp-filter') //筛选和恢复
var uglify = require('gulp-uglify') //js文件压缩
var csso = require('gulp-csso') //css压缩

function css(cb) {
  var cssFilter = filter('src/css/*.css', { restore: true })
  gulp
    .src('src/css/*.css')
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
  cb()
}
function js(cb) {
  var jsFilter = filter('src/js/*.js', { restore: true })
  gulp
    .src('src/js/*.js')
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
  cb()
}
function html(cb) {
  var indexHtmlFile = filter('src/*.html', { restore: true })
  gulp
    .src('src/*.html')
    .pipe(indexHtmlFile)
    .pipe(rev())
    .pipe(indexHtmlFile.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('dist/'))
  cb()
}

exports.default = gulp.parallel(css, js, html)
