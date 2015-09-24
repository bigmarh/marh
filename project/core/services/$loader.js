module.exports = function(ele, isIni, ctx) {
    var $loader = {}
    ee.on('showLoader', function() {
        ele.className = "progress fadeIn animated";
        return ele.style.display = "block";
    });
    ee.on('hideLoader', function() {
        ele.className = "progress fadeOut animated";
        setTimeout(function() {
            ele.style.display = "none";
        }, 500)

    })
    return $loader;
}
