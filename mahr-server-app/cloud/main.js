require('cloud/app.js');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
    response.success("Hello world!");
});

Parse.Cloud.define("transfer", function(request, response) {
    Parse.Cloud.useMasterKey();

    /*
		input:
			to 			string		"objectId of recipient (User class)"
			amount 		number		"Amount to transfer"
    */

    var current_user = Parse.User.current();

console.log(request.params);
    // get the transfer to user by request.to (objectId)
    var query = new Parse.Query(Parse.User);
    query.get(request.params.to, {
        success: function(to_user) {
            // update balance
            to_user.increment('balance', parseInt(request.params.amount));
            to_user.save(null, {
                success: function(to_user) {
                    // update current user's balance
                    current_user.increment('balance', -parseInt(request.params.amount));
                    current_user.save(null, {
                        success: function(user) {
                            console.log({
                                new_balance: user.get('balance')
                            });
                        },
                        error: function() {
                            console.log('error updating the balance of the current user');
                        }
                    })
                },
                error: function() {
                    console.log('error updating the balance');
                }
            })
        },
        error: function(user, error) {
            console.log('error getting the recipient user by objectId');
            console.log(error);
        }
    });







    // var Account = Parse.Object.extend("Account");
    // var query = new Parse.Query(Account);
    // query.equalTo('user', Parse.User.current());
    // query.first({
    //     success: function(current_user_account) {
    //         console.log("Current User Found:");
    //         console.log(current_user_account);
    //         console.log("---------------------");

    //         // get the to user
    //         var query = new Parse.Query("User");
    //         query.equalTo('objectId', request.to);
    //         query.first({
    //             success: function(to_user) {
    //                 console.log("Tranfer To User Found:");
    //                 console.log(to_user);
    //                 console.log("---------------------");

    //                 var to_query = new Parse.Query(Account);
    //                 to_query.equalTo('user', to_user);
    //                 to_query.first({
    //                     success: function(to_user_account) {
    //                         if (parseInt(current_user_account.get('balance')) >= parseInt(request.amount) && parseInt(request.amount) > 0) {
    //                             // we now have both accounts (current_user_account, to_user_account)
    //                             current_user_account.set('balance', parseInt(current_user_account.get('balance')) - parseInt(request.amount));
    //                             current_user_account.save(null, {
    //                                 success: function(from_account) {
    //                                     to_user_account.set('balance', parseInt(to_user_account.get('balance')) + parseInt(request.amount));
    //                                     to_user_account.save(null, {
    //                                         success: function(to_account) {
    //                                             return response.success(true);
    //                                         },
    //                                         error: function(object, error) {
    //                                             console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                                             console.log('Error getting current 1');
    //                                             console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                                             console.log(error);
    //                                             return response.error(error);
    //                                         }
    //                                     });
    //                                 }
    //                             });
    //                         } else {
    //                             return response.error('Insufficient funds');
    //                         }
    //                     },
    //                     error: function(object, error) {
    //                         console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                         console.log('Error getting current 4');
    //                         console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                         console.log(error);
    //                         return response.error(error);
    //                     }
    //                 });
    //             },
    //             error: function(object, error) {
    //                 console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                 console.log('Error getting current 2');
    //                 console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //                 console.log(error);
    //                 return response.error(error);
    //             }
    //         });
    //     },
    //     error: function(object, error) {
    //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //         console.log('Error getting current 3');
    //         console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    //         console.log(error);
    //         return response.error(error);
    //     }
    // });
});
