module.exports = function(module, app) {

    module.view = function(ctrl) {
        return m('div.col-xs-12', [
            //add new game
            $pa.c('button', {
                click: module.$.addNewGame,
                class: 'btn btn-primary'
            }, 'Add New Game'),

            //display games
            m('table.table', [
                m('thead', [
                    m('tr', [
                        m('th', 'Title'),
                        m('th', 'Publisher'),
                        m('th', 'System'),
                        m('th', 'Released'),
                        m('th', 'Edit'),
                        m('th', 'Delete'),
                    ])
                ]),
                module.$.list() && module.$.list().map(function(game, index) {
                    return m('tr', [ 
                        m('td', game.get('title')),
                        m('td', game.get('publisher')),
                        m('td', game.get('system')),
                        m('td', game.get('year')),
                        m('td', [
                            $pa.c('button', {
                                click: module.$.editGame,
                                class: 'btn btn-primary'
                            }, 'Edit')
                        ]),
                        m('td', [
                            $pa.c('button', {
                                click: function(){
                                    module.$.deleteGame(game, index)
                                },
                                class: 'btn btn-danger'
                            }, 'Delete')
                        ])
                    ])
                }),
            ])

        ]);
    };

    module.create = function(ctrl) {
        return m('div.col-xs-12', [
            m('label', 'Title'),
            m('input'),
            m('label', 'Publisher'),
            m('input'),
            m('label', 'System'),
            m('input'),
            m('label', 'Year Released'),
            m('input'),
            m('label', 'Title'),
            $pa.c('button', {
                click: module.$.saveNewGame
            }, 'Save')
        ]);
    };

}
