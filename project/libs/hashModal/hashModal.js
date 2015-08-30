module.exports = function(params) {

    var modalTemplate = require('./templates/modal-template');
    var routeHandler = require('./helpers/routeHandler').routeHandler;
    var hashModal = {
        init: function(options) {
            options = options || {};
            hashModal.setUpEvent(options);
            hashModal.createModal(options);
        },
        removeDelay: 100,
        content: {
            controller: function() {
                this.message = window.location['hash'];
            },
            view: function(ctrl) {
                return m('.hello', 'Hope this works ' + ctrl.message);
            }
        },
        current: {},
        modalOptions: {
            cancel: {
                text: "Disagree",
                action: function() {
                    // console.log('Set this function for after cancel')
                }
            },
            confirm: {
                text: "Agree",
                action: function() {
                    // console.log('Set this function for after confirm')
                }
            }
        },
        routeChange: function(options) {
            if (!window.location['hash']) return hashModal.remove();
            var routearray = routeHandler(window.location['hash'], params);

            options.content = routearray[0];
            hashModal.modalOptions = routearray[2] || hashModal.modalOptions;
            if (routearray[1]) {
                for (opt in routearray[1]) {
                    options[opt] = routearray[1][opt];
                };
            }
            if (!hashModal.current.active) hashModal.openModal(options);
            else hashModal.loadModal(options);
        },
        setUpEvent: function(options) {
            if (window.location['hash']) {
                //ensure the layout is loaded to protect modal from being overwritten by redraw
                ee.on('layoutLoaded', function() {
                    hashModal.routeChange(options);
                })
            }
            //init on hashchange creating a modal engine
            window.addEventListener("hashchange", function(e) {
                hashModal.routeChange(options);
            }, false);
            return this;
        },
        createModal: function(options) {
            if (document.getElementById('hashModal')) return;
            //Create overlay element
            var overlay = document.createElement('div');
            overlay.id = "active-mask";
            overlay.className = 'm-overlay animated fadeIn';
            overlay.addEventListener('click', function() {
                hashModal.remove()
            });
            //Create modal element
            var modal = document.createElement('div');
            modal.id = "hashModal";
            modal.className = 'card m-modal animated fadeIn animated-5';

            hashModal.current = modal;
            hashModal.overlay = overlay;
        },
        loadModal: function(options) {

            options.cancel = hashModal.modalOptions.cancel,
                options.confirm = hashModal.modalOptions.confirm,
                options.content = options.content || hashModal.content;
            var modal = hashModal.current;

modal.style.width = (options.width) ? options.width +
                ((isNaN(options.width) && options.width.indexOf('%') > 0)? "" :"px"): "";
                     modal.style.height = (options.height) ? options.height +
                ((isNaN(options.height) && options.height.indexOf('%') > 0)? "" :"px"): "";
            var component = m.component({
                controller: function() {
                    this.cancel = function(close) {
                        options.cancel.action();
                        setTimeout(hashModal.remove, hashModal.removeDelay);
                    }
                    this.confirm = function() {
                        options.confirm.action();
                        setTimeout(hashModal.remove, hashModal.removeDelay);
                    }
                },
                view: modalTemplate
            }, options)

            m.mount(hashModal.current, component);
        },
        openModal: function(options) {
            hashModal.loadModal(options);
            hashModal.current.active = true;
            hashModal.showOverlay();
            hashModal.show();

        },
        closeModal: function() {

        },
        remove: function() {
            window.location = "#"
            if (hashModal.current.parentNode == document.body) document.body.removeChild(hashModal.current)
            if (hashModal.overlay.parentNode == document.body) document.body.removeChild(hashModal.overlay);
            hashModal.current.active = false;

        },
        show: function() {
            document.body.appendChild(hashModal.current);
        },
        showOverlay: function() {
            document.body.appendChild(hashModal.overlay);
        }
    }


    return hashModal;
}
