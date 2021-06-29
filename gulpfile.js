const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

// Static server
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    //берет sass и css стили
    return gulp.src("src/sass/*.+(scss|sass)")
        //команда для компиляции sass, стиль сжатый, вывод ошибки
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //файл компилируется в style.min.css
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        //закидывание скомпилированных файлов в папку
        .pipe(gulp.dest("src/css"))
        //перезагрузка страницы
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    //gulp будет следить за файлами, если изменится файл то запустится styles
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change",browserSync.reload)
})
//задача по умолчанию
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));