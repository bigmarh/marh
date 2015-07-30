module.exports = function(module, Parse, needsComponent) {

    var view = function(controller) {
        return m('section#accounts', [m(".container", [
            m("h4.page-header", "View Account")
        ])]);
    };

    if(needsComponent == true)
        return { view: view, controller: module.controller }
    return view;

}
