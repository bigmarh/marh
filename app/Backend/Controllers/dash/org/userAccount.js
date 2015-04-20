module.exports = function(app, Parse) {
    app.controller('userAccountCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog', 'UserService',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog, User) {
            if (!Accounts.currentAccount)
                $scope.account = Parse.Object.extend('Account');
            $scope.account = {
                signees: [],
                admins: [],
                policy:{
                    global:{
                        "dailyLimit":1000,"transactionLimit":500
                    },
                    users:{}
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
            function querySearch(query) {
                    var results = query ?
                        $scope.users.filter(createFilterFor(query)) : [];
                    return results;
                }
                /**
                 * Create filter function for a query string
                 */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(contact) {
                    return (contact.fullName.toLowerCase().indexOf(lowercaseQuery) != -1) || (contact.email.toLowerCase().indexOf(lowercaseQuery) != -1);
                };
            }

            self.getMaxSigns = function(){
                var req = [];
                for (var i = 0; i = $scope.account.signees.length ; i++) {
                        req.push(i);
                };
                return req;
            }
            $scope.checkAccount = function(){
                return !$scope.account.signees.length || !$scope.account.name;
            }
            $scope.save = function(){
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
