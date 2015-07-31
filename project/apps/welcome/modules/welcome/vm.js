module.exports = function(module, Parse) {
  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.greeting = "Welcome to MARH";
      this.email = currentUser('email');
    }
    return vm;
  }())
}