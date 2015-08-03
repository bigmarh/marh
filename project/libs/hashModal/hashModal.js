  module.exports = function(params) {
    var modalTemplate = require('./templates/modal-template');
    var hashModal = {
      init: function(options) {
        options = options || {};
        hashModal.setUpEvent(options);
        hashModal.createModal(options);
      },
      content: {
        view: function() {
          return m('.hello', 'Hope this works');
        }
      },
      current: {},
      cancel: {
        text: "Disagree",
        action: function() {
          console.log('Set this function for after cancel')
        }
      },
      confirm: {
        text: "Agree",
        action: function() {
          console.log('Set this function for after confirm')
        }
      },
      setUpEvent: function(options) {
        if (window.location['hash']) {
          //ensure the layout is loaded to protect modal from being overwritten by redraw
          ee.on('layoutLoaded', function() {
            hashModal.openModal(options);
          })
        }
        //init on hashchange creating a modal engine
        window.addEventListener("hashchange", function(e) {
          if (!window.location['hash']) return hashModal.remove();
          hashModal.openModal(options);
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
        if (options.width) modal.style.width = options.width +
          "px";

        hashModal.current = modal;
        hashModal.overlay = overlay;
      },
      loadModal: function(options) {
        options.cancel = hashModal.cancel,
          options.confirm = hashModal.confirm,
          options.content = hashModal.content;

        var component = m.component({
          controller: function() {
            this.cancel = function(close) {
              options.cancel.action();
              setTimeout(hashModal.remove, 500);
            }
            this.confirm = function() {
              options.confirm.action();
              setTimeout(hashModal.remove, 500);
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
        m.route(m.route());
        document.body.removeChild(hashModal.current)
        document.body.removeChild(hashModal.overlay)

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
