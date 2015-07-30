module.exports = function(module, Parse) {

    module.$ = (function() {

        var vm = {};

        vm.models = {
            Account: require('./model/accountModel')(module, Parse)
        }

        vm.init = function() {
            //get all accounts belonging to the current user
            this.accounts = m.prop();
            vm.models.Account.getAllAccounts().then(function(accounts){
                module.$.accounts(accounts);
                m.redraw();
            });
        }

        return vm;

    }())

}
