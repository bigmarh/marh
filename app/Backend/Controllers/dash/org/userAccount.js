module.exports = function(app, Parse) {
    app.controller('userAccountCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog', 'UserService',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog, User) {

            $scope.selectedUsers = [];
            $scope.selectedAdmins = [];
            $scope.users = Org.users.map(function(user) {
                user.attributes.value = user;
                user.attributes.display = user.attributes.fullName;
                user.attributes.subtitle = Org.currentOrg.get('domain');
                user.attributes.thumbnailUrl = (user.image && user.image.url) || "https://i2.wp.com/i.vimeocdn.com/portrait/default-blue_300x300.png";
                return user.attributes
            })

            $scope.selectedItemChange = function(user){
                console.log(user);
                $scope.selectedAdmins.push(user);
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
