module.exports = { loader:function(Parse,app){ 
require('./sections/backend/index.js')(Parse,app); 
require('./sections/dashboard/index.js')(Parse,app); 
require('./sections/frontend/index.js')(Parse,app); 
}, buildRoutes: function(){ console.log('loaded')}}