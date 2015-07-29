module.exports = function(module) {
	module.controller = function() {
		module.$.init()
		
		this.goToView = function(name) {
            module.$.currentView = m.prop(module.$.views[name]);
            m.redraw();
		}
	}
}