var Transfer;

module.exports = function(Parse) {

    Transfer = {

    	current: {},

    	set: function(propertyName, property){
    		return Transfer.current[propertyName] = m.prop(property);
    	},

    	get: function(property){
    		return Transfer.current[property]();
    	}

	}

    return Transfer;
}
