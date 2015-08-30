  module.exports = function(module) {
    var component = {
      name: __dirname.split('/').pop(),
      enabled: true
    }

    component.style = require('./style');
    component.controller = require('./controller')(module);
    component.view = require('./view')(module);

    module.component = component;

    return component;

  }
