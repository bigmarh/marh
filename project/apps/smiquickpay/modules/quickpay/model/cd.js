module.exports = function(module, Parse) {

    var model = {

        save: function(new_cd) {
            var CD = Parse.Object.extend("CD");
            var cd = new CD();
            var deferred = m.deferred();

            for (cd_value in new_cd) {
                cd.set(cd_value, new_cd[cd_value]);
            }

            cd.save().then(function(new_cd) {
            	deferred.resolve(new_cd);
            });

            return deferred.promise;
        },

        update: function(cd) {
            var deferred = m.deferred();
            cd.save().then(function(cd) {
                deferred.resolve(cd);
            });
            return deferred.promise;
        },

        getAll: function() {
            var CD = Parse.Object.extend("CD");
            var query = new Parse.Query(CD);
            var deferred = m.deferred();
            query.find({
                success: function(cds) {
                	deferred.resolve(cds);
                    m.redraw();
                },
                error: function(object, error) {
                    console.log("Error occured retrieving CD library: " + object);
                    deferred.reject("Error occured retrieving CD library: " + object);
                }
            });
            return deferred.promise;

        }

    };

    return model;

}
