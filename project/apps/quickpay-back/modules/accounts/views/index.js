module.exports = function(module, Parse, needsComponent) {

    var view = function(controller) {
        return m('section#accounts', [m(".container", [
            m("h4.page-header", "Accounts"),
            m("table.striped.accounts", [
                m("thead", [
                    m("tr", [
                        m("th[data-field='account']", "Account Name"),
                        m("th[data-field='balance']", "Balance"),
                        m("th[data-field='control']", " ")
                    ])
                ]),
                m("tbody", [
                    m("tr", [
                        m("td", "Alvin"),
                        m("td", "$0.87"),
                        m("td.control", [m("a.waves-effect.waves-light.teal.lighten-2.btn", "View")])
                    ]),
                    m("tr", [
                        m("td", "Alan"),
                        m("td", "$3.76"),
                        m("td.control", [m("a.waves-effect.waves-light.teal.lighten-2.btn", "View")])
                    ]),
                    m("tr", [
                        m("td", "Jonathan"),
                        m("td", "$7.00"),
                        m("td.control", [m("a.waves-effect.waves-light.teal.lighten-2.btn", "View")])
                    ])
                ])
            ]),
            "\n"
        ])]);
    };

    if(needsComponent == true)
        return { view: view, controller: module.controller };
    return view;
}
