module.exports = function(module) {
  module.view = function() {
    return m("div.animated.slideInUp#" + module.name + "-view", "about");
  };
}
