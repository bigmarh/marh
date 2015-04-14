module.exports = function(Parse) {
    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
		 require('./Controllers/register/routes')($stateProvider, Parse);
    
    }]
};
