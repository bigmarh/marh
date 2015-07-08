module.exports = function(module, Parse) {
  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.email = Parse.User.current().getEmail();
    }
    return vm
  }())
}
