var gulp = require('gulp'),
    ts = require('gulp-tsc'),
    sourcemaps = require('gulp-sourcemaps'),
    qunit = require('gulp-qunit');

module.exports = function (meta) {
    gulp.task('test-build', function () {
        return gulp.src([
            'typings/*.d.ts',
            'test/**/*.ts',
            '!test/lib/**/*.ts',
            'dist/' + meta.name + '.d.ts'
        ])
            .pipe(sourcemaps.init())
            .pipe(ts({
                target: 'ES5',
                declaration: true
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('test/.build'));
    });

    gulp.task('test-run', function () {
        return gulp.src('test/tests.html')
            .pipe(qunit());
    });

    gulp.task('test', ['test-build', 'test-run'], function () {
        gulp.watch(['test/**/*.ts', '!test/lib/**/*.ts'], ['test-build']);
        gulp.watch(['dist/*', 'test/.build/**/*.js'], ['test-run']);
    });
};