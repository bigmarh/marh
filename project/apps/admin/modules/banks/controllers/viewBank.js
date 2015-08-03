module.exports = function(module) {
  var Bank = require('../model/bankModel')(module);
  var controller = function() {
    var self = this;
    bankID = m.route.param('id');
    this.bank = m.prop();
    Bank.getBank(bankID).then(function(bank) {
      self.bank(bank);
    });
    console.log(self.bank);
  };
  return function() {
    return controller();
  };
  return controller;
}
