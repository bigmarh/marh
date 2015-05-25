module.exports = function(app, Parse) {
    app.controller('userAccountCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog', 'UserService', 'Account', '$messages',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog, User, Account, $messages) {

            $scope.admins = [];
            $scope.account = {
                signees: [],
                admins: {},
                policy: {
                    global: {
                        "dailyLimit": 0,
                        "transactionLimit": 0
                    },
                    user: {}
                }
            }
            var self = this;
            self.querySearch = querySearch;

            $scope.users = Org.users.map(function(user) {
                user.attributes.id = user.id;
                user.attributes.fullObj = user;
                user.attributes.subtitle = Org.currentOrg.get('domain');
                user.attributes.thumbnailUrl = (user.image && user.image.url) || "https://i2.wp.com/i.vimeocdn.com/portrait/default-blue_300x300.png";
                return user.attributes
            })



            /**
             * Search for contacts.
             */
            function querySearch(query, signees) {
                    var results = query ?
                        $scope.users.filter(createFilterFor(query, signees)) : [];
                    return results;
                }
                /**
                 * Create filter function for a query string
                 */
            function createFilterFor(query, signees) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(contact) {
                    if (!contact.payload && signees) return false;
                    return (contact.fullName.toLowerCase().indexOf(lowercaseQuery) != -1) || (contact.email.toLowerCase().indexOf(lowercaseQuery) != -1);
                };
            }

            self.getMaxSigns = function() {
                var req = [];
                for (var i = 0; i = $scope.account.signees.length; i++) {
                    req.push(i);
                };
                return req;
            }
            $scope.checkAccount = function() {
                return !$scope.account.signees.length || !$scope.account.name;
            }
            $scope.save = function() {
                $scope.account.success = $scope.successAccount;
                $scope.account.error = $messages.error;
                Account.saveNew($scope.account);
            }
            $scope.successAccount = function(account) {
                var newAccount = account.attributes;
                newAccount.createdAt = new Date();
                newAccount.fullObj = account;
                $rootScope.$broadcast('add_CompanyAccount', {
                    account: newAccount
                })
                $scope.hide();
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
