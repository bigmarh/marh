var googleLoaded = false;
window.signinCallback;
function render(){
    gapi.signin.render('customBtn');
}

module.exports = function(app, Parse) {
    app.factory('GoogleService', ['$state', '$http', '$resource', '$rootScope','$messages',
        function($state, $http, $resource, $rootScope,$messages) {
            var Google = {
                signIn: function() {
                    $messages.log("Made Signin")
                    gapi.auth.signIn(Google.additionalParams());
                },
                signinCallback: function(authResult) {

                    if (authResult['status']['signed_in']) {
                        // Update the app to reflect a signed in user
                        // Hide the sign-in button now that the user is authorized, for example:
                        gapi.client.load('plus', 'v1', function() {
                            var request = gapi.client.plus.people.get({
                                'userId': 'me'
                            });
                            request.execute(function(resp) {
                                $messages.log('Retrieved profile for:' + resp.displayName);
                                $messages.log(authResult);
                                $messages.log(resp);
                             Parse.Cloud.run('findGoogleUser', {accessToken:authResult.access_token,GoogleData:resp}).then(function(result) {
                                    Parse.User.become(result).then(function(user) {
                                            window.location.href = '/app/'
                                        },
                                        function(error) {
                                            alert('Login with Google Failed.');
                                            window.location.href = '/';
                                        });
                                }, function(error) {

                                })


                            });
                        });

                    } else {
                        // Update the app to reflect a signed out user
                        // Possible error values:
                        //   "user_signed_out" - User is signed-out
                        //   "access_denied" - User denied access to your app
                        //   "immediate_failed" - Could not automatically log in the user
                        $messages.log('Sign-in state: ' + authResult['error']);


                    }
                }
            }

            window.signinCallback = Google.signinCallback;
            Google.additionalParams = function() {
                return {
                    'callback': Google.signinCallback
                };
            }
            return Google;
        }
    ])
}
