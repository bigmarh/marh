var app = require('cloud/app.js');
var Email = require('cloud/modules/email.js');
var required = require('cloud/bitcore.js');
var bitcore = required('bitcore');
var Buffer = require('buffer').Buffer;
var _ = require('underscore');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

//Org
Parse.Cloud.define('orgExists', function(req, res) {
    Parse.Cloud.useMasterKey()
    var query = new Parse.Query('Org');
    query.equalTo('domain', req.params.domain);
    query.first().then(function(org) {
        res.success((org != undefined));
    })
});



Parse.Cloud.define('org_AddUser', function(req, res) {
    var password = makeid();
    var body = JSON.parse(req.body);
    Parse.Cloud.useMasterKey();

    //Check for user existence 
    var query = new Parse.Query(Parse.User);
    query.equalTo('email', body.username + '@' + body.domain);
    query.first().then(function(user) {
        if (user) {
            //If user exists add them to the org
            _addUserToOrg(user);
        } else {
            _createNewUser(body, _addUserToOrg);
        }
    })


    var _createNewUser = function(body, cb) {
        var email = body.username + '@' + body.domain;
        var email =  email.toLowerCase();
        var username = email;
        var password = new Buffer(24);
        _.times(24, function(i) {
            password.set(i, _.random(0, 255));
        });
        var userObj = {
            "username": username.toString('base64'),
            "password": password.toString('base64'),
            "email": email,
            "fullName": body.firstName + " " + body.lastName,
            "domain": body.domain,
            "authorized_by":Parse.User.current()
        }


        new Parse.User().signUp(userObj, {
            success: function(user) {
                console.log('Was successful');
                // Hooray! Let them use the app now.
                cb(user);
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                res.error(error.message);
            }
        });
    }

    var _addUserToOrg = function(user) {
        var orgQuery = new Parse.Query("Organization");
        orgQuery.equalTo('objectId', body.org);
        orgQuery.first().then(function(org) {
            var relation = org.relation('users');
            relation.add(user);
            org.save(null, {
                success: function(org) {
                    user.set('org', org);
                    user.save().then(res.success, res.error);
                }
            });
        })
    }

})


//Hello

Parse.Cloud.define("hello", function(request, response) {
    console.log("Hey");
    var privateKey = new bitcore.PrivateKey();
    response.success(new bitcore.Address([new bitcore.PublicKey(privateKey)], 2).toString());
});


//User Functions
Parse.Cloud.afterSave(Parse.User, function(request) {
    var template = null;
    var force = false;
    //Send Email After registration
    if (request.object.existed()) return;
    //Force a login and send different template for 
    if (!request.object.get('isAdmin')) {
        template = "invite_email";
        force = true;
    }

    Email.sendVerificationEmail(request.object, template, force);


});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*!@";

    for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
