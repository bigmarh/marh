module.exports = function(app, Parse) {
    app.controller('transferOrgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService','Trans',
        function($scope, $state, $rootScope, Accounts, Wallet, Util,Trans) {
          if(!Parse.User.current()) $state.go('home.index');
            $scope.accounts = Accounts.accounts;
            $scope.fromAccount = Accounts.accounts[Object.keys(Accounts.accounts)[0]];
            $scope.toAccount = Accounts.accounts[Object.keys(Accounts.accounts)[0]];
            var updateAccounts = function() {
                $scope.accounts = Accounts.accounts;
                $scope.$safeApply();
            };

            var startTransfer = function(){

            }

            Accounts.registerObserverCallback(updateAccounts);


        }
    ]);

}
