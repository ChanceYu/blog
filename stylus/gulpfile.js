var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

var path_src = './src/css';
var path_build = './build/css';
 
//编译单个 styl 文件
gulp.task('one', function () {
  return gulp.src(path_src + '/one.styl')
    .pipe(stylus())
    .pipe(gulp.dest(path_build));
});
 
// 压缩文件
gulp.task('compress', function () {
  return gulp.src(path_src + '/compressed.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(path_build));
});
 
 
// 设置行号标识
gulp.task('linenos', function () {
  return gulp.src(path_src + '/linenos.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest(path_build));
});
 
// 编译包括.css源文件
gulp.task('include-css', function() {
  return gulp.src(path_src + '/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./'));
 
});
 
// 内部sourcemaps
gulp.task('sourcemaps-inline', function () {
  return gulp.src(path_src + '/sourcemaps-inline.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path_build));
});
 
// 外部sourcemaps 
gulp.task('sourcemaps-external', function () {
  return gulp.src(path_src + '/sourcemaps-external.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path_build));
});
 
// Default gulp task to run 
gulp.task('default', ['one', 'compress', 'linenos', 'sourcemaps-inline', 'sourcemaps-external']);
 