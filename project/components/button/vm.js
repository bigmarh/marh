module.exports = function(module) {

    module.$ = (function() {

        var vm = {};

        vm.init = function(args) {
            if (args) {
                Object.keys(args).map(function(key) {
                    return vm[key] = args[key];
                })
            }
        }

        return vm;

    }())

}
