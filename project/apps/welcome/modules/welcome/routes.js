module.exports = function(app, module) {
  var namespace = module.name;
  var path = "/" + namespace;

  app.$routes[path] = module;
  app.$routes[path + '/example'] = module.submodules.example(module);
  app.$routes[path + '/example2'] = module.submodules.example2(module);


}
