module.exports = function(stateProvider, Parse, resolvers) {
    stateProvider.state('setUp', {
        url: '/setup',
        abstract: true,
        resolve: {
            authenticated: resolvers.authenticated,
        },
        templateUrl: 'views/layouts/wholepage-layout.html', // layout file
    }).state('setUp.register', {
        url: '/',
        templateUrl: 'views/setUp/register.html',
        controller: "registerCtrl"
    }).state('setUp.origin', {
        url: '/origin',
        templateUrl: 'views/setUp/origin.html',
        controller: "setUpCtrl"
    }).state('setUp.invite', {
        url: '/invite',
        templateUrl: 'views/setUp/invite.html',
        controller: 'inviteCtrl'
    }).state('setUp.org', {
        url: '/org',
        resolve: {
            hasAccount: ['$q', function($q) {
                var deferred = $q.defer();

                Parse.Cloud.run('orgExists',{domain:Parse.User.current().get('domain')}).then(function(result){
                     if (result) {

                        deferred.reject({
                            nextState: 'accounts.index'
                        });
                    } else {
                        deferred.resolve();
                    }
                })
              
                return deferred.promise;
            }]

        },
        templateUrl: 'views/setUp/orgReg.html',
        controller: 'orgRegCtrl'
    });
}
