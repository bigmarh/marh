module.exports = function(module, Parse) {
	var my_model = require('./model/model')();
    module.$ = (function() {
        var vm = {}
        vm.init = function() {
        	module.$.list = m.prop(my_model.list);
        }

        vm.addNewUser = function() {
        	m.startComputation();
        	module.$.list().push({ first_name: 'Ron', last_name: 'Northrip' });
        	console.log(module.$.list());
        	m.endComputation();
        }

        return vm;
    }())

}
