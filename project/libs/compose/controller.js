module.exports = function(compose, options) {
    return function(args) {

    	var module = {
    		style: require('./style'),
    		name: "compose"
    	}
        
        this.composeElement = compose.current;
        
        //load style
        $pa.helpers.loadStyle(module);
        this.onunload = function() {
            // unloads style when componet is unloaded
            $pa.helpers.unloadStyle(module);
        }

    }
}
