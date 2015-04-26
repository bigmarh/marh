module.exports = function(app, Parse) {
    app.controller('dashCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout', 'AccountsService', 'AppService', 'BlockCypher', 'UtilService', '$messages','$mdDialog',
        function($scope, $rootScope, $state, Wallet, $timeout, Accounts, App, BlockCypher, Util, $messages,$mdDialog) {
            Accounts.setupSockets(function(send) {
                for (i in Accounts.addresses) {
                    var addr = Accounts.addresses[i];
                    var message = {
                        "filter": 'addr=' + addr,
                        "token": BlockCypher.token
                    };
                    Accounts.BCsocket(JSON.stringify(message));
                }
            });
            $rootScope.BTCunit = localStorage.BTCunit || 'bits';

            Accounts.checkLogin(false, function() {
                //Go to setup or front, or send to get new email verification
            });
            $scope.logOut = function() {
                $rootScope.$broadcast('logout');
            }
            $scope.loadSend = function(account,ev) {
                Accounts.currentAccount = account;
                $mdDialog.show({
                    controller: 'sendCtrl',
                    templateUrl: '/views/popups/inserts/send.html',
                    targetEvent: ev,
                });
            }
            $scope.loadRequest = function(account) {
                Accounts.currentAccount = account;
                Util.launchLB({
                    template: "/views/dash/content/account/lightbox/request.html",
                })
            }

            
            $rootScope.cycleUnits = function() {
                var units = ['bits', 'mBTC', 'BTC'];
                var currentIndex = units.indexOf($rootScope.BTCunit);
                if (currentIndex == 2) {
                    localStorage.BTCunit = $rootScope.BTCunit = units[0];
                } else {
                    localStorage.BTCunit = $rootScope.BTCunit = units[currentIndex + 1];
                }
            }


            $rootScope.goTo = function(state, params) {
                if (params && params.appUrl) localStorage.currentPlusApp = JSON.stringify(params);
                if (state != $rootScope.currentState) {
                    var delay = ($rootScope.pageClass == "") ? 0 : 200;
                    if (delay) timeout(function() {
                        $state.transitionTo(state, params)
                    }, delay);
                    else $state.transitionTo(state, params);
                    $rootScope.pageClass = "";
                }
            }
        }
    ])
}
