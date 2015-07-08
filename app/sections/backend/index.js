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

    //load addons
    var addons = bulk(__dirname, [
      'modules/**/index.js',
      'templates/*.js',
      'components/**/*.js'
    ]);
    if (!addons.components)
      console.error("The " + appInfo.name +
        " section needs a components folder");
    //load components
    if (addons.components)
      Object.keys(addons.components).map(function(key) {
        return addons.components[key] = addons.components[key](Parse, app);
      });
    //set plugins
    app.$tmp = app.$templates = addons.templates;
    app.$cmp = app.$components = addons.components;

    if (!addons.modules)
      throw "The " + appInfo.name + " section is missing the module folder";
    //load modules
    Object.keys(addons.modules).map(function(key) {
      addons.modules[key](Parse, app);
    });



    if (appInfo.rootPath) {
      app.$meta.root = appInfo.rootPath;
      app.$routes[appInfo.rootPath] = app[appInfo.rootModule];
    }

  }
