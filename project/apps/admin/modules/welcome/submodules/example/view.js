module.exports = function(module) {
  return function(ctrl, args) {
    return m('section', [
      m('h3', 'Welcome to ' + module.name + ' submodule'),
      m('.test.red-text.text-lighten-3',
        'Loaded another submodule below'),
      m('.divider'),
      module.parent.submodules.example2().view(ctrl),
    ]);
  }
}
