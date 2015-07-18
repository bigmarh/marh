var emitter = require('events').EventEmitter;
var layoutName = $pa.helpers.dirName(__dirname);
module.exports = function(app, Parse) {
  var menu = {}
  menu.view = function(controller) {
    return [
      m('header.ui.menu',
        $pa.c('button', {
          route: '/',
        }, 'Home'),
        $pa.c('button', {
          route: '/starter'
        }, 'Start'),
        $pa.c('button', {
          href: '/'
        }, 'FrontEnd')
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
