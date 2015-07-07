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
register.loader(Parse, app);

//Register with SPAMS;
window.$pa = require('./core/SPAMS')(app);

console.log(app)

function appBoil() {
  //Add routes
  m.route(document.getElementById('content'), '/', {
    '/': {
      view: function() {
        return "Hello"
      }
    },
    '/todo': {
      view: function() {
        return "Todo"
      }
    },
    '/new': {
      controller: function() {
        if (Parse.User.current()) m.route('/');
        console.log("Called New")
      },
      view: function() {
        return [m('div', 'This is a test'), m("picture-frame", m('img', {
          src: "https://www.polymer-project.org/images/logos/p-logo-32.png"
        }))]
      }
    },
    '/new/:id': {
      controller: function() {
        console.log("Called New")
        return {
          id: m.route.param("id")
        };
      },
      view: function(ctrl) {
        return [m('div', 'This is a test ' + ctrl.id), m("picture-frame",
          m(
            'img', {
              src: "https://www.polymer-project.org/images/logos/p-logo-32.png"
            }))]
      }
    }
  })
}
