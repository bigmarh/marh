module.exports = function(app, Parse) {

    app.config(['$compileProvider',
            function($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|bitcoin):/);
            }
        ])
        .filter('orderObjectBy', function() {
            return function(items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function(item) {
                    filtered.push(item);
                });
                filtered.sort(function(a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse) filtered.reverse();
                return filtered;
            };
        }).filter('balance', ['$rootScope',
            function(root) {
                return function(number, unit) {
                    return (number/100).toFixed(2);
                }
            }
        ]).filter('account', [function() {
            return function(number, num) {
                var number = "" + number + num;

                function pad(num, size) {
                    var s = "000000000" + num;
                    return addDashes({
                        value: s.substr(s.length - size)
                    });
                }

                function addDashes(f) {
                    f_val = f.value.replace(/\D[^\.]/g, "");
                    f.value = f_val.slice(0, 3) + "-" + f_val.slice(3, 7) + "-" + f_val.slice(7);
                    return f.value;
                }

                return pad(number, 12)

            }
        }])
        .filter('units', ['$rootScope',
            function(root) {
                return function(number, unit) {
                    if (isNaN(unit)) return number / 100000000 * root.spot_rate;
                    num = parseFloat(number / unit);
                    return (num) ? Math.floor(num * 100000) / 100000 : "----";
                }
            }
        ]).
    filter('formatunits', ['$rootScope', '$locale',
            function(root, locale) {

                var formats = locale.NUMBER_FORMATS;
                var currencySymbol = formats.CURRENCY_SYM;
                return function(number, unit) {
                    if (number == ".") return number;
                    if (number === 0 || number == "" || number === "0" || isNaN(number)) return "----";
                    unit = unit || root.unit.label;
                    switch (unit) {
                        case "USD":
                            number = formatNumber(parseFloat(number), formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, (unit == "USD") ? 2 : 5)
                                .replace(/\u00A4/g, currencySymbol);
                            break;

                    }
                    return "" + number + "";
                }
            }
        ]).filter('updateCurrency', ['$locale', '$rootScope',
            function($locale, root) {

                var formats = $locale.NUMBER_FORMATS;
                return function(amount, currencySymbol) {
                    if (amount == "----") amount = 0;
                    var unit = currencySymbol || root.unit.label;

                    switch (unit) {
                        case "USD":
                            currencySymbol = formats.CURRENCY_SYM;
                            break;
                        default:
                            currencySymbol = "";
                            break;
                    }
                    return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, (unit == "USD") ? 2 : 5).
                    replace(/\u00A4/g, currencySymbol);
                };
            }
        ])
        .filter('inSatoshis', ['$locale', '$rootScope',
            function($locale, root) {

                return function(amount, currencySymbol) {
                    if (amount == "----") amount = 0;
                    var decimals = 2;
                    switch (currencySymbol) {
                        case "mBTC":
                            amount = amount * 1e5
                            break;
                        case "BTC":
                            amount = amount * 1e8;
                            break;
                        case "bits":
                            amount = amount * 1e2;
                            break;

                    }
                    if (isNaN(amount)) amount = 0.00;
                    return parseInt(amount);
                };
            }
        ]).filter('inFiat', ['$locale', '$rootScope',
            function($locale, root) {
                return function(spot_rate, balance) {

                    var value = ((balance / 1e8) * spot_rate).toFixed(2)
                    return (isNaN(value)) ? "----" : value;
                }
            }
        ]).filter('convertCurrency', ['$locale', '$rootScope',
            function($locale, root) {

                return function(amount, currencySymbol, fiat, forceDec) {
                    amount = parseInt(amount);
                    var fiatAmount = amount;
                    if (amount == "----") amount = 0;
                    var decimals = 2;
                    var multiplier = 1;
                    switch (currencySymbol) {
                        case "mBTC":
                            amount = amount / 1e5;
                            decimals = 7;
                            multiplier = 1e3;
                            break;
                        case "BTC":
                            amount = amount / 1e8;
                            decimals = 9;
                            multiplier = 1;
                            break;
                        case "bits":
                            amount = amount / 1e2;
                            decimals = 2;
                            multiplier = 1e6;
                            break;
                        default:
                            amount = (amount / 1e8) * root.spot_rate;

                            break;
                    }
                    if (forceDec) decimals = forceDec
                    if (fiat) {

                        amount = (fiatAmount / root.spot_rate) * multiplier;
                        if (isNaN(amount)) amount = 0.00;
                        return amount.toFixed(decimals);
                    } else {
                        if (isNaN(amount)) amount = 0.00;
                        return amount.toFixed(decimals);
                    }

                };
            }
        ]).directive('walletBalance', function() {
            return {
                restrict: 'E',
                transclude: true,
                controller: ['Wallet', '$scope', '$rootScope',
                    function(Wallet, scope, root) {

                        //Wallet.getBalance();
                        scope.balance = (Wallet.balance != null) ? Wallet.balance : "---";
                        root.$on('updateBalance', function(evt, balance) {

                            Wallet.setBalance(balance);
                        });

                    }
                ],
                template: '<div><span>{{$root.balance | units:$root.unit.divider | updateCurrency}}</span>' + '</div>',
                replace: true

            };
        }).
    directive('unitSelector', function() {
            return {
                restrict: 'E',
                transclude: true,
                controller: ['Wallet', '$scope', '$rootScope',
                    function(Wallet, scope, root) {

                        scope.select = function(unit) {
                            angular.forEach(scope.units, function(unit) {
                                unit.selected = false;
                            });
                            unit.selected = true;
                            localStorage.savedUnit = unit.label;
                            root.unit = unit;
                        }

                    }
                ],
                template: '<li>' + '<span ng-repeat="unit in units " ng-click="select(unit)" ng-class="{active:unit.selected}">{{unit.label}}</span>' + '</li>',
                replace: true

            };
        }).directive('tabs', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: function($scope, $element) {
                    var panes = $scope.panes = [];

                    $scope.select = function(pane) {
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                    }

                    this.addPane = function(pane) {
                        if (panes.length == 0) $scope.select(pane);
                        panes.push(pane);
                    }
                },
                template: '<div class="tabbable">' + '<ul class="nav nav-tabs contactIcons">' + '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' + '<a href="" ng-click="select(pane)">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content" ng-transclude></div>' + '</div>',
                replace: true
            };
        })
        .directive('pane', function() {
            return {
                require: '^tabs',
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    img: '@'
                },
                link: function(scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);
                },
                template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + '</div>',
                replace: true
            };
        })
        .directive('qrCode', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    width: '@',
                    colors: '@',
                    string: '='
                },
                controller: ['$scope', '$element', '$attrs',
                    function(scope, element, attr) {
                        var qrcode;
                        var colors = attr.colors.split(',');
                        this.buildQr = function() {
                            qrcode = new QRCode(element[0], {
                                text: "bitcoin:" + scope.string,
                                width: attr.width,
                                height: attr.width,
                                colorDark: colors[0],
                                colorLight: colors[1],
                                correctLevel: QRCode.CorrectLevel.H
                            });

                        }



                        scope.$watch('string', function(nv, ov) {
                            if (nv) qrcode.makeCode(nv);
                        }, true)


                    }
                ],
                link: function(scope, element, attrs, ctrl) {
                    ctrl.buildQr();
                },
                template: '<a href="bitcoin:{{string}}"><div></div></a>',
                replace: true
            };
        }).directive("passwordVerify", function() {
            return {
                require: "ngModel",
                scope: {
                    passwordVerify: '='
                },
                link: function(scope, element, attrs, ctrl) {
                    scope.$watch(function() {
                        var combined;

                        if (scope.passwordVerify || ctrl.$viewValue) {
                            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                        }
                        return combined;
                    }, function(value) {
                        if (value) {
                            ctrl.$parsers.unshift(function(viewValue) {
                                var origin = scope.passwordVerify;
                                if (origin !== viewValue) {
                                    ctrl.$setValidity("passwordVerify", false);
                                    return undefined;
                                } else {
                                    ctrl.$setValidity("passwordVerify", true);
                                    return viewValue;
                                }
                            });
                        }
                    });
                }
            };
        }).directive("coinIdCheck", function() {
            return {
                require: "ngModel",
                link: function(scope, element, attrs, ctrl) {
                    var emailChanged = false;
                    scope.$root.$on('coinIdError', function(e, data) {
                        var field = ""

                        switch (data.code) {
                            case 202:
                                field = "uName";
                                scope.coinIdError = data.message;
                                break;
                            case 203:
                                field = "uEmail";
                                scope.coinEmailError = data.message;
                                emailChanged = true;
                                break;

                        }

                        scope.myForm[field] && scope.myForm[field].$setValidity(field, false);
                        scope.$root.contDisable = false;
                        scope.$root.$safeApply();
                        //ctrl.$parsers.unshift(function(viewValue) {return viewValue});
                    });

                    scope.$watch('wallet.coinId', function(value) {
                        if (value) {
                            ctrl.$parsers.unshift(function(viewValue) {
                                if (/^[a-zA-Z0-9_.-]*$/.test(viewValue)) {
                                    ctrl.$setValidity("uName", true);
                                    scope.$root.coinIdError = "";
                                    return viewValue;

                                } else {
                                    ctrl.$setValidity("uName", false);
                                    scope.$root.coinIdError = "You can only use a-z, period(.) , or and underscore(_)";
                                    return viewValue;
                                }
                            });
                        }
                    }, true);

                    scope.$watch('wallet.email', function(value) {

                        if (scope.myForm.uEmail && scope.myForm.uEmail.$invalid && emailChanged) {
                            scope.myForm["uEmail"].$setValidity("uEmail", true);
                            scope.coinEmailError = "";

                        }
                    }, true)


                }
            };
        })



    function isUndefined(value) {
        return typeof value == 'undefined';
    }

    var DECIMAL_SEP = '.';

    function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
        if (isNaN(number) || !isFinite(number)) return '';

        var isNegative = number < 0;
        number = Math.abs(number);
        var numStr = number + '',
            formatedText = '',
            parts = [];

        var hasExponent = false;
        if (numStr.indexOf('e') !== -1) {
            var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
            if (match && match[2] == '-' && match[3] > fractionSize + 1) {
                numStr = '0';
            } else {
                formatedText = numStr;
                hasExponent = true;
            }
        }

        if (!hasExponent) {
            var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;

            // determine fractionSize if it is not specified
            if (isUndefined(fractionSize)) {
                fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
            }
            var pow = Math.pow(10, fractionSize);
            number = Math.round(number * pow) / pow;
            var fraction = ('' + number).split(DECIMAL_SEP);
            var whole = fraction[0];
            fraction = fraction[1] || '';

            var i, pos = 0,
                lgroup = pattern.lgSize,
                group = pattern.gSize;

            if (whole.length >= (lgroup + group)) {
                pos = whole.length - lgroup;
                for (i = 0; i < pos; i++) {
                    if ((pos - i) % group === 0 && i !== 0) {
                        formatedText += groupSep;
                    }
                    formatedText += whole.charAt(i);
                }
            }
            for (i = pos; i < whole.length; i++) {
                if ((whole.length - i) % lgroup === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }

            // format fraction part.
            while (fraction.length < fractionSize) {
                fraction += '0';
            }

            if (fractionSize && fractionSize !== "0") formatedText += decimalSep + fraction.substr(0, fractionSize);
        } else {

            if (fractionSize > 0 && number > -1 && number < 1) {
                formatedText = number.toFixed(fractionSize);
            }
        }
        parts.push(isNegative ? pattern.negPre : pattern.posPre);
        parts.push(formatedText);
        parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
        return parts.join('');
    }
}
