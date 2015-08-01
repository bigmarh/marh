module.exports = function(module) {

    var controller = function() {
        bankID = m.route.param('id');
        this.bank = m.prop();
        var self = this;
        bankModel = module.$.models.Bank;
        bankModel.getBank(bankID).then(function(bank){
        	self.bank = bank;
        });
        console.log(self.bank);

    };

    return controller;
}
