module.exports = function(Parse, app) {
    var organTypes = $globalConfig.organTypes;
    var core = {
        cryptojs: require('crypto-js'),
        load: {},
        _loader: function(type, name, params, newInstance) {
            if (type == "service") {
                if (app[organTypes[type]][name]) {
                    return __check(app[organTypes[type]][name]);
                } else {
                    return __check(app.$core[organTypes[type]][name], true);
                }
            } else {
                if (app[organTypes[type]][name] && app[organTypes[type]][name][name]) {
                    return __check(app[organTypes[type]][name][name]);
                } else {
                    return __check(app.$core[organTypes[type]][name][name], true);
                }
            }
            function __check(organ, isCore) {
    
                if (!organ) return console.error("The organ " + name + " does not exist.  Please check your filenames");
                var base = (isCore) ? app.$core : app;
                if (organ.__initialized) {
                    return organ;
                }
                organ = organ(params, app);
                organ.__initialized = true;

                if (type == "service") {
                   base[organTypes[type]][name] = organ;
                   return  base[organTypes[type]][name]
                }

                
                if (newInstance) return organ;
                base[organTypes[type]][name][name] = organ;
                return base[organTypes[type]][name][name];
                 
            }
        },
        loadLibrary: function(name, params) {
            return core._loader("library", name, params);
        },
        addOrgans: function(addons, module) {
            // load components
            if (addons.components)
                Object.keys(addons.components).map(function(key) {
                    addons.components[key](module, Parse);
                });
            // load layouts
            if (addons.layouts)
                Object.keys(addons.layouts).map(function(key) {
                    addons.layouts[key](module, Parse);
                });
            //set plugins
            module.$tmps = addons.templates;
            module.$cmps = addons.components;

            if (!addons.modules)
                throw "The " + module.$meta.name +
                " section is missing the module folder";
            //load modules
            Object.keys(addons.modules).map(function(key) {
                addons.modules[key](Parse, module);
            });
        },
        component: function(name, attr, text, extras) {
            if (attr) attr.text = text;
            var component = (app.$cmp[name]) ? app.$cmp[name](Parse, app) : app.$core.$cmp[name](Parse, app);
            return m.component(component, attr, extras);
        },
    }

    Object.keys(organTypes).map(function(type) {
        core.load[type] = function(name, params, newInstance) {
            return core._loader(type, name, params)
        }
    })
    window.cryptoJs = core.cryptojs;
    window.$load = core.load;
    window.loadLibrary = core.loadLibrary;
    return core;
}
