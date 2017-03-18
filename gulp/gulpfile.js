var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var sequence = require('gulp-sequence');

gulp.task('css', function() {
    return gulp.src('./src/**/*.css')
        .pipe(minifycss())
        /*.pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest('manifest-css.json'))
        .pipe(gulp.dest('./build/rev'));
});

gulp.task('js', function() {
    return gulp.src('./src/**/*.js')
        /*.pipe(concat('main.js'))
        .pipe(gulp.dest('./build/js'))*/
        /*.pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./build'))
        .pipe(rev.manifest('manifest-js.json'))
        .pipe(gulp.dest('./build/rev'));
});

gulp.task('rev', function() {
    return gulp.src(['./build/rev/*.json', './src/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function(cb) {
    return gulp.src('./build')
        .pipe(rimraf());
});

gulp.task('default', sequence('clean', 'css', 'js', 'rev'));