module.exports = function(Parse, app, component) {
  var style = require('./style.js');
  return function(ctrl, args) {
    $pa.helpers.loadStyle(style, component.id);
    if (args.template) {
      return args.template(ctrl, args);
    }
    return m('#list', ctrl.items.map(function(address) {
      return m('li', address);
    }))
  }
}
