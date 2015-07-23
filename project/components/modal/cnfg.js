module.exports = function(ctrl, args) {
  var delay = 750; //How long before the modal is destroyed
  return function(element, isInitialized, context) {
    ctrl.closeModal = function() {
      //remove modal from page
      removeModal(ctrl.onCancel)
    }
    ctrl.confirmModal = function() {
      //remove modal from page
      removeModal(ctrl.onConfirm)
    }

    function removeModal(callback) {
      element.firstChild.className = "fadeOutUpBig animated";
      setTimeout(function() {
        document.getElementById('modal') && document.body.removeChild(
          document.getElementById('modal'))
        callback && callback();
        ctrl.onConfirm = false;
        ctrl.onCancel = false;
      }, delay);
    }
    //Close the live modal
    modal.close = ctrl.closeModal;

  }

}
