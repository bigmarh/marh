window.steps = {
    "default": {
        name: "Personal Info",
        controller:"Reg_Personal",
        template: "views/register/reg_personal.html"
    },
    1: {
        name: "Personal Key Gen",
        controller:"Reg_Personal_KeyGen",
        template: "views/register/reg_personal_keyGen.html"
    },
    2: {
        name: "Company Info",
        controller:"Reg_Company",
        template: "views/register/reg_company.html"
    },
    3: {
        name: "Company Key Gen",
        controller:"Reg_Company_KeyGen",
        template: "views/register/reg_company_keyGen.html"
    }

}



module.exports = function(stateProvider, Parse) {
    stateProvider.state('register', {
            abstract: true,
            controller: "registerCtrl",
            templateUrl: 'views/layouts/wholepage-layout.html', // layout file
        }).state('register.step', {
            url: '/step/:number',
            resolve: {
                checkParams: ['$stateParams', '$rootScope', function($stateParams, $rootScope) {
                    return $rootScope.currentStep = steps[$stateParams.number] || steps["default"];
                }]
            },
            templateUrl: 'views/register/index.html'
        })
        .state('register.start', {
            url: '/',
            resolve: {
                checkParams: ['$rootScope', function($rootScope) {
                    $rootScope.current_user = Parse.User.current().fetch();
                    return $rootScope.currentStep = steps["default"];
                }]
            },
            templateUrl: 'views/register/index.html'
        })
}
