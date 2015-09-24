module.exports = function(module) {

	ee.on('openKeypad', function($keypad, args) {
		module.$.openKeypad($keypad, args);
    })

    ee.on('closeKeypad', function(args) {        
		module.$.closeKeypad(module, args);
    })

}