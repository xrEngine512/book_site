var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss');

// test task
gulp.task('scripts', function() {
    return gulp.src(['static/qna/qna.module.js', 'static/qna/qna.component.js',
                     'static/comments/comments.module.js', 'static/comments/comments.component.js',
                     'static/js/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('static/public/js'));
});
