module.exports = function(module, Parse) {
    // var Book = require('./model/book')(module, Parse);

    module.$ = (function() {

        var vm = {};
        var UserModel = require('./model/user_model')(module, Parse);

        vm.views = {
            transactions: {
                view: function(controller) {
                    return m('div', [
                        m('h4', 'Transaction #' + controller.transaction_id)
                    ]);
                },
                controller: function() {
                    this.transaction_id = m.route.param('id');
                }
            },
            signup: {
                view: function() {
                    return m('h4', 'Sign up page')
                }
            },
            login: {
                view: function(controller) {
                    return m('section#login', [
                        m('h4', 'Login'),
                        m('input#username', {
                            placeholder: 'Username',
                            type: 'text'
                        }),
                        m('br'),
                        m('input#password', {
                            placeholder: 'Password',
                            type: 'password'
                        }),
                        m('br'),
                        button('Login', function() {
                            controller.validateUser();
                        })
                    ]);
                },
                controller: function() {

                    this.validateUser = function() {
                        var auth_attempt = {
                            username: document.getElementById('username').value,
                            password: document.getElementById('password').value
                        };

                        UserModel.authorize(auth_attempt).then(function(user) {
                            if (user._existed == true) {
                                vm.currentUser = user;
                                UserModel.getUserAccount(user).then(function(account) {
                                    vm.currentUserAccount = account;
                                    self.goToDashboard();
                                })
                            }
                        });
                    }

                    this.goToDashboard = function() {
                        vm.currentView = m.prop(vm.views.dashboard);
                        m.redraw();
                    }

                    var self = this;

                }
            },
            dashboard: {
                view: function(controller) {
                    return m('section#dashboard', [
                        m('h5', 'Dashboard'),
                        m('h6', [
                            m('div', 'Username: ' + vm.currentUser.get('username')),
                            m('div#accountInfo')
                        ]),
                        button('Logout', function() {
                            controller.logout();
                        }),
                        button('Quick Transfer', function() {
                            controller.initializeTransfer();
                        }),
                        m('section#transfer')
                    ]);
                },
                controller: function() {

                    this.initializeTransfer = function() {
                        UserModel.getUsers().then(function(users) {
                            var transferView = {
                                view: function() {
                                    return m('.transfer', [
                                        m('label', 'To:'),
                                        m('select#transferto', [
                                            users.map(function(user) {
                                                return m("option[value='" + user.id + "']", user.get('username'));
                                            })
                                        ]),
                                        m('br'),
                                        m('label', 'Amount:'),
                                        m('input#amount', {
                                            placeholder: '0.00',
                                            type: 'text'
                                        }),
                                        button('Transfer Funds', function() {
                                            self.transferFunds();
                                        })
                                    ])
                                }
                            };
                            m.render(document.getElementById('transfer'), transferView);

                        });
                    }

                    this.transferFunds = function() {
                        var transfer_details = {
                            amount: document.getElementById('amount').value,
                            to: document.getElementById('transferto').value
                        };
                        UserModel.transferFunds(transfer_details).then(function(response) {
                            if (response == true) {
                                self.setAccountInfo();
                                var successfulTransferView = {
                                    view: function() {
                                        return m('.transfer', [
                                            m('p', 'Congratulations! Your transfer was sent successfully. Your new balance is $' + vm.currentUserAccount.get('balance')),
                                            button('X  Dismiss', function() {
                                                self.dismissTransfer();
                                            })
                                        ])
                                    }
                                };
                                m.render(document.getElementById('transfer'), successfulTransferView);
                            } else {
                                // alert('An error occured while processing your transfer. :(');
                            }
                        });
                    }

                    this.dismissTransfer = function() {
                        var dismissTransferView = {
                            view: function() {
                                return m('div')
                            }
                        };
                        m.render(document.getElementById('transfer'), dismissTransferView);
                    }

                    this.logout = function() {
                        Parse.User.logOut();
                        self.goToLogin();
                    }

                    this.goToLogin = function() {
                        vm.currentView = m.prop(vm.views.login);
                        m.redraw();
                    }

                    this.setAccountInfo = function() {
                        var accountInfo = {
                            view: function() {
                                return m('div', [
                                    m('div', 'Account Name: ' + vm.currentUserAccount.get('account_name')),
                                    m('div', 'Balance: $' + vm.currentUserAccount.get('balance'))
                                ]);
                            }
                        }
                        m.render(document.getElementById('accountInfo'), accountInfo);
                    }

                    UserModel.getUserAccount(vm.currentUser).then(function(account) {
                        vm.currentUserAccount = account;
                        self.setAccountInfo();
                    });

                    var self = this;

                }
            }
        }

        vm.init = function() {

            vm.currentUser = Parse.User.current();
            if (vm.currentUser)
                this.currentView = m.prop(vm.views.dashboard);
            else
                this.currentView = m.prop(vm.views.login);

        }

        return vm;

    }())

}
