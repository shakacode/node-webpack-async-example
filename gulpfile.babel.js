// gulp file
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import jscs from 'gulp-jscs';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import path from 'path';
import nodemon from 'nodemon';

gulp.task('run', ['watch-backend'], () => {
  nodemon({
    execMap: {
      js: 'node',
    },
    script: path.join(__dirname, '/dist/example1-bundle'),
    watch: false,
  }).on('restart', () => {
    console.log('Restarted App after new build');
  });
});

gulp.task('build-backend', (done) => {
  webpack(webpackConfig).run( (err, stats) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    done();
  });
});

gulp.task('watch-backend', (done) => {
  webpack(webpackConfig).watch(100, (err, stats) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    done();
    nodemon.restart();
  });
});

gulp.task('build', ['build-backend']);
gulp.task('watch', ['watch-backend']);

gulp.task('eslint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jscs', () => {
  return gulp.src('**/*.js')
    .pipe(jscs({fix: true, configPath: './.jscsrc'}))
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest('src'));
});

gulp.task('lint', ['eslint', 'jscs']);
