module.exports = function(app, Parse) {
    app.controller('homeCtrl', ['$scope', "$rootScope", '$state','$messages',
        function($scope, $rootScope, $state,$messages) {
            if (Parse.User.current()) return window.location = "/register/";
            /*  Parse.User.logIn('lamar@pheeva.com','1234').then(function(user){
                        if(user) $state.go('accounts.summary');
                      })*/
            $scope.userObj = {email:Math.random()+"@lovewills.us"};
            $scope.signUp = function() {
                var user = new Parse.User();
                $scope.userObj.username = $scope.userObj.email.toLowerCase();
                $scope.userObj.password = "TempPassword";
                user.signUp($scope.userObj, {
                    success: function(user) {
                        // Hooray! Let them use the app now.
                        // console.log(user);
                        $messages.success('You will recieve verification email soon.')
                    },
                    error: function(user, error) {
                        // Show the error message somewhere and let the user try again.
                        $messages.error("Error: " + error.code + " " + error.message);
                    }
                });
            }();


        }
    ])
}
