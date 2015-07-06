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
//window.Parse = Parse;



//Load Registry files
window.app = {
  routes: {}
};
//register layout sections like header footer etc
require('./layouts/')(m);
var register = require('./registry.js');

register.loader(m, Parse, app);
register.buildRoutes()

//Add routes
m.route(document.getElementById('content'), '/', {
  '/': app.hello,
  '/todo': app.todo,
  '/new': {
    controller: function() {
      if(Parse.User.current()) m.route('/todo');
    },
    view: function() {
      return m('div', 'This is a test')
    }
  }
})
