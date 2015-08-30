module.exports = function() {
  //global component for easier use registration
  var Elements = {
    button: function(content, action, options, isHref) {
      var options = options || {};
      options.attrs = {};
      if(typeof content != 'string'){
          options.content = content;
          content = null;
      }  
      if (isHref) {
        options.href = action;
      } else {
        if ($pa.helpers.isFn(action)) {
          options.click = action;
        } else {
          options.route = action;
        }

      }
      if(options.id){
         options.attrs.id = options.id;
      }
      if (options.class) {
        options.attrs.class = options.class;
      }
      if (options.target) {
        options.attrs.target = options.target;
      }
      return new $pa.c('button', options, content)
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
  window.autoComplete = function(options) {
    return new $pa.c('autoComplete', options)
  }
  window.search = function(options) {
    return new $pa.c('search', options)
  }
  window.button = Elements.button;
  return Elements;
}
