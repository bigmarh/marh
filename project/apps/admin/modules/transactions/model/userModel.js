module.exports = function(module, Parse) {

    var model = {

        getUser: function(user_id) {
            var deferred = m.deferred();
            var user_query = new Parse.Query(Parse.User);
            user_query.get(user_id, {
                success: function(user) {
                    deferred.resolve(user);
                },
                error: function(error) {
                    deferred.reject("Error: " + error.code + " " + error.message);
                }
            });
            return deferred.promise;
        }

    };

    return model;

}
