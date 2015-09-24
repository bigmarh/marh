module.exports = function() {
    var User = {

        sessionToken: null,
        user: {},
        payload: {},
        organization: {},

        getSessionToken: function() {
            User.sessionToken = $pa.helpers.getCurrentSessionToken();
            return User.sessionToken;
        },

        current: function() {
            var currentUser = $pa.helpers.getLocalObject('user');
            
            if (!currentUser) 
                return null;
            
            if (arguments.length == 2) {
                // set a key in the currentUser object
                currentUser[ arguments[0] ] = arguments[1]; 
                $pa.helpers.setLocalObject('user', currentUser);
            }

            if (arguments.length == 1) 
                return currentUser[ arguments[0] ];
            
            return currentUser;
        },

        getOrg: function(user) {
            return $pa.helpers.getLocalObject('user').org;
        },

        getPayload: function(user) {
            return $pa.helpers.getLocalObject('user').payload;
        },

        setCurrentUser: function(user) {
            $pa.helpers.setLocalObject('user', user);
        },

        retrieveUser: function(id) {
            var deferred = m.deferred();

            var opts = {
                method: "GET",
                url: $globalConfig.apiUrl + "api/user/" + id,
            }
            var request = $_request(opts);
            
            request.start(function(response) {
                User.setCurrentUser(response);
                deferred.resolve(response);
            }, function(error) {
                deferred.resolve(response);
            });

            return deferred.promise;
        },

        getSessionToken: function() {
        	return $pa.helpers.getCurrentSessionToken();
        },

        xhrConfig: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            if (User.getSessionToken())
                xhr.setRequestHeader("sessionToken", User.getSessionToken());
        },

        logout: function() {
            //remove local storage data;
            localStorage.clear()
            //redirect to login
            window.location = "/?/login";
        }

    }
    return User;
}
