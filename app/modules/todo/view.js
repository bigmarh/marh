module.exports = function(module) {
    module.view = function() {
        return m("div", m('div', module.vm.address(),
            m('button', {
                onclick: module.vm.updateAddress
            }, "Update Address"), m('#user', [
                module.vm.user.get('email'),
                m('div', module.vm.user.get('NEWaddress')),
                m.component(app.hello)
            ])
        ));
    };
}
