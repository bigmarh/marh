module.exports = function(module) {
  module.vm = (function() {
    var privateKey = new bitcore.PrivateKey();
    var address = privateKey.toAddress();

    var vm = {}
    vm.init = function() {
      this.address = address.toString();
    }

    return vm
  }())
}
