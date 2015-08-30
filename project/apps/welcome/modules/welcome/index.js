module.exports = function(Parse, project) {
  
     var moduleObj = {
        name:__dirname.split('/').pop(),
        id:__dirname.split('/').pop() + '-app',
        db:Parse,
        app:project,
        directory:__dirname.split('/').splice(2).join("/"),
        vm:require('./vm'),
        controller:require('./controller'),
        view:require('./view'),
        routes: require('./routes'),
    }
      // Load addons
    var addons = require('bulk-require')(__dirname, [
        "./submodules/**/index.js",
        "./model/**.js"
    ]);
               
    moduleObj.addons  = addons;
    return $pa.core.moduleIndex(moduleObj);
}
