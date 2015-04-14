module.exports = function(app, Parse) {
    app.controller('orgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', 'loadOrg', '$mdDialog', 'LastSign',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, loadOrg, $mdDialog, LastSign) {
            $scope.user = Parse.User.current();
            $scope.Org = Org.current = loadOrg;
            $rootScope.currency = Accounts.settings.currency;
            //reset current account
            Accounts.currentAccount = {};
            $scope.first = {
                password: 1234567890
            };
            $scope.accounts = Accounts.accounts['Org'];
      

            $scope.hasAccount = function(){
                return Object.keys($scope.accounts).length;
            }    

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
