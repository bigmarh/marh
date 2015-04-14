module.exports = function($stateProvider, Parse, resolvers) {
    require('./accounts/routes.js')($stateProvider, Parse, resolvers);
    require('./org/routes.js')($stateProvider, Parse, resolvers);
    require('./inbox/routes.js')($stateProvider, Parse, resolvers);
    require('./apps/routes.js')($stateProvider, Parse, resolvers);
    $stateProvider.state('dash', {
        resolve: {
            checkAll: resolvers.checkAll,
            
        }    
    })
}

/**/
