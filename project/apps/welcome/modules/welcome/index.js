var bulk = require('bulk-require');
module.exports = function(Parse, app) {
    try {
        var module = {
            name: __dirname.split('/').pop(),
            appName: "welcome"
        };
        require('./vm')(module, Parse);
        require('./controller')(module, Parse);
        require('./view')(module, app);

        // Load submodules
        var sm = bulk(__dirname, [
            "./submodules/**/index.js"
        ]);

        module.submodules = sm.submodules;
        console.log(module.submodules)
        for(key in module.submodules) {
            module.submodules[key](Parse, module);
        }

        //Register module with
        if (!app[module.name]) app[module.name] = module;
        else throw "There is a conflict in namespace"
        require('./routes')(app, module);

    } catch (e) { 
        console.error(e);
    }


}
