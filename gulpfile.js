import gulp from 'gulp';
import postcss from 'gulp-postcss';

gulp.task('css', function () {
    const processors = [];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});