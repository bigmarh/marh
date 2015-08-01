module.exports = function(module) {
    
    var controller = function() {

        alert('made it to the custom controller');
        alert(m.route.param('id'));
        
    };

    return controller;
}