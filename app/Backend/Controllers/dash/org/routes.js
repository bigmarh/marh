module.exports = function(stateProvider, Parse, resolvers) {

    stateProvider.state('org', {
            abstract: true,
            resolve: {
                checkAll: resolvers.checkAll,
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
            resolve: {
                getOrg: ['OrgService', '$q', function(Org, $q) {
                    var deferred = $q.defer();
                    Org.getCurrent().then(function(org) {
                        Org.getUsers().then(function(users) {
                            users = users.map(function(user) {
                                user.attributes.createdAt = user.createdAt
                                return user.attributes;
                            });

                            deferred.resolve({
                                org:org,
                                users: users
                            });
                        });
                    });

                    return deferred.promise
                }]
            },
            views: {
                'content@org': {
                    templateUrl: 'views/dash/content/org/admin.html',
                    controller: 'adminCtrl'
                }
            }
        })
        .state('org.index', {
            url: '/',
            resolve: {

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
