module.exports = function(module, Parse) {

    var model = {

        //return all accounts belonging to the current user
        getAllAccounts: function(){
            var query = new Parse.Query('Account');
            var deferred = m.deferred();

            query.equalTo('user', Parse.User.current());
            
            query.find({
                success: function(object){
                    console.log(object);
                    deferred.resolve(object);
                },
                error: function(obejct, error){
                    alert("Error occurred: " + error);
                }
            });
            return deferred.promise;
        },

        getAccount: function(){
            var query = new Parse.Query('Account');
            var deferred = m.deferred();
            
            query.equalTo('objectId', m.route.param('id'));

            query.first({
                success: function(object){
                    deferred.resolve(object);
                },
                error: function(obejct, error){
                    alert("Error occurred: " + error);
                }
            });
            return deferred.promise;
        },

        getAccountTransactions: function(){
            var query = new Parse.Query('Transaction');
            var deferred = m.deferred();
            
            query.equalTo('objectId', m.route.param('id'));

            query.first({
                success: function(object){
                    deferred.resolve(object);
                },
                error: function(obejct, error){
                    alert("Error occurred: " + error);
                }
            });
            return deferred.promise;
        },

        saveNewAccount: function(){

        }

    };

    return model;

}
