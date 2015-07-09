module.exports = function(Parse, app) {

  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },

    app: {},
    bootstrap: function(appName, element) {
      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('load.' + app.$meta.layout);
      var element = (element) ? element : document.getElementById(
        'content');
      var root = (app.$meta.root) ? app.$meta.root : '/';
      root = (app.$routes[root]) ? root : Object.keys(app.$routes)[
        0];
      //load app
      m.route(element, root, app.$routes);
    },
    core: require('./core')(Parse, app),
    helpers: require('./helpers')(Parse, app),
  }

  SPAMS.registerApp(app);
  window.currentUser = SPAMS.helpers.currentUserSetup;
  //Register with SPAMS;
  window.$pa = {};
  window.$pa.bootstrap = SPAMS.bootstrap;
  window.$pa.helpers = SPAMS.helpers;
  window.$pa.core = SPAMS.core;
  window.$location = SPAMS.helpers.location;
  return SPAMS;
}
