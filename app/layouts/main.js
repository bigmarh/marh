module.exports = function() {

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
            class: m.route() === 'main.about' ? 'active item' : 'item',
            onclick: function() {
              m.route('/new');
            }
          },
          'About' + m.route()
        )
      )
    ];
  };

  m.mount(document.getElementById('header'), menu);

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

  m.render(document.getElementById('main'),{view:function(){return m('#content')}})
  m.mount(document.getElementById('footer'), state);



}
