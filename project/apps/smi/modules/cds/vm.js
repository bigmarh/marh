module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};
        var CD = require('./model/cd')(module, Parse);

        vm.views = {
            edit: {
                view: function(controller) {
                    return m('div.add_new', [
                        m('form#new_cd', [
                            m('input#edit_cd_name', {
                                value: vm.selectedCD.get('name'),
                                name: 'cd_name',
                                placeholder: 'Enter CD Name'
                            }),
                            m('br'),
                            button('Update CD', function() {
                                controller.save();
                            })
                        ])
                    ]);
                },
                controller: function() {
                    this.save = function() {
                        vm.selectedCD.set('name', document.getElementById('edit_cd_name').value);
                        CD.update(vm.selectedCD).then(function(cd) {
                            vm.currentView = m.prop(vm.views.list);
                            m.redraw();
                        });
                    }
                }
            },
            add_new: {
                view: function(controller) {
                    return m('div.add_new', [
                        m('form#new_cd', [
                            m('input#cd_name', {
                                name: 'cd_name',
                                placeholder: 'Enter CD Name'
                            }),
                            m('br'),
                            button('Save New CD', function() {
                                controller.save();
                            })
                        ])
                    ]);
                },
                controller: function() {
                    this.save = function() {
                        var cd = {
                            name: document.getElementById('cd_name').value
                        };
                        CD.save(cd).then(function(cd) {
                            vm.currentView = m.prop(vm.views.list);
                            m.redraw();
                        });
                    }
                }
            },
            list: {
                view: function(controller) {
                    // loop through controller.cds and display each
                    return m('table', [
                        m('thead', [
                            m('th', 'CD ID'),
                            m('th', 'CD Name'),
                            m('th', 'Edit'),
                            m('th', 'Delete')
                        ]),
                        m('tbody', [
                            controller.cds.map(function(cd) {
                                return m('tr', [
                                    m('td', cd.id),
                                    m('td', cd.get('name')),
                                    m('td', button('Edit', function() {
                                        controller.editCD(cd)
                                    })),
                                    m('td', button('Delete', function() {
                                        controller.deleteCD(cd)
                                    })),
                                ])
                            })
                        ])
                    ]);
                },
                controller: function() {
                    this.cds = [];
                    var self = this;

                    this.getList = function() {
                        CD.getAll().then(function(cds) {
                            self.cds = cds;
                            m.redraw();
                        });
                    }

                    this.editCD = function(cd) {
                        vm.selectedCD = cd;
                        vm.currentView = m.prop(vm.views.edit);
                        m.redraw();
                    }

                    this.deleteCD = function(cd) {
                        cd.destroy({
                            success: function(myObject) {
                                self.getList();
                                m.redraw();
                            },
                            error: function(myObject, error) {
                                
                            }
                        })
                    }

                    this.getList();

                }
            }
        }

        vm.init = function() {
            this.currentView = m.prop(vm.views.list);
        }

        return vm;

    }())

}
