module.exports = function(Parse, app, module) {
	
	var hashModal = $load.library('$hashModal', {app:app});
	var pinService = $load.service('$Pin');

    module.$ = (function() {
        
        var vm = {
        	pin: [ m.prop(''), m.prop(''), m.prop(''), m.prop('') ],
        	pinValid: m.prop(''),
            active: m.prop(true)
        };

        vm.init = function() {
        	
        }

        vm.setPinEntry = function(value) {

        	if(value != 'x') {
        		// push a value
        		var set = false;
        		vm.pin.map(function(pinVal) {
        			if(pinVal() == '' && !set) {
        				pinVal(value);
        				set = true;
        			}
        		})
        	} else {
        		// pop last value
        		for (var i = vm.pin.length - 1; i >= 0; i--) {
        			if(vm.pin[i]() != '') {
        				vm.pin[i]('');
        				break;
        			}
        		}
        	}

        	if( vm.pin[0]() != '' && vm.pin[1]() != '' && vm.pin[2]() != '' && vm.pin[3]() != '' ) {
        		// they've entered all 4 digits, so send them back
        		if( pinService.pinValidator( vm.pinToString() ) ) {
                    pinService.validPinAction(vm.pinToString());
        			vm.closeKeypad();
        		} else { 
        			vm.pinValid('animated shake invalidPin');
        			setTimeout(function() {
        				m.startComputation();
        				vm.pinValid('');
        				vm.pin = [ m.prop(''), m.prop(''), m.prop(''), m.prop('') ];
						pinService.invalidPinAction( vm.pinToString() );
						m.endComputation();
        			}, 900);
        		}
        		
        	}

        }

        vm.openKeypad = function(contentModule, options) {
        	// set content of hashModal to the keypad component
        	// set the cancel and close functions
        	// open the hashModal
            vm.resetPin();
            pinService.pinValidator = options.pinValidator || pinService.pinValidator;// 
        	pinService.validPinAction = options.validPinAction || pinService.validPinAction;
        	pinService.invalidPinAction = options.invalidPinAction || pinService.invalidPinAction;
        	
        	options.content = contentModule;
        	ee.emit('openHashModal', options);
        }
 
        vm.closeKeypad = function() {
            vm.active(false);
        	ee.emit('closeHashModal');
        }

        vm.pinToString = function() {
            return vm.pin[0]() + vm.pin[1]() + vm.pin[2]() + vm.pin[3]();
        }

        vm.resetPin = function() {
            vm.active(true);
            vm.pin = [ m.prop(''), m.prop(''), m.prop(''), m.prop('') ];
        }

        return vm;

    }())

}
