module.exports = function(module) {
    module.controller = function() {
        module.$.init();

        this.auth_attempt = {
            username: m.prop(''),
            password: m.prop('')
        };

        this.authorizeUser = function() {
            module.$.models.User.authorize(this.auth_attempt).then(function(user) {
            	window.location = '/quickpay-back'
            }, function() {
            	alert('Invalid credentials!');
            });
        }

    }
}