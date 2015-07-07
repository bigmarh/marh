module.exports = function(app) {
  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },
    app: {},
    layouts: {},
    bootstrap: function(appName, options) {

      var options = options || {};
      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('load' + app.$meta.layout);
      var element = (options.element) ? options.element : document.getElementById(
        'content');
      var root = (app.$meta.root) ? app.$meta.root : '/';
      root = (app.$routes[root]) ? root : Object.keys(app.$routes)[
        0];

      //load app
      m.route(element, root, app.$routes);
    },
    registerRoute: function(route, app) {

    }
  }
  SPAMS.registerApp(app);
  return SPAMS;
}
