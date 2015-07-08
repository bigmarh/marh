module.exports = function(ctrl, args) {
  var items = ctrl.items;
  return m('md-card.list' + args.class, m('md-content[layout-padding][flex]', [
    m(
      'h2', ctrl.fishing),
    m('md-content.list-wrapper[flex][md-scroll-y]', args.attributes,
      items.map(function(item, index) {
        return m('.list-item#' + (item.key || index), m('li', item));
      })),
  ]))
}
