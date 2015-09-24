module.exports = function(Parse, app) {
    var hashids = require('hashids')('kfka dasfi qwefioinoinqfoin i9239');
    var module = {
        name: __dirname.split('/').pop(),
        enabled: true,
    }

    module.id = hashids.encode(new Date().getTime());
    module.style = require('./style');
    module.vm = require('./vm')(Parse, app, module);
    module.controller = require('./controller')(Parse, app, module);
    module.view = require('./view')(Parse, app, module);

    require('./events')(module);

    return module;
}