  module.exports = function(module) {
    var hashids = require('hashids')('kfka dasfi qwefioinoinqfoin i9239');
    var submodule = {
      name: __dirname.split('/').pop(),
      enabled: true,
      db: module && module.db,
      parent: module
    }
    submodule.id = hashids.encode(new Date().getTime());
    submodule.style = require('./style');
    submodule.controller = require('./controller')(submodule);
    submodule.view = require('./view')(submodule);
    return submodule;

  }
