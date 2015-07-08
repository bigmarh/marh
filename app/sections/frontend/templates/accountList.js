module.exports = function(args) {
  var items = args.items;
  return m('.list' + args.class, [
    m('ul.list-wrapper', args.attributes, items.map(function(item, index) {
      return m('.list-item#' + (item.key || index), m('li', item));
    })),
  ])
}
