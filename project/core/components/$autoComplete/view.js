module.exports = function(Parse, app, module) {
    return function(ctrl, args) {
        // if selected.length > 0, display pills
        var cfg = require('./cfg')(module.$, args);
        return m('.autoComplete',{"data-current":module.$.args.model().length,max:module.$.args.maxSelections}, [m('.inputBoxWrapper#autoComInput'+module.$.id, [
        m("input#" + module.$.id + ".autoCompleteInput[type=text]", {
                        value: "",
                        config: cfg
                    }), 
                m('#matchBoxWrapper' + module.$.id + '.matchBoxWrapper')
            ]),
            m('#selectedWrapper' + module.$.id, module.$.args.model().map(function(selected, index) {
                return m('span.pill', [
                    m('span.selection', selected),
                    m('a.close', {
                        onclick: function() {
                            module.$.args.model().splice(index, 1);
                            module.$.updateSelected(module.$.currentInputElement,true);
                        }
                    }, 'x')
                ])
            }))


        ])

    }

}
