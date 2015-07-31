module.exports = function(module) {
    module.controller = function() {
        module.$.init();
        this.banks = m.prop([]);
        var self = this;

        bankModel = module.$.models.Bank;
        bankModel.getAll().then(function(banks){
        	self.banks = banks;
        })     	    
    }
}