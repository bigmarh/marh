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

                createBKUPDF: function(keys) {

                   
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
