module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#account', [m(".container", [
            m("h4.page-header", "Viewing Account - " + (controller.account() && controller.account().get('account_name'))),
            m("h5", "Current Balance: $" + (controller.account() && parseFloat(controller.account().get('balance')).toFixed(2))),
            m("h5", "Transactions"),
            
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
