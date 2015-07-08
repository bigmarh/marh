module.exports = function(module, Parse) {
  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.email = currentUser('email');
    }
    return vm
  }())
}
