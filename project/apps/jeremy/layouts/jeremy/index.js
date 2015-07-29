var layoutName = $pa.helpers.dirName(__dirname);
var element = require('../../../../core/elements')();
var button = element.button;
module.exports = function(app, Parse) {

    var menu = {}
    var footer = {};

    menu.view = function(controller) {
        return [
            button( 'home', '/', { class: 'home-btn' } )
        ];
    };

    footer.view = function(ctrl) {
        return[
            m('div.center', [
                m('a[href=https://www.facebook.com/jtjackson89][target=_blank]', [
                    m('img[src=http://smi-files.com/unsafe/50x50/http://softwaremasters.com/uploads/default/about/jeremy-jackson_web-developer.png]', { style: {'border-radius': '25px'} }),
                    m('div', 'Jeremy Jackson')
                ])
            ])
        ];
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
        m.mount( document.getElementById('footer'), footer );
    });

}
