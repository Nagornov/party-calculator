"use strict";

const config = require("./gulp/config");

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('prod', function () {
    return browserify({entries: config.js.appSrc, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(config.js.prodFileName))
        .pipe(gulp.dest(config.general.prodFolder));
});

gulp.task('build', function () {
    return browserify({entries: config.js.appSrc, extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(config.js.devFileName))
        .pipe(gulp.dest(config.js.devFolder));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch']);