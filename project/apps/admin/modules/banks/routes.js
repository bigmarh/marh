module.exports = function(app, module) {
  var namespace = module.name;
  var path = "/" + namespace;

  app.$routes[path] = module;
  app.$routes[path + '/view/:id'] = require('./views/view')(module, null,
    true, require('./controllers/viewBank')(module));
  app.$routes[path + '/add'] = require('./views/add')(module, null, true);
}
