var QRCode = require('../helpers/qrCode');
require('../helpers/jsPdf.js');
var required = require('../helpers/bitcore');
var bitcore = required('bitcore');
var textFile = "";

module.exports = function(app, Parse) {
    app.service('UtilService', ['$http', '$rootScope', '$templateCache',
        function($http, $rootScope, $templateCache) {
            var Util = {
                createDownload: function(text, name) {
                    var data = new Blob([text], {
                        type: 'text/plain'
                    });

                    if (textFile !== null) {
                        window.URL.revokeObjectURL(textFile);
                    }

                    textFile = window.URL.createObjectURL(data);
                    var link = document.createElement('a');
                    link.download = name + ".pdf";
                    link.href = textFile;
                    link.click();
                    delete sessionStorage.token;
                    return textFile;

                },
                makeId: function(number,type) {
                    var text = "";

                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*!@";
                    if(type == "digits") possible = "0123456789";
                    if(type == "letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    if(type == "digits-letters") possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    
                    for (var i = 0; i < number; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                },
                createBKUPDF: function(keys) {

                    function a(a) {
                        return j + a
                    }

                    function d(a) {
                        k += a
                    }
                    v.clearAlerts(), b.generatedActivationCode || (b.generatedActivationCode = 7883 === c.port() ? 1e3 : Math.floor(9e5 * Math.random() + 1e5));
                    var e = (new Date).toDateString(),
                        f = "Backup for " + b.inputs.label,
                        g = {
                            header: 24,
                            subheader: 15,
                            body: 12
                        },
                        h = {
                            black: "#000000",
                            darkgray: "#4c4c4c",
                            gray: "#9b9b9b",
                            red: "#e21e1e"
                        },
                        i = 612,
                        j = 30,
                        k = 0,
                        l = new jsPDF("portrait", "pt", "letter");
                    l.setFont("helvetica"),
                        d(30),
                        l.addImage("data:image/jpeg;base64,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", a(0), k),
                        d(8),
                        l.setFontSize(g.body).setTextColor(h.gray),
                        l.text("Activation Code", a(460), k),
                        l.setFontSize(g.header).setTextColor(h.black),
                        d(22),
                        l.text("BitGo KeyCard", a(40), k),
                        l.setFontSize(g.header).setTextColor(h.gray),
                        l.text(b.generatedActivationCode.toString(), a(460), k),
                        d(j),
                        l.setFontSize(g.body).setTextColor(h.gray),
                        l.text("Created on " + e + " for wallet named:", a(0), k),
                        d(25),
                        l.setFontSize(g.subheader).setTextColor(h.black),
                        l.text(b.inputs.label.toString(), a(0), k),
                        d(20),
                        l.setFillColor(255, 230, 230),
                        l.rect(a(0), k, i - 2 * j, 32, "F"),
                        d(20),
                        l.setFontSize(g.body).setTextColor(h.red),
                        l.text("Print this document, or keep it securely offline. See second page for FAQ.", a(75), k);
                    var m = {
                        user: {
                            title: "A: User Key",
                            img: "#qrEncryptedUserKey",
                            desc: "This is your private key, encrypted with your passcode.",
                            data: b.outputs.walletKeychain.encryptedXprv
                        },
                        bitgo: {
                            title: "C: BitGo Public Key",
                            img: "#qrBitgoKey",
                            desc: "This is the public half of the key BitGo has generated for this wallet.",
                            data: b.outputs.bitgoKeychain.xpub
                        },
                        passcode: {
                            title: "D: Encrypted Wallet Passcode",
                            img: "#qrEncryptedWalletPasscode",
                            desc: "This is the wallet passcode, encrypted client-side with a key held by BitGo.",
                            data: b.outputs.encryptedWalletPasscode
                        }
                    };
                    m.backup = b.inputs.useOwnBackupKey ? {
                            title: "B: Backup Key",
                            img: "#qrEncryptedUserProvidedXpub",
                            desc: "This is the public portion of your backup key, which you provided.",
                            data: b.outputs.walletBackupKeychain.xpub
                        } : {
                            title: "B: Backup Key",
                            img: "#qrEncryptedBackupKey",
                            desc: "This is your backup private key, encrypted with your passcode.",
                            data: b.outputs.walletBackupKeychain.encryptedXprv
                        },

                        d(35);
                    var n = 130;
                    ["user", "backup", "bitgo", "passcode"].forEach(function(b) {
                            var c = m[b],
                                e = k,
                                f = a(n + 15);

                            l.addImage($(c.img + " img").attr("src"), a(0), k, n, n),
                                l.setFontSize(g.subheader).setTextColor(h.black),
                                d(10),
                                l.text(c.title, f, k),
                                d(15),
                                l.setFontSize(g.body).setTextColor(h.darkgray),
                                l.text(c.desc, f, k),
                                d(30),
                                l.setFontSize(g.body - 2), l.text("Data:", f, k),
                                d(15);
                            var i = 612 - f - 30;
                            l.setFont("courier").setFontSize(9).setTextColor(h.black);
                            var j = l.splitTextToSize(c.data, i);
                            l.text(j, f, k),
                                l.setFont("helvetica"),
                                d(n - (k - e) + 15)
                        }), l.addPage(), k = 0,
                        d(55),
                        l.setFontSize(g.header).setTextColor(h.black),
                        l.text("BitGo KeyCard FAQ", a(0), k);
                    var o = [{
                        q: "What is the KeyCard?",
                        a: ["The KeyCard contains important information which can be used to recover the bitcoin ", "from your wallet in several situations. Each BitGo wallet has its own, unique KeyCard. If you ", "have created multiple wallets, you should retain the KeyCard for each of them."]
                    }, {
                        q: "What should I do with it?",
                        a: ["You should print the KeyCard and/or save the PDF to an offline storage device. The print-out ", "or USB stick should be kept in a safe place, such as a bank vault or home safe. It's a good idea ", "to keep a second copy in a different location.", "", "Important: If you haven't provided an external backup key, then the original PDF should be ", "deleted from any machine where the wallet will be regularly accessed to prevent malware from ", "capturing both the KeyCard and your wallet passcode."]
                    }, {
                        q: "What should I do if I lose it?",
                        a: ["If you have lost or damaged all copies of your KeyCard, your bitcoin is still safe, but this ", "wallet should be considered at risk for loss. As soon as is convenient, you should use BitGo ", "to empty the wallet into a new wallet, and discontinue use of the old wallet."]
                    }, {
                        q: "What if someone sees my KeyCard?",
                        a: ["Don't panic! All sensitive information on the KeyCard is encrypted with your passcode, or with a", "key which only BitGo has. But, in general, you should make best efforts to keep your ", "KeyCard private. If your KeyCard does get exposed or copied in a way that makes you ", "uncomfortable, the best course of action is to empty the corresponding wallet into another ", "wallet and discontinue use of the old wallet."]
                    }, {
                        q: "What if I forget or lose my wallet passcode?",
                        a: ["BitGo can use the information in QR Code D to help you recover access to your wallet. ", "Without the KeyCard, BitGo is not able to recover funds from a wallet with a lost passcode."]
                    }, {
                        q: "What if BitGo becomes inaccessible for an extended period?",
                        a: ["Your KeyCard and wallet passcode can be used together with BitGo’s published open ", "source tools at https://github.com/bitgo to recover your bitcoin. Note: You should never enter ", "information from your KeyCard into tools other than the tools BitGo has published, or your ", "funds may be at risk for theft."]
                    }, {
                        q: "Should I write my wallet passcode on my KeyCard?",
                        a: ["No! BitGo’s multi-signature approach to security depends on there not being a single point ", "of attack. But if your wallet passcode is on your KeyCard, then anyone who gains access to ", "your KeyCard will be able to steal your bitcoin. We recommend keeping your wallet passcode ", "safe in a secure password manager such as LastPass, 1Password or KeePass."]
                    }];

                    d(30),
                        o.forEach(function(b) {

                            l.setFontSize(g.subheader).setTextColor(h.black),
                                l.text(b.q, a(0), k),
                                d(20),
                                l.setFontSize(g.body).setTextColor(h.darkgray),
                                b.a.forEach(function(b) {
                                    l.text(b, a(0), k),
                                        d(g.body + 3)
                                }),
                                d(22)
                        }),
                        l.save(f),
                        b.setPointOfNoReturn(),
                        b.backupSaved = !0
                },
                loadDownload: function() {

                },
                getQuery: function(prop) {
                    var search = location.search.split('&');
                    searchObj = {}
                    for (i in search) {
                        var array = search[i].split('=');
                        searchObj[array[0]] = array[1];
                    }

                    return searchObj[prop] || null;
                },
                createQr: function(string) {
                    var el = document.createElement("div");
                    var qrcode = new QRCode(el, {
                        text: "bitcoin:" + string,
                        width: 512,
                        height: 512,
                        colorDark: "#404040",
                        colorLight: "#fff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                    return qrcode._el.firstChild.toDataURL();
                },
                createRandomDicString: function(cb) {
                    //Get Dictionary file
                    $http.get('./dic/words.txt').success(function(response) {
                        //Build Array from dictionary
                        var words = response.split('\n');
                        var buf = new Uint32Array(25);
                        var s = "";
                        var arr = [];
                        window.crypto.getRandomValues(buf);
                        for (var i = buf.length - 1; i >= 0; i--) {
                            var selector = Math.floor((buf[i] / 4294967295) * words.length);
                            s += words[selector];
                            arr.push({
                                num: selector,
                                w: words[selector]
                            });
                        };

                        function randomChar(num) {
                            var text = "";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$)¡™£∞¢§∞•∞ªºº•¢$%^&&*)(&%0123456789";
                            for (var i = 0; i < num; i++)
                                text += possible.charAt(Math.floor(Math.random() * possible.length));
                            return text;
                        }
                        var nth = 0;
                        //A litte extra randomness to the string
                        s = s.replace(/l|s|mn|o|re/g, function(match, i, original) {
                            nth++;
                            var ran = Math.round(Math.random() * ((Math.random() * 15) + 1));
                            if (match == "l") {
                                return (!(nth % ran)) ?
                                    randomChar(Math.floor(Math.random() * 37)) + Math.random() : match;
                            } else if (match == "s") {
                                return (!(nth % ran)) ? randomChar(Math.floor(Math.random() * 37)) + Math.random() : match;
                            } else {
                                return (!(nth % ran)) ? randomChar(Math.floor(Math.random() * 37)) + Math.random() + randomChar(Math.floor(Math.random() * 37)) : match;
                            }
                        });

                        return cb(s);

                    });
                },
                launchLB: function(options) {
                    $rootScope.$broadcast('openLightBox', options);
                },
                closeLB: function(options) {
                    $rootScope.$broadcast('closeTransBox');
                },
                unitConvert: {
                    "satoshis": [1, 0],
                    "bits": [1e2, 2],
                    "mBTC": [1e5, 5],
                    "BTC": [1e8, 3],
                    convertor: function(amount, start, end) {
                        var fromUnit = new bitcore.Unit(amount, start);
                        return fromUnit.to(end);

                    },
                    toFiat: function(amount, start, end) {
                        var fromUnit = new bitcore.Unit(amount, start);
                        return fromUnit.atRate(parseFloat($rootScope.spot_rate)).toFixed(2);
                    }
                },
                toast: function(options) {
                    $rootScope.$broadcast('callToast', options);
                },
                isString: function(string) {
                    if (!isNaN(string)) return true;
                    return (typeof string == "string");
                },
                isArray: function(array) {
                    if (!isNaN(array)) return false;
                    return (typeof array == 'object' && array.length > 0)
                },
                isObject: function(object) {
                    return (typeof object == 'object' && object.length == undefined)
                },
                constructPass: function(pics, pin) {
                    var pass = "";
                    var i = 0;
                    pics.map(function(pic) {
                        pass += pic.imageSrc;
                        pass += pin[i];
                        i++;
                    })
                    pass += pin;
                    return pass;
                },
            }
            return Util;
        }
    ])
}
