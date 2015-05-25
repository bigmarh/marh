module.exports = function(app, Parse) {
    app.controller('orgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog','UserService',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog,User) {
            $scope.user = Parse.User.current();
        
            //reset current account
            Accounts.currentAccount = {};
            $scope.first = {
                password: 1234567890
            };

           User.getAccounts().then(function(accounts) {
                $scope.checked = true;
                $scope.accounts = accounts;
                $scope.$safeApply();
            })
      

  

            $scope.loadCredit = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/account/lightbox/credit.html",
                    data: data
                })
            }

            $scope.loadCreateAccount = function(data, ev) {
                /*       $rootScope.$broadcast('callToast', 
                       {
                           state: "accounts.one",
                           params:{
                               address: "De1C2mCavWAYFNgVjAHZKfV8pAVzwCy7Ta"
                           }
                       }
                   );*/
                $mdDialog.show({
                        controller: _accountsCtrl,
                        templateUrl: '/views/dash/content/account/lightbox/createAccount.html',
                        targetEvent: ev,
                    })
                    .then(function(answer) {
                        $scope.alert = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.alert = 'You cancelled the dialog.';
                    });

            }

            $scope.loadPayeeSetup = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/account/lightbox/payeeSetup.html",
                    data: data
                })
            }


          

            $scope.protectandDownload = function() {
                Accounts.createMasterAccount($scope.first);
            }


        }
    ]);
    require('./admin')(app, Parse);
    require('./user')(app, Parse);
    require('./one')(app, Parse);
    require('./transfer')(app, Parse);

}
