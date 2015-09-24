module.exports = function(hashModal, options) {
    return function(args) {

    	var module = {
    		style: require('./style'),
    		name: "$hashModal"
    	}
        this.modalElement = hashModal.current;

    	//load style
        $pa.helpers.loadStyle(module);

        this.onunload = function() {
            // unloads style when componet is unloaded
            $pa.helpers.unloadStyle(module);
        }

        this.cancel = function(close) {
            options.cancel.action();
            setTimeout(hashModal.remove, hashModal.removeDelay);
        }

        this.confirm = function() {
            options.confirm.action();
            setTimeout(hashModal.remove, hashModal.removeDelay);
        }

        this.extraAction = function(extraAction) {
            extraAction.action();
            if(extraAction.closeAfter)
                setTimeout(hashModal.remove, hashModal.removeDelay);
        }

    }
}
