module.exports = function(stateProvider) {
    stateProvider.state('signup', {
        url: '/welcome',
        abstract: true,
        templateUrl: 'views/layouts/wholepage-layout.html', // layout file
    }).state('signup.register', {
        url: '/',
        templateUrl: 'views/signup/register.html',
        controller: "registerCtrl"
    }).state('signup.chooseType', {
        url: '/chooseType',
        templateUrl: 'views/signup/chooseType.html',
        controller:'chooseTypeCtrl'
    }).state('signup.invite', {
        url: '/invite',
        templateUrl: 'views/signup/invite.html',
        controller:'inviteCtrl'
    }).state('signup.companyReg', {
        url: '/companyReg',
        templateUrl: 'views/signup/companyReg.html',
        controller:'companyRegCtrl'
    });
}
