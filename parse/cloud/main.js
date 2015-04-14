var app = require('cloud/app.js');
var Email = require('cloud/modules/email.js');
var required = require('cloud/bitcore.js');
var bitcore = required('bitcore');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:



Parse.Cloud.define("hello", function(request, response) {
    console.log("Hey");
    var privateKey = new bitcore.PrivateKey();
    response.success(new bitcore.Address([new bitcore.PublicKey(privateKey)], 2).toString());
});


//User Functions
Parse.Cloud.afterSave(Parse.User, function(request) {
    //Send Email After registration
    if (request.object.existed()) return;
    Email.sendVerificationEmail(request.object);


});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*!@";

    for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
