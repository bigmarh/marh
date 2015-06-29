//Load bitcoin Libraries
window.bip39 = require('bip39');

var cssify = require('cssify');

//Load styles
require('../style/angular-csp.css')
require('../style/animate.css')
cssify.byUrl('//ajax.googleapis.com/ajax/libs/angular_material/0.8.3/angular-material.min.css');
cssify.byUrl('style.css');

//require parse
var Parse = require('parse-browserify');
var config = require("./config");
Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);
window.Parse = Parse;




//Load Registry files
window.app = {routes:{}};
//register subsections like frontend back end etc
require('./layouts/')(m);
require('./registry.js')(m,Parse,app);

//Add routes
console.log(app.routes);
mx.route(app,config.initialRoute,app.routes)



//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything


//here's the view
