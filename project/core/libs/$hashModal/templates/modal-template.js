module.exports = function(ctrl, args) {
    return m("article", {
        class: (args.noFooter ? 'modal-no-footer' : 'modal-fixed-footer') +
            " " + (args.Toolbar ?
                'modal-top-toolbar' : 'modal-no-toolbar')
    }, [
        m("header.modal-toolbar[layout='row'][layout-align='end']", [button(
            'X', ctrl.cancel, {
                class: 'btn-floating black-text grey lighten-2 waves-effect waves-light'
            })]),
        m(".modal-content", m.component(args.content,args)),
        m("footer.modal-footer[layout='row'][layout-align='end']", [
            button(args.cancel.text, ctrl.cancel),
            button(args.confirm.text, ctrl.confirm)
        ])
    ])

}