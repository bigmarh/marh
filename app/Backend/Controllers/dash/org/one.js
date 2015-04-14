module.exports = function(app, Parse) {
        app.controller('oneOrgCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'getAccount', 'BlockCypher', 'getBalanceAndTransactions',
            function($scope, $state, $rootScope, Accounts, Wallet, getAccount, BlockCypher, getBalanceAndTransactions) {
                Accounts.currentAccount = getAccount;
                $rootScope.currency = Accounts.settings.currency;
                if (!Accounts.currentAccount.get('balance')) Accounts.fillWallet($state.params.address, 10 * 1e5);

                var address = getBalanceAndTransactions;
                Accounts.currentAccount.set('balance', address.balance);
                Accounts.currentAccount.set('confirmedBalance', address.balance - address.unconfirmed_balance);
                Accounts.currentAccount.save();
                Accounts.currentAccount.txs = Accounts.buildTransactionArray(address.txs,$state.params.address);
                $scope.account = Accounts.currentAccount;

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
