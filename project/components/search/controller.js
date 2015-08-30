module.exports = function(Parse, app, module) {
    return function(args) {
        module.$.init(args);
        m.redraw.strategy("none");
        //load style
        $pa.helpers.loadStyle(module);
        this.onunload = function() {
            console.log("Unloaded");
            delete args._temp;
            // unloads style when componet is unloaded
            $pa.helpers.unloadStyle(module);
        }
    }
}
