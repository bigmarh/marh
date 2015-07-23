module.exports = function(component) {
  return function(ctrl, args) {
    var config = require('./cnfg')(ctrl, args);
    args.config = config;

    return m('.dialog-container', args, [
      m('md-card.animated[layout="column"]', {
          class: (args.enterAnimation || "zoomInDown")
        },
        m('md-content', ctrl.sections)
      )
    ])
  }



}
