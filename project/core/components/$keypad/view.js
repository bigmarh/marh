module.exports = function(Parse, app, module) {
    return function(ctrl, args) {
        var keys = shuffle( [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] );
        return m('.card.popUp.keypad', {
                config: function() {
                    window.onkeydown = function(e) {
                        if(module.$.active()) {
                            var keyMap = {
                                48: '0',
                                49: '1',
                                50: '2',
                                51: '3',
                                52: '4',
                                53: '5',
                                54: '6',
                                55: '7',
                                56: '8',
                                57: '9',
                                8: 'x'
                            }
                            var key = e.keyCode ? e.keyCode : e.which;

                            if (key == 8)
                                e.preventDefault();

                            if(key in keyMap) {
                                m.startComputation();
                                module.$.setPinEntry(keyMap[key]);
                                m.endComputation();
                            }
                        }
                    }
                }
            },
            m('.textCenter', [
                m('.rowPinDots.borderBottom[layout="row"][layout-align="space-around center"]', {
                    class: module.$.pinValid()
                }, [1, 2, 3, 4].map(function(i, index) {
                    return m('[flex=""][layout="row"][layout-align="center"]', [m(module.$.pin[index]() == '' ? '.pinDot' : '.pinDot on')]);
                })), keys.map(function(i, index) {
                    if (index == 9) {
                        return m('.rowKeyPad[layout="row"][layout-align="space-around center"]', [
                            m('div.pinKey[flex=""][layout="row"][layout-align="center"]', [m('span.keyNumber', '')]),
                            m('div.pinKey[flex=""][layout="row"][layout-align="center"]', [m('span.keyNumber[id="' + i + '"]', {
                                onclick: function(e) {
                                    module.$.setPinEntry(e.srcElement.id)
                                }
                            }, i)]),
                            m('div.pinKey[flex=""][layout="row"][layout-align="center"]', [m('span.keyNumber[id="x"]', [m('i.material-icons.deleteIcon[id="x"]', {
                                onclick: function(e) {
                                    module.$.setPinEntry(e.srcElement.id)
                                }
                            }, 'backspace')])])
                        ])
                    } else {
                        if (index == 0 || index % 3 == 0) {
                            return m('.rowKeyPad.borderBottom[layout="row"][layout-align="space-around center"]', [keys[index], keys[index+1], keys[index + 2]].map(function(number) {
                                return m('div.pinKey[flex=""][layout="row"][layout-align="center"]', [m('span.keyNumber[id="' + number + '"]', {
                                    onclick: function(e) {
                                        module.$.setPinEntry(e.srcElement.id)
                                    }
                                }, number)])
                            }))
                        }
                    }
                })
            ]))
    } 

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
}
