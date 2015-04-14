/*module.exports = function(app, Parse) {
    app.run(['$rootScope', '$state',
        function($rootScope, $state) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                console.log("Started:"+toState.name);
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
             event.preventDefault();

            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            	event.preventDefault();
                console.log("Error:"+toState.name);
            	
                // Redirect to new page
                $state.go(error.nextState);
            });

        }
    ])
}
*/