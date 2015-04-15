require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');
require('ui-router/release/angular-ui-router');

//Load bitcoin Libraries
var bitcore = window.bitcore = require('bitcore');
window.bip39 = require('bip39');

//require parse
var Parse = require('parse-browserify');
var config = require("./config");
Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);
window.Parse = Parse;
var defaultModules = function(addOnArray){
	var def =  ['ui.router','angular.filter', 'Scope.safeApply', 'ngResource','ngMaterial'];
	if(addOnArray) def = def.concat(addOnArray);
	return def;
} 



	
var app = angular.module('myapp', defaultModules());
require('./Globals')(app, Parse);
var appHome = angular.module('home',['myapp']);
var appRegister = angular.module('register',['ui.router','angular.filter', 'Scope.safeApply', 'ngResource','ngMaterial']);
require('./Globals')(appRegister, Parse);


appHome.config(require('./Frontend/routes')(Parse));
app.config(require('./Backend/routes')(Parse));
appRegister.config(require('./Register/routes')(Parse));

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
         $sceDelegateProvider.resourceUrlWhitelist(['self', 
         	'https://api.blockcypher.com/**'
         	]);
}])


require('./Backend/module')(app,Parse);
require('./Frontend/module')(appHome,Parse);
require('./Register/module')(appRegister,Parse);



//helpers
angular.module('Scope.safeApply', []).run(['$rootScope', require('./helpers/safeApply')]);


