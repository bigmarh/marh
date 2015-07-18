module.exports = function(Parse, app) {
  var core = {
    addOrgans: function(addons, app) {
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

    }
  }
  return core;
}
