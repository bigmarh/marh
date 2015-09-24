module.exports = function(params) {

    var toastAlert = {
        
        init: function(options) {
            ee.on('showToastAlert', toastAlert.showToastAlert);
            ee.on('closeToastAlert', toastAlert.closeToastAlert);
        },

        showToastAlert: function(options) {
            Materialize.toast(options.message, options.duration, options.class, options.callback);
        },

        closeToastAlert: function(options) {
        
        },


    }

    return toastAlert;
}
