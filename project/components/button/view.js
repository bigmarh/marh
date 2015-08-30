module.exports = function(component) {
    return function(ctrl, args) {
        var config = require('./cnfg')(ctrl, args);
        prefix = ''
        args.attrs = args.attrs || {};
        if (args.href) {
            prefix = 'a';
            args.attrs.href = args.href;
            args.attrs.class = (!args.attrs.class) ? "" : args.attrs.class;
            args.attrs.class += " link";
        }
        console.log(args);
        if (args.route) args.click = function() {
            console.log(args.route);
            return m.route(args.route);
        }
        var content = (args.content) ? args.content : [m('.center', args.text)]
        args.attrs.config = config;
        return m(prefix + '.btn-flat.mbtn', args.attrs, content)
    }

}
