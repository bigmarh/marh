module.exports = function(app, Parse) {
    app.controller('registerCtrl', ['$scope', "$rootScope", '$state', '$messages',
        function($scope, $rootScope, $state, $messages) {

            var steps = {
                "default":{
                    name:"Personal Info",
                    template: "views/register/reg_personal.html"
                },
                1: {
                    name: "Personal Key Gen",
                    template: "views/register/reg_personal_keyGen.html"
                },
                2: {
                    name: "Company Info",
                    template: "views/register/reg_company.html"
                },
                3: {
                    name: "Company Key Gen",
                    template: "views/register/reg_company_keyGen.html"
                }

            }

            $scope = {
                userObj: {
                    email: Math.random() + "@lovewills.us"
                },
                currentStep: steps[$state.params.number] || steps["default"],
                
                signUp: function() {
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

        }
    ]).
    controller('Reg_Ver', ['$scope', function($scope) {
        var query = Parse.Query()

    }]).
    controller('Reg_Personal', ['$scope', function($scope) {

    }]).
    controller('Reg_Personal_KeyGen', ['$scope', function($scope) {

    }]).
    controller('Reg_Company', ['$scope', function($scope) {

    }]).
    controller('Reg_Company_KeyGen', ['$scope', function($scope) {

    }])


}
