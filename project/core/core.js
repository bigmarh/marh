module.exports = function(Parse, app) {

    var core = {
        bitcore: Bitcore,
        bitcoreMnemonic: Bip39,
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
            return m.component(app.$cmp[name](Parse,app), attr, extras);
        },
    }
    window.loadLibrary = core.loadLibrary;
    return core;
}
