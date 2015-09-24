module.exports = function(ctrl, args, compose) {
    return m("div", [
        m(".modalHeader.grey.darken-3.text-grey.lighten-4[layout='row']", [
            m("span[flex='']", [m("small", [m("i.material-icons", "drafts")])]),
            m("a.modal-action.modal-close[href='#']", [
                m("span", [
                    m("small", [
                        m("i.material-icons.text-grey", {
                            onclick: function() {
                                ee.emit('closeComposeBox');
                            }
                        }, "close")
                    ])
                ])
            ])
        ]),
        m(".borderBottom", [
            m("p", "To: " + args.model.to().email)
        ]),
        m(".modal-content", [
            m("input.search-field.largeInput[placeholder='Subject'][title='Subject'][type='text']", {
                onchange: m.withAttr("value", args.model.subject),
                value: args.model.subject()
            }),
            m("textarea[placeholder='Say something']", {
                onchange: m.withAttr("value", args.model.message),
                value: args.model.message()
            })
        ]),
        m(".modal-footer[layout='row'][layout-align='start center']", [
            m("button.modal-action.waves-effect.waves-light.btn.light-blue", {
                onclick: function() {
                    compose.send();
                }
            }, "Send"),
            m("a", [
                m("i.material-icons", "attachment"),
                m("span.filename", args.model.attachments().map(function(attachment, index) {
                    return m('span', index == (args.model.attachments().length - 1) ? attachment.filename : attachment.filename+', ');
                }))
            ]),
            m("span[flex='']"),
            m("a", [
                m("i.material-icons", "delete")
            ])
        ])
    ]);
}
