module.exports = function(app, module) {
    var namespace = module.name;
    var path = "/" + namespace;

    app.$routes[path] = module;
    app.$routes[path + '/view'] = require('./views/view')(module, null, true);

}