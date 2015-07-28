module.exports = function(module, app) {
    var element = require('../../../../core/elements')();
    var button = element.button;
    module.view = function(ctrl) {
        return[
            button('List', function() {
                ctrl.goToView('list');
            }),
            button('New CD', function() {
                ctrl.goToView('add_new');
            }),
            m('h4.sub-header', 'CD Listings'),
            m.component(module.$.currentView())
        ];    
        
    };
}
