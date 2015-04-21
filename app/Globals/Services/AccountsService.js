var required = require('../helpers/bitcore');
var bitcore = required('bitcore');
var CryptoJS = require('crypto-js');
var uuid = require('node-uuid');
module.exports = function(app, Parse) {
    var restrictedAcl = new Parse.ACL(Parse.User.current());
    restrictedAcl.setPublicReadAccess(false);
    restrictedAcl.setPublicWriteAccess(false);

    app.service('AccountsService', ['$http', 'UtilService', '$rootScope', 'BlockCypher', 'WalletService', 'LastSign', '$q', 'Trans','$messages', function($http, util, $rootScope, BlockCypher, Wallet, LastSign, $q, Transaction,$messages) {
        var Accounts = {
            accounts: {
                Personal: {},
                Org: {}
            },
            testIt: LastSign.getLSXpub,
            addresses: [],
            currentAccount: {},
            observerCallbacks: [],
            checkLogin: function(needsVerifiedEmail, cb) {
                if (Parse.User.current()) {
                    if (needsVerifiedEmail && !Parse.User.current().get('emailVerified')) cb();
                    return true;
                }
                window.location = "/";
            },
            fillWallet: function(address, satoshis) {
                BlockCypher.useFaucet({
                    postData: {
                        address: address,
                        amount: satoshis
                    }
                })
            },
            buildTransactionArray: Transaction.buildTransactionArray,
            hasAccounts: function(personal) {
                var deferred = $q.defer();
                var query = new Parse.Query('Accounts');
                if (personal) query.equalTo('type', 'Personal');
                query.count().then(function(number) {
                    deferred.resolve(number);
                }, deferred.reject);

                return deferred.promise;
            },
            getAccounts: function(type) {
                var deferred = $q.defer();
                var query = new Parse.Query('Accounts');
                query.equalTo('signees', Parse.User.current())
                query.find().then(function(accounts) {

                    if (accounts.length) {
                        Accounts.setAccounts(accounts);
                        deferred.resolve(accounts);
                    } else {
                        deferred.resolve(false);
                    }
                }, function(error) {
                    $messages.log(error);
                    //deferred.reject()
                });

                return deferred.promise;
            },
            setAccounts: function(accounts) {
                $messages.log(accounts.length);
                return accounts.map(function(a) {
                    $messages.log("Accouts Set Up:" + a.get('address'), (a.get('address') && !Accounts.accounts[a.get('type')][a.get('address')]));
                    if (a.get('address') && !Accounts.accounts[a.get('type')][a.get('address')]) {
                        $messages.log("Set Up:" + a.get('address'));
                        Accounts.addresses.push(a.get('address'));
                        a.createdAt = a.createdAt;
                        a.number = a.get('number');
                        Accounts.accounts[a.get('type')][a.get('address')] = a;

                        $messages.log(Accounts.accounts[a.get('type')], a.get('type'));
                    }
                });
            },
            getAccount: function(id) {
                var deferred = $q.defer();
                var query = new Parse.Query('Accounts');
                query.equalTo('objectId', id);
                query.first().then(function(account) {
                    if (account) {
                        Accounts.currentAccount = account.attributes;
                        deferred.resolve(account.attributes);
                    } else {
                        deferred.resolve(false);
                    }
                }, deferred.reject);

                return deferred.promise;
            },
            buildAccount: function(acctObj, cb, cbErr) {

                var account = (!acctObj.account) ? {} : acctObj.account;
                if (!acctObj.signatures) acctObj.signatures = [2, 3];
                var admins = acctObj.admins;
                account.keychains = acctObj.keychains.map(function(keychain) {
                    if (keychain.type == "lastsign") keychain.path = '/' + acctObj.pathnumber;
                    return keychain;
                });
                account.signees = acctObj.signees;

                account.script_type = "multisig-" + acctObj.signatures[0] + "-of-" + acctObj.signatures[1];
                account.requiredSignatures = acctObj.signatures[0];
                account.totalSignatures = acctObj.signatures[1];
                account.path = (!account.path) ? '/' + acctObj.pathnumber : account.path;
                account.balance = 0;
                account.confirmedBalance = 0;
                //create account number
                var date = new Date();
                var str = "" + parseInt(date.getTime() / 1000);

                account.number = acctObj.pathnumber + 2;
                account.accountNum = str + account.number;

                //Check to see if we have enough keychains yet
                if (account.keychains.length == account.totalSignatures) {
                    account.address = Wallet.createMultisig(Accounts.getPublicKeys(account.keychains), type, account.requiredSignatures).toString();
                    $messages.log("This has to work: " + account.address);
                }
                // Save Account
                Accounts.saveAccount(account, acctObj.access, function(account) {
                    $messages.log("Saved account");
                    Accounts.accounts[account.get('type')][account.address] = account;
                    Accounts.notifyObservers();
                    cb(account);

                }, cbErr);
            },
            createPersonal: function(account, cb, cbErr) {
                var query = new Parse.Query('Accounts');
                query.equalTo('type', 'Personal')
                query.count().then(function(number) {
                    number++;
                    var acctObj = {
                        account: account,
                        pathnumber: number,
                        keychains: Parse.User.current().get('originChain'),
                        access: [Parse.User.current()],
                        signees: [Parse.User.current()]
                    }


                    acctObj.account.name_slug = Parse.User.current().get('email') + ":" + account.name.replace('/ /g', '_').toLowerCase();
                    Accounts.buildAccount(acctObj, cb, cbErr);
                });
            },
            joinChains: function(userArray, org, orgLastSign, pathnumber) {
                userChains = [];
                orgChain = [];
                $messages.log(userArray);
                if (typeof userArray[0] != 'undefined')
                    userArray = userArray.map(function(chain) {
                        chain.map(function(keychain) {
                            if (keychain.type == "main") userChains.push(keychain);
                        })
                    });
                if (org) {
                    if (orgLastSign) {
                        org = org.map(function(o) {
                            if (o.type == "org-lastsign") o.path = "/" + pathnumber;
                            return o;
                        })
                        orgChain = org;
                    } else {
                        for (var i = org.length - 1; i >= 0; i--) {
                            if (org[i].type != "org-lastsign") orgChain.push(org[i]);
                        };
                    }
                }
                var chains = userChains.concat(orgChain);
                return chains;
            },
            getCompany: function() {
                var deferred = $q.defer();
                var query = new Parse.Query('Company');
                query.equalTo('creator', Parse.User.current())
                query.find().then(function(company) {
                    Accounts.company = company;
                    deferred.resolve(company);

                }, deferred.reject);

                return deferred.promise;
            },

            createPrivateKey: function(cb) {
                return Wallet.createPrivKeyfromDic(cb, type);
            },
            getLastSign: function(success, error) {
                return LastSign.create(sharedKey, secret, success, error);
            },
            createOriginAccount: function(obj, type, cb, cbErr) {
                //If User has orgin account retrn callback
                if (Parse.User.current().get('originChain') && Parse.User.current().get('originChain').length) 
                    return cb();
                //Begin to build origin chain
                var account = {
                    keychains: {}
                };
                var num = 2;
                var sharedKey = uuid.v4();

                $messages.log('Create New Main Key')
                var HD = new bitcore.HDPrivateKey();
                var payloadObj = {
                    sharedKey: sharedKey,
                    privKey: HD.xprivkey
                }
             
                var passWordEncKey = bitcore.encoding.Base58(bitcore.crypto.Random.getRandomBufferBrowser(18)).toString();
                $messages.log(passWordEncKey);
                
                var encKey = Wallet.encryptKey(JSON.stringify(payloadObj), "" + obj.password);
                var encPass = Wallet.encryptKey("" + obj.password, passWordEncKey);
                //Create Personal Backup Key
                $messages.log('Create Backup Key')
                var backupHD = new bitcore.HDPrivateKey();
                var backupPayloadObj = {
                    sharedKey: sharedKey,
                    privKey: backupHD.xprivkey
                }
                var backUpencKey = Wallet.encryptKey(JSON.stringify(backupPayloadObj), "" + obj.password);
               
                //Get Last Sign Keychain
                $messages.log('Get Last Sign Key')
                var lastsignId = bitcore.crypto.Hash.sha256(new Buffer(Parse.User.current().id)).toString('hex');
                var lastsignpass = bitcore.crypto.Hash.sha256(new Buffer(sharedKey)).toString('hex');
                LastSign.create(lastsignId, lastsignpass,
                    function success(result) {
                        $messages.log('Got New LastSign Key');
                        _buildAccount(result.xpubkey);
                    },

                    function error(error) {
                        $messages.log(error);
                    }
                );

                function _buildAccount(lsXpub) {
                    if (!lsXpub) throw Error("The Account needs a Last Sign Key");
                    var user = Parse.User.current();

                    account.name = "My Personal (" + user.get('fullName') + ")";
                    account.name_slug = user.get('email');
                    account.path = '';
                    account.isOrigin = true;
                    account.type = 'Personal';

                    var acctObj = {
                        account: account,
                        pathnumber: 1,
                        keychains: [{
                            xpub: HD.xpubkey,
                            path: '',
                            type: "main",
                            owner: user.id
                        }, {
                            xpub: backupHD.xpubkey,
                            path: '',
                            type: "backup",
                            owner: user.id,
                            backup: true            

                        }, {
                            type: "lastsign",
                            xpub: lsXpub,
                            path: ''
                        }],
                        signatures: [2, 3],
                        access: [user],
                        signees: [user]
                    }

                    Accounts.buildAccount(acctObj, function(acct) {
                        user.set('address', acct.get('address'));
                        user.set('originChain', acct.get('keychains'));
                        user.save().then(function(user) {}, function(err) {
                            $messages.log('error')
                        });

                        //Save Payload
                        var Payload = Parse.Object.extend('Payload')
                        var payload = new Payload();
                        //restrict Access Level
                        payload.setACL(restrictedAcl);
                        payload.set('content', encKey);
                        payload.set('type', 'personal')
                        payload.set('identifier', user.id);
                        payload.set('secret', bitcore.crypto.Hash.sha256(new Buffer(sharedKey)).toString('hex'));
                        payload.set('passWordEncKey', passWordEncKey);
                        payload.save().then(function(payload) {
                            $messages.log([{
                                title: "Encrypted Private Key",
                                content: payload.get('content')
                            }, {
                                title: "Encrypted Backup Key",
                                content: backUpencKey
                            }, {
                                title: "Encrypted Passcode",
                                content: encPass
                            }, {
                                title: "Last Sign xpub",
                                content: lsXpub
                            }]);
                            cb();
                        }, function(error) {
                            cbErr(error);
                        });
                    })



                }

            },
            saveAccount: function(account, access, cb, cbErr) {
                var Account = Parse.Object.extend('Accounts');
                var acc = new Account();
                var accessGroupACL = new Parse.ACL();
                for (var i = 0; i < access.length; i++) {
                    if (access[i].isRole) {
                        accessGroupACL.setRoleWriteAccess(access[i].isRole, true);
                        accessGroupACL.setRoleReadAccess(access[i].isRole, true);
                    } else {
                        accessGroupACL.setReadAccess(access[i], true);
                        accessGroupACL.setWriteAccess(access[i], true);
                    }
                }

                acc.setACL(accessGroupACL);
                acc.save(account).then(cb, cbErr);
            },
            getPublicKeys: function(keychain) {
                var keys = [];
                for (i in keychain) {
                    keys.push(Accounts.getPublicKey(keychain[i]));
                }
                return keys;
            },
            getPublicKey: function(key) {
                var key = bitcore.HDPublicKey(key.xpub).derive('m' + key.path).publicKey.toString();
                return key;
            },
            saveUserSetUp: function() {

            },
            createCompanyAccount: function() {

            },
            createMofNAccount: function(keychains, numOfSigns) {

            },
            registerObserverCallback: function(callback) {
                Accounts.observerCallbacks.push(callback);
            },
            notifyObservers: function() {
                angular.forEach(Accounts.observerCallbacks, function(callback) {
                    callback();
                });
            },
            update: function(address, account) {
                if (Accounts.currentAccount.get('address') == address) account = Accounts.currentAccount;
                BlockCypher.getAddress(address).then(function(addr) {

                    account.set('balance', addr.balance);
                    account.set('confirmedBalance', addr.balance - addr.unconfirmed_balance)
                    account.save(null).then(function(acct) {

                        $messages.log("Saved the changes" + addr.balance);
                    }, function(error) {
                        $messages.log(error);
                    });
                    $rootScope.$safeApply()
                })
            },

            setupSockets: function(cb) {
                var bcWS = new WebSocket(BlockCypher.ws(type));



                bcWS.onopen = function(msg) {
                    $messages.log("Connected to BCWS");
                    Accounts.BCsocket = function() {
                        bcWS.send.apply(bcWS, arguments)
                    };
                    cb(bcWS.send)
                }

                bcWS.onmessage = function(msg) {
                    var data = JSON.parse(msg.data);
                    for (i in data.addresses) {
                        if (Accounts.accounts['Org'][data.addresses[i]])
                            Accounts.update(data.addresses[i], Accounts.accounts['Org'][data.addresses[i]]);
                        if (Accounts.accounts['Personal'][data.addresses[i]])
                            Accounts.update(data.addresses[i], Accounts.accounts['Personal'][data.addresses[i]]);

                    }
                }


            }



        }

        return Accounts;
    }])
}
