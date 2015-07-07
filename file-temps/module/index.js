module.exports = function(Parse, app) {
  try {
    var module = {
      name: __dirname.split('/').pop(),
      appName: "main"
    };
    require('./model')(module);
    require('./vm')(module);
    require('./controller')(module);
    require('./view')(module);


    //Register module with
    if (!app[module.name]) app[module.name] = module;
    else throw "There is a conflict in namespace"
    require('./routes')(module);
  } catch (e) {
    alert(e);
  }
}
