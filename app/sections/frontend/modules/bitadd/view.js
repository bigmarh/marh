module.exports = function(module, app) {
  console.log(app)


  module.view = function(ctrl) {
    return [
      m("div.animated.slideInLeft#" + module.name + "-view",
        "This is the view for " + module.name),
      m('div', "Hey Now " + app.$meta.name + "! " + module.$.email),
      m('#bitcoin-address', module.$.address()),
      m('button', {
        onclick: module.$.updateAddress
      }, "Update Address"),
      m('.counter.pull-right',
        m('span', "previous address:"),
        m('br'),
        m('button', (module.$.addresses()[module.$.addresses().length - 2] ||
          'n/a')),
        m('br'),
        m('span', " created:" + module.$.addresses().length)
      ),
      m.component(app.$cmp.accountList, {
        items: module.$.addresses(),
        template: app.$tmp.accountList,
        attributes: {
          style: "max-height:100px; overflow:auto"
        },
        class: ".address-list"
      })
    ];
  };
}
