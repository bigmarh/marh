module.exports = function(app, module) {
  var namespace = module.name;
  var path = "/" + namespace;
  app.$routes[path] = module;
  console.log(app);
  app.$routes['/todo'] = app.$cmp.list;
}
