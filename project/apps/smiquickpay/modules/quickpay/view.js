module.exports = function(module, app) {
    var element = require('../../../../core/elements')();
    var button = element.button;
    module.view = function(ctrl) {
        return[
            m.component(module.$.currentView())
        ];    
        
    };
}
