var emitter = require('events').EventEmitter;

module.exports = function(app) {
  var layoutName = "main";
  app.$layouts[layoutName] = {};
  var menu = {}
  menu.view = function(controller) {

    return [
      m('.ui.menu',
        m('md-button', {
            class: m.route() === '/todo' ? 'active item' : 'item',
            onclick: function() {
              m.route("/todo");
            }
          },
          'Todo'
        ),
        m('md-button', {
            class: m.route() === '/' ? 'active item' : 'item',
            onclick: function() {
              m.route('/');
            }
          },
          'Hello'
        ),
        m('md-button', {
            class: m.route() === '/new' ? 'active item' : 'item',
            onclick: function() {
              m.route('/new');
            },
            ondblclick: function() {
              m.route('/new/52');
            },
          },
          'About' + m.route()
        )
      )
    ];
  };



  var state = {};

  state.view = function(ctrl) {
    return [
      m('.ui.segment',
        m('.ui.hidden.divider'),
        m('h4', 'State : ' + m.route()),
        m('.ui.hidden.divider')
      )
    ]
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
