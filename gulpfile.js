var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var scriptsPath = './app/modules/';

function getFolders(dir){
    return fs.readdirSync(dir)
      .filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('registerModules', function() {
   var folders = getFolders(scriptsPath);
   var registery = "module.exports = function(m,Parse,app){ \n";

   var tasks = folders.map(function(folder) {
      registery += "require('./modules/"+folder+"/index.js')(m,Parse,app); \n";
   });
	registery += "}"
   fs.writeFileSync('./app/registry.js', registery);
  
});