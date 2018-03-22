//引入依赖
var gulp = require("gulp");
//引入插件
var cssmin = require('gulp-cssmin'); //压缩CSS
var htmlmin = require('gulp-htmlmin'); //压缩html
var uglify = require('gulp-uglify'); //压缩js
var imagemin = require('gulp-imagemin');;//压缩images
//配置任务
gulp.task('cssmin', function() {
    gulp.src('smt/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        console.log('cssminOK')
});
gulp.task('htmlmin', function() {
    // var options = {
    //     removeComments: true, //清除HTML注释
    //     collapseWhitespace: true, //压缩HTML
    //     minfyJS: true, //压缩JS
    //     minfyCss: true, //压缩CSS
    // };
    gulp.src('smt/*.html') //压缩html
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/'));
         console.log('htmlOk');
});
gulp.task('jsmin', function () {
    gulp.src('smt/js/*.js') //多个文件以数组形式传入
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
        console.log('jsminOK')
});
gulp.task('imagesmin', function () {
    gulp.src('smt/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
        console.log('imagesminOk');
});

//注册默认任务
gulp.task('default', ['cssmin', 'htmlmin','jsmin','imagesmin']);