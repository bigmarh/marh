module.exports = function(module) {
	module.controller = function() {
		module.vm.init()
		return {
			onunload: function(e) {
				console.log(module)
				e.preventDefault()

			}
		}

	}
}
