 //Load bitcoin Libraries
 var cssify = require('cssify');
 var emitter = require('events').EventEmitter;
 window.ee = new emitter();
 window.debug = true;
 window.debugger = function(string, type) {
     if (!debug) return;
     if (type) return console[type](string);
 }

 window.Buffer = require('buffer').Buffer;

 //Load styles
 require('../dist/bower_components/materialize/dist/css/materialize.min.css')
 require('../dist/bower_components/animate.css/animate.min.css')
 require('../style/angular-layout.css')
 cssify.byUrl('../style.css');
cssify.byUrl('../lamar.css');

 //require parse
 var Parse = require('parse-browserify');
 var config = require("./config");
 window.$globalConfig = config;
 Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);
 //build app
 var app = {
     $layouts: {},
     $core: {},
     $globalConfig: config
 };

 //load global components
 app.$core.$cmp = require('bulk-require')(__dirname, [
     'core/components/**/*.js'
 ]).core.components;
 app.$cmp = require('bulk-require')(__dirname, [
     'components/**/index.js',
 ]).components || {};
//load global libraries
 app.$libs = require('bulk-require')(__dirname, [
     'libs/**/*.js',
 ]).libs;
 app.$core.$libs = require('bulk-require')(__dirname, [
     'core/libs/**/*.js'
 ]).core.libs;

//load global services
 app.$services = require('bulk-require')(__dirname, [
     'services/**.js',
 ]).services;
 app.$core.$services = require('bulk-require')(__dirname, [
     'core/services/**.js'
 ]).core.services;



 var SPAMS = require('./core/SPAMS')(Parse, app);
 var apps = require('bulk-require')(__dirname, ['apps/**/index.js'])

 //load apps
 SPAMS.helpers.loadApps(apps);

 // load and initialize the hashModal
var hashModal = $load.library('$hashModal', {app: app}).init();

 (function() {
     var lastTime = 0;
     var vendors = ['webkit', 'moz'];
     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
         window.requestAnimationFrame = window[vendors[x] +
             'RequestAnimationFrame'];
         window.cancelAnimationFrame =
             window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] +
                 'CancelRequestAnimationFrame'];
     }

     if (!window.requestAnimationFrame)
         window.requestAnimationFrame = function(callback, element) {
             var currTime = new Date().getTime();
             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
             var id = window.setTimeout(function() {
                     callback(currTime + timeToCall);
                 },
                 timeToCall);
             lastTime = currTime + timeToCall;
             return id;
         };

     if (!window.cancelAnimationFrame)
         window.cancelAnimationFrame = function(id) {
             clearTimeout(id);
         };
 }());
