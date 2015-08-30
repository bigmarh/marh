module.exports = function(Parse, app) {
    var hashids = require('hashids')('kfka dasfi qwefioinoinqfoin i9239');
    var component = {
        name: __dirname.split('/').pop(),
        enabled: true,
    }
    component.id = hashids.encode(new Date().getTime());
    component.style = require('./style.js');
    component.vm = require('./vm')(Parse, app, component);
    component.controller = require('./controller')(Parse, app, component);
    component.view = require('./view')(Parse, app, component);
    return component;
}