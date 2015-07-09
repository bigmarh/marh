module.exports = function(Parse, app) {
  try {
    var module = {
      name: __dirname.split('/').pop(),
      appName: "main"
    };
    require('./vm')(module, Parse, app);
    require('./controller')(module, Parse);
    require('./view')(module, app);
    //Register module with
    if (!app[module.name]) app[module.name] = module;
    else throw "There is a conflict in namespace"
    require('./routes')(app, module);



  } catch (e) {
    console.error(e);
  }


}
