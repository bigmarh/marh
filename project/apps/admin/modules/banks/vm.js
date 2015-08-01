module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};

        vm.models = {
            Bank: require('./model/bankModel')(module, Parse)
        }

        vm.init = function() {
            this.banks = m.prop([]);
            this.new_bank = {
                name: m.prop(''),
                balance: m.prop(''),
                routing: m.prop(''),
                accountNumber: m.prop('')
            };
            var self = this;

            this.models.Bank.getAll().then(function(banks){
                self.banks = banks;
            });
        }


        vm.saveBank = function() {
            vm.models.Bank.save({
                name: module.$.new_bank.name(),
                balance: parseInt(module.$.new_bank.balance()),
                routing: module.$.new_bank.routing(),
                accountNumber: module.$.new_bank.accountNumber()
            }).then(function() {
                m.route('/');
            })
        }

        return vm;

    }())

}