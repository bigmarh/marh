module.exports = function(Parse, app) {

  return function(ctrl, args) {
    if (args.template) {
      return args.template(args);
    }
    return m('#list', args.items.map(function(address) {
      return m('li', address);
    }))
  }
}
