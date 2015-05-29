/*global -$ */
'use strict';

// 0. DEPENDENCIES
// =====================================================
var addsrc = require('gulp-add-src'); // add src mid stream
var browserSync = require('browser-sync').create(); // launch dev server
var concat = require('gulp-concat'); // concat files
var del = require('del'); // delete files
var gulp = require('gulp'); // gulp task runner
var gulpif = require('gulp-if'); // conditional tasks
var minifyCss = require('gulp-minify-css'); // minify css
var minifyHTML = require('gulp-minify-html'); // minify html
var plumber = require('gulp-plumber'); // preven pip break on error
var rename = require('gulp-rename'); // rename files
var runSequence = require('run-sequence'); // run tasks synchronously
var sass = require('gulp-sass'); // compile sass
var template = require('gulp-template-compile'); // convert jst files into lodash template objects
var uglify = require('gulp-uglify'); // a js minifier
var watch = require('gulp-watch'); // watch files
var wrap = require("gulp-wrap"); // wrap files with content
var yaml = require("gulp-yaml"); // convert yaml to json reliably


// =====================================================
// 1. BUNDLING
// =====================================================

// bundle app styles
gulp.task('bundle-app-styles', function() {

    return gulp.src('./app/styles/app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./app/styles/bundles'));

});

// bundle vendor styles
gulp.task('bundle-vendor-styles', function() {

    return gulp.src(['./bower_components/normalize.css/normalize.css'])
        .pipe(sass())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./app/styles/bundles'));

});

// bundle app scripts
gulp.task('bundle-app-scripts', function() {

    // fyi: order is important
    return gulp.src([
            './app/scripts/config/namespacing.js',
            './app/scripts/config/*.js',
            './app/scripts/models/*.js',
            './app/scripts/collections/*.js',
            './app/scripts/views/*.js',
            './app/scripts/controllers/*.js',
            './app/scripts/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./app/scripts/bundles'));

});

// bundle templates
gulp.task('bundle-templates', function() {

    return gulp.src([
            './app/scripts/templates/*.jst'
        ])
        .pipe(plumber())
        .pipe(template())
        .pipe(concat('template.js'))
        .pipe(gulp.dest('./app/scripts/bundles'));

});

// bundle pages
gulp.task('bundle-pages', function() {

    return gulp.src('./app/scripts/pages/*.yml')
        .pipe(yaml({
            space: 4
        }))
        .pipe(wrap({
            src: './app/scripts/templates/page.tmpl'
        }))
        .pipe(concat('page.js'))
        .pipe(gulp.dest('./app/scripts/bundles'));

});

// bundle vendor scripts
gulp.task('bundle-vendor-scripts', function() {

    return gulp.src([
            './bower_components/augment.js/augment.js',
            './bower_components/jquery/dist/jquery.js',
            './bower_components/modernizr/modernizr.js',
            './bower_components/underscore/underscore.js',
            './bower_components/backbone/backbone.js',
            './bower_components/backbone.controller/backbone.controller.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./app/scripts/bundles'));

});

// bundle test scripts
gulp.task('bundle-test-scripts', function() {

    return gulp.src(['./test/spec/**/*.js'])
        .pipe(concat('tests.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./test/scripts'));

});

// bundle all bundles
gulp.task('bundle', function(callback) {
    runSequence(
        'clean',
        'bundle-pages',
        'bundle-app-styles',
        'bundle-vendor-styles',
        'bundle-app-scripts',
        'bundle-templates',
        'bundle-vendor-scripts',
        callback);
});


// =====================================================
// 2. DEVELOPMENT
// =====================================================

gulp.task('develop', ['bundle'], function() {

    // watch scripts
    gulp.watch([
        './app/scripts/**/*.js',
        '!./app/scripts/bundles/*.js'
    ], ['bundle-app-scripts']);

    // watch templates
    gulp.watch([
        './app/scripts/templates/*.{jst,tmpl}',
    ], ['bundle-templates']);

    // watch styles
    gulp.watch([
        './app/styles/**/*.scss',
        './app/styles/*-bundle.css'
    ], ['bundle-app-styles']);

    // if the bundles change, reload the page
    gulp.watch([
        'app/scripts/bundles/*.js',
        'app/styles/app/bundles/*.css'
    ]).on('change', browserSync.reload);

    // open a browser
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

});


// =====================================================
// 3. TESTING
// =====================================================

gulp.task('test', ['bundle-test-scripts'],
    function() {

        // copy bundles
        gulp.src(['./app/scripts/bundles/*.js'])
            .pipe(gulp.dest('./test/scripts'));

        // watch for spec changes
        gulp.watch('./test/spec/**/*.js', ['bundle-test-scripts'])
            .on('change', browserSync.reload);

        // open a browser
        browserSync.init({
            server: {
                baseDir: "./test"
            },
            port: 3002
        });

    });

// =====================================================
// 4. DEPLOYING
// =====================================================

gulp.task('deploy', ['bundle'], function() {

    // copy html
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));

    // copy scripts
    gulp.src([
        './app/scripts/bundles/*.js',
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/bundles'));

    // copy styles
    gulp.src([
        './app/styles/bundles/*.css',
    ])
        .pipe(minifyCss({
            compatibility: 'ie8',
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./dist/styles/bundles'));

    // copy fonts
    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    // copy images
    gulp.src('./app/images/**/*')
        .pipe(gulp.dest('./dist/images'));

    // copy misc
    gulp.src([
        './app/robots.txt',
        './app/favicon.ico'
    ])
        .pipe(gulp.dest('./dist'));

});

gulp.task('deploy:serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


// =====================================================
// 5. UTILITIES
// =====================================================
gulp.task('clean', function(cb) {
    return del([
        './dist',
        './app/styles/bundles/*.css',
        './app/scripts/bundles/*.js',
        './test/scripts/*.js',
    ], cb);
});


// =====================================================
// DEFAULT
// =====================================================
gulp.task('default', ['develop']);

// AUTHOR: Kevin Lint
// Copyright Toolhouse, 2015
// All rights reserved

// TOC
// =====================================================
// 0. DEPENDENCIES
// 1. BUNDLING
// 2. DEVELOPMENT
// 3. TESTING
// 4. DEPLOYING
// 5. UTILITIES
