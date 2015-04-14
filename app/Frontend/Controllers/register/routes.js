module.exports = function(stateProvider, Parse) {
    stateProvider.state('register', {
        abstract: true,
        templateUrl: 'views/layouts/wholepage-layout.html', // layout file
    }).state('regsiter.step', {
        url: '/step/:number',
        templateUrl: 'views/register/index.html'
    })
}
