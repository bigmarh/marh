module.exports = function(module, app) {
  module.view = function(ctrl) {
    return [
      m("div.animated.slideInLeft#" + module.name + "-view",
        "This is the view for " + module.name),
      m.component(module.$.listComp(), {
        items: module.$.reasons(),
        template: app.$tmp.list,
        class: ".address-list"
      })
    ];
  };
}
