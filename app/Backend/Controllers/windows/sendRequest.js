 module.exports = function(app, Parse) {
     app.controller('sendCtrl', ['$scope', '$state', '$filter', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'Trans','$messages',
         function($scope, $state, $filter, $rootScope, Accounts, Wallet, Util, Trans,$messages) {
             try {
                 $messages.log(1);

                 $scope.accounts = Accounts.accounts[$scope.current.fromAccount.get('type') || Accounts.settings.type];
                 $scope.current.fromAccount = Accounts.accounts[$scope.current.fromAccount.get('type')][$scope.current.fromAccount.get('address')];

                 $messages.log($scope.accounts);
                 $scope.getQRcode = function(address) {
                     return Util.createQr(address);
                 }



                 Wallet.getSpotPrice();

             } catch (e) {
                 $messages.log(e);
             }
         }
     ]).controller('requestCtrl', ['AccountsService','$scope','UtilService', function(Accounts,$scope,Util) {
         $scope.account = Accounts.currentAccount;
         $scope.getQRcode = function(address) {
             return Util.createQr(address);
         }
     }]);
 }
