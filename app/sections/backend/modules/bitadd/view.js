module.exports = function(module, app) {
  module.view = function(ctrl) {
    var changed = false;
    return [
      m("div.animated.slideInLeft#" + module.name + "-view",
        "This is the view for " + module.name, m('h2#bitcoin-address',
          module.$.address())),
      m('div', "Hey Now " + app.$meta.name + "! " + module.$.email),
      m('button', {
        onclick: module.$.updateAddress
      }, "Update Address"),
      m('button', {
        onclick: module.$.toggleListView
      }, "Change Template"),
      m('.counter.pull-right',
        m('span', "previous address:"),
        m('br'),
        m('button', (module.$.addresses()[module.$.addresses().length - 2] ||
          'n/a')),
        m('br'),
        m('span', " created:" + module.$.addresses().length)
      ),
      m.component(module.$.list(), {
        items: module.$.addresses(),
        template: app.$tmp.accountList,
        class: ".address-list"
      })
    ];
  };
}
