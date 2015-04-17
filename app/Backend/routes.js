module.exports = function(Parse) {

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$messagesProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $messages) {
        $messages = $messages.$get();
        $urlRouterProvider.otherwise("/");
        //Routes
        var resolvers = {

            checkAll: ['AccountsService', 'OrgService', '$q', '$state', '$rootScope', function(Accounts, Org, $q, $state, $rootScope) {
                var fns = [checkForAccount]
                if(!Parse.User.current().get('authorized') && !Parse.User.current().get('isAdmin')) window.location = "/no-access"
                var deferred = $q.defer();
                //Check if logged in
                if (Parse.User.current()) {
                    $messages.log("Logged In");
                    next()
                } else {
                    $messages.log("Not Logged In");
                    window.location = "/";
                }

                //Get Company 

                Org.load();

                function checkForAccount() {
                    if (Parse.User.current().get('payload'))
                        next()
                    else
                        window.location = "/register"
                }


                function next() {
                    if (!fns.length) return deferred.resolve(true);
                    return fns.shift()();
                }


                return deferred.promise;
            }]

        }
        require('./Controllers/dash/routes')($stateProvider, Parse, resolvers);

    }]

};
