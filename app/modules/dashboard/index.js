module.exports = function(Parse, app) {
  var appInfo = require('./app.json');
  app = app[appInfo.name] = {};
  app.$routes = {};
  app.$meta = appInfo;

  //load all app modules
  require('./registry.js')(Parse, app)
}
