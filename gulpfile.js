var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css');

var paths = {
    styles: ['static/scss/*.scss'],
    scripts: ['static/qna/qna.module.js', 'static/qna/qna.component.js',
        'static/comments/comments.module.js', 'static/comments/comments.component.js',
        'static/js/*.js'
    ]
};

gulp.task('sass', function() {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('bundle.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('static/generated/css/'));
});

gulp.task('concat-scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('static/generated/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['sass', 'concat-scripts']);
