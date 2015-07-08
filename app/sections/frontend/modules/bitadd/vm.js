module.exports = function(module, Parse) {
  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.email = Parse.User.current().getEmail();
      this.address = m.prop();
      this.addresses = m.prop([]);
      this.updateAddress = function() {
        var privateKey = new bitcore.PrivateKey();
        var address = privateKey.toAddress();
        vm.addresses().push(address.toString());
        return vm.address(address.toString());
      }
    }
    return vm
  }())
}
