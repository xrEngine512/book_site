var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss');

// неправильно работает в модальных окнах
/*
gulp.task('css', function() {
    return gulp.src('static/libs/bootstrap.min.css')
        .pipe(uncss({
            html: ['index.html', 'static/comments/*.html', 'static/qna/*.html',
                   'static/pages/home.html', 'static/pages/store.html', 'static/pages/contact.html', 'static/pages/about-us.html',
                   'static/pages/product-details.html', 'static/pages/blog.html', 'static/pages/blog-details.html']
        }))
        .pipe(gulp.dest('static/public/css/'));
});*/

gulp.task('scripts', function() {
    return gulp.src(['static/qna/qna.module.js', 'static/qna/qna.component.js',
            'static/comments/comments.module.js', 'static/comments/comments.component.js',
            'static/js/*.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('static/public/js'));
});

gulp.task('build', ['scripts']);
