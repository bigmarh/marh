module.exports = function(module, app) {
    var element = require('../../../../core/elements')();
    var button = element.button;

    module.view = require('./views/index')(module, null, false);

}