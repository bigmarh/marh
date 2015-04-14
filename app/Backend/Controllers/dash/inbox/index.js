module.exports = function(app, Parse) {
    app.controller('inboxCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService',
        function($scope, $state, $rootScope, Accounts, Wallet, Util) {
            if (!Parse.User.current()) $state.go('home.index');
            $rootScope.showMessage = 0;
            $scope.messages = [];
            for (var i = 50; i >= 0; i--) {
                if (!(i % 3)) $scope.messages.push({
                    type: "i",
                    id: i
                });

                if (!(i % 2)) $scope.messages.push({
                    type: "m",
                    id: i
                });
                else $scope.messages.push({
                    type: "s",
                    id: i
                });
            };

            $scope.loadCompose = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/inbox/lightbox/compose.html",
                    data:data
                })
            }

            $scope.loadInvoice = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/inbox/lightbox/invoice.html",
                    data:data
                })
            }
           

        }
    ]);

    require('./message')(app, Parse);

}
