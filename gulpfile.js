const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('server-compile', () => gulp.src('src/**/*.js') // Get source files with gulp.src
    .pipe(eslint())
    .pipe(babel()) // transpile with babel
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dest')) // write files to output
);

/**
 * Start express with nodemon and watch
 */
gulp.task('nodemon', () =>
    nodemon({
        script: 'dest/server.js', // run transpiled ES5 code
        env: {
            port: 3000
        },
        ext: 'js',
        execMap: {
            js: 'node'
        },
        watch: ['src/**/*.js'], // watch ES6 code
        tasks: ['server-compile']
    })
);
// Development task
// Just run gulp in order to run the project
gulp.task('default', gulp.series('server-compile', 'nodemon', done => done()));
