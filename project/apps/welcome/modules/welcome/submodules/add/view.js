module.exports = function(module) {
    return function(ctrl, args) {
        return m("div", "Intro", [m('hr'), m('a.testModal', {
            href: '#welcome/welcome'
        }, "Click here to change the modal to welcome")])

    }
}
