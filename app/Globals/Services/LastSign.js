var required = require('../helpers/bitcore');
var bitcore = required('bitcore');
var CryptoJS = require('crypto-js');
var uuid = require('node-uuid');
var config = require("../../config");
module.exports = function(app, Parse) {
    app.service('LastSign', ['$http', 'UtilService', '$rootScope', 'BlockCypher', '$timeout', function($http, util, $rootScope, BlockCypher, $timeout) {

        var lastSign = {

            createSignWithAC: function(success,account_id,type){
                account_id  =  account_id || "pP9d35rDKz";
                Parse.Cloud.run('registerLastSign',{id:account_id,type:type}, {
                    success: success
                });
            },
            getLSXpub: function(account_id){
                account_id  =  (typeof account_id == "string") || "pP9d35rDKz";
                console.log(account_id);
                Parse.Cloud.run('getLSXpub',{account_id:account_id}, {
                    success: console.log
                });  
            },
            requestSign: function(sharedKey,secret,tx,success) {
                console.log("Request last sign Transaction");
                Parse.initialize('i9Ml1HXLEGndHJOB8YEogjRMi4A5BBSqtqzBNwnf', 'cZW2JOfHp8t1Y6TDaxjsbzkIg95C4iWYxV4t47hL');
                Parse.Cloud.run('requestSign', {
                    secret: secret,
                    tx:JSON.parse(JSON.stringify(tx)),
                    sharedKey: sharedKey
                }, {
                    success: success
                });
                Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);

            },
            create: function(sharedKey,secret, success, error) {
                console.log("Create last sign  keychain");
                Parse.initialize('i9Ml1HXLEGndHJOB8YEogjRMi4A5BBSqtqzBNwnf', 'cZW2JOfHp8t1Y6TDaxjsbzkIg95C4iWYxV4t47hL');
                Parse.Cloud.run('registerLastSign', {
                    secret: secret,
                    sharedKey: sharedKey
                }, {
                    success: function(results){
                        success(results);
                    },
                    error: function(err){
                        error(err);
                    }
                });
                Parse.initialize(config.Parse.appId, config.Parse.javascriptKey);
            },


        }

        return lastSign;
    }])
}
