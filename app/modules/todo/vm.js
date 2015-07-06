module.exports = function(module,Parse) {
  module.vm = (function() {
    var privateKey = new bitcore.PrivateKey();
    var address = privateKey.toAddress();
    console.log(address.toString());
    var vm = {}
    vm.init = function() {
      this.user = Parse.User.current();
      this.address = m.prop(address.toString());
      this.updateAddress = function() {
        var newPK = new bitcore.PrivateKey();
        var newAddress = newPK.toAddress();
        Parse.User.current().set('NEWaddress',newAddress.toString());
        Parse.User.current().save();
        module.vm.address(newAddress.toString());
      }
    }

    return vm
  }())
}
