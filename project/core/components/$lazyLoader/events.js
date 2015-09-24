module.exports = function(module) {

	ee.on('lazyLoad', function(args) {
		module.$.init(args);
    })

}