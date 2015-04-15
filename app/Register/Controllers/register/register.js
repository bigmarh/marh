module.exports = function(app, Parse) {
    app.controller('registerCtrl', ['$scope', "$rootScope", '$state', '$messages',
        function($scope, $rootScope, $state, $messages) {
            if (!Parse.User.current()) window.location = "/";

            $rootScope.current_user = Parse.User.current();
            $rootScope.currentStep = steps[$state.params.number] || steps["default"];
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

            }


        }
    ]).
    controller('Reg_Personal', ['$scope', '$rootScope', '$state', '$messages', 'UserService', function($scope, $rootScope, $state, $messages, User) {
        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $rootScope.currentStep = steps["default"];
        if ($rootScope.current_user.get('personal_meta')) return $state.go('register.step', {
            number: nextStep
        });

        $scope.Next = function() {
            if (!$scope.meta || Object.keys($scope.meta).length == 0) {
                $scope.meta = {
                    fullName: "Lafe Taylor",
                }
                $scope.password = "1234567890";
            }
            $rootScope.current_user.set('password', $scope.password);
            $rootScope.current_user.set('domain', $rootScope.current_user.get('email').split('@')[1]);
            User.setMetaData($rootScope.current_user, $scope.meta, function(info) {

                $state.go('register.step', {
                    number: nextStep
                })
            }, function(err) {
                $messages.error(err)
            })

        }
    }]).
    controller('Reg_Personal_KeyGen', ['$scope', '$rootScope', '$state', '$messages', 'UserService', function($scope, $rootScope, $state, $messages, User) {
        //Check for personal Meta data
        if (!$rootScope.current_user.get('personal_meta')) return $state.go('register.start');
        if ($rootScope.current_user.get('payload')) return $state.go('register.step', {
            number: 2
        });

        $scope.password = "qwepoi";

        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $scope.getCode = function() {
            User.setPayload($rootScope.current_user, $scope.password, function(mnemonic) {
                $scope.code = mnemonic;
                $scope.$safeApply();
            })

        }
        $scope.Next = function() {
            $state.go('register.step', {
                number: nextStep
            })
        }

    }]).
    controller('Reg_Company', ['$scope', '$rootScope', '$state', '$messages', 'UserService', function($scope, $rootScope, $state, $messages, User) {
        if (!$rootScope.current_user.get('personal_meta')) return $state.go('register.start');
        if (!$rootScope.current_user.get('payload')) return $state.go('register.step', {
            number: 1
        });
        if ($rootScope.current_user.get('company')) return $state.go('register.step', {
            number: 3
        });
        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $scope.Next = function() {



            $state.go('register.step', {
                number: nextStep
            })
        }

    }]).
    controller('Reg_Company_KeyGen', ['$scope', '$rootScope', '$state', '$messages', 'UserService', function($scope, $rootScope, $state, $messages, User) {
        if (!$rootScope.current_user.get('personal_meta')) return $state.go('register.start');
        if (!$rootScope.current_user.get('payload')) return $state.go('register.step', {
            number: 1
        });
        if (!$rootScope.current_user.get('company')) return $state.go('register.step', {
            number: 2
        });
        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $scope.Next = function() {
            $state.go('register.step', {
                number: nextStep
            })
        }

    }])


}
