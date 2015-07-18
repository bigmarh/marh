module.exports = function(Parse, app, component) {
  return function(ctrl, args) {
    return args.template(ctrl, args);
  }
}
