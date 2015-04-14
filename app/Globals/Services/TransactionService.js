module.exports = function(app, Parse) {
    app.factory('Trans', ['$state', '$rootScope', '$timeout', 'WalletService', 'BlockCypher', 'UtilService', 'LastSign',
        function(state, $rootScope, timeout, Wallet, BlockCypher, Util, LastSign) {

            var Transaction = {
                to: {},
                current: {},
                amount: 0,
                currentTransaction: {
                    sender: Wallet.details.guid,
                    sendersEmail: Wallet.details.email,
                    note: "",
                    to: {}
                },
                signAndSend: function(current) {
                    if(current)Transaction.current = current;
                    if (!Wallet.hasDetails()) return $rootScope.$broadcast('getDetails', {
                        tx: Transaction.current,
                        successCallback: function() {
                            console.log("Comeback after getting Password");
                            Transaction.signAndSend(Transaction.current)
                        },
                        errorCallback: function(e) {
                            console.log(e);
                            alert("Password is Bad");
                        }
                    });

                    console.log("Sign with decrypted keys");
                    Transaction.current.BCtx.signatures = BlockCypher.signToSigns(Transaction.current.BCtx.tosign, Wallet.details.privKey);
                    BlockCypher.sendTrans({
                        postData: Transaction.current.BCtx
                    }).then(function(results) {
                        console.log("Sent self signed Transaction");
                        var sharedKey = bitcore.crypto.Hash.sha256(new Buffer(Parse.User.current().id)).toString('hex'),
                            secret = bitcore.crypto.Hash.sha256(new Buffer(Wallet.details.sharedKey)).toString('hex');
                        Transaction.current.from = Transaction.current.from.attributes.address;
                        Transaction.current.to = (Util.isObject(Transaction.current.to)) ? Transaction.current.to.attributes : Transaction.current.to;

                        //Request a last sign
                        if (Transaction.current.lastsign) LastSign.requestSign(sharedKey, secret, Transaction.current, Transaction.lastSignSuccess);
                        // Otherwise send a message to the other parties to sign
                        else console.log("Send emails to others");

                    }, function(error) {
                        console.log(JSON.stringify(Transaction.current.BCtx));
                        //may have already beed submitted, in that case try to last sign if needed.
                        if (Transaction.current.lastsign) LastSign.requestSign(sharedKey, secret, Transaction.current, Transaction.lastSignSuccess);
                        for (err in error.data.errors) {
                            console.log(JSON.stringify(Transaction.current.BCtx));
                            console.log(error.data.errors[err].error);
                        }
                        console.log(error.data.tx);
                    })
                },
                buildTrans: function(keychains, script_type, address, value) {
                    var ks = [];
                    var needsLastSign = true;
                    keychains.map(function(key) {
                        if (key.type == "lastsign") needsLastSign = true;
                        ks.push(Wallet.getPublicKey(key));
                    });
                    var pubkeys = Wallet.sortPubKeys(ks);
                    return {
                        needsLastSign: needsLastSign,
                        tx: {
                            "inputs": [{
                                "addresses": pubkeys,
                                "script_type": script_type
                            }],
                            "outputs": [{
                                "addresses": address,
                                "value": value
                            }],
                            preference: 'low',
                            fees: 1e4
                        }
                    };
                },
                getToAddress: function(toAccount,current, cb) {
                    if (!toAccount)
                        return console.log({
                            error: "You need to add an address"
                        })

                    if (Util.isString(toAccount)) {
                        if (!Wallet.isAddressValid(toAccount)) {
                            var good = false;
                            Parse.Cloud.run("findAccountbySlug",{name_slug:toAccount.toLowerCase()}).then(function(accnt){
                                Transaction.current.toName = accnt.get('name_slug'); return cb([accnt.get('address')]);
                            },function(error){
                                 return console.log("No user, maybe prompt an invite");
                            })
                        } else {

                            return cb([toAccount]);
                        }
                    } else if (Util.isArray(toAccount)) {
                        return cb(toAccount);
                    } else {
                        return cb([toAccount.get('address')]);
                    }


                },
                previewTrans: function(current) {
                    Transaction.getToAddress(current.toAccount,current,function(toAddress) {

                        var keychains = current.fromAccount.get('keychains');
                        var trans = Transaction.buildTrans(keychains, current.fromAccount.get('script_type'), toAddress, Util.unitConvert.convertor(current.amount, $rootScope.BTCunit, 'satoshis'));
                        Transaction.buildCurrentTrans(current, trans,toAddress);
                        console.log('Begin to Build Transaction');
                        BlockCypher.newTrans({
                            postData: trans.tx
                        }).then(function(results) {
                            console.log('Built Transaction');
                            Transaction.current.BCtx = results.toJSON();
                            $rootScope.$broadcast('closeSend');
                            $rootScope.$broadcast('openTransBox',current);
                        }, function(err) {
                            console.log(err);
                        })
                    });
                },

                buildCurrentTrans: function(current, trans,toAddress) {
                    Transaction.current.from = current.fromAccount;
                    Transaction.current.path = current.fromAccount.get('path');
                    Transaction.current.signees = current.fromAccount.get('keychains');
                    Transaction.current.accountNumber = current.fromAccount.get('number');
                    Transaction.current.to = current.toAccount;
                  if(typeof current.toAccount != 'string')  Transaction.current.toName = current.toName || current.toAccount.get('name_slug') ;
                    Transaction.current.address = toAddress;
                    Transaction.current.amount = current.amount;
                    Transaction.current.tx = trans.tx;
                    Transaction.current.lastsign = trans.needsLastSign;
                    Transaction.current.note = current.note;
                    Transaction.current.tags = current.tags;
                    return;
                },
                lastSignSuccess: function(tx) {
                    
                    console.log("Successful Last Sign: Start Sending Trans");
                    BlockCypher.sendTrans({
                        postData: tx
                    }).then(function(results) {
                        console.log("Transaction sent");
                        Util.closeLB();

                    }, function(error) {
                        console.log("Error Sending Transaction");
                        console.log(JSON.stringify(tx));
                    })


                },
                startSend: function(current) {
                    Transaction.previewTrans(current);
                },
                  buildTransactionArray: function(txs, address) {
              
                var transactions = {};
                txs.map(function(tx) {
                    var newTrans = {};
                    newTrans.tx_hash = tx.hash;
                    newTrans.confirmed = tx.confirmed;
                    tx.inputs.map(function(input) {
                        newTrans.from = [];
                        for (i in input.addresses) {
                            newTrans.type = (input.addresses[i] == address) ? 'spend' : 'receive';
                        }
                        if (newTrans.type == "receive")
                            newTrans.from.push({
                                address: input.addresses[i],
                                value: input.value
                            });

                    });
                    newTrans.to = [];
                    newTrans.value = 0;
                    tx.outputs.map(function(output) {
                        for (a in output.addresses) {
                            if (output.addresses[a] != address && newTrans.type == "spend") {
                                newTrans.to.push({
                                    address: output.addresses[a],
                                    amount: output.value
                                });
                                newTrans.value += output.value;
                            } else if (output.addresses[a] == address && newTrans.type != "spend") {
                                newTrans.value += output.value;
                            }
                        }
                    })

                    transactions[tx.hash] = newTrans;
                })
                return transactions;

            }
            }

            return Transaction;
        }
    ]);
}
