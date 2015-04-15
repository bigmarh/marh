var required = require('../helpers/bitcore');
var bitcore = required('bitcore');
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
            current: {},
            setCurrent: function(org) {

                Org.current = org;
            },
            getCurrent: function() {
                var query = Parse.Query('Org');
                query.equalTo('domain', Parse.User.current().get('domain'));
                query.first(function(org) {
                    if (org) Org.setCurrent(org);
                }, function(error) {
                    alert(error.message);
                })
            },
            get: function() {
                var deferred = $q.defer();
                var query = new Parse.Query('Org');
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
                if (Org.current.get('accounts') && Org.current.get('accounts').length) {
                    Org.current.get('accounts').map(function(account) {
                        if (account == null) {
                            Org.current.remove('accounts', account)
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
                        if (Org.current.get('accounts').length == accounts.length) {
                            next();
                        }
                    }
                } else {

                    next();
                }

                function next() {
                    Org.current.relation('users').query().find().then(function(users) {
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
            getUsers: function(loadOrg) {

                var deferred = $q.defer();
                var relation = Org.current.relation('accounts');
                var query = relation.query();
                query.find().then(function(users) {
                    deferred.resolve(users);
                })
                return deferred.promise;
            },
            getAccounts: function(loadOrg) {
                var deferred = $q.defer();

                var query = new Parse.Query('OrgAccounts');

                query.find().then(function(accounts) {
                    deferred.resolve(accounts);
                })
                return deferred.promise;
            },
            addAccount: function(users, cb, cbErr) {

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
                fields.org = Org.current.id;
                Parse.Cloud.run('org_AddUser', fields).then(function(results) {

                    Org.createUserAccount(results, cb, cbErr);
                }, function(err) {
                    $messages.log(err);
                })
            },
            createUserAccount: function(data, cb, cbErr) {
                var org = data.org || Org.current;
                var user = data.user || Parse.User.current();
                var orgName = org.get('domain').replace(/\./g, '_');
                var adminRole = orgName + "_Administrators";

                var query = new Parse.Query('Accounts');
                query.equalTo('Org', org);
                query.count().then(function(number) {
                    var acctObj = {
                        account: {
                            Org: org,
                            name_slug: org.get('domain') + ":" + user.get('email').split('@')[0],
                            type: "Org",
                            name: user.get('fullName')
                        },
                        keychains: Accounts.joinChains([user.get('originChain')], org.get('keychains'), true, number),
                        pathnumber: number,
                        signatures: [2, 4], //m-of-n
                        access: [user, {
                            isRole: adminRole
                        }],
                        signees: [user, org]
                    }
                    Accounts.buildAccount(acctObj, function(account) {
                        cb(account, user);
                    }, cbErr);
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
                    org.set('key-activated', false);
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
                    meta: orgObj.meta
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
