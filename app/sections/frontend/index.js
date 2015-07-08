  var bulk = require('bulk-require');
  module.exports = function(Parse, app) {
    var appInfo = require('./app.json');
    var parent = app;
    appInfo.name = __dirname.split('/').pop();
    if (app[appInfo.name]) //Check for naming conflicts
      throw "There is a conflict in app names. Please update the app.json."
    app = app[appInfo.name] = {};
    app.$routes = {};
    app.$meta = appInfo;

    //load all app addons
    require('./registry.js')(Parse, app);
    var b = bulk(__dirname, ['templates/*.js']);
    app.$templates = b.templates;
    console.log(app);
    if (appInfo.rootPath) {
      app.$meta.root = appInfo.rootPath;
      app.$routes[appInfo.rootPath] = app[appInfo.rootModule];
    }

  }
