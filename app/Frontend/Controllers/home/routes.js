module.exports = function(stateProvider, Parse) {
    stateProvider.state('home', {
        templateUrl: 'views/layouts/wholepage-layout.html', // layout file
    }).state('home.support', {
        url: '/support',
        templateUrl: 'views/home/support.html'
    }).state('home.pricing', {
        url: '/pricing',
        templateUrl: 'views/home/pricing.html'
    }).state('home.index', {
        url: '/',
        templateUrl: 'views/home/index.html',
        controller: "homeCtrl"
    })
}
