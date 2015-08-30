module.exports = function(module) {

    module.$ = (function() {
         var vm  = {}

        vm.init = function() {
	        
        }

        vm.currentView = function() {
        	console.log("Current View called");
        }
        
        return vm;

    }())

}
