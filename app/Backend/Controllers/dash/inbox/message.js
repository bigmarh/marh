module.exports = function(app, Parse) {
    app.controller('messageCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService',
        function($scope, $state, $rootScope, Accounts, Wallet, Util) {
            if (!Parse.User.current()) $state.go('home.index');
            $scope.id = $state.params.id;
            $rootScope.showMessage = 50;

        }
    ]);



}
