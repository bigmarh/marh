module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};

        vm.models = {
            TransactionModel: require('./model/transactionModel')(module, Parse),
            UserModel: require('./model/userModel')(module, Parse)
        }

        vm.init = function() {
            
        }

        return vm;

    }())

}
