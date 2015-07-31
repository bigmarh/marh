module.exports = function(module, app) {
    module.view = function(ctrl) {
        return [m("div.animated.slideInLeft#" + module.name + "-view",
            "This is the view for " + module.name), m.component({
            view: function() {
                return m('div', "Welcome to Marh! " + module.$.email)
            }
        })];
    };
}