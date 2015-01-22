var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssMin = require('gulp-css');
var templateCache = require('gulp-angular-templatecache')
var del = require('del');

var DEST = 'dist/';
var APP_PATH = 'src/app';

var css = [
    'src/app/**/*.css'
];
var jsVendor = [];


/**
 * 读取项目下所有的文件夹
 **/
function getAllFolders(dir) {
    var result = [];

    recursive(dir, result);

    return result;
}
/**
 * 递归
 */
function recursive(dir, result) {

    var folders = fs.readdirSync(dir)
        .filter(function (file) {
            var filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                result.push(filePath);
                return true;
            }
            return false;
        });

    folders.forEach(function (item) {
        recursive(path.join(dir, item), result);
    });
}

/**
 * 清空
 */
gulp.task('clean', function (cb) {
    del([DEST], cb);
});

/**
 * 范例应用
 */
gulp.task('example', function () {
    gulp
        .src('src/example.html')
        .pipe(gulp.dest(DEST));
});


/**
 * 打包任务
 */
gulp.task('pack', ['pack.js', 'pack.css']);

/**
 * 全部js打成一个包
 */
gulp.task('pack.js', function () {
    var src = _.union(jsVendor, ['./src/**/*.module.js', './src/**/*.js']);
    return gulp
        .src(src)
        .pipe(concat('_bundle.js'))
        .pipe(gulp.dest(DEST));
});
/**
 * 全部css打成一个包
 */
gulp.task('pack.css', function () {
    return gulp
        .src(css)
        .pipe(concat('angular-messagebox.css'))
        .pipe(gulp.dest(DEST))
        .pipe(rename('angular-messagebox.min.css'))
        .pipe(cssMin())
        .pipe(gulp.dest(DEST));
});

/**
 * 嵌入式模板
 */
gulp.task('templateCache', function () {
    var folders = getAllFolders(APP_PATH).map(function (folder) {
        return path.join(folder, '/*.tpl.html');
    });

    return gulp
        .src(folders)
        .pipe(templateCache({
            filename: '_template.js',
            module: 'angular-messagebox'
        }))
        .pipe(gulp.dest(DEST));

});
gulp.task('build', ['example', 'pack', 'templateCache'], function () {
    return gulp
        .src(['dist/*.js'])
        .pipe(concat('angular-messagebox.js'))
        .pipe(gulp.dest(DEST))
        .pipe(rename('angular-messagebox.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST));
});


gulp.task('default', ['build'], function () {
    del([DEST + '/_*']);//结束后删除所有的临时文件
});