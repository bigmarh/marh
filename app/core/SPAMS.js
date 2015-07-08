module.exports = function(app) {
  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },
    app: {},
    addTemplate: function(template) {

    },
    template: function(namespace, templateName) {},
    bootstrap: function(appName, element) {

      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('load' + app.$meta.layout);
      var element = (element) ? element : document.getElementById(
        'content');
      var root = (app.$meta.root) ? app.$meta.root : '/';
      root = (app.$routes[root]) ? root : Object.keys(app.$routes)[
        0];
      //load app
      m.route(element, root, app.$routes);
    }
  }
  console.log(app)
  SPAMS.registerApp(app);
  ee.on('addTemplate', SPAMS.addTemplate)
  return SPAMS;
}
