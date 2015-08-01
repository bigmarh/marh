module.exports = function(module, Parse) {

    var model = {

        save: function(new_bank) {
            var Bank = Parse.Object.extend("Bank");
            var bank = new Bank();
            var deferred = m.deferred();

            for (bank_value in new_bank) {
                bank.set(bank_value, new_bank[bank_value]);
            }

            bank.save().then(function(new_bank) {
                deferred.resolve(new_bank);
            });

            return deferred.promise;
        },

        update: function(bank) {
            var deferred = m.deferred();
            bank.save().then(function(bank) {
                deferred.resolve(bank);
            });
            return deferred.promise;
        },

        getBank: function(bankID) {
            var deferred = m.deferred();
            var Bank = Parse.Object.extend("Bank");
            var query = new Parse.Query(Bank);
            query.get(bankID, {
                success: function(bank) {
                    // The object was retrieved successfully.
                    deferred.resolve(bank);
                    m.redraw();
                },
                error: function(object, error) {
                    // The object was not retrieved successfully.
                    console.log("Error occured retrieving Bank: " + object);
                    deferred.reject("Error occured retrieving Bank: " + object)
                }
            });
            return deferred.promise;
        },

        getAll: function() {
            var Bank = Parse.Object.extend("Bank");
            var query = new Parse.Query(Bank);
            var deferred = m.deferred();
            query.find({
                success: function(banks) {
                    deferred.resolve(banks);
                    m.redraw();
                },
                error: function(object, error) {
                    console.log("Error occured retrieving Bank library: " + object);
                    deferred.reject("Error occured retrieving Bank library: " + object);
                }
            });
            return deferred.promise;
        }

    };

    return model;

}
