module.exports = function(module) {
  module.view = function(ctrl) {
    return m("div", [app.versionTracker.view(ctrl), m('#fresh')],
      "Hello World");
  };
}
