module.exports = function(module, Parse){

	var model = {

		//add a new one
		createGame: function(){
			var Game = Parse.Object.extend("Game");
			var game = new Game();

			for(value in newGameValues){
				game.set(value, newGameValues[value]);
			}

			game.save().then(function(object) {
			  	console.log("Game added successfully.");
			  	console.log(object);
			});
		},

		//edit an existing one
		editGame: function(newValues){
			var Game = Parse.Object.extend("Game");
			// var game = new game();

			// for(value in newGameValues){
			// 	game.set(value, newGameValues[value]);
			// }

			// game.save(null, {

			// }).then(function(object) {
			//   	console.log("Game added successfully.");
			//   	console.log(object);
			// };
		},

		//delete one
		deleteGame: function(game, index){
			var Game = Parse.Object.extend("Game");
			game.set('deleted', true);

			game.save().then(function(object) {
				module.$.list().splice(index, 1);
				m.redraw();
			});
		},

		//get games, return to view to list
		list: function(){
			var query = new Parse.Query('Game');
			var deferred = m.deferred();

			query.equalTo('deleted', false);
			
			query.find({
				success: function(object){
					deferred.resolve(object);
				},
				error: function(obejct, error){
					alert("Error occurred: " + error);
				}
			});
			return deferred.promise;
		}

	};

	return model;
}