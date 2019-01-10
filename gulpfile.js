const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', ['js', 'css', 'font', 'interface', 'meta']);
gulp.task('js', () => {
  return gulp
  .src(['src/widgets/**/*.js'])
  .pipe(
    babel({
      presets: ['react-app'],
      plugins: ['transform-es2015-modules-commonjs'],
    }),
  )
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});
gulp.task('css', () => {
  return gulp.src('src/widgets/**/*.css').pipe(gulp.dest('dist'));
});
gulp.task('meta', () => {
  return gulp.src('src/widgets/**/*.json').pipe(gulp.dest('dist'));
});
gulp.task('font', () => {
  return gulp
  .src([
    'src/widgets/**/*.ttf',
    'src/widgets/**/*.eot',
    'src/widgets/**/*.svg',
    'src/widgets/**/*.woff',
    'src/widgets/**/*.woff2',
  ])
  .pipe(gulp.dest('dist'));
});
gulp.task('interface', () => {
  return gulp.src(['src/interface/*.js', 'src/interface/*.json']).pipe(gulp.dest('interface'));
});
