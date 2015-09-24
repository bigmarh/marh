module.exports = function(ctrl, args) {
  return m('footer.dialog-footer[flex=""]', [
    m('.footer-content', [m(".md-actions[layout='row']", [

      m("span[flex='']"),
      button(ctrl.cancelText || 'Canceled', function() {
        ctrl.closeModal();
      }),
      button(ctrl.confirmText || 'OK', function() {
        ctrl.confirmModal();
      })
    ])])
  ])
}
