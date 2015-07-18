var emitter = require('events').EventEmitter;
var layoutName = $pa.helpers.dirName(__dirname);
module.exports = function(app, Parse) {
  var menu = {}

  menu.view = function(controller) {
    return [
      m('header.ui.menu',
        m('a[href="#"].btn-flat.waves-effect.waves-teal', {
            onclick: function() {
              m.route('/todo')
            }
          },
          'Home'
        ),
        m('a[href="#"].btn-flat.waves-effect.waves-teal', {
            onclick: function() {
              m.route('/starter');
            },
            ondblclick: function() {
              m.route('/todo');
            }
          },
          '1 click= app, 2 clicks = comp'
        ),
        m('a[href="/"].btn-flat.waves-effect.waves-teal',
          'To Front App')
      )
    ];
  };



  var footer = {};
  footer.view = function(ctrl) {
    return [
      m('.inside-footer',
        m('.ui.hidden.divider'),
        m('p', 'Route : ' + m.route()),
        m('.ui.hidden.divider')
      )
    ]
  }
  ee.on('load.' + app.$meta.name + '.' + layoutName, function() {
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
    m.render(
      document.getElementById('main'), {
        view: function() {
          return m('section#content')
        }
      });
    m.mount(document.getElementById('footer'), footer);

  })

}
