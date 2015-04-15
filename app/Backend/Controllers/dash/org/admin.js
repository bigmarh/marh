module.exports = function(app, Parse) {
    app.controller('adminCtrl', ['$scope', '$state', '$rootScope', 'AccountsService', 'WalletService', 'UtilService', 'OrgService', '$mdDialog','$messages',
        function($scope, $state, $rootScope, Accounts, Wallet, Util, Org, $mdDialog,$messages) {

            //reset current account
            Accounts.currentAccount = {};
            $scope.currency = currency;
            $scope.accounts = false;

            $scope.loadRequest = function(data) {
                Util.launchLB({
                    template: "/views/dash/content/account/partials/request.html",
                    data: data
                })
            }

            $scope.createUser = function(ev, first) {
                if (first) Org.firstUser = true;
                $mdDialog.show({
                    controller: 'userCtrl',
                    templateUrl: '/views/directive-templates/addUser.html',
                    targetEvent: ev,
                });
            }
/*
            $scope.$watch(function() {
                return Org.current
            }, function(newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                    $messages.log("Org Changed");
                    Org.fetchAccountsAndUsers().then(function(UandA) {
                        $scope.users = UandA.users;
                        $scope.accounts = UandA.accounts || true;
                        $scope.$safeApply();
                    },function(err){
                        alert(err);
                    });
                }
            });*/


            $rootScope.$on('updateCompanyAccounts',function(event,options){
                $scope.accounts.push(options.account);
                $scope.$safeApply();
            })
            $rootScope.$on('add_CompanyUser',function(event,options){
                $scope.users.push(options.user);
                $scope.$safeApply();
            })

            $scope.protectandDownload = function() {
                Accounts.createMasterAccount($scope.first);
            }


        }
    ]);
    require('./user')(app, Parse);
    require('./one')(app, Parse);
    require('./transfer')(app, Parse);

}
