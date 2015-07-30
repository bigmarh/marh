module.exports = function(app, module) {
    var namespace = module.name;
    var path = "/" + namespace;
    
    app.$routes[path] = module;
    // app.$routes[path + '/signup'] = module.$.views['signup'];
    // app.$routes[path + '/transactions/:id'] = module.$.views['transactions'];
}
