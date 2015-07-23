module.exports = function(module, Parse, app) {

  var Reason = require('./model/reason')(module, Parse, app);

  module.$ = (function() {
    var vm = {}
    vm.init = function() {
      this.greeting = "Hello World";
      this.listComp = $cmp.list;
      this.reasons = m.prop(Reason.list());
    }
    return vm
  }())
}
