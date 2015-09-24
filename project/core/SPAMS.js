module.exports = function(Parse, app) {

    var SPAMS = {
        registerApp: function(app) {
            return SPAMS.app = app;
        },
        bootstrapCalled: false,
        app: {},
        appElement: {},
        appRoot: "",
        appRoutes: [],
        loaded: false,
        loadApp: function() {
            if (SPAMS.loaded) return;
            SPAMS.loaded = true;
            SPAMS.appElement = (SPAMS.appElement) ? SPAMS.appElement : document.getElementById('content');
            
            // get requested route
            // var requestedRoute = window.location.search.substring( window.location.search.indexOf("?")+1 );
            m.route(SPAMS.appElement, SPAMS.appRoot, SPAMS.appRoutes);
        },
        bootstrap: function(appName, element) {

            if (SPAMS.bootstrapCalled) return console.error(
                "Bootrap called more than once.  Please find the problem this could damage your app"
            )
            SPAMS.bootstrapCalled = true;
            var app = SPAMS.app[appName];

            //load layout if specified
            if (app.$meta.layout) ee.emit('load.' + app.$meta.name + '.' + app.$meta.layout);
            var element = (element) ? element : document.getElementById(
                'content');
            var root = (app.$meta.root) ? app.$meta.root : '/';
            root = (app.$routes[root]) ? root : Object.keys(app.$routes)[0];
            SPAMS.appElement = element;
            SPAMS.appRoot = root;
            SPAMS.appRoutes = app.$routes;
            //load app
            if (element)
                SPAMS.loadApp();
        },

        core: require('./core')(Parse, app),
        helpers: require('./helpers')(Parse, app),
    }


    SPAMS.registerApp(app);
    //Load Elements
    require('./elements')();

    window.$pa = {};
    window.$pa.bootstrap = SPAMS.bootstrap;
    window.$pa.helpers = SPAMS.helpers;
    window.$pa.core = SPAMS.core;
    
    window.$User = $load.service('User');
    window.$settings = require('../$settings');
    require('./components/$keypad')(null, app);
    // require('./components/$lazyLoader')(null, app);
    $load.library('$toastAlert', {app: app}).init();
    $load.library('$fullLoader', {app: app}).init();
    $load.library('compose', {app: app}).init();
    
    window.$DataHandler = $load.service('$DataHandler');
    window.$_request = $load.service('$_request');
    window.currentUser = SPAMS.helpers.currentUserSetup;

    //Register with SPAMS;
    window.$location = SPAMS.helpers.location;
    window.$convertToFiat = SPAMS.helpers.convertToFiat;
    window.$loader = $pa.helpers.loader;
    //creates global components
    $pa.c = SPAMS.core.component;
    window.$keypad = $pa.c('$keypad');


    document.addEventListener("DOMContentLoaded", function(event) {
        var app = document.documentElement.getAttribute('marh-app');
        if (app) SPAMS.bootstrap(app);
    });

    return SPAMS;
}
