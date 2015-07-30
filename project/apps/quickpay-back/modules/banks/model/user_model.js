module.exports = function(module, Parse) {

    var model = {

        authorize: function(auth_attempt) {
            var deferred = m.deferred();
            Parse.User.logIn(auth_attempt.username(), auth_attempt.password(), {
                success: function(user) {
                    deferred.resolve(user);
                },
                error: function(user, error) {
                    deferred.reject('Error logging in');
                }
            });
            return deferred.promise;
        }

    };

    return model;

}
