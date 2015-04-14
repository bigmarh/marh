module.exports = function(app, Parse) {
    app.controller('orgRegCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout', 'UtilService','OrgService','hasAccount',
        function($scope, $rootScope, $state, Wallet, $timeout, util,Org,hasAccount) {
            $scope.org = {}
            $scope.org.domain = Parse.User.current().get('domain'); 

            $scope.createOrg = function() {
                if($scope.password != $scope.confirmPassword) return  Error("The passwords do not match. Please confirm.");

                Org.addRoles($scope,Parse.User.current(),function(result){
                    $state.go('accounts.index');
                },function(err){

                });
            }



        }
    ])
}
