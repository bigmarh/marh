module.exports = function(app, Parse) {
        app.controller('oneOrgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'getAccount', 'BlockCypher', 'getBalanceAndTransactions','OrgService',
            function($scope, $state, $rootScope, Accounts, Wallet, getAccount, BlockCypher, getBalanceAndTransactions,Org) {
        

                $scope.account = Accounts.currentAccount = getAccount;
                var address = getBalanceAndTransactions;
                //Accounts.fillWallet($scope.account.address,10000000)
                Org.setAccountBalance(address);
                Accounts.currentAccount.txs = Accounts.buildTransactionArray(address.txs, $scope.account.address);
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
