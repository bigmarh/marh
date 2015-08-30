var bulk = require('bulk-require');
module.exports = function(Parse, app) {
    try {
        var module = {
            name: __dirname.split('/').pop(),
            appName: __dirname.split('/').pop(),
            templates: app.$tmps,
            DB: Parse,
            globalConfig: app.globalConfig
        };
        require('./vm')(module, Parse);
        require('./controller')(module, Parse);
        require('./view')(module, app);

        // Load submodules
        var sm = bulk(__dirname, [
            "./submodules/**/index.js"
        ]);

        module.submodules = sm.submodules;

        for (submodule in module.submodules) {
            module.submodules[submodule](module);
        }

        //Register module with
        if (!app[module.name]) app[module.name] = module;
        else throw "There is a conflict in namespace"
        require('./routes')(app, module);
    } catch (e) {
        console.error(e);
    }


}