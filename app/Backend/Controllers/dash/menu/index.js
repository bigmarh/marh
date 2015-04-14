module.exports = function(app, Parse) {
    app.controller('menuCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout', 'AppService',
        function($scope, $rootScope, $state, Wallet, $timeout, App) {
        	$scope.isAdmin = Parse.User.current().get('isAdmin');
        	$scope.orgName = Parse.User.current().get('domain')
            $scope.userApps = []; //App.getApps();       
        }
    ])
}
