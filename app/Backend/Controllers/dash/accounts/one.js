module.exports = function(app, Parse) {
        app.controller('oneCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'getAccount', 'BlockCypher', 'getBalanceAndTransactions', 'UtilService','$messages',
            function($scope, $state, $rootScope, Accounts, Wallet, getAccount, BlockCypher, getBalanceAndTransactions, Util,$messages) {
                Accounts.currentAccount = getAccount;
                if (!Accounts.currentAccount.get) return $state.go('accounts');
                if (!Accounts.currentAccount.get('balance')) Accounts.fillWallet($state.params.address, 10 * 1e5);

                var address = getBalanceAndTransactions;
                Accounts.currentAccount.set('balance', address.balance);
                Accounts.currentAccount.set('confirmedBalance', address.balance - address.unconfirmed_balance);
                Accounts.currentAccount.save();
                Accounts.currentAccount.txs = Accounts.buildTransactionArray(address.txs, $state.params.address);
                $scope.account = Accounts.currentAccount;
                $scope.loadSend = function(account) {
                    $rootScope.$broadcast('openSend', {
                        fromAccount: account
                    })
                }

                          $rootScope.createDescription = function(tx) {
                    var message = "";
                    if (tx.type == "spend") {
                        message += "You sent bitcoin to ";
                        if (tx.to.length == 1) message += tx.to[0].address;
                        else {
                            message += "multiple addresses";
                        }
                    } else {

                        message += "You recieved bitcoin from ";
                        if (tx.from.length == 1) message += tx.from[0].address;
                        else {
                            message += "multiple addresses";
                        }
                    }
                    return message;
                }

                $scope.$watch(function() {
                    return Accounts.currentAccount
                }, function(nV, Ov) {
                    if (typeof nV !== 'undefined') {
                        $messages.log("Changed::::::::::::::::::::::::::::::::::")
                        $scope.account = Accounts.currentAccount;
                    }
                })

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
