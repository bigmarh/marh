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

            var Account = Parse.Object.extend("Account");
            var query = new Parse.Query(Account);
            query.equalTo('user', module.$.currentUser);
            query.first({
                success: function(current_user_account) {
                    // get the to user
                    var query = new Parse.Query(Parse.User);
                    query.get(details.to, {
                        success: function(to_user) {
                            var to_query = new Parse.Query(Account);
                            to_query.equalTo('user', to_user);
                            to_query.first({
                                success: function(to_user_account) {
                                    // we now have both accounts (current_user_account, to_user_account)
                                    current_user_account.set('balance', parseInt(current_user_account.get('balance')) - parseInt(details.amount));
                                    current_user_account.save(null, {
                                        success: function(from_account) {
                                            to_user_account.set('balance', parseInt(to_user_account.get('balance')) + parseInt(details.amount));
                                            to_user_account.save(null, {
                                                success: function(to_account) {
                                                    module.$.currentUserAccount = from_account;
                                                    deferred.resolve(true);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

            return deferred.promise;
        }

    };

    return model;

}
