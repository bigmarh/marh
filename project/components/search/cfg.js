module.exports = function(ctrl, args) {
    return function(element, isInitialized, context) {
        context.retain = true;
        ctrl.filter(element.value, element);
        element.addEventListener('keyup',function(){
            ctrl.filter(element.value,element);
        })

    }
}
