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
require('../style/materialize.min.css')
require('../style/animate.css')
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

//load apps
SPAMS.helpers.loadApps(apps);
