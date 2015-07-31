module.exports = function(module, Parse) {

    var model = {

        //return all accounts belonging to the current user
        getAllAccounts: function(){
            var query = new Parse.Query('Account');
            var deferred = m.deferred();

            query.equalTo('user', Parse.User.current());
            
            query.find({
                success: function(object){
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

        getAccountTransactions: function(account){
            var deferred = m.deferred();

            var incomingTransaction = new Parse.Query("Transaction");
            incomingTransaction.equalTo("account_to", account);

            var outgoingTransaction = new Parse.Query("Transaction");
            outgoingTransaction.equalTo("account_from", account);


            var query = Parse.Query.or(incomingTransaction, outgoingTransaction).include("user_to").include("user_from");

            query.addDescending("createdAt");;

            query.find({
                success: function(object){
                    deferred.resolve(object);
                },
                error: function(obejct, error){
                    alert("Error occurred: " + error);
                }
            });
            return deferred.promise;
        },

        saveNewAccount: function(newAccount){
            var Account = Parse.Object.extend("Account");
            var account = new Account();

            account.set('account_name', newAccount.account_name());
            account.set('balance', parseFloat(newAccount.balance()));
            account.set('user', Parse.User.current());

            account.save().then(function(object) {
                console.log(object);
                return object;
            });
        }

    };

    return model;

}
