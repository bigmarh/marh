module.exports = function(app, Parse) {
    app.controller('adminCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog', '$messages', 'getOrg',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog, $messages, getOrg) {
             
            //reset current account
            Accounts.currentAccount = {};
            $scope.currency = currency;
            $scope.accounts = false;
            $scope.users =  getOrg.users;
           

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
       


            $rootScope.$on('updateCompanyAccounts', function(event, options) {
                $scope.accounts.push(options.account);
                $scope.$safeApply();
            })
            $rootScope.$on('add_CompanyUser', function(event, options) {
                $scope.users.push(options.user);
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
