  module.exports = function(Parse, module) {
    var component = {
      name: __dirname.split('/').pop(),
      enabled: true,
    }
    
    component.style = require('./style');
    component.controller = require('./controller')(Parse, module);
    component.view = require('./view')(Parse, module);
    return component;

  }
