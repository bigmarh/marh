module.exports = function(module, Parse, needsComponent, customController) {

    var view = function(controller) {
        return m('section#accounts', [m(".container", [
            m("h4.page-header", "View Transaction")
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