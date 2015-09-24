module.exports = function(params) {

    var modalTemplate = require('./templates/modal-template');
    var routeHandler = require('./helpers/routeHandler').routeHandler;

    var hashModal = {
        init: function(options) {
            options = options || {};
            hashModal.setUpEvent(options);
            hashModal.createModal(options);
        },
        animations: $settings.hashModal.animations,
        removeDelay: $settings.hashModal.removeDelay,
        showDelay: $settings.hashModal.showDelay,
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
        modalActions: [{
            text: "Disagree",
            action: function() {
                console.log('Set this function for after cancel')
            },
            closeAfter: true
        }, {
            text: "Agree",
            action: function() {
                console.log('Set this function for after confirm')
            },
            closeAfter: true
        }],
        routeChange: function(options) {
            if (!window.location['hash']) return hashModal.remove();
            var routearray = routeHandler(window.location['hash'], params);

            options.content = routearray[0];
            hashModal.modalOptions = routearray[2] || hashModal.modalOptions;
            console.log();
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

            ee.on("openHashModal", function(options) {
                hashModal.openModal(options);
            })

            ee.on("closeHashModal", function() {
                hashModal.closeModal();
            })

            //init on hashchange creating a modal engine
            console.log('Loaded')
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
            overlay.className = 'm-overlay animated ' + hashModal.animations.overlay;
            overlay.addEventListener('click', function() {
                hashModal.remove()
            });
            //Create modal element
            var modal = document.createElement('div');
            modal.id = "hashModal";
            hashModal.current = modal;
            hashModal.overlay = overlay;
        },
        loadModal: function(options) {
            options.cancel = hashModal.modalOptions.cancel || options.cancel,
                options.confirm = hashModal.modalOptions.confirm || options.confirm,
                options.content = options.content || hashModal.content;
            var modal = hashModal.current;
            modal.style.display = "none";
            modal.style.width = (options.width) ? options.width +
                ((isNaN(options.width) && options.width.indexOf('%') > 0) ? "" : "px") : "";
            modal.style.height = (options.height) ? options.height +
                ((isNaN(options.height) && options.height.indexOf('%') > 0) ? "" : "px") : "";
            var component = m.component({
                controller: require('./controller')(hashModal, options),
                view: modalTemplate
            }, options)

            hashModal.currentOptions = options;
            m.mount(hashModal.current, component);
        },
        openModal: function(options) {
            console.log("options", options)
            hashModal.loadModal(options);
            hashModal.current.active = true;
            hashModal.showOverlay();
            setTimeout(hashModal.show, hashModal.showDelay);
        },
        closeModal: function() {
            hashModal.currentOptions.cancel.action();
            setTimeout(hashModal.remove, hashModal.removeDelay);
        },
        remove: function() {
            window.location = "#";
            hashModal.setClass("leave");
            setTimeout(function() {
                m.mount(hashModal.current, null);
                if (hashModal.current.parentNode == document.body) document.body.removeChild(hashModal.current)
                if (hashModal.overlay.parentNode == document.body) document.body.removeChild(hashModal.overlay);
                hashModal.current.active = false;
                 hashModal.current.className  = "";
            }, hashModal.removeDelay)

        },
        setClass: function(status, delay) {
            delay = delay || 0;
            setTimeout(function() {
                if (status == "leave") return hashModal.current.className = 'card m-modal animated ' + hashModal.animations.leave;
                hashModal.current.className = 'card m-modal animated ' + hashModal.animations.enter;
                 hashModal.current.style.display = "block";
            }, delay);

        },
        show: function() {
            document.body.appendChild(hashModal.current);
            return hashModal.setClass('enter',500);
        },
        showOverlay: function() {
            return document.body.appendChild(hashModal.overlay);
        }
        
    }


    return hashModal;
}
