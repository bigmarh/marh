var bulk = require('bulk-require');
module.exports = function(Parse, project) {


    var appInfo = require('./app.json');
    var parent = project;
    appInfo.name = __dirname.split('/').pop();
    if (project[appInfo.name]) //Check for naming conflicts
        throw "There is a conflict in app names. Please update the app.json."
    
    
    var app = project[appInfo.name] = {};
    app.parent = parent;
    app.$routes = {};
    app.$meta = appInfo;
    //load addons
    var addons = bulk(__dirname, [
        "modules/**/index.js",
        "templates/**/*.js",
        "layouts/**/index.js"
    ]);
    //Add vital pieces to make application run
    $pa.core.addOrgans(addons, app);
    if (appInfo.rootPath) {
        app.$meta.root = appInfo.rootPath;
        app.$routes[appInfo.rootPath] = app[appInfo.rootModule];
    }
}
