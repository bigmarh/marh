module.exports = function(module) {
  return function(ctrl, args) {
    return m('h5', 'Welcome to ' + module.name + ' submodule');
  }
}
