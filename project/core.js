module.exports = function(Parse, app) {

    var core = {
        cryptojs: require('crypto-js'),
        loadLibrary: function(name, params) {
            return app.$libs[name][name](params);
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
            return m.component(app.$cmp[name](Parse, app), attr, extras);
        },
        moduleIndex: function(db,app,directory) {
            directory = '.../'+directory.split('/').splice(2).join('/');
            try {
                var module = {
                    name: directory.split('/').pop(),
                    templates: app.$tmps,
                    db: db,
                    globalConfig: app.globalConfig
                };

                require(directory+'/vm')(module, Parse);
                require(directory+'/controller')(module, Parse);
                require(directory+'/view')(module, app);

                // Load addons
                var addons = bulk(directory, [
                    "./submodules/**/index.js",
                    "./model/**.js"
                ]);

                module.submodules = addons.submodules;
                module.model = addons.model;
                for (model in module.model) {
                    module.model[model] = module.model[model](module, module.db);
                }
                for (submodule in module.submodules) {
                    module.submodules[submodule](module);
                }

                //Register module with
                if (!app[module.name]) app[module.name] = module;
                else throw "There is a conflict in namespace"
                require(directory+'/routes')(app, module);
            } catch (e) {
                console.error(e);
            }
        }
    }
    window.loadLibrary = core.loadLibrary;
    return core;
}
