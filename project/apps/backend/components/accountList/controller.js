module.exports = function(Parse, app, component) {
  return function(args) {
    this.items = args.items;
    this.fishing = "Now Snapper";
    this.onunload = function() {
      if (document.getElementById(component.id))
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(
          component.id));
    }
  }

}
