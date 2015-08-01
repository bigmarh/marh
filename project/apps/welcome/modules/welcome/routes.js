module.exports = function(app, module) {
  var namespace = module.name;
  var path = "/" + namespace;
  app.$routes[path] = module;
  app.$routes['/example'] = module.submodules.example();

}
