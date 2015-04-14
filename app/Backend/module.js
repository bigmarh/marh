module.exports = function(app, Parse) {

 
    //controller
    require('./Controllers')(app, Parse);
    //directives
    require('./Directives')(app, Parse);
    //services
    require('./Services')(app, Parse);
    //Filters
    require('./Filters')(app, Parse);
    require('./run_app')(app, Parse);
    //Load styles
    require('./styles')


}
