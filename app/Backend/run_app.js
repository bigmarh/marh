module.exports = function(app, Parse) {
    app.run(['$rootScope', '$state','AccountsService','$messages',
        function($rootScope, $state,Account,$messages) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                $messages.log("Started:"+toState.name);
                if(!Parse.User.current()){
                    event.preventDefault();
                    window.location = "/";
                }
                Account.state = toState.name;
        
            })

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            	event.preventDefault();
                $messages.log("Error:"+toState.name);
                $messages.log(error.stack);
            	
                // Redirect to new page
               if(Account.state != error.nextState || Account.state.split('.')[0] != error.nextState ) $state.go(error.nextState,{type:error.type});
            });

        }
    ])
}
