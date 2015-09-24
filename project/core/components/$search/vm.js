module.exports = function(Parse, app, module) {

    module.$ = (function() {
        var filter = require('./helper')().filter();
        var vm = {};
        var s;

        vm.init = function(args) {
            if(args.parent)
               args.parent._temp = args.parent._temp || args.model()
            else
               args._temp = args._temp || args.model();
            vm.args = args;
            this.model = args.model;
        }
        vm.filter = function(search, element) {
            var array = vm.args.parent && vm.args.parent._temp || vm.args._temp;
            m.startComputation();
            if (search != "")
                s = filter(array, search);
            else
                s = array;
            vm.model(s);
            m.endComputation();


        }
        return vm;

    }())

}
