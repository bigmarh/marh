module.exports = function(app, Parse) {
    app.controller('accountsCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService',  '$mdDialog','checkAll','getAccounts',
        function($scope, $state, $rootScope, Accounts, Wallet, Util,  $mdDialog,checkAll,getAccounts) {
            $scope.user = Parse.User.current();
            //reset current account
            Accounts.currentAccount = {};
            $scope.first = {
                password: 1234567890
            };
            $scope.accounts = Accounts.accounts['Personal'];
            $scope.company = Accounts.company;

            var updateAccounts = function() {
                $scope.accounts = Accounts.accounts;
                $scope.$safeApply();
            };


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

            $scope.createAccount = function(account) {

                switch (account.type) {
                    case "Personal":
                        return Accounts.createPersonal(account,function(account){
                            console.log(account);
                        },function(err){
                            alert(err.message);
                        });
                        break;

                }

            }

            Accounts.registerObserverCallback(updateAccounts);

            $scope.protectandDownload = function() {
                Accounts.createMasterAccount($scope.first);
            }


        }
    ]);

    var _accountsCtrl = ['$scope','AccountsService','$mdDialog', function($scope,Accounts,$mdDialog) {
        $scope.hide = function(){
            $mdDialog.hide();
        }
        $scope.createAccount = function(account) {
            switch (account.type) {
                case "Personal":
                    return Accounts.createPersonal(account,$mdDialog.hide,function(err){alert(err.message)});
                    break;

            }

        }
    }]
    require('./one')(app, Parse);
    require('./transfer')(app, Parse);
}
