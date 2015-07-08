module.exports = function(Parse, app) {

  var SPAMS = {
    registerApp: function(app) {
      return SPAMS.app = app;
    },
    app: {},
    loadBlocks: function(blocks) {

      //load sections
      Object.keys(blocks.sections).map(function(key) {
        blocks.sections[key](Parse, app);
      });
      Object.keys(blocks.layouts).map(function(key) {
        blocks.layouts[key](Parse, app);
      });
    },
    bootstrap: function(appName, element) {
      var app = SPAMS.app[appName];
      //load layout if specified
      if (app.$meta.layout) ee.emit('load' + app.$meta.layout);
      var element = (element) ? element : document.getElementById(
        'content');
      var root = (app.$meta.root) ? app.$meta.root : '/';
      root = (app.$routes[root]) ? root : Object.keys(app.$routes)[
        0];
      //load app
      m.route(element, root, app.$routes);
    },
    helpers: {
      hDoc: function(f) {
        return f.toString().
        replace(/^[^\/]+\/\*!?/, '').
        replace(/\*\/[^\/]+$/, '');
      },
      styleLoad: function(style, id) {

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
      }
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

  SPAMS.registerApp(app);

  window.currentUser = SPAMS.currentUserSetup;
  window.bip39 = require('bip39');
  return SPAMS;
}
