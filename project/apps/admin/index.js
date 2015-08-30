var bulk = require('bulk-require');
module.exports = function(Parse, app) {

  var appInfo = require('./app.json');
  var parent = app;
  appInfo.name = __dirname.split('/').pop();
  if (app[appInfo.name]) //Check for naming conflicts
    throw "There is a conflict in app names. Please update the app.json."
  app = app[appInfo.name] = {};

  app.$routes = {};

  app.$routes['/accounts'] = require('./modules/accounts');
  app.$routes['/banks'] = require('./modules/banks');
  app.$routes['/transactions'] = require('./modules/transactions');

  app.$meta = appInfo;
  //load addons
  var addons = bulk(__dirname, [
    "modules/**/index.js",
    "templates/*.js",
    "layouts/**/index.js"
  ]);
  //Add vital pieces to make application run
  $pa.core.addOrgans(addons, app);
  if (appInfo.rootPath) {
    app.$meta.root = appInfo.rootPath;
    app.$routes[appInfo.rootPath] = app[appInfo.rootModule];
  }

}
