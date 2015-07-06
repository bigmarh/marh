module.exports = { loader:function(m,Parse,app){ 
require('./modules/about/index.js')(m,Parse,app); 
require('./modules/cookie/index.js')(m,Parse,app); 
require('./modules/fred/index.js')(m,Parse,app); 
require('./modules/hello/index.js')(m,Parse,app); 
require('./modules/new/index.js')(m,Parse,app); 
require('./modules/todo/index.js')(m,Parse,app); 
require('./modules/versionTracker/index.js')(m,Parse,app); 
}, buildRoutes: function(){ console.log('loaded')}}