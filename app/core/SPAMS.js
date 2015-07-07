module.exports = function(app) {
  console.log(__dirname);

  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },
    layoutPath: './layouts/',
    app: {},
    layouts: {},
    bootstrap: function(appName, options) {

      var options = options || {};
      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('loadmain');


      var element = (options.element) ? options.element : document.getElementById(
        'content');
      var root = (options.root) ? options.root : '/';
      console.log(element, root, app.$routes);
      root = (root.indexOf(app.$routes) != -1) ? root : Object.keys(app.$routes)[
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
