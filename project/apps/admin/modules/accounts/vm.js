module.exports = function(module, Parse) {

    module.$ = (function() {

        var vm = {};

        vm.models = {
            Account: require('./model/accountModel')(module, Parse)
        }

        //get all accounts belonging to the current user and set new account variables
        vm.init = function() {
            vm.setNewAccount();
            this.accounts = m.prop();
            vm.models.Account.getAllAccounts().then(function(accounts){
                module.$.accounts(accounts);
                m.redraw();
            });
        }

        //save new account info and reset new account variables
        vm.saveNewAccount = function(){
            var savedAccount = vm.models.Account.saveNewAccount(vm.newAccount);
            vm.init();
        }

        //set new account variables to default
        vm.setNewAccount = function(){
            vm.newAccount = {
                account_name: m.prop(''),
                balance: m.prop(0.00)
            };
        }

        return vm;

    }())

}
