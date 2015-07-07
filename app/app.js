//Load bitcoin Libraries
window.bip39 = require('bip39');
var cssify = require('cssify');

//Load styles
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
var emitter = require('events').EventEmitter;
window.ee = new emitter();

//load layout sections like header footer etc
require('./layouts/')(app);
var register = require('./registry.js');
//load section apps
register.loader(Parse, app);

//Register with SPAMS;
window.$pa = require('./core/SPAMS')(app);
