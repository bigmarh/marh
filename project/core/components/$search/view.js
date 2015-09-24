module.exports = function(Parse, app, module) {
    return function(ctrl, args) {
        // if selected.length > 0, display pills
        var cfg = require('./cfg')(module.$, args);
        return m('input.searchField',{
            placeholder: 'Search ' + args.title + '',
            config:cfg
        })

    }

}
