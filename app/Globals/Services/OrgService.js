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
    app.service('OrgService', ['$http', 'UtilService', '$rootScope', 'BlockCypher', 'WalletService', 'LastSign', '$q', 'AccountsService', function($http, util, $rootScope, BlockCypher, Wallet, LastSign, $q, Accounts) {
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
                            Org.current.remove('accounts',account)
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
            addRoles: function($scope, user, cb, error) {

                try {
                    console.log("Create Roles");
                    var orgName = $scope.org.domain.replace(/\./g, '_');
                    var adminTitle = orgName + "_Administrators";

                    //create org admin role
                    var roleACL = new Parse.ACL();
                    roleACL.setPublicReadAccess(true);
                    var adminRole = new Parse.Role(adminTitle, roleACL);
                    adminRole.getUsers().add(Parse.User.current());
                    adminRole.save().then(function(adminRole) {
                        // Create Company
                        Org.createCompany(adminRole, $scope, cb, error);

                    }, function(e, data) {
                        console.log(e);
                        //Send Email to org admin with info about 
                        "There is a org set up with that name, ask the admin to add you";
                    });
                } catch (e) {
                    console.log(e);
                    error(e);
                }

            },
            addUser: function(fields, cb, cbErr) {
                fields.org = Org.current.id;
                Parse.Cloud.run('org_AddUser', fields).then(function(results) {

                    Org.createUserAccount(results, cb, cbErr);
                }, function(err) {
                    console.log(err);
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
            createCompany: function(role, $scope, cb, error) {
                console.log("Create Company");

                if (!$scope.password) return alert("Have to have password");
                var HD = new bitcore.HDPrivateKey();
                var backupHD = new bitcore.HDPrivateKey();
                HD = HD.derive("m");
                backupHD = backupHD.derive("m");
                var payload = Wallet.encryptKey(JSON.stringify(HD), $scope.password);
                console.log(HD);
                var backupPayload = Wallet.encryptKey(JSON.stringify(backupHD), $scope.password);
                var orgName = $scope.org.domain.replace(/ /g, '_');



                buildAccount()

                //Build org
                function buildAccount() {
                    console.log('Start Building Org');
                    var Orgz = Parse.Object('Org');
                    var orgACL = new Parse.ACL();
                    orgACL.setRoleWriteAccess(role, true);
                    orgACL.setRoleReadAccess(role, true);
                    Orgz.setACL(orgACL);
                    var comObj = {
                        domain: $scope.org.domain,
                        name: $scope.org.name,
                        creator: Parse.User.current(),
                        sharedKey: uuid.v4(),
                    }

                    Orgz.set('activated', false);
                    var relation = Orgz.relation('users');
                    relation.add(Parse.User.current());
                    var accountRelations = Orgz.relation('accounts');
                    Orgz.save(comObj).then(function(org) {
                        console.log('Saved Org');
                        Parse.User.current().set('isAdmin', true);
                        Parse.User.current().save();

                        LastSign.createSignWithAC(
                            function success(result) {
                                console.log('Got New LastSign Key');
                                done(result.xpubkey, result.idsl);
                            },
                            org.id,
                            "Org"
                        );
                        var done = function(lsXpub, id) {
                                org.set('keychains', [{
                                    xpub: HD.xpubkey,
                                    path: '',
                                    type: "org-main",
                                    owner: org.id
                                }, {
                                    xpub: backupHD.xpubkey,
                                    path: '',
                                    type: "org-second",
                                    owner: org.id,
                                    backup: true
                                }, {
                                    type: "org-lastsign",
                                    xpub: lsXpub,
                                    path: ''
                                }])
                                org.save();

                                var encryptedPass = Wallet.encryptKey($scope.password, id);
                                //Save Payload for Org keys
                                var pL = Parse.Object('Payload');
                                pL.set('content', payload);
                                pL.set('type', 'org')
                                pL.set('secret', bitcore.crypto.Hash.sha256(new Buffer(org.get('sharedKey') + $scope.password)).toString('hex'));
                                pL.set('passWordEncKey', encryptedPass);
                                pL.set('identifier', org.id);
                                pL.set('content', payload);
                                var restrictedAcl = new Parse.ACL();
                                restrictedAcl.setPublicReadAccess(false);
                                restrictedAcl.setPublicWriteAccess(false);
                                restrictedAcl.setRoleReadAccess(role, true);
                                pL.setACL(restrictedAcl);
                                pL.save(null).then(function(payload) {
                                    /* util.createBKUPDF([{
                                         title: "Org ID:" + org.id,
                                     }, {
                                         title: "Encrypted Private Key",
                                         content: payload
                                     }, {
                                         title: "Encrypted Backup Key",
                                         content: backupPayload
                                     }, {
                                         title: "Encrypted Passcode",
                                         content: encryptedPass
                                     }, {
                                         title: "Company Last Sign xpub",
                                         content: lsXpub
                                     }]);*/
                                    cb(org);
                                }, function(error) {
                                    console.log(error);
                                });
                            }
                            //Print Keys for company

                    }, function(error) {
                        error(error.message);

                    });
                }

            }
        };
        return Org;
    }])
}
