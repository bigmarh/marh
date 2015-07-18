module.exports = function(Parse, app) {

  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },
    bootstrapCalled: false,
    app: {},
    bootstrap: function(appName, element) {
      if (SPAMS.bootstrapCalled) return console.error(
        "Bootrap called more than once.  Please find the problem this could damage your app"
      )
      SPAMS.bootstrapCalled = true;
      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('load.' + app.$meta.name + '.' + app.$meta
        .layout);
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
  //Load Elements
  require('./elements')();
  window.currentUser = SPAMS.helpers.currentUserSetup;
  //Register with SPAMS;
  window.$pa = {};
  window.$pa.bootstrap = SPAMS.bootstrap;
  window.$pa.helpers = SPAMS.helpers;
  window.$pa.core = SPAMS.core;
  window.$location = SPAMS.helpers.location;
  //creates global components
  $pa.c = SPAMS.core.component;

  document.addEventListener("DOMContentLoaded", function(event) {
    var app = document.documentElement.getAttribute('marh-app');
    if (app) SPAMS.bootstrap(app);
  });
  return SPAMS;
}
