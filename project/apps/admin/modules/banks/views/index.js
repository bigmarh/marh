module.exports = function(module, Parse, needsComponent) {
    var view = function(controller) {
        return m('section#banks', [m(".container", [
            m("h4.page-header", "Banks"),
            m("a[href='?/banks/add/'].waves-effect.waves-light.teal.lighten-2.btn", "Add"),
            m("table.striped.banks", [
                m("thead", [
                    m("tr", [
                        m("th[data-field='account']", "Bank Name"),
                        m("th[data-field='balance']", "Balance"),
                        m("th[data-field='balance']", "Routing Number"),
                        m("th[data-field='balance']", "Account Number"),
                        m("th[data-field='control']", " ")
                    ])
                ]),
                m("tbody", [
                    module.$.banks && module.$.banks.map(function(bank) {
                        return m("tr", [
                            m("td", bank.get("name")),
                            m("td", "$" + bank.get("balance")),
                            m("td", bank.get("routing")),
                            m("td", bank.get("accountNumber")),
                            m("a[href='?/banks/view/" + bank.id + "'].waves-effect.waves-light.teal.lighten-2.btn", "View")
                        ])
                    })

                ])
            ]),
            "\n"
        ])]);
    };

    if (needsComponent == true)
        return {
            view: view,
            controller: module.controller
        };
    return view;

}
