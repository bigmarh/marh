module.exports = function(Parse, app, component) {
  var style = require('./style.js');
  $pa.helpers.styleLoad(style, component.id);

  return function(ctrl, args) {
    if (args.template) return args.template(ctrl, args);
    return m('#list', ctrl.items.map(function(address) {
      return m('li', address);
    }))
  }
}
