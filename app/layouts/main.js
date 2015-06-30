module.exports = function(m) {

  var menu = {}
  menu.view = function(controller) {
    return [
      m('.ui.menu',
        m('a', {
            class: mx.route.current() === 'main.hello' ? 'active item' : 'item',
            onclick: function() {
              mx.route.go('main.hello');
            }
          },
          'Home'
        ),
        m('a', {
            class: mx.route.current() === 'main.todo' ? 'active item' : 'item',
            onclick: function() {
              mx.route.go('main.todo');
            }
          },
          'Contacts'
        ),
        m('a', {
            class: mx.route.current() === 'main.about' ? 'active item' : 'item',
            onclick: function() {
              mx.route.go('main.about');
            }
          },
          'About'
        )
      )
    ];
  };

  var state = {};
  state.view = function() {
    return [
      m('.ui.segment',
        m('.ui.hidden.divider'),
        m('h4', 'State : ' + mx.route.current()),
        m('.ui.hidden.divider')
      )
    ]
  }


  var main = {};
  main.view = function(controller) {
    return [
      m('.ui.hidden.divider'),
      m('.ui.page.grid',
        menu.view(controller),
        m('.ui.hidden.divider'),
        m('.ui.segment', [m('#content')]),
        m('.ui.hidden.divider'),
        state.view(controller),
        m('.extra')
      ),

    ];
  };

  app.main = main;

  app.routes.main = {
    place: '#main',
    module: 'main'
  }

  m.module(document.getElementById("main"), main)


}
