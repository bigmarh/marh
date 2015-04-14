module.exports = function(app, Parse) {
    app.controller('inviteCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout',
        function($scope, $rootScope, $state, Wallet, $timeout) {
           $scope.userObj = {};
          $scope.user = Parse.User.current();
          $scope.team = [{},{},{},{}];
            $scope.addTeam = function() {

                for(k in $scope.team){
                    if(!$scope.team[k].username) continue;
                var user = new Parse.Object.extend('Invitees');
                $scope.team[k].username = $scope.team[k].email;
                user.save($scope.team[k]);
                }
              
            }
        }
    ])
}
