module.exports = function(Parse, app, component) {
  var toolbar = require('./tmpl/toolbar');
  var footer = require('./tmpl/footer');
  return function(args) {
    var controller = {};
    //load style
    $pa.helpers.loadStyle(component);
    if (args) {
      var self = this;
      Object.keys(args).map(function(key) {
        return controller[key] = args[key];
      })
    }
    controller.sections = [];
    if (args.toolbar) {
      controller.sections.push(toolbar(controller, args));
    }
    controller.sections.push(m('section.dialog-content', args.content));
    if (args.footer) {
      controller.sections.push(footer(controller, args));
    }

    controller.onunload = function() {
      //unloads style when componet is unloaded
      $pa.helpers.unloadStyle(component);
    }

    return controller;
  }

}
