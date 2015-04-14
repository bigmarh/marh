var CryptoJS = require('crypto-js');
var required = require('../helpers/bitcore');
var bitcore = required('bitcore');
module.exports = function(app, Parse) {
    app.factory('BlockCypher', ['$state', '$http', '$resource',
        function($state, http, $resource) {
            var types = {
                bctestnet: {
                    coin: "bcy",
                    network: "test"
                },
                mainnet: {
                    coin: "btc",
                    network: "main"
                },
                livenet: {
                    coin: "btc",
                    network: "main"
                },
                testnet: {
                    coin: "btc",
                    network: "test3"
                },
                litecoin: {
                    coin: "ltc",
                    network: "main"
                }
            }
            var network = types[type];
            var bcUrl = "https://api.blockcypher.com"; //130.211.121.210:8080
            /*
            curl -d '{"address": "DUfyUXU8U8EA86fGpGwsZngaXqNzFdB1Ep", "amount": 100000}' https://api.blockcypher.com/v1/bcy/test/faucet/?token=ce2b858a-ac18-4ea9-bfd0-063ba2e7faf9 
            */
            var blockCypher = {
                token: "ce2b858a-ac18-4ea9-bfd0-063ba2e7faf9",
                ws: function(type) {

                    return "wss://socket.blockcypher.com/v1/" + network.coin + "/" + network.network
                },
                resource: $resource(bcUrl+'/v1/:coin/:net/:endpoint/:identifier:extra?token=ce2b858a-ac18-4ea9-bfd0-063ba2e7faf9', {
                    coin: 'btc',
                    net: 'main'
                }),
                useFaucet: function(options) {
                   var obj = {
                        endpoint: 'faucet',
                        coin: network.coin,
                        net: network.network,
                    } /*
                    console.log(options.postData);
                    return blockCypher.resource.save(obj, JSON.stringify(options.postData)).$promise;*/
                    var params = {
                        url:bcUrl+'/v1/'+obj.coin+'/'+obj.net+'/'+obj.endpoint+'?token=ce2b858a-ac18-4ea9-bfd0-063ba2e7faf9',
                        postData:options.postData
                    }

                    Parse.Cloud.run('drip',params).then(function(response){
                        console.log(response);
                    })


                },
                newTrans: function(options) {
                    var obj = {
                        endpoint: 'txs',
                        coin: network.coin,
                        net: network.network,
                        identifier: "new"
                    }
                    return blockCypher.resource.save(obj, JSON.stringify(options.postData)).$promise;

                },
                getTransactions: function(id, options) {
                    var obj = {
                        endpoint: 'txs',
                        coin: network.coin,
                        net: network.network,
                        identifier: id
                    }
                    return blockCypher.resource.get(obj, JSON.stringify(options.postData)).$promise;

                },
                getAddress: function(id, options) {
                    var obj = {
                        endpoint: 'addrs',
                        coin: network.coin,
                        net: network.network,
                        identifier: id,
                        extra:'/full'
                    }
                    return blockCypher.resource.get(obj).$promise;
                },
                sign: function(newtx, key) {
                    newtx.pubkeys = [];
                    newtx.signatures = newtx.tosign.map(function(tosign) {
                        newtx.pubkeys.push(key.getPubKeyHex());
                        return CryptoJS.util.bytesToHex(key.sign(hexToBytes(tosign)));
                    })
                    return newtx;

                },
                signToSigns: function (tosigns,xpriv) {
                    return tosigns.map(function(tosign) {
                        return bitcore.crypto.ECDSA.sign(new Buffer(tosign,'hex'), bitcore.HDPrivateKey(xpriv).derive('m').privateKey).toString("hex");
                    })
                },
                sendTrans: function(options) {
                    return blockCypher.resource.save({
                        endpoint: 'txs',
                        identifier: 'send',
                        coin: network.coin,
                        net: network.network
                    }, JSON.stringify(options.postData)).$promise;
                },
                pushTrans: function(options) {

                },
                getBalance: function(address, coinType) {
                    var options = {};
                    options.endpoint = 'addrs',
                        options.identifier = address;
                    options.coin = types[coinType];
                    return blockCypher.resource.get(options).$promise;
                },
                getUnspent: function(address) {
                    return blockCypher.resource.get({
                        endpoint: 'addrs',
                        identifier: address
                    }).$promise;
                },

                buildUnspent: function(address, cb) {
                    blockCypher.getUnspent(address).then(function(response) {
                        var array = {
                            unspent_outputs: []
                        };

                        var transactions = response.txrefs;
                        var unspentsArray = [];
                        var count = 0;
                        transactions.map(function(transaction, index) {
                            if (!transaction.spent && transaction.tx_input_n < 0 && transaction.confirmations > 1)
                                transaction = unspentsArray.push({
                                    hash: transaction.tx_hash,
                                    index: transaction.tx_output_n
                                });
                            if (index + 1 == transactions.length) next();
                        })

                        function next() {
                            unspent = unspentsArray;
                            if (!unspent) cb([]);
                            unspent.map(function(u, index) {
                                var trans = blockCypher.resource.get({
                                    endpoint: 'txs',
                                    identifier: u.hash
                                }, function(trans) {

                                    var transaction = {
                                        tx_hash: u.hash.match(/../g).reverse().join(''),
                                        tx_output_n: u.index,
                                        script: trans.outputs[u.index].script,
                                        value: trans.outputs[u.index].value,
                                        confirmations: trans.confirmations
                                    };
                                    array.unspent_outputs.push(transaction);
                                    if (unspent.length == index + 1) {
                                        return cb(array);

                                    }
                                });
                            });


                        }

                    })



                }

            }

            return blockCypher;
        }
    ])
}
