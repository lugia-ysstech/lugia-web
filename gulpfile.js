const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', ['js', 'css', 'font']);
gulp.task('js', () => {
  return gulp
    .src(['src/widgets/**/*.js'])
    .pipe(
      babel({
        presets: ['react-app'],
        plugins: ['transform-es2015-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('dist'));
});
gulp.task('css', () => {
  return gulp.src('src/widgets/**/*.css').pipe(gulp.dest('dist'));
});
gulp.task('font', () => {
  return gulp
    .src([
      'src/widgets/**/*.ttf',
      'src/widgets/**/*.eot',
      'src/widgets/**/*.svg',
      'src/widgets/**/*.woff',
    ])
    .pipe(gulp.dest('dist'));
});
