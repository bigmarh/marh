module.exports = function(module, Parse, needsComponent, customController) {

  var view = function(controller) {
    console.log(customController());
    return m('section#banks', [m(".container", [
      m("h4.page-header", "Viewing Bank"),
      m(".row", [
        m("form.col.s12", [
          m(".row", [
            m(".input-field.col.s6", [
              m(
                "input.validate[id='name'][type='text']", {
                  oninput: m.withAttr("value",
                    controller.bank
                    .get("name")),
                  value: controller.bank.get("name")
                }),
              m("label.active[for='name']",
                "Account Name")
            ])
          ]),
          m(".row", [
            m(".input-field.col.s6", [
              m(
                "input.validate[id='routing'][type='text']", {
                  oninput: m.withAttr("value",
                    controller.bank
                    .get("routing")),
                  value: controller.bank.get("routing")
                }),
              m("label.active[for='routing']",
                "Routing")
            ])
          ]),
          m(".row", [
            m(".input-field.col.s6", [
              m(
                "input.validate[id='account-number'][type='text']", {
                  oninput: m.withAttr("value",
                    controller.bank
                    .get("accountNumber")),
                  value: controller.bank.get(
                    "accountNumber")
                }),
              m("label.active[for='account-number']",
                "Account Number")
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
