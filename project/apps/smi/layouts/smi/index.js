var layoutName = $pa.helpers.dirName(__dirname);
var element = require('../../../../core/elements')();
var button = element.button;
module.exports = function(app, Parse) {

    var menu = {}
    var footer = {};

    menu.view = function(controller) {
        return [
            button( 'home', '/', { class: 'home-btn' } ),
            button( 'google', 'http://www.google.com/', { class: 'google-btn', 'target': '_blank' }, { href: true } ),
            button( 'alert', function() {
                    alert('you clicked the alert button!');
                }, { class: 'alert-btn' } )
        ];
    };

    footer.view = function(ctrl) {

    };

    ee.on('load.' + app.$meta.name + '.' + layoutName, function() {
        m.render(document.body, {
            view: function() {
                return  m('.container', [
                            m('header#header'),
                            m('section#main', [
                                m('ul#names')
                            ]),
                            m('footer#footer')
                        ]);
            }
        } )
        m.mount( document.getElementById('header'), menu );
        m.render( document.getElementById('main'), { view: function() { return m('section#content'); } } );
        m.mount( document.getElementById('footer'), menu );
    });

}
