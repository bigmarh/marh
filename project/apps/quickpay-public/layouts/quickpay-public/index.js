var layoutName = $pa.helpers.dirName(__dirname);
var element = require('../../../../core/elements')();
var button = element.button;
module.exports = function(app, Parse) {

    var header = {};

    header.view = function(controller) {
        return [
            m('h3', 'SMI Quick Pay - Public')
        ];
    };

    ee.on('load.' + app.$meta.name + '.' + layoutName, function() {
        m.render(document.body, {
            view: function() {
                return  m('section#main', [
                    m('header#header'),
                    m('section#content')
                ]);
            }
        })
        m.mount( document.getElementById('header'), header );
    });

}
