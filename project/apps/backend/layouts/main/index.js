var emitter = require('events').EventEmitter;
var layoutName = $pa.helpers.dirName(__dirname);
module.exports = function(app, Parse) {
  var menu = {}
  menu.view = function(controller) {

    return [
      m('.ui.menu',
        m('button', {
            class: m.route() === '/bitadd' ? 'active item' : 'item',
            onclick: function() {
              m.route("/bitadd");
            }
          },
          'bitadd'
        ),
        m('button', {
            class: m.route() === '/hello' ? 'active item' : 'item',
            onclick: function() {
              m.route('/hello');
            }
          },
          'Hello'
        ),
        m('button', {
            onclick: function() {
              $location('/');
            }
          },
          'Back to the Front'
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
  ee.on('load.' + layoutName, function() {
    //set up body structure
    m.render(document.body, {
      view: function() {
        return m('div.container', [
          m('header#header'),
          m('section#main'),
          m('footer#footer')
        ])
      }
    });
    m.mount(document.getElementById('header'), menu);
    m.render(document.getElementById('main'), {
      view: function() {
        return m('#content')
      }
    });
    m.mount(document.getElementById('footer'), state);

  })

}
