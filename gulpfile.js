const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('default', function () {
    // eslint를 실행합니다.
    gulp.src(['chapter2/es6/**/*.js', 'chapter2/public/es6/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
    // 노드소스
    gulp.src('chapter2/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('chapter2/dist'));
    // 브라우저 소스
    gulp.src('chapter2/public/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('chapter2/public/dist'));
});