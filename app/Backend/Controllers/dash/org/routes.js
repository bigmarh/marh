module.exports = function(stateProvider, Parse, resolvers) {

    stateProvider.state('org', {
            url: '/org',
            abstract: true,
            resolve: {
                checkAll: resolvers.checkAll,
                setType: ['AccountsService', function(Accounts) {
                    return Accounts.settings = {
                        type: "Org",
                        currency: currency
                    };

                }],

                getAccounts: ['AccountsService', '$stateParams', 'checkAll', function(Accounts, $stateParams) {
                    return Accounts.getAccounts("Org");
                }],
                loadOrg: ['OrgService', 'setType', function(Org) {
                    return Org.get()
                }],
                getSpotPrice: ['WalletService', 'getAccounts', function(Wallet, getAccounts) {
                    return Wallet.getSpotPrice();
                }]
            },

            views: {
                '': {
                    templateUrl: 'views/layouts/dash-layout.html',
                    controller: 'orgCtrl',
                },
                'menu@org': {
                    templateUrl: 'views/dash/menu/index.html',
                    controller: 'menuCtrl'
                },

                'aux@org': {
                    templateUrl: 'views/dash/aux/index.html',
                }
            }

        })
        .state('org.admin', {
            url: '/admin',
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/admin.html',
                    controller: 'adminCtrl'
                }
            }
        })
        .state('org.index', {
            url: '',
            resolve: {
                admin: ['AccountsService', '$state', '$q', 'checkAll', 'getAccounts', function(Accounts, $state, $q, checkAll, getAccounts) {
                    if (getAccounts.length)
                        if (Parse.User.current().get('isAdmin') && !Object.keys(Accounts.accounts['Org']).length) {
                            console.log("is admin with no Accounts");
                            $state.go('org.admin');
                        }

                }],

                getSpotPrice: ['admin', 'WalletService', 'AccountsService', '$rootScope', function(admin, Wallet, Accounts, $rootScope) {
                    Accounts.currency = $rootScope.currency = currency;
                    return Wallet.getSpotPrice();
                }]
            },
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/summary.html',
                }
            }
        })
        .state('org.one', {
            url: '/a/:address',
            resolve: {
                getAccount: ['AccountsService', '$stateParams', function(Accounts, $stateParams) {
                    Accounts.currentAccount = Accounts.accounts['Org'][$stateParams.address];
                    return Accounts.currentAccount || Accounts.getAccount($stateParams.address);

                }],
                getBalanceAndTransactions: ['OrgService', 'BlockCypher', '$stateParams',
                    function(org, BlockCypher, $stateParams) {
                        return BlockCypher.getAddress($stateParams.address);
                    }
                ]
            },
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/one.html',
                    controller: 'oneCtrl'
                }
            }
        }).state('org.transfer', {
            url: '/transfer',
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/transfer.html',
                    controller: 'transferCtrl'
                }
            }
        }).state('org.billpay', {
            url: '/billpay',
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/billpay.html',
                }
            }
        })
}
