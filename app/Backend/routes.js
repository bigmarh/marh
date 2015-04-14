module.exports = function(Parse) {

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider','$messagesProvider', function($stateProvider, $urlRouterProvider, $locationProvider,$messagesProvider) {

        $urlRouterProvider.otherwise("/personal");
        //Routes
        var resolvers = {
            authenticated: ['$q', function($q) {
                $messagesProvider.message.log("Checked Log In:");
                var deferred = $q.defer();
                //Check if logged in
                if (Parse.User.current()) {
                    deferred.resolve(true)
                } else {
                    $messagesProvider.message.log("Not Logged In");
                    window.location = "/";
                }
                return deferred.promise;
            }],
            checkAll: ['AccountsService', 'OrgService', '$q', '$state', '$rootScope', function(Accounts, Org, $q, $state, $rootScope) {
                Accounts.currency = $rootScope.currency = currency;
                var fns = [checkForAccount, checkForOrg, passed]

                var deferred = $q.defer();
                //Check if logged in
                if (Parse.User.current()) {
                    $messagesProvider.message.log("Logged In");
                    next()
                } else {
                    $messagesProvider.message.log("Not Logged In");
                    window.location = "/";
                }

                var isAdmin;
                var orgName = (!Parse.User.current().get('domain')) ? "" : Parse.User.current().get('domain').replace(/\./g, '_');
                var adminTitle = orgName + "_Administrators";
                if (Parse.User.current().get('isAdmin') == undefined) {
                    
                    var query = (new Parse.Query(Parse.Role));
                    query.equalTo("name", adminTitle);
                    query.equalTo("users", Parse.User.current());
                    query.first().then(function(adminRole) {
                        if (adminRole) {
                            isAdmin = true;
                        } else {
                            isAdmin = false;
                        }
                        deferred.resolve(Parse.User.current().set('isAdmin', isAdmin));
                    })
                }

                function checkForAccount() {
                    if (Parse.User.current().get('originChain') && Parse.User.current().get('originChain').length) {
                        $messagesProvider.message.log("Has Account");
                        next()
                    } else {
                        $messagesProvider.message.log("Doesn't Have Account");
                        deferred.reject({
                            nextState: "setUp.origin"
                        });
                    }
                }

                function checkForOrg() {
                    if(Org.current){
                        $messagesProvider.message.log("Found Org - skipped to next");
                     return next();
                    }
                    var deferred = $q.defer();

                    Parse.Cloud.run('orgExists', {
                        domain: Parse.User.current().get('domain')
                    }).then(function(result) {
                        if (result) {
                            next()
                        } else {
                             $messagesProvider.message.log("Doesn't Have Org set up");
                           $state.go('setUp.org');
                        }
                    })

                  
                }

                function passed() {
                    $messagesProvider.message.log("Passed, Ready to go to Application");
                    if (['org', 'accounts', 'setUp'].indexOf(Accounts.state.split(".")[0]) == -1) {
                        $messagesProvider.message.log("go to front page");
                        $state.transitionTo('accounts.index')
                    } else {
                        deferred.resolve(true);
                    }
                }


                function next() {
                    return fns.shift()();
                }


                return deferred.promise;
            }],
            hasAccount: ['AccountsService', '$q', function(Accounts, $q) {
                $messagesProvider.message.log("Check If User Has Account:");
                var deferred = $q.defer();
                Accounts.hasAccounts(true)
                    .then(function(number) {
                        if (number) {
                            $messagesProvider.message.log("Has Account");
                            return deferred.resolve(true);
                        }
                        $messagesProvider.message.log("Doesn't Have Account");
                        deferred.reject({
                            nextState: "setUp.origin"
                        });
                    })
                return deferred.promise;
            }],
            hasOrg: ['OrgService', 'hasAccount', '$q', function(Org, hasAccount, $q) {
                $messagesProvider.message.log("Check If User Has Org:");
                var deferred = $q.defer();
                Org.get()
                    .then(function(company) {
                        if (company) {
                            $messagesProvider.message.log("Has Org");
                            deferred.reject({
                                nextState: "accounts"
                            });
                        } else {
                            $messagesProvider.message.log("Doesn't Have Org");
                            deferred.reject({
                                nextState: "setUp.org"
                            });
                        }
                    })
                return deferred.promise;
            }]


        }
        require('./Controllers/dash/routes')($stateProvider, Parse, resolvers);
        require('./Controllers/setUp/routes')($stateProvider, Parse, resolvers);

    }]

};
