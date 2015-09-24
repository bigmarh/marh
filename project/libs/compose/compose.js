module.exports = function(params) {

    var composeTemplate = require('./templates/composeMessage');

    var compose = {

        init: function(options) {

            // declare events
            ee.on('composeMessage', compose.composeMessage);
            ee.on('closeComposeBox', compose.close);

            compose.createComposeBox(options);

        },

        options: {
            model: {
                to: '',
                subject: '',
                message: '',
                attachments: '',
                invoice: ''
            },
            sendAction: function() {}
        },

        current: {},

        createComposeBox: function(options) {
            if (document.getElementById('composeBox'))
                return;

            var composeBox = document.createElement('div');
            composeBox.id = "composeBox";
            composeBox.className = 'composeModal animated fadeInUp animated-5';
            compose.current = composeBox;

        },

        composeMessage: function(options) {

            compose.current.className = 'composeModal animated fadeInUp animated-5';
            document.body.appendChild(compose.current);

            // set each value in a m.prop
            Object.keys(compose.options.model).map(function(key) {
                if (options.model[key])
                    compose.options.model[key] = m.prop(options.model[key])
                else
                    compose.options.model[key] = m.prop(compose.options.model[key])
            });

            if (options.sendAction)
                compose.options.sendAction = options.sendAction;

            var component = m.component({
                controller: require('./controller')(compose, compose.options),
                view: composeTemplate
            }, compose.options, compose)

            m.mount(compose.current, component);

        },

        send: function() {
            // prepare the request to send the message
            compose.messageRequest = compose.createRequest();

            // send the request
            compose.sendMessage();
        },

        createRequest: function() {
            this.opts = {
                method: "POST",
                url: $globalConfig.apiUrl + "api/message",
                data: {
                    objectData: {
                        email: compose.options.model.to().email,
                        to: compose.options.model.to().objectId,
                        from: $User.current("objectId"),
                        subject: compose.options.model.subject(),
                        message: compose.options.model.message(),
                        attachments: compose.options.model.attachments()
                    }
                }
            }
            return $_request(this.opts)
        },

        sendMessage: function() {
            compose.messageRequest.start(function(response) {
                compose.options.sendAction(compose.options.model);
                compose.close();
            }, function(error) {
                console.log(error)
            });
        },

        close: function() {
            compose.options = {
                model: {
                    to: m.prop(''),
                    subject: m.prop(''),
                    message: m.prop(''),
                    attachments: m.prop(''),
                    invoice: m.prop('')
                },
                sendAction: function() {}
            };
            compose.current.className = 'composeModal animated fadeOutDown animated-5';
            setTimeout(function() {
                document.body.removeChild(compose.current);
            }, 500)
        }

    }

    return compose;
}
