module.exports = function(app, Parse) {
    app.controller('transferCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'Trans',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Trans) {
            if (!Parse.User.current()) $state.go('home.index');
            $scope.accounts = Accounts.accounts[Accounts.settings.type];

            var address = (Accounts.currentAccount.attributes && Accounts.currentAccount.get('address')) || Object.keys($scope.accounts)[0];
            var toAddress = (address == Object.keys($scope.accounts)[1]) ? Object.keys($scope.accounts)[0] : (Object.keys($scope.accounts)[1] || Object.keys($scope.accounts)[0]);
            $scope.currency = $rootScope.BTCunit

            $scope.current = {
                amount: "",
                fromAccount: $scope.accounts[address],
                toAccount: $scope.accounts[toAddress],

            }

            var updateAccounts = function() {
                alert(1);
            };

            $scope.startTransfer = function() {
                if ($scope.toAccount.get('address') == $scope.fromAccount.get('address')) {
                    return alert("don't transfer to yourself");
                }
                Accounts.currentAccount = $scope.fromAccount;
                $scope.current.note = "Transfer from "+$scope.fromAccount.get('name_slug') + " to " + $scope.toAccount.get('name_slug');
                $scope.current.tags = "transfer";
                $scope.current.toAccount = $scope.toAccount;
                $scope.current.fromAccount = $scope.fromAccount;
                Trans.finishedTrans = function() {
                    console.log("Transfer Finished");
                    $scope.current = {};
                }
                Trans.previewTrans($scope.current);
            }


            Accounts.registerObserverCallback(updateAccounts);


        }
    ]);

}
