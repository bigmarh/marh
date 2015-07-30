module.exports = function(module, app) {
    var element = require('../../../../core/elements')();
    var button = element.button;

    module.view = function(controller) {
        return m('section#banks', [m(".container", [
            m("h4.page-header", "Banks"),
            "\n"
        ])]);
    };

}
