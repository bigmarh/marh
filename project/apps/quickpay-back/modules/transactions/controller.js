module.exports = function(module) {
    module.controller = function() {
        module.$.init();

        var TransactionModel = module.$.models.TransactionModel;
        var UserModel = module.$.models.UserModel;

        this.transactions = m.prop([]);

        var self = this;
        
        TransactionModel.getTransactions().then(function(results) {
        	self.transactions = results;
        	m.redraw();
        }, function(response) {
        	alert(response);
        });
    }
}