module.exports = function(app, Parse) {
    app.controller('adminCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog', '$messages',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog, $messages) {

            //reset current account
            Accounts.currentAccount = {};
            $scope.currency = currency;
            Org.getAccounts().then(function(accounts) {
                $scope.accounts = accounts.map(function(account) {
                    account.attributes.createdAt = account.createdAt
                    return account.attributes;
                });
            })
            Org.getUsers().then(function(users) {
                $scope.users = users.map(function(user) {
                    user.attributes.createdAt = user.createdAt
                    return user.attributes;
                });
            })


            $scope.loadRequest = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/account/partials/request.html",
                    data: data
                })
            }

            $scope.createUser = function(ev) {
                $mdDialog.show({
                    controller: 'userCtrl',
                    templateUrl: '/views/popups/dialogs/addUser.html',
                    targetEvent: ev,
                });
            }
            $scope.createAccount = function(ev) {
                $mdDialog.show({
                    controller: 'userAccountCtrl as ctrl',
                    templateUrl: '/views/popups/dialogs/addAccount.html',
                    targetEvent: ev,
                });
            }



            $rootScope.$on('add_CompanyUser', function(event, options) {
                $scope.users.push(options.user);
                $scope.$safeApply();
            })
            $rootScope.$on('add_CompanyAccount', function(event, options) {
                $scope.accounts.push(options.account);
                $scope.$safeApply();
            })

            $scope.protectandDownload = function() {
                Accounts.createMasterAccount($scope.first);
            }


        }
    ]);
    require('./user')(app, Parse);
    require('./one')(app, Parse);
    require('./transfer')(app, Parse);
    require('./userAccount')(app, Parse);

}
