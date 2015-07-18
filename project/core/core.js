module.exports = function(Parse, app) {
  var core = {
    addOrgans: function(addons, app) {
      // load layouts
      if (addons.components)
        Object.keys(addons.components).map(function(key) {
          addons.components[key](app, Parse);
        });
      // load layouts
      if (addons.layouts)
        Object.keys(addons.layouts).map(function(key) {
          addons.layouts[key](app, Parse);
        });
      //set plugins
      app.$tmp = app.$templates = addons.templates;
      app.$cmp = app.$components = addons.components;
      console.log("Added " + app.$meta.name + " goods");
      if (!addons.modules)
        throw "The " + app.$meta.name +
        " section is missing the module folder";
      //load modules
      Object.keys(addons.modules).map(function(key) {
        addons.modules[key](Parse, app);
      });
    },
    component: function(name, attr, text, extras) {
      if (attr) attr.text = text;
      return m.component($cmp[name](), attr, extras);
    },
  }
  return core;
}
