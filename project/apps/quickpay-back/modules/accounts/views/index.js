module.exports = function(module, Parse, needsComponent) {

    var view = function(controller) {
        return m('section#accounts', [m(".container", [
            m("h4.page-header.left", "Accounts"),
            button('Add Account', 
                modal({
                    content: m('div[style="width:500px"]', [
                        m("label[for='name']", "Account Name"),
                        m("input#name", {
                            onchange: m.withAttr("value", module.$.newAccount.account_name),
                            value: module.$.newAccount.account_name(),
                            type: 'text',
                            placeholder: 'My account name'
                        }),
                        m("label[for='balance']", "Balance"),
                        m("input#balance", {
                            onchange: m.withAttr("value", module.$.newAccount.balance),
                            value: module.$.newAccount.balance(),
                            type: 'number',
                            placeholder: '0.00'
                        }),               
                    ]),
                    footer: true,
                    onCancel: function() {
                        m.route('/')
                    },
                    onConfirm: function(){
                        if(module.$.newAccount.account_name().length > 0){
                            module.$.saveNewAccount();
                        } else {
                             alert("Please provide an account name.");
                        }
                    }
                }),
                { class: "right waves-effect waves-light teal lighten-2 btn" }
            ),
            m("table.striped.accounts", [
                m("thead", [
                    m("tr", [
                        m("th[data-field='account']", "Account Name"),
                        m("th[data-field='balance']", "Balance"),
                        m("th[data-field='control']", " ")
                    ])
                ]),
                m("tbody", [
                    module.$.accounts() && module.$.accounts().map(function(account, index) {
                        return m("tr", [
                            m("td", account.get('account_name')),
                            m("td", "$" + parseFloat(account.get('balance')).toFixed(2)),
                            m("td.control", [
                                m("a.waves-effect.waves-light.teal.lighten-2.btn[href='?/accounts/view/" + account.id + "']", "View")
                            ])
                        ])
                    }),
                ]),
            ]),
            "\n"
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