var CryptoJS = require('crypto-js');
var uuid = require('node-uuid');

module.exports = function(app, Parse) {
    app.factory('UserService', ['$state', '$http', '$resource', '$rootScope', 'WalletService', '$messages','UtilService',
        function($state, $http, $resource, $rootScope, Wallet, $messages,util) {
            var restrictedAcl = new Parse.ACL(Parse.User.current());
            restrictedAcl.setPublicReadAccess(false);
            restrictedAcl.setPublicWriteAccess(false);

            var User = {
                checkRegState: function() {

                },
                setMetaData: function(user, data, success, error) {
                    var Meta = Parse.Object.extend('Meta');
                    var meta = new Meta();
                    var ACL = new Parse.ACL();
                    ACL.setWriteAccess(user, true);
                    meta.setACL(ACL)
                    meta.save(data).then(function(info) {
                        user.set('personal_meta', info);
                        user.save();
                        success(info)
                    }, error)
                },
                setPayload: function(user, obj, cb, cbErr) {
                    var sharedKey = uuid.v4();
                    mnemonic = bip39.generateMnemonic();
                    var HD = new bitcore.HDPrivateKey.fromSeed(bip39.mnemonicToSeed(mnemonic));
                    var payloadObj = {
                        sharedKey: sharedKey,
                        privKey: HD.xprivkey
                    }

                    var passWordEncKey = bitcore.encoding.Base58(bitcore.crypto.Random.getRandomBufferBrowser(18)).toString();
                    var encKey = Wallet.encryptKey(JSON.stringify(payloadObj), "" + obj.password);
                    var encPass = Wallet.encryptKey("" + obj.password, passWordEncKey);
                    var Payload = Parse.Object.extend('Payload')
                    var payload = new Payload();
                    //restrict Access Level
                    payload.setACL(restrictedAcl);
                    payload.set('content', encKey);
                    payload.set('type', 'personal')
                    payload.set('identifier', user.id);
                    payload.set('secret', bitcore.crypto.Hash.sha256(new Buffer(sharedKey)).toString('hex'));
                    payload.set('passWordEncKey', passWordEncKey);
                    var cardNumber = $rootScope.cardNumber = util.makeId(7, 'digits');
                    payload.set('cardNumber', cardNumber);
                    $messages.log(cardNumber);
                    payload.save().then(function(payload) {
                        $messages.log([{
                            title: "Encrypted Private Key",
                            content: payload.get('content')
                        }, {
                            title: "Encrypted Passcode",
                            content: encPass
                        }]);
                        user.set('user-key_activated', false);
                        user.set('payload', payload);
                        user.save();
                        cb(mnemonic);
                    }, function(error) {
                        cbErr(error);
                    });


                }
            }
            return User;
        }
    ])
}
