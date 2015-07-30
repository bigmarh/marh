module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};

        vm.models = {
            User: require('./model/user_model')(module, Parse)
        }

        vm.init = function() {
            if (Parse.User.current())
                window.location = '/quickpay-back'
        }

        return vm;

    }())

}
