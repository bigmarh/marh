module.exports = function(ctrl, args) {
  var items = ctrl.items || [1, 2, 3];
  return m('.list' + args.class, m('md-content[layout-padding][flex]', [
    m(
      'h2', ctrl.fishing),
    m('md-content.list-wrapper[flex][md-scroll-y]', args.attributes,
      items.map(function(item, index) {
        return m('.card.list-item#' + (item.key || index), m('li', {
            onclick: function() {
              alert(item)
            }
          },
          item));
      })),
  ]))
}
