module.exports = function(Parse, app, component) {
  return function(args) {
    //load style
    $pa.helpers.loadStyle(component);
    if (args) {
      var self = this;
      Object.keys(args).map(function(key) {
        return self[key] = args[key];
      })
    } else {
      this.items = [1, 2, 3, 4, 5, 6];
    }

    this.onunload = function() {
      //unloads style when componet is unloaded
      $pa.helpers.unloadStyle(component);
    }
  }

}
