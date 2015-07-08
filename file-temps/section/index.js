module.exports = function(Parse, app) {
  var appInfo = require('./app.json');
  var parent = app;
  appInfo.name = __dirname.split('/').pop();
  if (app[appInfo.name]) //Check for naming conflicts
    throw "There is a conflict in appnames with the name " + appInfo.name +
    ". Please update the app.json."
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
