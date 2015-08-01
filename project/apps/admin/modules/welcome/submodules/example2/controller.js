module.exports = function(module) {
  return function(args) {
    //load style
    $pa.helpers.loadStyle(module);

    this.onunload = function() {
      //unloads style when componet is unloaded
      $pa.helpers.unloadStyle(module);
    }
  }

}
