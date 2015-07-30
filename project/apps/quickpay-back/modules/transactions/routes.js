module.exports = function(app, module) {
    var namespace = module.name;
    var path = "/" + namespace;

    app.$routes[path] = module;
    app.$routes[path + '/view/:id'] = require('./views/view')(module, null, true, require('./controllers/view-transaction')(module));

}