module.exports = function(ctrl, args) {


  //  Using canvas(deprecated) 
  //
  //
  //
  //function config(element, isInitialized) {
  //   if (isInitialized) return;
  //   var ctx = element.getContext("2d");
  //   console.dir(element.parentElement);
  //   var canvasWidth = element.width;
  //   var canvasHeight = element.height;
  //   var waves = [];
  //   element.addEventListener("mousedown", getPosition, false);
  //   if ('ontouchstart' in window) {
  //     element.addEventListener('touchstart', getPosition, false);
  //   }
  //
  //   function convertHexToRGB(hex, opacity) {
  //     function hexToR(h) {
  //       return parseInt((cutHex(h)).substring(0, 2), 16)
  //     }
  //
  //     function hexToG(h) {
  //       return parseInt((cutHex(h)).substring(2, 4), 16)
  //     }
  //
  //     function hexToB(h) {
  //       return parseInt((cutHex(h)).substring(4, 6), 16)
  //     }
  //
  //     function cutHex(h) {
  //       return (h.charAt(0) == "#") ? h.substring(1, 7) : h
  //     }
  //     opacity = opacity || 1;
  //     return "rgba(" + hexToR(hex) + "," + hexToG(hex) + "," + hexToB(hex) +
  //       "," + opacity + ")"
  //   }
  //
  //
  //   function Wave() {
  //     this.x = 200;
  //     this.y = 200;
  //     this.size = canvasWidth * 3;
  //     this.radiusInc = Math.PI / 2;
  //     this.radius = function() {
  //       console.log(this.size * Math.abs(Math.cos(this.radiusInc)))
  //       return 25 + this.size * Math.abs(Math.cos(this.radiusInc))
  //     };
  //     this.opacity = .5;
  //   }
  //
  //   Wave.prototype.draw = function(stopId) {
  //     if (this.radius() <= this.size) {
  //       this.radius();
  //     } else {
  //       this.opacity = 0.0;
  //       console.log("stop New animate " + this.opacity)
  //       waves.shift();
  //       window.cancelAnimationFrame(stopId);
  //     } //increase size by 1 per frame
  //     if (this.radius() >= .3 * this.size) this.opacity -= 0.1;
  //     console.log(this.startPosition, canvasWidth / 2, canvasHeight / 2)
  //     ctx.beginPath();
  //     ctx.arc(canvasWidth / 2, canvasHeight / 2, this.radius(), 0, 2 * Math
  //       .PI,
  //       false);
  //     ctx.fillStyle = 'rgba(255,255,255, ' + this.opacity + ')';
  //     ctx.fill();
  //     this.radiusInc += Math.PI / 64;
  //   }
  //
  //
  //
  //   function animate() {
  //
  //     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //     var stopId = window.requestAnimationFrame(animate);
  //     for (var i in waves) {
  //       waves[i].draw(stopId);
  //     }
  //   }
  //
  //   function getPosition(e) {
  //     var rect = element.getBoundingClientRect();
  //     var width = rect.width;
  //     var height = rect.height;
  //     var touchX = e.x - rect.left;
  //     var touchY = e.y - rect.top;
  //
  //
  //     var wave = new Wave();
  //     wave.startPosition = {
  //       x: touchX,
  //       y: touchY
  //     };
  //     waves.push(wave);
  //     console.log("started New animate " + wave.radius())
  //     animate();
  //   }
  //
  //
  //
  //   function findxy(direction, e) {
  //     console.log(e.x, element.offsetLeft, e.y, element.offsetTop);
  //   }
  // }

  function config(element, isInitialized, context) {
    context.retain = true;
    if (isInitialized) return;
    element.addEventListener("mousedown", getPosition, false);
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', getPosition, false);
    }

    var Effect = {

      // Effect delay
      duration: 400,

      show: function(touchX, touchY) {

        // Create ripple
        var ripple = document.createElement('div');
        ripple.className = 'm-ripple';
        element.appendChild(ripple);

        // Get click coordinate and element witdh
        var relativeY = touchY;
        var relativeX = touchX;
        var scale = 'scale(' + ((element.clientWidth / 100) * 10) + ')';

        // Attach data to element
        ripple.setAttribute('data-hold', Date.now());
        ripple.setAttribute('data-scale', scale);
        ripple.setAttribute('data-x', relativeX);
        ripple.setAttribute('data-y', relativeY);
        // Set ripple position
        var rippleStyle = {
          'top': relativeY + 'px',
          'left': relativeX + 'px'
        };

        ripple.className = ripple.className + ' waves-notransition';
        ripple.setAttribute('style', convertStyle(rippleStyle));
        ripple.className = ripple.className.replace('waves-notransition',
          '');

        // Scale the ripple
        rippleStyle['-webkit-transform'] = scale;
        rippleStyle['-moz-transform'] = scale;
        rippleStyle['-ms-transform'] = scale;
        rippleStyle['-o-transform'] = scale;
        rippleStyle.transform = scale;
        rippleStyle.opacity = '1';

        rippleStyle['-webkit-transition-duration'] = Effect.duration +
          'ms';
        rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['transition-duration'] = Effect.duration + 'ms';

        rippleStyle['-webkit-transition-timing-function'] =
          'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-moz-transition-timing-function'] =
          'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-o-transition-timing-function'] =
          'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['transition-timing-function'] =
          'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

        ripple.setAttribute('style', convertStyle(rippleStyle));
        setTimeout(args.click, 200)
        return ripple;
      },

      hide: function(e, ripple) {
        TouchHandler.touchup(e);


        var width = element.clientWidth * 1.4;

        // Get first ripple
        var ripple = ripple;
        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale = ripple.getAttribute('data-scale');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
          delay = 0;
        }

        // Fade out ripple after delay
        setTimeout(function() {

          var style = {
            'top': relativeY + 'px',
            'left': relativeX + 'px',
            'opacity': '0',

            // Duration
            '-webkit-transition-duration': Effect.duration + 'ms',
            '-moz-transition-duration': Effect.duration + 'ms',
            '-o-transition-duration': Effect.duration + 'ms',
            'transition-duration': Effect.duration + 'ms',
            '-webkit-transform': scale,
            '-moz-transform': scale,
            '-ms-transform': scale,
            '-o-transform': scale,
            'transform': scale,
          };


          ripple.setAttribute('style', convertStyle(style));

          setTimeout(function() {
            try {
              element.removeChild(ripple);
            } catch (e) {
              return false;
            }
          }, Effect.duration);
        }, delay);
      },

      // Little hack to make <input> can perform waves effect
      wrapInput: function(elements) {
        for (var a = 0; a < elements.length; a++) {
          var element = elements[a];

          if (element.tagName.toLowerCase() === 'input') {
            var parent = element.parentNode;

            // If input already have parent just pass through
            if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf(
                'waves-effect') !== -1) {
              continue;
            }

            // Put element class and style to the specified parent
            var wrapper = document.createElement('i');
            wrapper.className = element.className +
              ' waves-input-wrapper';

            var elementStyle = element.getAttribute('style');

            if (!elementStyle) {
              elementStyle = '';
            }

            wrapper.setAttribute('style', elementStyle);

            element.className = 'waves-button-input';
            element.removeAttribute('style');

            // Put element as child
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);
          }
        }
      }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
      /* uses an integer rather than bool so there's no issues with
       * needing to clear timeouts if another touch event occurred
       * within the 500ms. Cannot mouseup between touchstart and
       * touchend, nor in the 500ms after touchend. */
      touches: 0,
      allowEvent: function(e) {
        var allow = true;

        if (e.type === 'touchstart') {
          TouchHandler.touches += 1; //push
        } else if (e.type === 'touchend' || e.type === 'touchcancel') {
          setTimeout(function() {
            if (TouchHandler.touches > 0) {
              TouchHandler.touches -= 1; //pop after 500ms
            }
          }, 500);
        } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
          allow = false;
        }

        return allow;
      },
      touchup: function(e) {
        TouchHandler.allowEvent(e);
      }
    };

    function getPosition(e) {

      var rect = element.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var touchX = e.x - rect.left;
      var touchY = e.y - rect.top;
      console.log(touchX, touchY)
      var ripple = Effect.show(touchX, touchY);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', function(e) {
          Effect.hide(e, ripple)
        }, false);
        element.addEventListener('touchcancel', function(e) {
          Effect.hide(e, ripple)
        }, false);
      }

      element.addEventListener('mouseup', function(e) {
        Effect.hide(e, ripple)
      }, false);
      element.addEventListener('mouseleave', function(e) {
        Effect.hide(e, ripple)
      }, false);


    }

    function convertStyle(obj) {

      var style = '';

      for (var a in obj) {
        if (obj.hasOwnProperty(a)) {
          style += (a + ':' + obj[a] + ';');
        }
      }

      return style;
    }
  }
  args.attrs = args.attrs || {};
  var prefix = (args.attrs.href) ? 'a' : "";
  if (args.route) args.click = function() {
    return m.route(args.route);
  }
  args.attrs.config = config;
  return m(prefix + '.md-button', args.attrs, [
    m('.center', args.text)
  ])
}
