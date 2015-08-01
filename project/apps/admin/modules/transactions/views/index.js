module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#transactions', [m(".container", [
            m("h4.page-header", "Transactions"),
            m("table", [
                m("thead", [
                    m("tr", [
                        m("th", "Time"),
                        m("th", "Type"),
                        m("th", "From"),
                        m("th", "Amount"),
                        m("th", "To"),
                        m("th", "")
                    ])
                ]),
                m("tbody", [
                    controller.transactions.map(function(transaction) {
                        return m("tr", [
                            m("td", transaction.createdAt),
                            m("td", transaction.get('type')),
                            m("td", transaction.get('user_to').get('username')),
                            m("td", "$" + transaction.get('amount')),
                            m("td", transaction.get('user_from').get('username')),
                            m("td.control", [m("a.waves-effect.waves-light.teal.lighten-2.btn", "View")])
                        ])
                    })
                ])
            ])
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
