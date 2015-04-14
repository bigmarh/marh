module.exports = function(app, Parse) {

    app.directive("btcInput", ["$rootScope", function(a) {
            var b = '<div class="xform-inline">  <div class="col-xs-6">    <div class="input-group">      <span class="input-group-addon">BTC</span>      <input class="form-control btc-input" type="text" data-ng-model="btc" data-ng-change="onChangedBTC()" placeholder="0.00">    </div>  </div>  <div class="col-xs-6">    <div class="input-group">      <span class="input-group-addon">{{label}}</span>      <input class="form-control currency-input" type="text" data-ng-model="other" data-ng-change="onChangedAmount()" placeholder="0.00" ng-disabled="currency.perBTC == 0">    </div>  </div></div>';
            return {
                restrict: "A",
                replace: !0,
                template: b,
                scope: {
                    initial: "=btcInput",
                    btc: "=btcValue",
                    other: "=otherValue",
                    onChange: "&ngChange"
                },
                link: function(a) {
                    $(".currency-input").on("keypress", function() {
                        a.$emit("limitChanged"), a.$apply()
                    }), $(".btc-input").on("keypress", function() {
                        a.$emit("limitChanged"), a.$apply()
                    })
                },
                controller: ["$scope", function(b) {
                    b.onChangedAmount = function() {
                        var a = parseFloat(b.other, 10);
                        isNaN(a) && (a = 0), b.conversionRate && (b.btc = parseFloat((a / b.conversionRate).toFixed(8))), b.onChange()
                    }, b.onChangedBTC = function() {
                        var a = parseFloat(b.btc, 10);
                        isNaN(a) && (a = 0), b.conversionRate && (b.other = parseFloat((a * b.conversionRate).toFixed(2))), b.onChange()
                    }, b.btc = b.initial, b.onChangedBTC(), b.label = "USD", a.$on("appCurrencyUpdated", function(a, c) {
                        c.data && c.data.current.last && (b.conversionRate = c.data.current.last)
                    })
                }]
            }
        }]).directive('sendCalc', function() {
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                controller: ['$scope', '$element', '$attrs', '$transclude', '$rootScope', '$filter', 'Trans',
                    function(scope, $element, $attrs, $transclude, root, $filter, Trans) {
                        scope.current = {};
                        var formatFee = function(divider, fee) {
                            return (fee / divider == 0) ? "" : fee / divider;
                        }
                        scope.sendDisabled = function() {
                            if (!scope.current.amount || scope.current.amount < 0) return true;
                            var value = $filter('inSatoshis')(scope.total(), root.unit.label);

                            if (value > localStorage.balance) {
                                scope.canSendMessage = "The most you can send is " + localStorage.balance / root.unit.divider + " " + root.unit.label;
                                scope.showSendMax = true;
                                return true;
                            }
                            scope.canSendMessage = "";
                            scope.showSendMax = false;
                            return false;
                        }
                        scope.total = function() {

                            if (scope.isFiat()) {
                                value = $filter('convertCurrency')(scope.current.amount, root.unit.label, 'yes', 4);
                            } else {
                                var value = $filter('inSatoshis')(scope.current.amount, scope.current.unit);
                                value = $filter('convertCurrency')(value, root.unit.label, false);
                            }

                            var minersFee = $filter('convertCurrency')(scope.current.minerFee, root.unit.label);
                            //$messages.log(parseFloat(value), parseFloat(minersFee));
                            return (parseFloat(value) + parseFloat(minersFee)).toFixed(4);
                        }
                        scope.isFiat = function() {
                            return ['mBTC', 'BTC', 'bits'].indexOf(scope.current.unit) == -1;
                        }
                        scope.current.unit = root.unit.label;
                        scope.current.amount = formatFee(root.unit.divider, scope.current.amount);
                    }
                ],
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                templateUrl: 'views/wallet/sendcalc.html',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function($scope, iElm, iAttrs, controller) {

                }
            };
        }).directive("getDetails", ["$rootScope", function(a) {
            return {
                restrict: "E",
                templateUrl: '/views/dash/prompts/getDetails.html',
                controller: ["$scope", "$rootScope", "WalletService", "UtilService","$messages", function($scope, $rootScope, Wallet, Util,$messages) {
                    $scope.needDetails = false;
                    $scope.getDetails = function(pass) {
                        Parse.Cloud.run('getPayload').then(function(result) {
                            $messages.log(result);
                            try {
                                Wallet.details = JSON.parse(Wallet.decryptKey(result, pass));
                                $scope.needDetails = false;
                                $scope.success($scope.tx);
                            } catch (e) {
                                $scope.error(e);
                            }

                        }, function(error) {
                            $messages.log(error)
                        })
                    }

                    $rootScope.$on('getDetails', function(event, data) {
                        $scope.needDetails = true;
                        $scope.tx = data.tx;
                        $scope.success = data.successCallback;
                        $scope.error = data.errorCallback;
                    })
                }]
            }
        }]).directive("bitFiat", ["$rootScope", function(a) {
            return {
                restrict: "E",
                scope: {
                    value: "=",
                    balance: "=",
                    clear: "="
                },
                transclude: true,
                templateUrl: '/views/directive-templates/bitToFiat.html',
                controller: ["$scope", "$rootScope", "WalletService", "UtilService", function($scope, $rootScope, Wallet, Util) {
                    $scope.currency = currency;
                    $scope.$watch('clear', function(nV, Ov) {
                        $scope.sendBits = "";
                        $scope.sendDollars = "";
                    })
                    $scope.$watch('sendBits', function(nV, oV) {
                        $scope.value = nV;

                    })
                    $scope.sendMax = function() {
                        $scope.sendBits = Util.unitConvert.convertor(($scope.balance - 1e4), 'satoshis', $rootScope.BTCunit)
                        $scope.updateDollars($scope.sendBits);
                    }

                    $scope.updateBits = function(sendDollars) {
                        if (sendDollars == "") return "";
                        return parseFloat(Util.unitConvert.convertor((sendDollars / $rootScope.spot_rate), 'BTC', $rootScope.BTCunit));
                    }
                    $scope.updateDollars = function(sendBits, init) {
                        if (sendBits == "") return "";
                        return $scope.sendDollars = Util.unitConvert.toFiat(sendBits, $rootScope.BTCunit, 'BTC');

                    }
                    if ($scope.value) {
                        $scope.sendBits = $scope.value;
                        $scope.updateDollars($scope.sendBits);
                    }
                }]
            }
        }]).directive("lightbox", ["$rootScope", function(a) {
            return {
                restrict: "E",
                scope: {
                    closingFunc: "="
                },
                templateUrl: '/views/directive-templates/lightbox.html',
                controller: ["$scope", "$rootScope", "WalletService", "UtilService", function($scope, $rootScope, Wallet, Util) {



                    $scope.lightInit = true;
                    $scope.closeLightBox = function() {
                        $scope.lightInit = false;
                        $scope.lightBox.show = false;
                        return ($rootScope.closingLBFunc != undefined) ? $rootScope.closingLBFunc() : '';
                    }
                    $scope.openLightBox = function(options) {
                        options.show = options.show || true;
                        options.lightInit = options.lightInit || false;
                        $scope.lightBox = options
                    }

                    $rootScope.$on('openLightBox', function(event, options) {
                        $scope.openLightBox(options)
                    })
                    $rootScope.$on('closeLightBox', function(event, options) {
                        $scope.closeLightBox()
                    })

                }]
            }
        }]).directive("transPreview", ["$rootScope", function(a) {
            return {
                restrict: "E",
                templateUrl: '/views/directive-templates/transbox.html',
                controller: ["$scope", "$rootScope", "WalletService", "UtilService", "Trans", "$timeout","$messages",
                    function($scope, $rootScope, Wallet, Util, Trans, $timeout,$messages) {

                        $scope.openTransBox = function(options) {
                            $rootScope.transBoxShow = true;
                            $scope.current = Trans.current;
                            $scope.show = true;
                        }
                        $scope.closeTransBox = function(options) {

                            $scope.show = false;
                            $timeout(function() {
                                if (Trans.finishedTrans) {
                                    Trans.finishedTrans()
                                }
                                options = {};
                                $rootScope.transBoxShow = false;

                            }, 2000);
                        }
                        $scope.calculateTotal = function(a, b) {
                            return (parseFloat(a) + parseFloat(Util.unitConvert.convertor(b, 'satoshis', $rootScope.BTCunit)));
                        }
                        $scope.signAndSend = function(current) {
                            Trans.signAndSend(current);
                        }


                        $rootScope.$on('openTransBox', function(event, options) {
                            $messages.log("Called to Open Preview");
                            $scope.template = '/views/directive-templates/inserts/transPreview.html';
                            $scope.openTransBox(options);
                        })
                        $rootScope.$on('closeTransBox', function(event, options) {
                            $scope.closeTransBox();
                        })

                    }
                ]
            }
        }])
        .directive("sendBox", ["$rootScope", function(a) {
            return {
                restrict: "E",
                templateUrl: '/views/directive-templates/transbox.html',
                controller: ["$scope", "$rootScope", "WalletService", "UtilService", "Trans", "AccountsService", '$state', '$timeout','$messages',
                 function($scope, $rootScope, Wallet, Util, Trans, Accounts, $state, $timeout,$messages) {

                    $scope.openSendBox = function(options) {
                        $messages.log("Called");
                        $rootScope.sendBoxShow = true;
                        $scope.show = true;
                    }
                    $scope.closeSendBox = function(options) {
                        $rootScope.sendBoxShow = false;
                        $scope.show = false;
                        $scope.template = "";
                    }
                    $scope.calculateTotal = function(a, b) {
                        return (parseFloat(a) + parseFloat(Util.unitConvert.convertor(b, 'satoshis', $rootScope.BTCunit)));
                    }
                    $scope.startSend = function() {
                        if (!$scope.current.amount || $scope.current.amount <= 0)
                           alert("The amount to send must be greater than 0");
                        Trans.startSend($scope.current);
                    };


                    $rootScope.$on('openSend', function(event, options) {
                        $messages.log("Called to Open Send");
                        if (options) $scope.current = options;
                        $scope.template = '/views/directive-templates/inserts/send.html';
                        $scope.openSendBox();
                    })
                    $rootScope.$on('closeSend', function(event, options) {
                        $scope.closeSendBox();
                    })

                }]
            }
        }]).directive("googleLogin", ["$rootScope", function(a) {
            return {
                restrict: "E",
                templateUrl: '/views/directive-templates/googleLogin.html',
                controller: ["$scope", "$rootScope", "GoogleService", function($scope, $rootScope, Google) {
                    $scope.signIn = function() {
                        Google.signIn();
                    }

                    $rootScope.$on('event:google-successful-signin', function(event, data) {
                        $messages.log(data);
                    })
                }]
            }
        }]).directive('logout', [function() {
            return {
                restrict: "AE",
                template: "<a ng-click='logOut()'>Logout</a>",
                controller: ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state) {
                    $scope.logOut = function() {
                        Parse.User.logOut();
                        gapi.auth.signOut();
                        localStorage.clear();
                        window.location = "/";
                    }
                    $rootScope.$on('logout', function(event, data) {
                        $messages.log("logout");
                        $scope.logOut();
                    })
                }],
                link: function(scope, elem, attrs, ctrl) {
                    elem.on('click', function(event) {
                        scope.logOut();
                    })
                }
            }
        }]).directive("repeatPassword", function() {
            return {
                require: "ngModel",
                link: function(scope, elem, attrs, ctrl) {
                    if (!ctrl) return; // do nothing if no ng-model
                    // watch own value and re-validate on change

                    scope.$watch(attrs.ngModel, function(val) {

                        validate();
                    });

                    scope.$watch(attrs.match, function(val) {
                        validate();
                    });


                    var validate = function() {
                        // values
                        var val1 = scope[attrs.match];
                        var val2 = scope[attrs.ngModel];
                        // set validity
                        ctrl.$setValidity('equals', !val1 || !val2 || val1 === val2);
                    };
                }
            };
        }).directive('toast', [
                function() {
                    return {
                        restrict: "E",
                        controller: ["$scope", "$rootScope", "$state", "$animate", "$mdToast", function($scope, $rootScope, $state, $animate, $mdToast) {
                            $scope.toastPosition = {
                                bottom: true,
                                right: true
                            };

                            $rootScope.$on('callToast', function(event, data) {
                                $messages.log(data);
                                $scope.showActionToast(data);
                            })

                            $scope.getToastPosition = function() {
                                return Object.keys($scope.toastPosition)
                                    .filter(function(pos) {
                                        return $scope.toastPosition[pos];
                                    })
                                    .join(' ');
                            };
                            $scope.showCustomToast = function() {
                                $mdToast.show({

                                    templateUrl: 'toast.html',
                                    hideDelay: 6000,
                                    position: $scope.getToastPosition()
                                });
                            };
                            $scope.showSimpleToast = function() {
                                $mdToast.show(
                                    $mdToast.simple()
                                    .content('Simple Toast!')
                                    .theme('error')
                                    .position($scope.getToastPosition())
                                    .hideDelay(300000)
                                );
                            };
                            $scope.showActionToast = function(data) {
                                var toast = $mdToast.simple()
                                    .content('There is a new transaction on ' + data.params.address)
                                    .action('Go')
                                    .highlightAction(true)
                                    .position($scope.getToastPosition());
                                $mdToast.show(toast).then(function() {
                                    $messages.log(data);
                                    $state.go(data.state, data.params);
                                });

                            }
                        }]
                    }
                }
            ]

        )


    function checkError(msg) {
        if (msg.errors && msg.errors.length) {
            var errs = [];
            for (error in msg.errors) {
                errs.push(msg.errors[error].error);
            }

            return "Errors occured!!<br/>" + errs.join("<br/>");
        } else if (msg.error) {
            return msg.error;
        }
        return false;
    }

    function convertToSatoshis(amountObj) {
        switch (amountObj.units) {
            case "BTC":
                return parseInt(parseFloat(amountObj.amount) * 1e8);
                break;
            case "mBTC":
                return parseInt(parseFloat(amountObj.amount) * 1e5);
            case "bits":
                return parseInt(parseFloat(amountObj.amount) * 1e2);
                break;
        }
    }
}
