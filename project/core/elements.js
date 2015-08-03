module.exports = function() {
  //global component for easier use registration
  var Elements = {
    button: function(text, action, options, isHref) {
      var options = options || {};
      options.attrs = {};
      if (isHref) {
        options.href = action;
      } else {
        if ($pa.helpers.isFn(action)) {
          options.click = action;
        } else {
          options.route = action;
        }

      }
      if (options.class) {
        options.attrs.class = options.class;
      }
      if (options.target) {
        options.attrs.target = options.target;
      }
      return new $pa.c('button', options, text)
    },
    modal: function(options) {
      this.open = function(options) {
        if (document.getElementById('modal'))
          document.body.removeChild(document.getElementById('modal'))
        var modal = document.createElement('div');
        modal.id = "modal";
        document.body.appendChild(modal)
        m.render(modal, $pa.c('modal', options))
      }
      this.close = function() {
        alert("Modal is closing");
      }
    }
  }
  window.modal = function(options) {
    return new Elements.modal().open.bind(this, options);
  }
  window.button = Elements.button;
  return Elements;
}
