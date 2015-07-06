module.exports = function(module) {
  module.view = function(ctrl) {
    return m("div", "This would be awesome " + app.hello.vm.simple,
      app.hello.vm.lists().map(function(list) {
        return m('li', [m('a',{href:'#top'}, list.name()), m('p', list.description())])
      })
    )
  };
}
