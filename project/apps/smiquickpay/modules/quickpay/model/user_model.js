module.exports = function(module, Parse) {

    var model = {

        authorize: function(auth_attempt) {
            var deferred = m.deferred();
            Parse.User.logIn(auth_attempt.username, auth_attempt.password, {
                success: function(user) {
                    deferred.resolve(user);
                },
                error: function(user, error) {
                    deferred.reject('Error logging in');
                }
            });
            return deferred.promise;
        },

        getUserAccount: function(user) {
            var deferred = m.deferred();
            var Account = Parse.Object.extend("Account");
            var query = new Parse.Query(Account);
            query.equalTo('user', user);
            query.first({
                success: function(current_user_account) {
                    deferred.resolve(current_user_account);
                },
                error: function(user, error) {
                    deferred.reject('Error logging in');
                }
            });
            return deferred.promise;
        },

        getUsers: function() {
            var deferred = m.deferred();
            var query = new Parse.Query(Parse.User);
            query.notEqualTo('username', module.$.currentUser.get('username'));
            query.find({
                success: function(users) {
                    deferred.resolve(users);
                }
            });
            return deferred.promise;
        },

        transferFunds: function(details) {
            var deferred = m.deferred();

            Parse.Cloud.run('transfer', details)
                .then(function(response) {
                    deferred.resolve(true);
                }, function(error) {
                    deferred.resolve(false);
                    console.log(error);
                    alert(error);
                });

            return deferred.promise;
        }

    };

    return model;

}
