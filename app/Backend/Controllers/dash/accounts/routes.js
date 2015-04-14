module.exports = function(stateProvider, Parse, resolvers) {
    stateProvider.state('accounts', {
        url: '/personal',
        abstract: true,
        resolve: {

            checkAll: resolvers.checkAll,
            getSpotPrice: ['WalletService', 'AccountsService', '$rootScope', function(Wallet, Accounts, $rootScope) {
                return Wallet.getSpotPrice();
            }],
            setType: ['AccountsService', function(Accounts) {

                return Accounts.settings = {
                    type: "Personal",
                    currency: currency
                };

            }],
            getAccounts: ['AccountsService', '$stateParams', 'checkAll', 'setType', function(Accounts, $stateParams, checkAll, setType) {
                return Accounts.getAccounts(Accounts.settings.type);
            }]
        },
        views: {
            '': {
                templateUrl: 'views/layouts/dash-layout.html',
            },
            'menu@accounts': {
                templateUrl: 'views/dash/menu/index.html',
                controller: 'menuCtrl'
            },
           
            'aux@accounts': {
                templateUrl: 'views/dash/aux/index.html',
            }
        }

    })

    .state('accounts.index', {
            url: "",
            views: {
                'content@accounts': {
                    templateUrl: 'views/dash/content/account/summary.html',
                    controller: "accountsCtrl"
                }
            }
        })
        .state('accounts.one', {
            url: '/a/:address',
            resolve: {
                getAccount: ['AccountsService', '$stateParams', function(Accounts, $stateParams) {
                    Accounts.currentAccount = Accounts.accounts[Accounts.settings.type][$stateParams.address];
                    return Accounts.currentAccount || Accounts.getAccount($stateParams.address);

                }],
                getBalanceAndTransactions: ['AccountsService', 'BlockCypher', '$stateParams',
                    function(Accounts, BlockCypher, $stateParams) {
                        return BlockCypher.getAddress($stateParams.address);
                    }
                ]
            },
            views: {
                'content@accounts': {
                    templateUrl: 'views/dash/content/account/one.html',
                    controller: 'oneCtrl'
                }
            }
        }).state('accounts.transfer', {
            url: '/transfer',
            views: {
                'content@accounts': {
                    templateUrl: 'views/dash/content/account/transfer.html',
                    controller: 'transferCtrl'
                }
            }
        }).state('accounts.billpay', {
            url: '/billpay',
            views: {
                'content@accounts': {
                    templateUrl: 'views/dash/content/account/billpay.html',
                }
            }
        })
}
