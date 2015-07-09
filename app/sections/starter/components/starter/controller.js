module.exports = function(Parse, app, component) {
  return function(args) {
    this.items = args.items;
    this.onunload = function() {
      //unloads style when componet is unloaded
      $pa.helpers.unloadStyle(component);
    }
  }

}
