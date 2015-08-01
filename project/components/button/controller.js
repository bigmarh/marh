module.exports = function(Parse, app, component) {
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

    controller.onunload = function() {
      //unloads style when componet is unloaded
      $pa.helpers.unloadStyle(component);
    }

    return controller;
  }

}
