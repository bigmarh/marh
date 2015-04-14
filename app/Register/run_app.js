module.exports = function(app, Parse) {
    app.run(['$rootScope', '$state','$messages',
        function($rootScope, $state,$messages) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                $messages.log("Started:"+toState.name);
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
             event.preventDefault();

            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            	event.preventDefault();
                $messages.log("Error:"+toState.name);
            	$messages.log(error.stack);
                // Redirect to new page
                $state.go(error.nextState);
            });

        }
    ])
}
