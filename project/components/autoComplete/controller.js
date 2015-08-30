module.exports = function(Parse, app, module) {
    return function(args) {

        module.$.init(args);
        //load style
        $pa.helpers.loadStyle(module);
        this.onunload = function() {
        	console.log("Unloaded");
            // unloads style when componet is unloaded
            $pa.helpers.unloadStyle(module);
        }

    }
}
