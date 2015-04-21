var CryptoJS = require('crypto-js');
var uuid = require('node-uuid');
window.error = function(obj) {
    Error(obj);
}
window.clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}
module.exports = function(app, Parse) {

    app.service('OrgService', ['$http', 'UtilService', '$rootScope', 'BlockCypher', 'WalletService', 'LastSign', '$q', 'AccountsService', '$messages', function($http, util, $rootScope, BlockCypher, Wallet, LastSign, $q, Accounts, $messages) {

        var Org = {
            currentOrg: {},
            users: [],
            load: function(cb) {

                Parse.User.current().get('org').fetch().then(function(org) {
                    $messages.log(org);
                    Org.setCurrent(org);
                    cb && cb();
                })
            },
            setCurrent: function(org) {
                Org.currentOrg = org;
            },
            getCurrent: function() {
                var deferred = $q.defer();
                var query = new Parse.Query('Organization');
                query.equalTo('objectId', Parse.User.current().get('org').id);
                query.first(function(org) {
                    if (org) Org.setCurrent(org);
                    deferred.resolve(org);
                }, function(error) {
                    alert(error.message);
                    deferred.reject();
                })
                return deferred.promise;
            },
            getUsers: function(page) {

                var deferred = $q.defer();
                Org.currentOrg.relation("users").query().find({
                    success: function(users) {
                        Org.users = users;
                        deferred.resolve(users);
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            },

            get: function() {
                var deferred = $q.defer();
                var query = new Parse.Query('Organization');
                query.equalTo('domain', Parse.User.current().get('domain'));
                query.include('accounts');
                query.first().then(function(org) {
                    deferred.resolve(org);
                }, deferred.reject);

                return deferred.promise;
            },
            fetchAccountsAndUsers: function() {

                var deferred = $q.defer();
                var accounts = [];
                var users = [];
                if (Org.currentOrg.get('accounts') && Org.currentOrg.get('accounts').length) {
                    Org.currentOrg.get('accounts').map(function(account) {
                        if (account == null) {
                            Org.currentOrg.remove('accounts', account)
                            check();
                        } else {
                            account.fetch().then(function(account) {
                                newAccount = clone(account.attributes);
                                newAccount.createdAt = account.createdAt;
                                newAccount.fullObj = account;
                                accounts.push(newAccount);
                                check();
                            })
                        }

                    })

                    function check() {
                        if (Org.currentOrg.get('accounts').length == accounts.length) {
                            next();
                        }
                    }
                } else {

                    next();
                }

                function next() {
                    Org.currentOrg.relation('users').query().find().then(function(users) {
                        users = users.map(function(user) {
                            newUser = clone(user.attributes);
                            newUser.fullObj = user;
                            return newUser;
                        });

                        return deferred.resolve({
                            users: users,
                            accounts: accounts
                        });
                    })
                }


                return deferred.promise;
            },
            getAccounts: function(loadOrg) {
                var deferred = $q.defer();
                Org.currentOrg.relation("accounts").query().find({
                    success: function(accounts) {
                        Org.accounts = accounts;
                        deferred.resolve(accounts);
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            },
            addAccount: function(account, cb, cbErr) {
                var orgQuery = new Parse.Query("Organization");
                orgQuery.equalTo('objectId', Parse.User.current().get('org').id);
                orgQuery.first().then(function(org) {
                    var relation = org.relation('accounts');
                    relation.add(account);
                    org.save().then(cb);
                });

            },
            addRoles: function(orgObj, user, cb) {

                try {
                    $messages.log("Create Roles");
                    var orgName = orgObj.domain.replace(/\./g, '_');
                    var adminTitle = orgName + "_Administrators";

                    //create org admin role
                    var roleACL = new Parse.ACL();
                    roleACL.setPublicReadAccess(true);
                    var adminRole = new Parse.Role(adminTitle, roleACL);
                    adminRole.getUsers().add(Parse.User.current());
                    adminRole.save().then(function(adminRole) {
                        // Create Company 
                        return cb(adminRole, orgObj);

                    }, function(e, data) {
                        //Send Email to org admin with info about 
                        throw "There is a org set up with that name, ask the admin to add you";
                    });
                } catch (e) {
                    $messages.log(e);
                    error(e);
                }

            },
            addUser: function(fields, cb, cbErr) {
                fields.org = Org.currentOrg.id;
                Parse.Cloud.run('org_AddUser', fields).then(function(results) {

                    Org.createUserAccount(results, cb, cbErr);
                }, function(err) {
                    $messages.log(err);
                })
            },

            setPayload: function(org, password, cb) {

                var orgName = org.get('domain').replace(/\./g, '_');
                var adminTitle = orgName + "_Administrators";

                var restrictedAcl = new Parse.ACL();
                restrictedAcl.setPublicReadAccess(false);
                restrictedAcl.setPublicWriteAccess(false);

                var sharedKey = uuid.v4();
                mnemonic = bip39.generateMnemonic();
                var HD = new bitcore.HDPrivateKey.fromSeed(bip39.mnemonicToSeed(mnemonic));
                var payloadObj = {
                    sharedKey: sharedKey,
                    privKey: HD.xprivkey
                }

                var passWordEncKey = bitcore.encoding.Base58(bitcore.crypto.Random.getRandomBufferBrowser(18)).toString();
                var encKey = Wallet.encryptKey(JSON.stringify(payloadObj), "" + password);
                var encPass = Wallet.encryptKey("" + password, passWordEncKey);
                var Payload = Parse.Object.extend('Payload')
                var payload = new Payload();
                //restrict Access Level
                payload.setACL(restrictedAcl);
                payload.set('content', encKey);
                payload.set('type', 'org')
                payload.set('identifier', org.id);
                payload.set('xpub', HD.derive("m/0'").xpubkey);
                payload.set('secret', bitcore.crypto.Hash.sha256(new Buffer(sharedKey)).toString('hex'));
                payload.set('passWordEncKey', passWordEncKey);
                var cardNumber = $rootScope.cardNumber = util.makeId(7, 'digits');
                payload.set('cardNumber', cardNumber);
                $messages.log(cardNumber);
                payload.save().then(function(payload) {
                    $messages.log([{
                        Heading: "Organization Key Card #" + cardNumber
                    }, {
                        title: "Encrypted Private Key",
                        content: payload.get('content')
                    }, {
                        title: "Encrypted Passcode",
                        content: encPass
                    }]);
                    org.set('xpub', payload.get('xpub'));
                    org.set('key_activated', false);
                    org.set('payload', payload);
                    org.save();
                    cb(mnemonic);
                }, function(error) {
                    cbErr(error);
                });

            },

            createCompany: function(role, orgObj, cb, error) {
                $messages.log("Create Company");
                var Orgz = Parse.Object('Organization');
                var orgACL = new Parse.ACL();
                orgACL.setRoleWriteAccess(role, true);
                orgACL.setRoleReadAccess(role, true);
                Orgz.setACL(orgACL);
                var comObj = {
                    domain: orgObj.domain,
                    name: orgObj.name,
                    creator: Parse.User.current(),
                    sharedKey: uuid.v4(),
                    meta: orgObj
                }

                Orgz.set('verified', false);
                Orgz.relation('users').add(Parse.User.current());
                var accountRelations = Orgz.relation('accounts');
                Orgz.save(comObj).then(function(org) {
                    $messages.log('Saved Org');
                    Parse.User.current().set('isAdmin', true);
                    Parse.User.current().set('org', org)
                    Parse.User.current().save();
                    org.save();
                    cb();

                }, function(error) {
                    error(error.message);

                });
            }


        };
        return Org;
    }])
}
