module.exports = function(ctrl, args) {

  return m("section", [m(".modal-content", m.component(args.content))])

}
