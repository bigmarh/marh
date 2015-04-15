/*var required = require('../helpers/bitcore');*/

var CryptoJS = require('crypto-js');
var uuid = require('node-uuid');
window.currency = {
    currency: "USD",
    country: "United States Dollar",
    country_code: "us",
    symbol_native: "$",
    symbol: "$",
    $$hashKey: "00E"
};
module.exports = function(app, Parse) {
    window.Buffer = Buffer;
    app.service('WalletService', ['$http', 'UtilService', '$rootScope', 'BlockCypher', '$timeout', 'LastSign', function($http, util, $rootScope, BlockCypher, $timeout, LastSign) {
        var Wallet = {
            details: {},
            ks: [],
            picpass: "",
            pin: "",
            currentDer: 0,
            bkdetails: "",
            balanceUpdateDelay: 200,
            balance: function() {
                if (!$rootScope.spot_rate) return "----";
                return localStorage.balance || 0;
            },
            payAddress: function() {
                return Wallet.details.address || Parse.User.current().get('address')
            },
            exists: function() {
                return localStorage.wallet;
            },
            load: function() {

            },
            hasDetails: function() {
                return Object.keys(Wallet.details).length;
            },
            getPasspics: function(cb) {
                $http.get('./dic/passpics.json').success(function(response) {
                    cb(response);
                })
            },
            sortPubKeys: function(ks) {
                //sort lexicographically, i.e. as strings, i.e. alphabetically
                return ks.sort(function(buf1, buf2) {
                    var len = buf1.length > buf1.length ? buf1.length : buf2.length;
                    for (var i = 0; i <= len; i++) {
                        if (buf1[i] === undefined)
                            return -1; //shorter strings come first
                        if (buf2[i] === undefined)
                            return 1;
                        if (buf1[i] < buf2[i])
                            return -1;
                        if (buf1[i] > buf2[i])
                            return 1;
                        else
                            continue;
                    }
                    return 0;
                });

            },
            isAddressValid: function(address) {
                return bitcore.Address.isValid(address);
            },
            getPublicKey: function(keychain) {
                var hd = bitcore.HDPublicKey(keychain.xpub);
                var acct = hd.derive('m' + keychain.path);
                return acct.publicKey.toString();
            },
            createMultisig: function(pubkeys, network, num) {
                M = num || 2;
                network = network || type;
                return bitcore.Address.createMultisig(pubkeys, M, network);
            },
            encryptKey: function(key, secret, address) {
                return CryptoJS.AES.encrypt(key, secret).toString();
            },
            decryptKey: function(key, secret) {
                return CryptoJS.AES.decrypt(key, secret).toString(CryptoJS.enc.Utf8);
            },
            getPinToken: function(cb) {
                var Token = Parse.Object.extend('Tokenize');
                var query = new Parse.Query(Token);
                query.first().then(function(token) {
                    var tokenized = Wallet.decryptKey(localStorage.pinned, token.id);
                    cb(tokenized);
                })
            },
            pinTokenize: function(key, pin) {
                var token = Parse.Object.extend('Tokenize');
                var privateToken = new token();
                var d = new Date();
                d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
                privateToken.set('expires', new Date(d));
                privateToken.set('userId', Parse.User.current().id);
                privateToken.setACL(new Parse.ACL(Parse.User.current()));
                privateToken.save(null, {
                    success: function(token) {
                        sessionStorage.token = token.id;
                        localStorage.pinned = Wallet.encryptKey(Wallet.encryptKey(key, pin), token.id);
                    }
                });
            },
            constructPass: function(pics, pin) {
                return util.constructPass(pics, pin);
            },
            getPayload: function() {
                var query = new Parse.Query("Payload");
                query.first({
                    success: function(results) {
                        return results.get('content');
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            },
            setQr: function(address) {
                if (localStorage.qrcode) return;
                return localStorage.qrcode = util.createQr(address);
            },
            getBalance: function(address) {
                console.log("Called for Balance");
                return BlockCypher.getBalance(address, type).then(Wallet.updateBalance);
            },
            getSpotPrice: function() {
                var url = "https://api.coindesk.com/v1/bpi/currentprice/" + currency.currency + ".json" || 'http://api.bitcoinaverage.com/no-mtgox/ticker/' + currency || "https://coinbase.com/api/v1/prices/spot_rate?currency=" + currency;
                return $http.get(url).success(function(response) {
                    $rootScope.spot_rate = response.bpi[currency.currency].rate_float;
                    $timeout(Wallet.getSpotPrice, 10000);
                    $rootScope.$safeApply();
                });
            },
            setupSockets: function() {
                var bcWS = new WebSocket(BlockCypher.ws(type));
                bcWS.onopen = function(msg) {
                    var message = {
                        "filter": 'addr=' + Wallet.payAddress(),
                        "token": BlockCypher.token
                    };
                    console.log("connected to blockcypher WebbcWS")
                    bcWS.send(JSON.stringify(message));
                }

                bcWS.onmessage = function(msg) {
                    setTimeout(function() {
                        Wallet.getBalance(true);
                    }, Wallet.balanceUpdateDelay);
                }
            },
            createPrivKeyfromDic: function(cb, type) {
                util.createRandomDicString(function(string) {
                    return cb(bitcore.HDPrivateKey.fromSeed(bitcore.crypto.Hash.sha256(new Buffer(string)), type));
                })
            },
            signAndSend: function(tx, pass) {
                if (!Wallet.hasDetails()) return $rootScope.$broadcast('getDetails', {
                    successCallback: function() {
                        Transaction.signAndSend(tx);
                    },
                    errorCallback: function() {
                        alert("Password Bad")
                    }
                });

                Transaction.signAndSend(tx)

            },
 
            build: function(cb, type) {
                type = type || 'livenet';
                //Get random dic string
                util.createRandomDicString(function(string) {
                    var hdPrivateKey = bitcore.HDPrivateKey.fromSeed(bitcore.crypto.Hash.sha256(new Buffer(string)), type);
                    var derived = hdPrivateKey.derive("m/0");
                    Wallet.details.WIF = derived.privateKey.toWIF();
                    Wallet.details.priv = derived.privateKey;
                    var bkPrivateKey = new bitcore.HDPrivateKey(type);
                    var bkderived = bkPrivateKey.derive("m/" + Math.floor(Math.random() * 19348), type);
                    Wallet.bkdetails = bkderived.privateKey.toWIF();
                    Wallet.ks.push(derived.publicKey.toString(), bkderived.publicKey.toString());
                    Wallet.details.sharedKey = uuid.v4();
                    console.log(derived)
                    console.log(derived.publicKey.toAddress(type).toString())
                    console.log(bkderived.publicKey.toAddress(type).toString());
                    //get last sign for address
                    /*       Parse.Cloud.run('lastSign', {
                               keys: Wallet.ks,
                               sharedKey: Wallet.details.sharedKey
                           }, {
                               success: function(result) {
                                   Wallet.details.BBpubKey = result;
                                   var parent = new bitcore.HDPublicKey(result);
                                   var lastSign = parent.derive('m/' + Wallet.currentDer);
                                   Wallet.ks.push(lastSign.publicKey.toString());
                                   Wallet.details.address = Wallet.createMultisig(Wallet.ks, type).toString();
                                   Wallet.setQr(Wallet.details.address);
                                   console.log("Made Multisig: " + Wallet.details.address)

                               }
                           });*/

                    cb(Wallet.ks);
                });
            },
            currentCurrency: "",
            popCountries: ['USD', 'EUR', 'AUD', 'CAD', 'JPY', 'CNY', 'GBP', 'BRL', 'MXN'],
            popularCurrencies: [],
            setCurrencies: function(cb) {
                $http.get('./dic/currency.json').success(function(response) {
                    Wallet.popularCurrencies = [];
                    response.map(function(currency) {

                        var a = Wallet.popCountries.indexOf(currency.currency);
                        if (a > -1) Wallet.popularCurrencies.push(currency);
                    })
                    cb(response);
                })


            }






        }

        return Wallet;
    }])
}

var buildOutput = function(string) {
    if (!outputStr) var outputStr = "";
    if (!string) string = "\n";
    outputStr += "\n" + string;
}
