module.exports = function(module, app) {
    var element = require('../../../../core/elements')();
    var button = element.button;

    module.view = function(controller) {
        return m('section#login', [
            m('h4', 'Login'),
            m("input", {
                onchange: m.withAttr("value", controller.auth_attempt.username),
                value: controller.auth_attempt.username(),
                type: 'text',
                placeholder: 'Username'
            }),
            m('br'),
            m("input", {
                onchange: m.withAttr("value", controller.auth_attempt.password),
                value: controller.auth_attempt.password(),
                type: 'password',
                placeholder: 'Password'
            }),
            m('br'),
            button('Login', function() {
                controller.authorizeUser();
            })
        ]);
    };

}
