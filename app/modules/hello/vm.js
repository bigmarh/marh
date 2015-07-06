module.exports = function(module) {
  module.vm = (function() {
    var vm = {}
    vm.init = function() {
      this.lists = function() {
        return [{
          name: m.prop("Sanjay"),
          description: m.prop('This will be an amazing day!')
        }, {
          name: m.prop("Lafe"),
          description: m.prop('Come On mane')
        }, ]
      }
    }
    vm.simple = "GOOG";
    return vm;
  }())
}
