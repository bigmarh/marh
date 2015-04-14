module.exports = function(stateProvider) {
    stateProvider.state('inbox', {
        url: '/inbox',
        resolve: {
            loadAccounts: ['AccountsService', '$q', '$timeout', '$state', function(Accounts, $q, $timeout, $state) {

                var promise1 = Accounts.getAccounts();
                promise1.then(function(accounts) {
                    if (!accounts) $state.transitionTo('setUp.origin');
                    Accounts.setupSockets(accounts);
                });
                var promise = Accounts.getCompany();
                promise.then(function(company) {
                    console.log(company);
                })
                return promise;
            }],
            getSpotPrice: ['WalletService', function(Wallet) {
                return Wallet.getSpotPrice();
            }]
        },
        views: {
            '': {
                templateUrl: 'views/layouts/dash-layout.html',
            },
            'menu@inbox': {
                templateUrl: 'views/dash/menu/index.html',
                controller: 'menuCtrl'
            },
            'content@inbox': {
                templateUrl: 'views/dash/content/inbox/index.html',
                controller: 'inboxCtrl'
            },
            'aux@inbox': {
                templateUrl: 'views/dash/aux/index.html',
            }
        }

    }).state('inbox.message', {
        url: '/message/:id',
        views: {
            'message@inbox': {
                templateUrl: 'views/dash/content/inbox/message.html',
                controller: "messageCtrl"
            }
        }
    })
}
