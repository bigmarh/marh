module.exports = function(app, Parse) {
    app.controller('userCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog) {

            $scope.fields = {
                domain: Org.current.get('domain')
            }
            if (Org.firstUser) {
                var name = Parse.User.current().get('fullName').split(' ');
                $scope.fields.firstName = name[0];
                $scope.fields.lastName = name[name.length - 1];
                $scope.fields.username = Parse.User.current().get('email').split('@')[0]
            }

            $scope.addUser = function() {
                Org.addUser($scope.fields, function(account, user) {
                    Org.current.addUnique('accounts', account);
                    Org.current.save().then(function(org) {
                        var acct = account.attributes;
                        acct.createdAt = account.createdAt;
                        $rootScope.$broadcast('updateCompanyAccounts', {
                            account: acct
                        });
                        if (!Org.firstUser) {
                            var newUser = user.attributes;
                            newUser.fullObj = user;
                            $rootScope.$broadcast('add_CompanyUser', {
                                user: newUser
                            })
                        }
                        $scope.hide();
                    })
                }, function(err) {
                    alert(err.message);
                    $scope.hide();
                });
            }


            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

        }
    ])
}
