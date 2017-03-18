// include the required packages. 
var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
 
 
// include, if you want to work with sourcemaps 
var sourcemaps = require('gulp-sourcemaps');

var path_src = './src/css';
var path_build = './build/css';
 
// Get one .styl file and render 
gulp.task('one', function () {
  return gulp.src(path_src + '/one.styl')
    .pipe(stylus())
    .pipe(gulp.dest(path_build));
});
 
// Options 
// Options compress 
gulp.task('compress', function () {
  return gulp.src(path_src + '/compressed.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(path_build));
});
 
 
// Set linenos 
gulp.task('linenos', function () {
  return gulp.src(path_src + '/linenos.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest(path_build));
});
 
// Include css 
// Stylus has an awkward and perplexing 'include css' option 
gulp.task('include-css', function() {
  return gulp.src(path_src + '/*.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('./'));
 
});
 
// Inline sourcemaps 
gulp.task('sourcemaps-inline', function () {
  return gulp.src(path_src + '/sourcemaps-inline.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path_build));
});
 
// External sourcemaps 
gulp.task('sourcemaps-external', function () {
  return gulp.src(path_src + '/sourcemaps-external.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path_build));
});
 
// Pass an object in raw form to be accessable in stylus 
var data = {red: '#ff0000'};
gulp.task('pass-object', function () {
  gulp.src('./sty/main.styl')
    .pipe(stylus({ rawDefine: { data: data }}))
    .pipe(gulp.dest(path_build));
});
 
// Use with gulp-data 
var path_data = './components/**/*.styl';
/*gulp.task('gulp-data', function() {
  gulp.src(path_data)
    .pipe(data(function(){
      return {
        componentPath: '/' + (file.path.replace(file.base, '').replace(/\/[^\/]*$/, ''));
      };
    }))
    .pipe(stylus())
    .pipe(gulp.dest(path_build));
});*/
 
/* Ex:
body
  color: data.red;
*/
 
// Default gulp task to run 
gulp.task('default', ['one', 'compress', 'linenos', 'sourcemaps-inline', 'sourcemaps-external', 'pass-object']);
 