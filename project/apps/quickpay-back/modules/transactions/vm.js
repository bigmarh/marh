module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};

        vm.models = {
            User: require('./model/user_model')(module, Parse)
        }

        vm.init = function() {
            
        }

        return vm;

    }())

}
