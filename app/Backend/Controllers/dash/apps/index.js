module.exports = function(app, Parse) {
    app.controller('appExternalCtrl', ['$scope', '$state',  '$rootScope', '$filter', 'WalletService', '$timeout', '$http', 'BlockCypher', '$sce','AppService',
    function($scope, $state,  $rootScope, $filter, Wallet, timeout, http, BlockCypher, $sce,App) {
        if(!$state.params.appName) $state.go('accounts');
        $scope.app = App.getApps()[$state.params.appName];
        console.log($scope.app);
        var url = $scope.app.appUrl + "?addr=" + $scope.app.address;
        $scope.app.appUrl = $sce.trustAsResourceUrl(url);

        window.uploadDone = function() {
            /* have access to $scope here*/
            document.getElementById('appFrame').style.display = "block";
        }
    }
])
}



