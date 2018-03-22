# gulp
gulp压缩插件

#命令步骤
npm install install

#执行命令
gulp

#配置gulpfile.js文件
gulp.src()表示要压缩的文件路径，可以使用通配符进行匹配
pipe(gulp.dest('dist/js'));表示输出路径
