  module.exports = function(Parse, app) {
    return {
      name: __dirname.split('/').pop(),
      enabled: true,
      controller: require('./controller')(Parse, app),
      view: require('./view')(Parse, app)
    }

  }
