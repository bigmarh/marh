module.exports = function(Parse, app) {
  var appInfo = require('./app.json');
  var parent = app;
  app = app[appInfo.name] = {};
  app.$routes = {};
  app.$meta = appInfo;

  //load all app modules
  require('./registry.js')(Parse, app);

  if (appInfo.rootPath) {
    app.$meta.root = appInfo.rootPath;
    app.$routes[appInfo.rootPath] = app[appInfo.rootModule];
  }

}
