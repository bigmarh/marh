module.exports = function(m,Parse,app){ 
require('./modules/hello/index.js')(m,Parse,app); 
require('./modules/move/index.js')(m,Parse,app); 
require('./modules/todo/index.js')(m,Parse,app); 
}