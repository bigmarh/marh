module.exports = function(Parse, app) {
  var core = {
    addOrgans: function(addons, app) {
      if (!addons.components)
        console.error("The " + app.$meta.name +
          " section needs a components folder");
      //load components
      if (addons.components)
        Object.keys(addons.components).map(function(key) {
          return addons.components[key] = addons.components[key](Parse,
            app);
        });
      // load layouts
      if (addons.layouts)
        Object.keys(addons.layouts).map(function(key) {
          addons.layouts[key](app, Parse);
        });
      //set plugins
      app.$tmp = app.$templates = addons.templates;
      app.$cmp = app.$components = addons.components;

      if (!addons.modules)
        throw "The " + app.$meta.name +
        " section is missing the module folder";
      //load modules
      Object.keys(addons.modules).map(function(key) {
        addons.modules[key](Parse, app);
      });

    }
  }
  return core;
}
