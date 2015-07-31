module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};

        vm.models = {
            Bank: require('./model/bankModel')(module, Parse)
        }

        vm.init = function() {
            
        }

        return vm;

    }())

}
