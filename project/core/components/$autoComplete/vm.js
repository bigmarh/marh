module.exports = function(Parse, app, module) {

    module.$ = (function() {
        var vm = {};
        vm.init = function(args) {
            vm.args = args;
            this.id = module.id;
            vm.args.model = m.prop(args.model);
            this.matches = m.prop([]);
            this.activeMatch = 0;
            this.search = m.prop("");
            this.pool = m.prop(args.pool);
            this.currentInputElement;

        }

        vm.filter = function(search, element) {
            vm.currentInputElement = element;
            vm.matches(vm.pool().filter(function(item) {
                return item.indexOf(search) > -1 && search.length > 0 && vm.args.model().indexOf(item) < 0;
            }));

            m.render(document.getElementById('matchBoxWrapper' + module.$.id), (vm.matches().length) ? m('#matchBox', vm.matches().map(function(match, index) {
                return button(match, function() {
                    if (vm.args.model().length < vm.args.maxSelections) {
                        vm.args.model().push(vm.matches()[index]);
                        vm.updateSelected(vm.currentInputElement);
                        vm.activeMatch = 0;
                    }

                }, {
                    class: "matchRow " + ((vm.activeMatch == index) ? "active" : "")
                })
            })) : "")

        }
        vm.updateSelected = function(element, needsRedraw) {
            var cfg = require('./cfg')(module.$, vm.args);
            m.render(document.getElementById('autoComInput' + module.$.id), [
                m("input#fush" + module.$.id + ".autoCompleteInput[type=text]", {
                    value: "",
                    config: cfg
                }),
                m('#matchBoxWrapper' + module.$.id + '.matchBoxWrapper')
            ])
            m.render(document.getElementById('selectedWrapper' + module.$.id), [
                (vm.args.model().length) ? vm.args.model().map(function(selected, index) {
                    return m('span.pill', [
                        m('span.selection', selected),
                        m('a.close', {
                            onclick: function() {
                                vm.args.model().splice(index, 1);
                                vm.updateSelected(element);
                            }

                        }, 'x')
                    ])
                }) : ""
            ]);
            vm.filter("");
            vm.activeMatch = 0;
            element = (element) ? element : vm.currentInputElement;
            element.value = "";
            



        }

        vm.pressDown = function() {
            if (vm.activeMatch < vm.matches().length - 1) vm.activeMatch += 1;
        }

        vm.pressUp = function() {
            if (vm.activeMatch > 0) vm.activeMatch -= 1;
        }
        vm.selectActive = function(element) {
            if (vm.matches()[vm.activeMatch]) vm.args.model().push(vm.matches()[vm.activeMatch]);
            vm.updateSelected(element);
        }
        vm.deleteLast = function(element) {
            console.log(element.value);
            if (element.value == "") vm.args.model().pop();
            vm.updateSelected(element);
        }


        return vm;

    }())

}
