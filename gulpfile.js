var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');
var cssify = require('cssify');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var watch;

gulp.task('browserify-nowatch', function() {
  watch = false;
  browserifyShare();
});

gulp.task('browserify-watch', function() {
  watch = true;
  browserifyShare();
});

function browserifyShare() {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if (watch) {
    // if watch is enable, wrap this bundle inside watchify

    b = watchify(b);

    b.on('update', function() {
      bundleShare(b);
    });
  }

  b.add('./app/app.js');
  b.transform(cssify);
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulpif(watch, livereload()));
}



var scriptsPath = './app/modules/';

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('registerModules', function() {
  var folders = getFolders(scriptsPath);
  var registery = "module.exports = { loader:function(Parse,app){ \n";

  var tasks = folders.map(function(folder) {
    registery += "require('./modules/" + folder +
      "/index.js')(Parse,app); \n";

    var subFolders = getFolders(scriptsPath + folder + '/' +
      'modules/');
    var subRegistry = "module.exports = function(Parse,app) {";
    var subtasks = subFolders.map(function(folder) {
      subRegistry += "require('./modules/" + folder +
        "/index.js')(Parse,app); \n";
    });
    subRegistry += "}";
    fs.writeFileSync(scriptsPath + folder + '/registry.js',
      subRegistry);

  });
  registery += "}, buildRoutes: function(){ console.log('loaded')}}"
  fs.writeFileSync('./app/registry.js', registery);

});

// define the browserify-watch as dependencies for this task
gulp.task('watch', ['browserify-watch'], function() {
  // watch other files, for example .less file
  gulp.watch(scriptsPath, ['registerModules']);

  // Start live reload server
  livereload.listen(35729);
});
