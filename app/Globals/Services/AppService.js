module.exports = function(app, Parse) {
    app.service('AppService', ['$http', 'UtilService', '$rootScope', 'BlockCypher', 'WalletService', function($http, util, $rootScope, BlockCypher, Wallet) {
        var App = {
            getApps: function() {
                return { 
                    "gyft": {
                        name: "Gyft",
                        appUrl: "https://www.gyft.com/",
                        favicon:"http://www.foxbit.com.br/favicon.png"
                    },
                    "foxbit": {
                        name: "Foxbit",
                        appUrl: "http://www.foxbit.com.br/",
                        favicon:"http://www.foxbit.com.br/favicon.png"
                    },
                    "coinage": {
                        name: "Coinage",
                        appUrl: "http://bitcoin.tonyotonio.com/bitcoin/",
                        favicon:"http://bitcoin.tonyotonio.com/bitcoin/favicon.ico"
                    },
                    "bitquick":{
                        name: "BitQuick",
                        appUrl: "https://www.bitquick.co/",
                        favicon: "https://bitquick-bitquick.netdna-ssl.com/modules/uploads/2014/02/favicon-22.png"
                    }
                }
            }
        }

        return App;
    }])
}
