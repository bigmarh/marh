module.exports = function(module, Parse, app) {
  module.$ = (function() {
    var vm = {}
    var changed = false;
    vm.init = function() {
      this.email = currentUser('email');
      this.address = m.prop();
      this.addresses = m.prop([]);
      this.list = m.prop(app.$cmp.accountList);
      this.updateAddress = function() {
        var privateKey = new bitcore.PrivateKey();
        var address = privateKey.toAddress();
        vm.addresses().push(address.toString());
        return vm.address(address.toString());
      }
      this.toggleListView = function() {
        if (!changed) {
          module.$.list({
            view: function() {
              return m(".peace", "Peace is Here")
            }
          })
        } else {
          module.$.list(app.$cmp.accountList);
        }
        changed = !changed;
      }
    }
    return vm
  }())
}
