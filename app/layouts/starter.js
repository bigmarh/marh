var emitter = require('events').EventEmitter;

module.exports = function(app) {
  var layoutName = __filename;
  console.log(layoutName);
  var menu = {}
  menu.view = function(controller) {

  };
  var footer = {};
  footer.view = function(controller) {

  }

  ee.on('load' + layoutName, function() {
    m.mount(document.getElementById('header'), menu);
    m.render(document.getElementById('main'), {
      view: function() {
        return m('#content')
      }
    });
    m.mount(document.getElementById('footer'), state);

  })

}
