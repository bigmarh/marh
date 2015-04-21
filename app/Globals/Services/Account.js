module.exports = function(app, Parse) {
    app.service('Account', ['$http', 'UtilService', '$rootScope', '$q', 'WalletService', '$timeout', '$messages', function($http, util, $rootScope, $q, Wallet, $timeout, $messages) {
        var Account = {
            current: {},
            saveNew: function(account) {
                if (!account.signees.length) return $messages.error('Must have a least one signee');
                if (!account.name) return $messages.error('Must have a name');

                Account
                    .new()
                    .setAccess(account.admins)
                    .setExtraData(account)
                    .setPolicy(account.policy)
                    .then(Account.getKeychain)
                    .then(Account.save)
            },
            new: function() {
                var acct = Parse.Object.extend('Account');
                var newAccount = new acct();
                this.current = newAccount;
                return this;
            },
            setAccess: function(admins) {

                //set admin access to account
                var groupACL = new Parse.ACL();
                var orgName = Parse.User.current().get('domain').replace(/\./g, '_');
                var adminTitle = orgName + "_Administrators";
                groupACL.setRoleWriteAccess(adminTitle, true);
                groupACL.setRoleReadAccess(adminTitle, true);
                if (Object.keys(admins).length) {
                    // we are sending this message to.
                    for (var i = 0; i < Object.keys(admins).length; i++) {
                        var keys = Object.keys(admins);
                        var admin = admins[keys[i]];
                        if (admin.access == "view" || admin.access == "edit") groupACL.setReadAccess(keys[i], true);
                        if (admin.access == "edit") groupACL.setReadAccess(keys[i], true);
                    }
                }
                this.current.setACL(groupACL);
                return this;
            },
            setPolicy: function(policyObj) {
                var self = this;
                var deferred = $q.defer();
                var Policy = Parse.Object.extend('Policy');
                var pol = new Policy();
                var ACL = new Parse.ACL();
                ACL.setPublicReadAccess(true);
                pol.setACL(ACL);
                pol.save(policyObj).then(function(p) {
                    Parse.Cloud.run("registerLastSign", {
                        policyId: p.id
                    }).then(function(results) {
                        self.current.set('lastSign', {
                            "__type": "Pointer",
                            "className": "LastSign",
                            "objectId": results.lastSign
                        });
                        results.accountObj = self;
                        deferred.resolve(results);
                    })
                }, $messages.log)

                return deferred.promise;

            },
            setExtraData: function(account) {
                this.current.set('createdBy', Parse.User.current());
                this.current.set('org', Parse.User.current().get('org'));
                for (var i = 0; i < Object.keys(account).length; i++) {
                    var keys = Object.keys(account);
                    if (keys[i] == "admins" || keys[i] == "policy") continue;
                    this.current.set(keys[i], account[keys[i]]);
                }
                return this;

            },
            getKeychain: function(lastSign) {
                console.log(lastSign);
                var deferred = $q.defer();
                var current = lastSign.accountObj.current;
                var keychain = [];

                var signees = current.get('signees').map(function(signee) {
                    keychain.push({
                        owner: signee.email,
                        type: "user",
                        xpub: signee.xpub,
                        path:""
                    })
                    return;
                })



                function addLastSign() {
                    var lsKeychain = {
                        owner: lastSign.lastSign,
                        xpub: lastSign.xpubkey,
                        type: "lastSign",
                        path:"0/0/0"
                    }

                    keychain.push(lsKeychain);
                    addOrg();
                }

                function addOrg() {
                    Parse.User.current().get('org').fetch().then(function(org) {
                        var keychainObj = {
                            owner: org.id,
                            type: "org",
                            xpub: org.get('xpub'),
                            path:""
                        };
                        keychain.push(keychainObj);
                        done();
                    })

                }
                function done() {
                    if (keychain.length == signees.length + 2) {
                        deferred.resolve(keychain);
                    }
                    else{
                        $messages.error("There was an issue with creating the keychain");
                    }
                }

                addLastSign();
                return deferred.promise;
            },
            save: function(result) {
                console.log("Made it to Save");
                var address = Wallet.createMultisig(Accounts.getPublicKeys(result), type, account.requiredSignatures).toString();

                console.log(address);
            }
        }

        return Account;
    }])
}
