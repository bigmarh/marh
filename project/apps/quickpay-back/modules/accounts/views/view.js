module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#account', [m(".container", [
            m("h4.page-header", "Viewing Account - " + (controller.account() && controller.account().get('account_name'))),
            m("h5", "Current Balance: $" + (controller.account() && parseFloat(controller.account().get('balance')).toFixed(2))),
            m("h5", "Transactions"),
            m("table.striped.accounts", [
                m("thead", [
                    m("tr", [
                        m("th[data-field='amount']", "Amount"),
                        m("th[data-field='type']", "Type"),
                        m("th[data-field='from']", "From"),
                        m("th[data-field='to']", "To"),
                        m("th[data-field='date']", "Date")
                    ])
                ]),
                m("tbody", [
                    controller.accountTransactions() && controller.accountTransactions().map(function(transaction, index){
                        return m("tr", [
                            m("td", "$" + parseFloat(transaction.get('amount')).toFixed(2)),
                            m("td", transaction.get('type')),
                            m("td", transaction.get('user_from').get('username')),
                            m("td", transaction.get('user_to').get('username')),
                            m("td", transaction.createdAt.toLocaleString()),
                        ])
                    }),
                ]),
            ]),
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
