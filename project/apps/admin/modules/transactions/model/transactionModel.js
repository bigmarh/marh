module.exports = function(module, Parse) {

    var model = {

        getTransactions: function() {
            var deferred = m.deferred();

            var incomingTransaction = new Parse.Query("Transaction");
            incomingTransaction.equalTo("user_to", Parse.User.current());

            var outgoingTransaction = new Parse.Query("Transaction");
            outgoingTransaction.equalTo("user_from", Parse.User.current());

            var query = Parse.Query.or(incomingTransaction, outgoingTransaction).include("user_to").include("user_from");
            query.find({
                success: function(transactions) {
                    deferred.resolve(transactions);
                },
                error: function(error) {
                    deferred.reject("Error: " + error.code + " " + error.message);
                }
            });

            return deferred.promise;
        }

    };

    return model;

}
