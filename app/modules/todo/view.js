module.exports = function(app) {
  app.view = function() {
    return m("div", m('div', app.vm.address));
  };
}
