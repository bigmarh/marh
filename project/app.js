//Load bitcoin Libraries
var cssify = require('cssify');
var emitter = require('events').EventEmitter;
window.ee = new emitter();
window.debug = true;
window.debugger = function(string, type) {
    if (!debug) return;
    if (type) return console[type](string);
    console.log(string)
}

//Load styles
require('../dist/bower_components/materialize/dist/css/materialize.min.css')
require('../dist/bower_components/animate.css/animate.min.css')
cssify.byUrl('https://material.angularjs.org/latest/angular-material.min.css')
cssify.byUrl('../style.css');

//require parse
var Parse = require('parse-browserify');
var config = require("./config");
Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);
//build app
var app = {
    $layouts: {},
};


var SPAMS = require('./core/SPAMS')(Parse, app);
var apps = require('bulk-require')(__dirname, ['apps/**/index.js'])
window.$cmp = require('bulk-require')(__dirname, [
    'components/**/index.js'
]).components;
//load components





//load apps
SPAMS.helpers.loadApps(apps);

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
