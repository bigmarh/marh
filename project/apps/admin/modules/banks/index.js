module.exports = function(Parse, app) {
  try {
    var module = {
      name: __dirname.split('/').pop(),
      appName: __dirname.split('/').pop(),
      db: Parse
    };
    require('./vm')(module);
    require('./controller')(module);
    require('./view')(module, app);
    //Register module with
    if (!app[module.name]) app[module.name] = module;
    else throw "There is a conflict in namespace"
    require('./routes')(app, module);

  } catch (e) {
    console.error(e);
  }


}
