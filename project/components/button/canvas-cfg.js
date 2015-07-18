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
