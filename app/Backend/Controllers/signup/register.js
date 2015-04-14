
module.exports = function(app, Parse) {
    app.controller('registerCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout', 'UtilService', '$location',
        function($scope, $rootScope, $state, Wallet, $timeout, util, $location) {
            top.location !== location && (top.location = location);

            $scope.userObj = {};
            $scope.userObj = {
                email: $location.search().username
            }
            Parse.Cloud.run('loginWithCoinId', {
                coinId: $location.search().username
            }, {
                success: function(result) {
                    Parse.User.become(result, {
                        success: function(result) {
                            if (result.get('emailVerified')) return;
                            else $state.go('home.index');
                        },
                        error: function(error) {
                            $state.go('home.index');
                        }
                    })
                },
                error: function(error) {
                $state.go('home.index');
                }
            });

            $scope.signUp = function() {
                $scope.userObj.email = $scope.userObj.email.toLowerCase();
                $scope.userObj.username = $scope.userObj.email;
                var user = Parse.User.current();
                user.signUp($scope.userObj, {
                    success: function(user) {
                        // Hooray! Let them use the app now.
                        $state.go('signup.chooseType');
                    },
                    error: function(user, error) {
                        // Show the error message somewhere and let the user try again.
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
        }
    ])
}
