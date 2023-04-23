const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps');

const defaultTask = cb => {
    gulp
        .src('./index.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env'],
            sourceMap: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));

        cb()
}

module.exports = {
    default: defaultTask
}
