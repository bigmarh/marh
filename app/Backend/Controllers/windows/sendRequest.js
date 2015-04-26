 module.exports = function(app, Parse) {
     app.controller('sendCtrl', ['$scope', '$state', '$filter', '$rootScope', 'AccountsService', '$mdDialog', 'UtilService', 'Trans', '$messages',
         function($scope, $state, $filter, $rootScope, Accounts,$mdDialog, Util, Trans, $messages) {
             try {
              


                 //$messages.log(Accounts.currentAccount);
                 $scope.getQRcode = function(address) {
                     return Util.createQr(address);
                 }
                 $scope.hide = function() {
                     $mdDialog.hide();
                 };
                 $scope.cancel = function() {
                     $mdDialog.cancel();
                 };
                 $scope.answer = function(answer) {
                     $mdDialog.hide(answer);
                 };



             } catch (e) {
                 $messages.log(e);
             }
         }
     ]).controller('requestCtrl', ['AccountsService', '$scope', 'UtilService', function(Accounts, $scope, Util) {
         $scope.account = Accounts.currentAccount;
         $scope.getQRcode = function(address) {
             return Util.createQr(address);
         }
     }]);
 }
