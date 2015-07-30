module.exports = function(module, Parse, needsComponent) {

    var view = function(controller) {
        return [
            m("a.collection-item", [m("div", ["Alvin", m("a.secondary-content[href='#!']", [m("i.material-icons", "View")])])])
        ];
    };

    if (needsComponent == true)
        return {
            view: view,
            controller: module.controller
        };
    return view;
}
