module.exports = function(module, Parse, needsComponent) {
  var view = function(controller) {
    return m('section#banks', [m(".container", [
      m("h4.page-header", "Banks"),
      // button("Add", '/banks/add', {
      //   class: 'waves-effect waves-light red lighten-2 btn'
      // }),
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
          module.$.banks() && module.$.banks().map(function(
            bank) {
            return m("tr", [
              m("td", bank.get("name")),
              m("td", "$" + bank.get("balance")),
              m("td", bank.get("routing")),
              m("td", bank.get("accountNumber")),
              button('View', '/banks/view/' + bank.id)
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
