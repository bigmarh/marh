
module.exports = function(app, Parse) {
    app.controller('setUpCtrl', ['$scope', "$rootScope", '$state',  'AccountsService', 'AppService','authenticated',
        function($scope, $rootScope, $state,  Accounts, App,authenticated ) {
            if(Parse.User.current().get('originChain'))
                    $state.go('setUp.org');
        	$scope.generateOrigin=function(){
        		console.log("Made to generateOrigin")
        		if($scope.password != $scope.confirmPassword ) return Error("Please make sure the passwords match");
        		Accounts.createOriginAccount({password:$scope.password},type,function(){
                    $state.go('setUp.org');
                },function(err){
                    alert(err.message);
                });
        	}
        }
    ])

    require('./orgReg.js')(app, Parse);
}
