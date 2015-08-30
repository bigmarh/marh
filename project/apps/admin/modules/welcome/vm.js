module.exports = function(module) {
  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.greeting = "Welcome to MARH";
      this.username = currentUser('username');
    }
    return vm;
  }())
}
