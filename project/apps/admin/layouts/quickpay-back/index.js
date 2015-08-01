var layoutName = $pa.helpers.dirName(__dirname);
var element = require('../../../../core/elements')();
var button = element.button;
module.exports = function(app, Parse) {

    var header = {};
    var footer = {};

    header.view = function(controller) {
        return [m("nav", [
            m(".nav-wrapper", [
                "\n",
                m(".container", [
                    m("a.brand-logo[href='#']", "SMI Quick Pay"),
                    m("ul.right.hide-on-med-and-down[id='nav-mobile']", [
                        m("li", [m("a[href='?/accounts']", "Accounts")]),
                        m("li", [m("a[href='?/banks']", "Banks")]),
                        m("li", [m("a[href='?/transactions']", "Transactions")]),
                        m("li", [m("a[href='?/logout']", "Logout")])
                    ]),
                    "\n"
                ])
            ])
        ])];
    };



    footer.view = function(controller) {
        return [m("footer.page-footer", [
            m(".container", [
                m(".row", [
                    m(".col.l6.s12", [
                        m("h5.white-text", "SMI Quick Pay"),
                        m("p.grey-text.text-lighten-4", "\"Putting cash money in yo pants one dolla, no holla, at a time.\"")
                    ]),
                    m(".col.l4.offset-l2.s12", [
                        m("h5.white-text", "Navigate"),
                        m("ul", [
                            m("li", [m("a.grey-text.text-lighten-3[href='?/accounts']", "Accounts")]),
                            m("li", [m("a.grey-text.text-lighten-3[href='?/banks']", "Banks")]),
                            m("li", [m("a.grey-text.text-lighten-3[href='?/transactions']", "Transactions")]),
                            m("li", [m("a.grey-text.text-lighten-3[href='?/logout']", "Logout")])
                        ])
                    ])
                ])
            ]),
            m(".footer-copyright", [
                m(".container", [
                    "\n            © 2014 Copyright SMI Quick Pay\n            "
                ])
            ])
        ])];
    };

    ee.on('load.' + app.$meta.name + '.' + layoutName, function() {
        m.render(document.body, {
            view: function() {
                return m('section#main', [
                    m('header#header'),
                    m('section#content'),
                    m('footer#footer')
                ]);
            }
        })
        m.mount(document.getElementById('header'), header);
        m.mount(document.getElementById('footer'), footer);
    });

}
