module.exports = function(ctrl, args) {
    return function(element, isInitialized, context) {
        context.retain = true;
        var keyS = [];
        ctrl.filter(element.value, element);
        if (ctrl.args.model().length >= args.maxSelections) {
            element.style.display = "none";
        } else {
            if (element && element.style.display == 'none') element.style.display = "inline-block";
            element && element.focus();
        }
        element.addEventListener('keyup', function() {
            ctrl.filter(element.value, element);
        })
        element.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 40:
                    ctrl.pressDown();
                    break;
                case 38:
                    ctrl.pressUp();
                    break;
                case 13:
                    ctrl.selectActive(element);
                    break;

            }
        })
    }
}
