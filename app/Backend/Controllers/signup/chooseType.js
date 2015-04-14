module.exports = function(app, Parse) {
    app.controller('chooseTypeCtrl', ['$scope', "$rootScope", '$state', 'WalletService', '$timeout',
        function($scope, $rootScope, $state, Wallet, $timeout) {
          if(!Parse.User.current()) $state.go('signup.register');
          
        }
    ])
}
