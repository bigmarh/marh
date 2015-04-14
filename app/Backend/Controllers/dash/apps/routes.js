module.exports = function(stateProvider) {
    stateProvider.state('app', {
        url: '/app',
          views: {
            '': {
                templateUrl: 'views/layouts/dash-layout.html',
            },
            'menu@app': {
                templateUrl: 'views/dash/menu/index.html',
                controller: 'menuCtrl'
            },
            'aux@app': {
                templateUrl: 'views/dash/aux/index.html',
            }
        }
    }).state('app.load', {
        url: '/:appName',
        views: {
            'content@app': {
                templateUrl: 'views/dash/content/apps/index.html',
                controller: 'appExternalCtrl'
            }
        }
    })
    
}