module.exports = function(params) {
    
    var template = require('./templates/fullLoader');

    var fullLoader = {
        
        init: function(options) {
            ee.on('showFullLoader', fullLoader.showFullLoader);
            ee.on('closeFullLoader', fullLoader.closeFullLoader);
            ee.on('updateFullLoader', fullLoader.updateFullLoader);
            fullLoader.createLoaderElement(options);
        },

        options: {
            text: m.prop('')
        },

        createLoaderElement: function(options) {
            if (document.getElementById('fullLoader'))
                return;

            var fullLoaderElement = document.createElement('div');
            fullLoaderElement.id = "fullLoader";
            fullLoaderElement.className = 'animated fadeIn noDelay';
            fullLoader.current = fullLoaderElement;
        },

        showFullLoader: function(options) {
            fullLoader.options.text(options.text);
            fullLoader.current.className = 'animated fadeIn noDelay';
            document.body.appendChild(fullLoader.current);
            var component = m.component({
                controller: require('./controller')(fullLoader, fullLoader.options),
                view: template
            }, fullLoader.options, fullLoader)
            
            m.mount(fullLoader.current, component);
            m.redraw();
        },

        updateFullLoader: function(options) {
            fullLoader.options.text(options.text);
            m.redraw();
        },

        closeFullLoader: function(options) {
            fullLoader.options = {
                text: m.prop('')
            };
            fullLoader.current.className = 'animated fadeOut noDelay';
            setTimeout(function() {
                document.body.removeChild(fullLoader.current);
            }, 500)
        }


    }

    return fullLoader;
}
