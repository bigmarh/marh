module.exports = function(module, Parse, needsComponent) {

    var view = function(controller) {
        return m('section#accounts', [m(".container", [
            m("h4.page-header.left", "Accounts"),
            m("a.right.waves-effect.waves-light.teal.lighten-2.btn", "Add Account"),
            m("table.striped.accounts", [
                m("thead", [
                    m("tr", [
                        m("th[data-field='account']", "Account Name"),
                        m("th[data-field='balance']", "Balance"),
                        m("th[data-field='control']", " ")
                    ])
                ]),
                m("tbody", [
                    module.$.accounts() && module.$.accounts().map(function(account, index){
                        return m("tr", [
                            m("td", account.get('account_name')),
                            m("td", "$" + parseFloat(account.get('balance')).toFixed(2)),
                            m("td.control", [
                                m("a.waves-effect.waves-light.teal.lighten-2.btn[href='?/accounts/view/"+account.id+"']", "View")
                            ])
                        ])
                    }),
                ]),
            ]),
            "\n"
        ])]);
    };

    if(needsComponent == true){
        if(customController != null){
            return { view: view, controller: customController };
        }
        return { view: view, controller: module.controller };
    }
    return view;
}
