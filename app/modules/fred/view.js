module.exports = function(module) {
  module.view = function() {
    return m("div", [m('#fresh')], "Fred's World", m('#daily'));
  };
}
