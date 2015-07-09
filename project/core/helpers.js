module.exports = function(Parse, app) {
  return {
    hDoc: function(f) {
      return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
    },
    loadStyle: function(style, id) {
      var style = $pa.helpers.hDoc(style);
      //if same element don't reload or if no style
      if (document.getElementById(id) || style.search("function") > -1)
        return;
      //build styleElement
      var styleEl = document.createElement('style');
      styleEl.id = id;
      var text = document.createTextNode(style);
      styleEl.appendChild(text);
      document.getElementsByTagName("head")[0].insertBefore(styleEl,
        document.getElementsByTagName("head")[0].firstChild);
    },
    unloadStyle: function(component) {
      if (document.getElementById(component.id))
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(
          component.id));
    },
    fileName: function(filename) {
      return filename.split('/').pop().split('.')[0];
    },
    dirName: function(dirName) {
      return dirName.split('/').pop();
    },
    loadApps: function(blocks) {
      //load apps
      if (!blocks.apps) m.mount(document.body,
        "No apps. No Happs! Add And application to you app folder");
      Object.keys(blocks.apps).map(function(key) {
        blocks.apps[key](Parse, app);
      });
    },
    location: function(path) {
      window.location = path;
    },
    currentUserSetup: function() {
      if (!Parse.User.current()) return null;
      if (arguments.length == 1 && arguments[0] == 'save')
        return Parse.User.current().save().then(function(u) {
          console.log(u)
        }, function(err) {
          console.error(err)
        });
      if (arguments.length == 2) return Parse.User.current().set(
        arguments[
          0],
        arguments[1]);
      if (arguments.length == 1) return Parse.User.current().get(
        arguments[
          0]);
      return Parse.User.current();
    }
  }
}
