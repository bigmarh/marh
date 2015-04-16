module.exports = function(app, Parse) {
    
    var current_user = Parse.User.current();
    app.controller('registerCtrl', ['$scope', "$rootScope", '$state', '$messages',
        function($scope, $rootScope, $state, $messages) {
            if (!current_user) window.location = "/";

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
        if (current_user.get('personal_meta') ) return $state.go('register.step', {
            number: nextStep
        });


        $scope.meta = {
            email:current_user.get('email')
        }

        $scope.Next = function() {
        
            current_user.set('fullName', $scope.meta.fullName);
            current_user.set('password', $scope.password);
            current_user.set('domain', current_user.get('email').split('@')[1]);
            User.setMetaData(current_user, $scope.meta, function(info) {

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
        if (!current_user.get('personal_meta')) return $state.go('register.start');
        if (current_user.get('payload') && current_user.get('key_activated')) return $state.go('register.step', {
            number: 2
        });

        $scope.password = "qwepoi";

        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
            $scope.card = {};
        $scope.getCode = function() {
            User.setPayload(current_user, $scope.password, function(mnemonic) {
                $scope.code = mnemonic;
                $rootScope.$safeApply();
            })

        }

        $scope.checkCardNumber = function() {

            $messages.log($rootScope.cardNumber);
            $messages.log($scope.card.num);
            if ($rootScope.cardNumber == $scope.card.num) {
                $scope.checkNumberPassed = true;
                current_user.set('key_activated', true);
                current_user.save().then($messages.success,$messages.error);
            } else {
                $messages.error("This Card Number is not correct");
            }
        }
        $scope.DownloadCard = function() {
            //add Pdf download function
            $scope.downloadedCard = true;
        }
    

        $scope.Next = function() {
            $state.go('register.step', {
                number: nextStep
            })
        }

    }]).
    controller('Reg_Company', ['$scope', '$rootScope', '$state', '$messages', 'UserService', 'OrgService', function($scope, $rootScope, $state, $messages, User, Org) {
        if (!current_user.get('personal_meta')) return $state.go('register.start');
        if (!current_user.get('payload')) return $state.go('register.step', {
            number: 1
        });
        if (current_user.get('org')) return $state.go('register.step', {
            number: 3
        });
        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $scope.org = {
            domain: current_user.get('email').split('@')[1],
            name: "TestName",
        }
        $scope.Next = function() {
            Org.addRoles($scope.org, current_user, function(adminRole, orgObj) {
                Org.createCompany(adminRole, orgObj, function() {
                    console.log("Go to " + nextStep)
                    $state.go('register.step', {
                        number: nextStep
                    })
                })
            });

        }

    }]).
    controller('Reg_Company_KeyGen', ['$scope', '$rootScope', '$state', '$messages', 'UserService', 'OrgService', function($scope, $rootScope, $state, $messages, User, Org) {
        if (!current_user.get('personal_meta')) return $state.go('register.start');
        if (!current_user.get('payload') || !current_user.get('key_activated')) return $state.go('register.step', {
            number: 1
        });
        if (!current_user.get('org')) return $state.go('register.step', {
            number: 2
        });

        current_user.get('org').fetch().then(function(org) {
            if (org.get('payload'))
                $scope.Next();

        })



        var nextStep = ($state.params.number) ? parseInt($state.params.number) + 1 : 1;
        $scope.password = "1234567890";
        $scope.getCode = function() {
            current_user.get('org').fetch().then(function(org) {
                $scope.org = org;
                Org.setPayload(org, $scope.password, function(mnemonic) {
                    $scope.code = mnemonic;
                    $rootScope.$safeApply();
                })
            })
        }
        $scope.card = {};

        $scope.checkCardNumber = function() {

            $messages.log($rootScope.cardNumber);
            $messages.log($scope.card.num);
            if ($rootScope.cardNumber == $scope.card.num) {
                $scope.checkNumberPassed = true;
                $scope.org.set('key_activated', true);
                $scope.org.save();
            } else {
                $messages.error("This Card Number is not correct");
            }
        }
        $scope.DownloadCard = function() {
            //add Pdf download function
            $scope.downloadedCard = true;
        }


        $scope.Next = function() {
            window.location = "/app/"
        }

    }])


}
