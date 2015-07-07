module.exports = { loader:function(Parse,app){ 
require('./modules/dashboard/index.js')(Parse,app); 
}, buildRoutes: function(){ console.log('loaded')}}