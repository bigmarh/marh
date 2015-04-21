module.exports = function(app, Parse) {
        app.controller('oneOrgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'getAccount', 'BlockCypher', 'getBalanceAndTransactions',
            function($scope, $state, $rootScope, Accounts, Wallet, getAccount, BlockCypher, getBalanceAndTransactions) {
        

                $scope.account = Accounts.currentAccount = getAccount;

                var updateAccount = function() {
                    $scope.account = Accounts.currentAccount;
                    $scope.$safeApply();
                };

                Accounts.registerObserverCallback(updateAccount);

            }
        ])
    }
    /*{
        tx_id: {hash}
        amount: {calculated from ins and outs to in satoshis}
        addresses: {addresses paid to/from less current address},
        fees:{ fees in satoshi}

    }*/
