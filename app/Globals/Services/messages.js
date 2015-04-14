module.exports = function(app, Parse) {
    app.factory('$messages', ['$state', '$http', '$resource', '$rootScope',
        function($state, $http, $resource, $rootScope) {
            var message = {
                queue:[],
                defaultDelay:3000,
                error: function(message){  
                    console.log("error: "+message);
                },
                success:function(message){
                    console.log("success: "+message);
                },
                log:function(message){
                    console.log(message);
                },
                update:function(){
                    console.log("update: "+message);
                },
                notify:function(){
                     console.log("notify: "+message);
                }
            }

            return message;
        }
    ]);
}
