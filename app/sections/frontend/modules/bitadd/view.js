module.exports = function(module, app) {

  var myComponent = {
    controller: function(args) {
      console.log(args);
      this.items = args.items;
    },
    view: function(ctrl, args) {
      if (args.template) {
        return args.template(args);
      }
      return m('#list', args.items.map(function(address) {
        return m('li', address);
      }))
    }
  }



  module.view = function(ctrl) {
    return [
      m("div.animated.slideInLeft#" + module.name + "-view",
        "This is the view for " + module.name),
      m.component({
        view: function() {
          return m('div', "Hey Now " + app.$meta.name + "! " +
            module
            .$.email)
        }
      }),
      m('#bitcoin-address', module.$.address()),
      m('button', {
        onclick: module.$.updateAddress
      }, "Update Address"),
      m.component(myComponent, {
        items: module.$.addresses(),
        template: app.$templates.accountList
      })
    ];
  };
}
