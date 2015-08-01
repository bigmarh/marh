module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#banks', [m(".container", [
            m("h4.page-header", "Add Bank"),
            m(".row", [
                m("form.col.s12", [
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate#name[type='text']", {
                                onchange: m.withAttr("value", module.$.new_bank.name),
                                value: module.$.new_bank.name(),
                                type: 'text'
                            }),
                            m("label[for='name']", {
                                class: module.$.new_bank.name().length > 0 ? 'active' : ''
                            }, "Account Name")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate#balance[type='text']", {
                                onchange: m.withAttr("value", module.$.new_bank.balance),
                                value: module.$.new_bank.balance(),
                                type: 'text'
                            }),
                            m("label[for='balance']", "Balance")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate#routing[type='text']", {
                                onchange: m.withAttr("value", module.$.new_bank.routing),
                                value: module.$.new_bank.routing(),
                                type: 'text'
                            }),
                            m("label[for='routing']", "Routing")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate#accountNumber[type='text']", {
                                onchange: m.withAttr("value", module.$.new_bank.accountNumber),
                                value: module.$.new_bank.accountNumber(),
                                type: 'text'
                            }),
                            m("label[for='account-number']", "Account Number")
                        ])
                    ])
                ]),
                "\n"
            ]),
            button('Save', function() {
                module.$.saveBank();
            })
        ])]);
    };

    if (needsComponent == true) {
        if (customController != null) {
            return {
                view: view,
                controller: customController
            };
        }
        return {
            view: view,
            controller: module.controller
        };
    }
    return view;

}
