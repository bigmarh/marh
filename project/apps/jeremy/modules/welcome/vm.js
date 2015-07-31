module.exports = function(module, Parse) {
	var Games = require('./model/game')(module, Parse);
    
    module.$ = (function() {
        var vm = {}

        vm.newGame = {
            title: null,
            publisher: null,
            system: null,
            year: null,
            deleted: false
        };

        vm.init = function() {
            this.list = m.prop();
            Games.list().then(function(games){
                module.$.list(games);
                m.redraw();
            });

            module.$.deleteGame = function(game, index){
                Games.deleteGame(game, index);
            };
        }

        vm.addNewGame = function() {
        	Games.create();
        }

        return vm;
    }())

}
