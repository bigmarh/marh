module.exports = function(module) {
    module.controller = function() {
        module.$.init();

        this.test = function() {
            alert('it worked!');
        }

    }
}