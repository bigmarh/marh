module.exports = function(Parse, app, component) {
  return function(ctrl, args) {
    if (args.template) return args.template(ctrl, args);
    return m('#list', ctrl.items.map(function(address) {
      return m('li', address);
    }))
  }
}
