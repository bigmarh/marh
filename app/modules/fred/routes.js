module.exports = function(module) {
  app.routes[module.parentName + "." + module.name] = {
    module: module.name,
    place: '#content',
    url: "/" + module.name,
    onEnter: function(args) {}

  }
}
