var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');
var cssify = require('cssify');
var bulkify = require('bulkify');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var watch;


gulp.task('browserify-watch', function() {
    watch = true;
    return browserifyShare();
});

function browserifyShare() {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    b.add('./project/app.js');
    b.transform(cssify);
    b.transform(bulkify)
    return bundleShare(b);
}

function bundleShare(b) {

    b.bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(gulpif(watch, livereload()));
}

function swallowError(error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task("watch", function() {
    gulp.watch("project/**/*.js", ["browserify-watch"]);
    browserifyShare();
    // Start live reload server
    livereload.listen(35729);
});
