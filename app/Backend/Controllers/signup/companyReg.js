var uuid = require('node-uuid');

module.exports = function(app, Parse) {
    app.controller('companyRegCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout', 'UtilService',
        function($scope, $rootScope, $state, Wallet, $timeout, util) {
            if (!Parse.User.current()) $state.go('signup.register');
            if (Parse.User.current().get('companyCreated')) $state.go('dash.accounts');
            var newKey = false;
            Wallet.createPrivKeyfromDic(function(result) {
                newKey = result;
            }, type);

            $scope.AddRoles = function() {

                try {
                    var orgName = $scope.orgName.replace(/ /g, '_');
                    var adminTitle = orgName + "_Administrator";
                    var companyUserRole = orgName + "_User";
                    console.log(companyUserRole, adminTitle);
                    //create company admin role
                    var roleACL = new Parse.ACL();
                    roleACL.setPublicReadAccess(true);
                    var adminRole = new Parse.Role(adminTitle, roleACL);
                    adminRole.getUsers().add(Parse.User.current());
                    adminRole.save().then(function(adminRole) {
                        // Create User Role
                        var role = new Parse.Role(companyUserRole, roleACL);
                        role.getUsers().add(Parse.User.current());
                        role.getRoles().add(adminRole);
                        role.save();
                        $scope.createWallet = true; 
                        $scope.$safeApply();
                    }, function(e) {
                        //Send Email to company admin with info about 
                        "There is a company set up with that name, ask the admin to add you";
                    });
                } catch (e) {
                    alert(e);
                }

            }


            $scope.protectandDownload = function() {
                newKey = newKey.derive("m/0");
                var payload = Wallet.encryptKey(JSON.stringify(newKey), $scope.password);

                var orgName = $scope.orgName.replace(/ /g, '_');

                var adminTitle = orgName + "_Administrator";
                var companyUserRole = orgName + "_User";
                //Create company
                var Company = Parse.Object('Company');
                var postACL = new Parse.ACL();
                postACL.setRoleWriteAccess(adminTitle, true);
                postACL.setRoleReadAccess(companyUserRole, true);
                Company.setACL(postACL);
                var comObj = {
                    name: $scope.orgName,
                    xpub: newKey.xpubkey,
                    creator: Parse.User.current(),
                    sharedKey: uuid.v4()
                }
                var relation = Company.relation('users');
                relation.add(Parse.User.current());
                Company.save(comObj).then(function(company) {
                    var encrptedPass = Wallet.encryptKey($scope.password, company.id);
                    if ($scope.backup) {
                        var pl = Parse.Object('Payloads');
                        pl.set('type', 'company');
                        pl.set('identifier', company);
                        pl.set('content', payload);
                        pl.setACL(postACL);
                        pl.save();
                    }
                    Parse.User.current().set('companyCreated', true);
                    util.createBKUPDF([{
                        title: "Encrypted Private Key",
                        content: payload
                    }, {
                        title: "Encrypted Passcode",
                        content: encrptedPass
                    }]);
                    $state.go('accounts.summary');
                }, function(error) {
                    alert(error.message);
                    $state.go('accounts.summary');
                });





            }


        }
    ])
}
