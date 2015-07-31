module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#banks', [m(".container", [
            m("h4.page-header", "Add Bank"),
            m(".row", [
                m("form.col.s12", [
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate[id='name'][type='text']"),
                            m("label[for='name']", "Account Name")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate[id='balance'][type='text']"),
                            m("label[for='balance']", "Balance")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate[id='routing'][type='text']"),
                            m("label[for='routing']", "Routing")
                        ])
                    ]),
                    m(".row", [
                        m(".input-field.col.s6", [
                            m("input.validate[id='account-number'][type='text']"),
                            m("label[for='account-number']", "Account Number")
                        ])
                    ])
                ]),
                "\n"
            ]),
            button('Save', function() {
                controller.updateBank();
            })
        ])]);
    };

    if (needsComponent == true) {
        if(customController != null) {
            return { view: view, controller: customController };    
        }
        return { view: view, controller: module.controller };
    }
    return view;

}