// 引入组件
var gulp = require('gulp');
var sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer');

var gulp = require('gulp');
var px2rem = require('gulp-pxrem');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var cssName = 'app.css';


//编译Sass，Autoprefix及缩小化
gulp.task('sass', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./.tmp/css'))
        .pipe(px2rem({remUnit:64}))
        .pipe(rename(cssName))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css/'))

    .pipe(reload({
            stream: true
        }))
        .pipe(notify({
            message: 'Styles  task complete'
        }));
});




/* 监听 文件变化  */
// 静态服务器 
gulp.task('dev', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    // 看守.scss 档
    gulp.watch('./src/scss/*.scss', ['sass']);

    // 看守所有.js档

    gulp.watch('./src/js/*.js', ['html', 'scripts']);

    // 看守所有.html

    gulp.watch('./*.html').on('change', reload);;

});

gulp.task('default', ['dev']);