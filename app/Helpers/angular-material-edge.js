! function() {
    angular.module("angularytics", []).provider("Angularytics", function() {
        var e = ["Google"];
        this.setEventHandlers = function(n) {
            angular.isString(n) && (n = [n]), e = [], angular.forEach(n, function(n) {
                e.push(t(n))
            })
        };
        var t = function(e) {
                return e.charAt(0).toUpperCase() + e.substring(1)
            },
            n = "$locationChangeSuccess";
        this.setPageChangeEvent = function(e) {
            n = e
        }, this.$get = ["$injector", "$rootScope", "$location", function(t, a, o) {
            var r = [];
            angular.forEach(e, function(e) {
                r.push(t.get("Angularytics" + e + "Handler"))
            });
            var i = function(e) {
                    angular.forEach(r, function(t) {
                        e(t)
                    })
                },
                l = {};
            return l.init = function() {}, l.trackEvent = function(e, t, n, a, o) {
                i(function(r) {
                    e && t && r.trackEvent(e, t, n, a, o)
                })
            }, l.trackPageView = function(e) {
                i(function(t) {
                    e && t.trackPageView(e)
                })
            }, a.$on(n, function() {
                l.trackPageView(o.url())
            }), l
        }]
    })
}(),
function() {
    angular.module("angularytics").factory("AngularyticsConsoleHandler", ["$log", function(e) {
        var t = {};
        return t.trackPageView = function(t) {
            e.log("URL visited", t)
        }, t.trackEvent = function(t, n, a, o, r) {
            e.log("Event tracked", t, n, a, o, r)
        }, t
    }])
}(),
function() {
    angular.module("angularytics").factory("AngularyticsGoogleHandler", ["$log", function(e) {
        var t = {};
        return t.trackPageView = function(e) {
            _gaq.push(["_set", "page", e]), _gaq.push(["_trackPageview", e])
        }, t.trackEvent = function(e, t, n, a, o) {
            _gaq.push(["_trackEvent", e, t, n, a, o])
        }, t
    }]).factory("AngularyticsGoogleUniversalHandler", function() {
        var e = {};
        return e.trackPageView = function(e) {
            ga("set", "page", e), ga("send", "pageview", e)
        }, e.trackEvent = function(e, t, n, a, o) {
            ga("send", "event", e, t, n, a, {
                nonInteraction: o
            })
        }, e
    })
}(),
function() {
    angular.module("angularytics").filter("trackEvent", ["Angularytics", function(e) {
        return function(t, n, a, o, r, i) {
            return e.trackEvent(n, a, o, r, i), t
        }
    }])
}(), angular.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.core.gestures", "material.core.theming.palette", "material.core.theming", "material.components.autocomplete", "material.components.backdrop", "material.components.bottomSheet", "material.components.button", "material.components.card", "material.components.checkbox", "material.components.chips", "material.components.content", "material.components.dialog", "material.components.divider", "material.components.gridList", "material.components.icon", "material.components.input", "material.components.list", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.select", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.toast", "material.components.toolbar", "material.components.tooltip", "material.components.whiteframe"]),
    function() {
        "use strict";

        function e(e, n) {
            e.decorator("$$rAF", ["$delegate", t]), n.theme("default").primaryPalette("indigo").accentPalette("pink").warnPalette("red").backgroundPalette("grey")
        }

        function t(e) {
            return e.throttle = function(t) {
                var n, a, o, r;
                return function() {
                    n = arguments, r = this, o = t, a || (a = !0, e(function() {
                        o.apply(r, n), a = !1
                    }))
                }
            }, e
        }
        angular.module("material.core", ["material.core.gestures", "material.core.theming"]).config(e), e.$inject = ["$provide", "$mdThemingProvider"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(e) {
                return a ? "webkit" + e.charAt(0).toUpperCase() + e.substring(1) : e
            }
            var a = /webkit/i.test(t.vendorPrefix);
            return {
                KEY_CODE: {
                    ENTER: 13,
                    ESCAPE: 27,
                    SPACE: 32,
                    LEFT_ARROW: 37,
                    UP_ARROW: 38,
                    RIGHT_ARROW: 39,
                    DOWN_ARROW: 40,
                    TAB: 9,
                    BACKSPACE: 8,
                    DELETE: 46
                },
                CSS: {
                    TRANSITIONEND: "transitionend" + (a ? " webkitTransitionEnd" : ""),
                    ANIMATIONEND: "animationend" + (a ? " webkitAnimationEnd" : ""),
                    TRANSFORM: n("transform"),
                    TRANSFORM_ORIGIN: n("transformOrigin"),
                    TRANSITION: n("transition"),
                    TRANSITION_DURATION: n("transitionDuration"),
                    ANIMATION_PLAY_STATE: n("animationPlayState"),
                    ANIMATION_DURATION: n("animationDuration"),
                    ANIMATION_NAME: n("animationName"),
                    ANIMATION_TIMING: n("animationTimingFunction"),
                    ANIMATION_DIRECTION: n("animationDirection")
                },
                MEDIA: {
                    sm: "(max-width: 600px)",
                    "gt-sm": "(min-width: 600px)",
                    md: "(min-width: 600px) and (max-width: 960px)",
                    "gt-md": "(min-width: 960px)",
                    lg: "(min-width: 960px) and (max-width: 1200px)",
                    "gt-lg": "(min-width: 1200px)"
                },
                MEDIA_PRIORITY: ["gt-lg", "lg", "gt-md", "md", "gt-sm", "sm"]
            }
        }
        angular.module("material.core").factory("$mdConstant", e), e.$inject = ["$$rAF", "$sniffer"]
    }(),
    function() {
        function e(e, t) {
            function n() {
                return [].concat(b)
            }

            function a() {
                return b.length
            }

            function o(e) {
                return b.length && e > -1 && e < b.length
            }

            function r(e) {
                return e ? o(c(e) + 1) : !1
            }

            function i(e) {
                return e ? o(c(e) - 1) : !1
            }

            function l(e) {
                return o(e) ? b[e] : null
            }

            function d(e, t) {
                return b.filter(function(n) {
                    return n[e] === t
                })
            }

            function s(e, t) {
                return e ? (angular.isNumber(t) || (t = b.length), b.splice(t, 0, e), c(e)) : -1
            }

            function m(e) {
                u(e) && b.splice(c(e), 1)
            }

            function c(e) {
                return b.indexOf(e)
            }

            function u(e) {
                return e && c(e) > -1
            }

            function p() {
                return b.length ? b[0] : null
            }

            function h() {
                return b.length ? b[b.length - 1] : null
            }

            function f(e, n, a, r) {
                a = a || g;
                for (var i = c(n);;) {
                    if (!o(i)) return null;
                    var l = i + (e ? -1 : 1),
                        d = null;
                    if (o(l) ? d = b[l] : t && (d = e ? h() : p(), l = c(d)), null === d || l === r) return null;
                    if (a(d)) return d;
                    angular.isUndefined(r) && (r = l), i = l
                }
            }
            var g = function() {
                return !0
            };
            e && !angular.isArray(e) && (e = Array.prototype.slice.call(e)), t = !!t;
            var b = e || [];
            return {
                items: n,
                count: a,
                inRange: o,
                contains: u,
                indexOf: c,
                itemAt: l,
                findBy: d,
                add: s,
                remove: m,
                first: p,
                last: h,
                next: angular.bind(null, f, !1),
                previous: angular.bind(null, f, !0),
                hasPrevious: i,
                hasNext: r
            }
        }
        angular.module("material.core").config(["$provide", function(t) {
            t.decorator("$mdUtil", ["$delegate", function(t) {
                return t.iterator = e, t
            }])
        }])
    }(),
    function() {
        function e(e, t, n) {
            function a(e) {
                var t = c[e];
                angular.isUndefined(t) && (t = c[e] = o(e));
                var n = p[t];
                return angular.isUndefined(n) && (n = r(t)), n
            }

            function o(t) {
                return e.MEDIA[t] || ("(" !== t.charAt(0) ? "(" + t + ")" : t)
            }

            function r(e) {
                var t = u[e] = n.matchMedia(e);
                return t.addListener(i), p[t.media] = !!t.matches
            }

            function i(e) {
                t.$evalAsync(function() {
                    p[e.media] = !!e.matches
                })
            }

            function l(e) {
                return u[e]
            }

            function d(t, n) {
                for (var a = 0; a < e.MEDIA_PRIORITY.length; a++) {
                    var o = e.MEDIA_PRIORITY[a];
                    if (u[c[o]].matches) {
                        var r = m(t, n + "-" + o);
                        if (t[r]) return t[r]
                    }
                }
                return t[m(t, n)]
            }

            function s(t, n, a) {
                var o = [];
                return t.forEach(function(t) {
                        var r = m(n, t);
                        n[r] && o.push(n.$observe(r, angular.bind(void 0, a, null)));
                        for (var i in e.MEDIA) {
                            if (r = m(n, t + "-" + i), !n[r]) return;
                            o.push(n.$observe(r, angular.bind(void 0, a, i)))
                        }
                    }),
                    function() {
                        o.forEach(function(e) {
                            e()
                        })
                    }
            }

            function m(e, t) {
                return h[t] || (h[t] = e.$normalize(t))
            }
            var c = {},
                u = {},
                p = {},
                h = {};
            return a.getResponsiveAttribute = d, a.getQuery = l, a.watchResponsiveAttributes = s, a
        }
        angular.module("material.core").factory("$mdMedia", e), e.$inject = ["$mdConstant", "$rootScope", "$window"]
    }(),
    function() {
        "use strict";
        var e = ["0", "0", "0"];
        angular.module("material.core").factory("$mdUtil", ["$cacheFactory", "$document", "$timeout", "$q", "$window", "$mdConstant", function(t, n, a, o, r, i) {
            function l(e) {
                return e[0] || e
            }
            var d;
            return d = {
                now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now,
                clientRect: function(e, t, n) {
                    var a = l(e);
                    t = l(t || a.offsetParent || document.body);
                    var o = a.getBoundingClientRect(),
                        r = n ? t.getBoundingClientRect() : {
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0
                        };
                    return {
                        left: o.left - r.left,
                        top: o.top - r.top,
                        width: o.width,
                        height: o.height
                    }
                },
                offsetRect: function(e, t) {
                    return d.clientRect(e, t, !0)
                },
                disableScrollAround: function(e) {
                    function t() {
                        p ? o.attr("style", p) : o[0].removeAttribute("style"), u.css("position", "static");
                        var e = r.getComputedStyle(o[0]);
                        a(e);
                        var t = parseFloat(e.width, 10);
                        "border-box" == e.boxSizing && (t -= parseFloat(e.paddingLeft, 10), t -= parseFloat(e.paddingRight, 10)), u.css({
                            "max-width": t + "px"
                        }), u.css("position", "fixed")
                    }

                    function a(e) {
                        var t = !d.floatingScrollbars() && i.scrollHeight > i.offsetHeight;
                        t && o.css("overflow-y", "scroll");
                        var n = parseFloat(e.height, 10);
                        "border-box" == e.boxSizing && (n -= parseFloat(e.paddingTop, 10), n -= parseFloat(e.paddingBottom, 10)), i.scrollHeight > i.offsetHeight ? u.css("min-height", "100%") : (u.css("max-height", n + "px"), u.css("height", "100%")), o.css("height", n)
                    }
                    for (var o, i, l, s = e[0] || e; s = this.getClosest(s.parentNode, "MD-CONTENT");) o = angular.element(s);
                    o || (o = angular.element(n[0].body)), "BODY" == o[0].nodeName && n[0].documentElement.scrollTop ? (i = n[0].documentElement, l = !0) : i = o[0];
                    var m = i.scrollTop,
                        c = m;
                    l || (m -= o[0].offsetTop);
                    var u = angular.element("<div>");
                    o.addClass("md-overflow-wrapper-shown"), u.append(o.children()), o.append(u);
                    var p = o.attr("style"),
                        h = r.getComputedStyle(o[0]),
                        f = o[0].getBoundingClientRect(),
                        g = f.left + parseFloat(h.paddingLeft, 10) - parseFloat(h.marginLeft, 10);
                    return a(h), u.attr("layout-margin", o.attr("layout-margin")), u.css({
                            overflow: "hidden",
                            position: "fixed",
                            display: h.display,
                            "-webkit-align-items": h.webkitAlignItems,
                            "-ms-flex-align": h.msFlexAlign,
                            alignItems: h.alignItems,
                            "-webkit-justify-content": h.webkitJustifyContent,
                            "-ms-flex-pack": h.msFlexPack,
                            justifyContent: h.justifyContent,
                            "-webkit-flex": h.webkitFlex,
                            "-ms-flex": h.msFlex,
                            flex: h.flex,
                            "padding-top": h.paddingTop,
                            "margin-top": "0px",
                            "margin-left": h.marginLeft,
                            top: -1 * m + "px",
                            left: g + "px",
                            width: "100%"
                        }), t(), angular.element(r).on("resize", t),
                        function() {
                            o.append(u.children()), u.remove(), angular.element(r).off("resize", t), o.attr("style", p), l ? n[0].documentElement.scrollTop = c : o[0].scrollTop = c
                        }
                },
                floatingScrollbars: function() {
                    if (void 0 === this.floatingScrollbars.cached) {
                        var e = angular.element('<div style="width: 100%; z-index: -1; position: absolute; height: 35px; overflow-y: scroll"><div style="height: 60;"></div></div>');
                        n[0].body.appendChild(e[0]), this.floatingScrollbars.cached = e[0].offsetWidth == e[0].childNodes[0].offsetWidth, e.remove()
                    }
                    return this.floatingScrollbars.cached
                },
                forceFocus: function(e) {
                    var t = e[0] || e;
                    document.addEventListener("click", function a(e) {
                        e.target === t && e.$focus && (t.focus(), e.stopImmediatePropagation(), e.preventDefault(), t.removeEventListener("click", a))
                    }, !0);
                    var n = document.createEvent("MouseEvents");
                    n.initMouseEvent("click", !1, !0, window, {}, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.$material = !0, n.$focus = !0, t.dispatchEvent(n)
                },
                transitionEndPromise: function(e, t) {
                    function n(t) {
                        t && t.target !== e[0] || (e.off(i.CSS.TRANSITIONEND, n), r.resolve())
                    }
                    t = t || {};
                    var r = o.defer();
                    return e.on(i.CSS.TRANSITIONEND, n), t.timeout && a(n, t.timeout), r.promise
                },
                fakeNgModel: function() {
                    return {
                        $fake: !0,
                        $setTouched: angular.noop,
                        $setViewValue: function(e) {
                            this.$viewValue = e, this.$render(e), this.$viewChangeListeners.forEach(function(e) {
                                e()
                            })
                        },
                        $isEmpty: function(e) {
                            return 0 === ("" + e).length
                        },
                        $parsers: [],
                        $formatters: [],
                        $viewChangeListeners: [],
                        $render: angular.noop
                    }
                },
                debounce: function(e, t, n, o) {
                    var r;
                    return function() {
                        var i = n,
                            l = Array.prototype.slice.call(arguments);
                        a.cancel(r), r = a(function() {
                            r = void 0, e.apply(i, l)
                        }, t || 10, o)
                    }
                },
                throttle: function(e, t) {
                    var n;
                    return function() {
                        var a = this,
                            o = arguments,
                            r = d.now();
                        (!n || r - n > t) && (e.apply(a, o), n = r)
                    }
                },
                time: function(e) {
                    var t = d.now();
                    return e(), d.now() - t
                },
                nextUid: function() {
                    for (var t, n = e.length; n;) {
                        if (n--, t = e[n].charCodeAt(0), 57 == t) return e[n] = "A", e.join("");
                        if (90 != t) return e[n] = String.fromCharCode(t + 1), e.join("");
                        e[n] = "0"
                    }
                    return e.unshift("0"), e.join("")
                },
                disconnectScope: function(e) {
                    if (e && e.$root !== e && !e.$$destroyed) {
                        var t = e.$parent;
                        e.$$disconnected = !0, t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
                    }
                },
                reconnectScope: function(e) {
                    if (e && e.$root !== e && e.$$disconnected) {
                        var t = e,
                            n = t.$parent;
                        t.$$disconnected = !1, t.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = t, n.$$childTail = t) : n.$$childHead = n.$$childTail = t
                    }
                },
                getClosest: function(e, t) {
                    t = t.toUpperCase();
                    do
                        if (e.nodeName === t) return e;
                    while (e = e.parentNode);
                    return null
                },
                extractElementByName: function(e, t) {
                    for (var n = 0, a = e.length; a > n; n++)
                        if (e[n].nodeName.toLowerCase() === t) return angular.element(e[n]);
                    return e
                }
            }
        }]), angular.element.prototype.focus = angular.element.prototype.focus || function() {
            return this.length && this[0].focus(), this
        }, angular.element.prototype.blur = angular.element.prototype.blur || function() {
            return this.length && this[0].blur(), this
        }
    }(),
    function() {
        "use strict";

        function e(e, t, n) {
            function a(e, n, a) {
                var o = e[0] || e;
                !o || o.hasAttribute(n) && 0 !== o.getAttribute(n).length || l(o, n) || (a = angular.isString(a) ? a.trim() : "", a.length ? e.attr(n, a) : t.warn('ARIA: Attribute "', n, '", required for accessibility, is missing on node:', o))
            }

            function o(t, n, o) {
                e(function() {
                    a(t, n, o())
                })
            }

            function r(e, t) {
                o(e, t, function() {
                    return i(e)
                })
            }

            function i(e) {
                return e.text().trim()
            }

            function l(e, t) {
                function a(e) {
                    var t = e.currentStyle ? e.currentStyle : n.getComputedStyle(e);
                    return "none" === t.display
                }
                var o = e.hasChildNodes(),
                    r = !1;
                if (o)
                    for (var i = e.childNodes, l = 0; l < i.length; l++) {
                        var d = i[l];
                        1 === d.nodeType && d.hasAttribute(t) && (a(d) || (r = !0))
                    }
                return r
            }
            return {
                expect: a,
                expectAsync: o,
                expectWithText: r
            }
        }
        angular.module("material.core").service("$mdAria", e), e.$inject = ["$$rAF", "$log", "$window"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r) {
            this.compile = function(i) {
                var l = i.templateUrl,
                    d = i.template || "",
                    s = i.controller,
                    m = i.controllerAs,
                    c = i.resolve || {},
                    u = i.locals || {},
                    p = i.transformTemplate || angular.identity,
                    h = i.bindToController;
                return angular.forEach(c, function(e, t) {
                    c[t] = angular.isString(e) ? n.get(e) : n.invoke(e)
                }), angular.extend(c, u), c.$template = l ? t.get(l, {
                    cache: r
                }).then(function(e) {
                    return e.data
                }) : e.when(d), e.all(c).then(function(e) {
                    var t = p(e.$template),
                        n = i.element || angular.element("<div>").html(t.trim()).contents(),
                        r = a(n);
                    return {
                        locals: e,
                        element: n,
                        link: function(t) {
                            if (e.$scope = t, s) {
                                var a = o(s, e);
                                h && angular.extend(a, e), n.data("$ngControllerController", a), n.children().data("$ngControllerController", a), m && (t[m] = a)
                            }
                            return r(t)
                        }
                    }
                })
            }
        }
        angular.module("material.core").service("$mdCompiler", e), e.$inject = ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache"]
    }(),
    function(e) {
        "use strict";

        function t() {}

        function n(t, n, a) {
            function o(e, t, n) {
                var a = u[t.replace(/^\$md./, "")];
                if (!a) throw new Error("Failed to register element with handler " + t + ". Available handlers: " + Object.keys(u).join(", "));
                return a.registerElement(e, n)
            }

            function r(e, n) {
                var a = new t(e);
                return angular.extend(a, n), u[e] = a, c
            }
            var l = navigator.userAgent || navigator.vendor || window.opera,
                s = l.match(/ipad|iphone|ipod/i),
                m = l.match(/android/i),
                c = {
                    handler: r,
                    register: o,
                    isHijackingClicks: (s || m) && !e && !p
                };
            return c.isHijackingClicks && c.handler("click", {
                options: {
                    maxDistance: 6
                },
                onEnd: function(e, t) {
                    t.distance < this.state.options.maxDistance && this.dispatchEvent(e, "click")
                }
            }), c.handler("press", {
                onStart: function(e, t) {
                    this.dispatchEvent(e, "$md.pressdown")
                },
                onEnd: function(e, t) {
                    this.dispatchEvent(e, "$md.pressup")
                }
            }).handler("hold", {
                options: {
                    maxDistance: 6,
                    delay: 500
                },
                onCancel: function() {
                    a.cancel(this.state.timeout)
                },
                onStart: function(e, t) {
                    return this.state.registeredParent ? (this.state.pos = {
                        x: t.x,
                        y: t.y
                    }, void(this.state.timeout = a(angular.bind(this, function() {
                        this.dispatchEvent(e, "$md.hold"), this.cancel()
                    }), this.state.options.delay, !1))) : this.cancel()
                },
                onMove: function(e, t) {
                    e.preventDefault();
                    var n = this.state.pos.x - t.x,
                        a = this.state.pos.y - t.y;
                    Math.sqrt(n * n + a * a) > this.options.maxDistance && this.cancel()
                },
                onEnd: function() {
                    this.onCancel()
                }
            }).handler("drag", {
                options: {
                    minDistance: 6,
                    horizontal: !0,
                    cancelMultiplier: 1.5
                },
                onStart: function(e) {
                    this.state.registeredParent || this.cancel()
                },
                onMove: function(e, t) {
                    var n, a;
                    e.preventDefault(), this.state.dragPointer ? this.dispatchDragMove(e) : (this.state.options.horizontal ? (n = Math.abs(t.distanceX) > this.state.options.minDistance, a = Math.abs(t.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier) : (n = Math.abs(t.distanceY) > this.state.options.minDistance, a = Math.abs(t.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier), n ? (this.state.dragPointer = i(e), d(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragstart", this.state.dragPointer)) : a && this.cancel())
                },
                dispatchDragMove: n.throttle(function(e) {
                    this.state.isRunning && (d(e, this.state.dragPointer), this.dispatchEvent(e, "$md.drag", this.state.dragPointer))
                }),
                onEnd: function(e, t) {
                    this.state.dragPointer && (d(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragend", this.state.dragPointer))
                }
            }).handler("swipe", {
                options: {
                    minVelocity: .65,
                    minDistance: 10
                },
                onEnd: function(e, t) {
                    if (Math.abs(t.velocityX) > this.state.options.minVelocity && Math.abs(t.distanceX) > this.state.options.minDistance) {
                        var n = "left" == t.directionX ? "$md.swipeleft" : "$md.swiperight";
                        this.dispatchEvent(e, n)
                    }
                }
            })
        }

        function a(e) {
            this.name = e, this.state = {}
        }

        function o(t) {
            function n(e, t, n) {
                n = n || m;
                var a = new angular.element.Event(t);
                a.$material = !0, a.pointer = n, a.srcEvent = e, angular.extend(a, {
                    clientX: n.x,
                    clientY: n.y,
                    screenX: n.x,
                    screenY: n.y,
                    pageX: n.x,
                    pageY: n.y,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    metaKey: e.metaKey
                }), angular.element(n.target).trigger(a)
            }

            function o(e, t, n) {
                n = n || m;
                var a;
                "click" === t ? (a = document.createEvent("MouseEvents"), a.initMouseEvent("click", !0, !0, window, e.detail, n.x, n.y, n.x, n.y, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget || null)) : (a = document.createEvent("CustomEvent"), a.initCustomEvent(t, !0, !0, {})), a.$material = !0, a.pointer = n, a.srcEvent = e, n.target.dispatchEvent(a)
            }
            var r = "undefined" != typeof e && angular.element === e;
            return a.prototype = {
                options: {},
                dispatchEvent: r ? n : o,
                onStart: angular.noop,
                onMove: angular.noop,
                onEnd: angular.noop,
                onCancel: angular.noop,
                start: function(e, t) {
                    if (!this.state.isRunning) {
                        var n = this.getNearestParent(e.target),
                            a = n && n.$mdGesture[this.name] || {};
                        this.state = {
                            isRunning: !0,
                            options: angular.extend({}, this.options, a),
                            registeredParent: n
                        }, this.onStart(e, t)
                    }
                },
                move: function(e, t) {
                    this.state.isRunning && this.onMove(e, t)
                },
                end: function(e, t) {
                    this.state.isRunning && (this.onEnd(e, t), this.state.isRunning = !1)
                },
                cancel: function(e, t) {
                    this.onCancel(e, t), this.state = {}
                },
                getNearestParent: function(e) {
                    for (var t = e; t;) {
                        if ((t.$mdGesture || {})[this.name]) return t;
                        t = t.parentNode
                    }
                    return null
                },
                registerElement: function(e, t) {
                    function n() {
                        delete e[0].$mdGesture[a.name], e.off("$destroy", n)
                    }
                    var a = this;
                    return e[0].$mdGesture = e[0].$mdGesture || {}, e[0].$mdGesture[this.name] = t || {}, e.on("$destroy", n), n
                }
            }, a
        }

        function r(e, t) {
            function n(e, n) {
                var a;
                for (var o in u) a = u[o], a instanceof t && ("start" === e && a.cancel(), a[e](n, m))
            }

            function a(e) {
                if (!m) {
                    var t = +Date.now();
                    c && !l(e, c) && t - c.endTime < 1500 || (m = i(e), n("start", e))
                }
            }

            function o(e) {
                m && l(e, m) && (d(e, m), n("move", e))
            }

            function r(e) {
                m && l(e, m) && (d(e, m), m.endTime = +Date.now(), n("end", e), c = m, m = null)
            }
            document.contains || (document.contains = function(e) {
                return document.body.contains(e)
            }), !h && e.isHijackingClicks && (document.addEventListener("click", function(e) {
                var t = 0 === e.clientX && 0 === e.clientY;
                t || e.$material || (e.preventDefault(), e.stopPropagation())
            }, !0), h = !0);
            var s = "mousedown touchstart pointerdown",
                p = "mousemove touchmove pointermove",
                f = "mouseup mouseleave touchend touchcancel pointerup pointercancel";
            angular.element(document).on(s, a).on(p, o).on(f, r).on("$$mdGestureReset", function() {
                c = m = null
            })
        }

        function i(e) {
            var t = s(e),
                n = {
                    startTime: +Date.now(),
                    target: e.target,
                    type: e.type.charAt(0)
                };
            return n.startX = n.x = t.pageX, n.startY = n.y = t.pageY, n
        }

        function l(e, t) {
            return e && t && e.type.charAt(0) === t.type
        }

        function d(e, t) {
            var n = s(e),
                a = t.x = n.pageX,
                o = t.y = n.pageY;
            t.distanceX = a - t.startX, t.distanceY = o - t.startY, t.distance = Math.sqrt(t.distanceX * t.distanceX + t.distanceY * t.distanceY), t.directionX = t.distanceX > 0 ? "right" : t.distanceX < 0 ? "left" : "", t.directionY = t.distanceY > 0 ? "up" : t.distanceY < 0 ? "down" : "", t.duration = +Date.now() - t.startTime, t.velocityX = t.distanceX / t.duration, t.velocityY = t.distanceY / t.duration
        }

        function s(e) {
            return e = e.originalEvent || e, e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e
        }
        var m, c, u = {},
            p = !1,
            h = !1;
        angular.module("material.core.gestures", []).provider("$mdGesture", t).factory("$$MdGestureHandler", o).run(r), t.prototype = {
            skipClickHijack: function() {
                return p = !0
            },
            $get: ["$$MdGestureHandler", "$$rAF", "$timeout", function(e, t, a) {
                return new n(e, t, a)
            }]
        }, o.$inject = ["$$rAF"], r.$inject = ["$mdGesture", "$$MdGestureHandler"]
    }(window.jQuery),
    function() {
        "use strict";

        function e() {
            function e(e) {
                function t(e) {
                    return l.optionsFactory = e.options, l.methods = (e.methods || []).concat(r), d
                }

                function n(e, t) {
                    return i[e] = t, d
                }

                function a(t, n) {
                    if (n = n || {}, n.methods = n.methods || [], n.options = n.options || function() {
                            return {}
                        }, /^cancel|hide|show$/.test(t)) throw new Error("Preset '" + t + "' in " + e + " is reserved!");
                    if (n.methods.indexOf("_options") > -1) throw new Error("Method '_options' in " + e + " is reserved!");
                    return l.presets[t] = {
                        methods: n.methods.concat(r),
                        optionsFactory: n.options,
                        argOption: n.argOption
                    }, d
                }

                function o(t, n, a) {
                    function o(e) {
                        return e && e._options && (e = e._options), m.show(angular.extend({}, s, e))
                    }

                    function r(t, n) {
                        var o = {};
                        return o[e] = c, a.invoke(t || function() {
                            return n
                        }, {}, o)
                    }
                    var d, s, m = t(),
                        c = {
                            hide: m.hide,
                            cancel: m.cancel,
                            show: o
                        };
                    return d = l.methods || [], s = r(l.optionsFactory, {}), angular.forEach(i, function(e, t) {
                        c[t] = e
                    }), angular.forEach(l.presets, function(e, t) {
                        function n(e) {
                            this._options = angular.extend({}, a, e)
                        }
                        var a = r(e.optionsFactory, {}),
                            o = (e.methods || []).concat(d);
                        if (angular.extend(a, {
                                $type: t
                            }), angular.forEach(o, function(e) {
                                n.prototype[e] = function(t) {
                                    return this._options[e] = t, this
                                }
                            }), e.argOption) {
                            var i = "show" + t.charAt(0).toUpperCase() + t.slice(1);
                            c[i] = function(e) {
                                var n = c[t](e);
                                return c.show(n)
                            }
                        }
                        c[t] = function(t) {
                            return arguments.length && e.argOption && !angular.isObject(t) && !angular.isArray(t) ? (new n)[e.argOption](t) : new n(t)
                        }
                    }), c
                }
                var r = ["onHide", "onShow", "onRemove"],
                    i = {},
                    l = {
                        presets: {}
                    },
                    d = {
                        setDefaults: t,
                        addPreset: a,
                        addMethod: n,
                        $get: o
                    };
                return d.addPreset("build", {
                    methods: ["controller", "controllerAs", "resolve", "template", "templateUrl", "themable", "transformTemplate", "parent"]
                }), o.$inject = ["$$interimElement", "$animate", "$injector"], d
            }

            function t(e, t, n, a, o, r, i, l, d) {
                function s(e) {
                    return e && angular.isString(e) ? e.replace(/\{\{/g, m).replace(/}}/g, c) : e
                }
                var m = i.startSymbol(),
                    c = i.endSymbol(),
                    u = "{{" === m && "}}" === c,
                    p = u ? angular.identity : s;
                return function() {
                    function i(e) {
                        if (h.length) return u.cancel().then(function() {
                            return i(e)
                        });
                        var t = new c(e);
                        return h.push(t), t.show().then(function() {
                            return t.deferred.promise
                        })
                    }

                    function s(e) {
                        var t = h.shift();
                        return t && t.remove().then(function() {
                            t.deferred.resolve(e)
                        })
                    }

                    function m(e) {
                        var n = h.shift();
                        return t.when(n && n.remove().then(function() {
                            n.deferred.reject(e)
                        }))
                    }

                    function c(i) {
                        var s, m, c, h, f;
                        return i = i || {}, i = angular.extend({
                            preserveScope: !1,
                            scope: i.scope || n.$new(i.isolateScope),
                            onShow: function(e, t, n) {
                                return r.enter(t, n.parent)
                            },
                            onRemove: function(e, n, a) {
                                return n && r.leave(n) || t.when()
                            }
                        }, i), i.template && (i.template = p(i.template)), s = {
                            options: i,
                            deferred: t.defer(),
                            show: function() {
                                var n;
                                return n = i.skipCompile ? t(function(e) {
                                    e({
                                        locals: {},
                                        link: function() {
                                            return i.element
                                        }
                                    })
                                }) : l.compile(i), h = n.then(function(n) {
                                    function r() {
                                        i.hideDelay && (m = a(u.cancel, i.hideDelay))
                                    }
                                    angular.extend(n.locals, s.options), c = n.link(i.scope), angular.isFunction(i.parent) ? i.parent = i.parent(i.scope, c, i) : angular.isString(i.parent) && (i.parent = angular.element(e[0].querySelector(i.parent))), (i.parent || {}).length || (i.parent = o.find("body"), i.parent.length || (i.parent = o), "#comment" == i.parent[0].nodeName && (i.parent = e.find("body"))), i.themable && d(c);
                                    var l = i.onShow(i.scope, c, i);
                                    return t.when(l).then(function() {
                                        (i.onComplete || angular.noop)(i.scope, c, i), r()
                                    })
                                }, function(e) {
                                    h = !0, s.deferred.reject(e)
                                })
                            },
                            cancelTimeout: function() {
                                m && (a.cancel(m), m = void 0)
                            },
                            remove: function() {
                                return s.cancelTimeout(), f = t.when(h).then(function() {
                                    var e = c ? i.onRemove(i.scope, c, i) : !0;
                                    return t.when(e).then(function() {
                                        i.preserveScope || i.scope.$destroy(), f = !0
                                    })
                                })
                            }
                        }
                    }
                    var u, h = [];
                    return u = {
                        show: i,
                        hide: s,
                        cancel: m
                    }
                }
            }
            return e.$get = t, t.$inject = ["$document", "$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$interpolate", "$mdCompiler", "$mdTheming"], e
        }
        angular.module("material.core").provider("$$interimElement", e)
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(e) {
                return e && "" !== e
            }
            var a, o = [],
                r = {};
            return a = {
                notFoundError: function(t) {
                    e.error("No instance found for handle", t)
                },
                getInstances: function() {
                    return o
                },
                get: function(e) {
                    if (!n(e)) return null;
                    var t, a, r;
                    for (t = 0, a = o.length; a > t; t++)
                        if (r = o[t], r.$$mdHandle === e) return r;
                    return null
                },
                register: function(e, t) {
                    function n() {
                        var t = o.indexOf(e); - 1 !== t && o.splice(t, 1)
                    }

                    function a() {
                        var n = r[t];
                        n && (n.resolve(e), delete r[t])
                    }
                    return t ? (e.$$mdHandle = t, o.push(e), a(), n) : angular.noop
                },
                when: function(e) {
                    if (n(e)) {
                        var o = t.defer(),
                            i = a.get(e);
                        return i ? o.resolve(i) : r[e] = o, o.promise
                    }
                    return t.reject("Invalid `md-component-id` value.")
                }
            }
        }
        angular.module("material.core").factory("$mdComponentRegistry", e), e.$inject = ["$log", "$q"]
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                controller: angular.noop,
                link: function(t, n, a) {
                    a.hasOwnProperty("mdInkRippleCheckbox") ? e.attachCheckboxBehavior(t, n) : e.attachButtonBehavior(t, n)
                }
            }
        }

        function t(e, t) {
            function n(e, t, n) {
                return i(e, t, angular.extend({
                    fullRipple: !0,
                    isMenuItem: t.hasClass("md-menu-item"),
                    center: !1,
                    dimBackground: !0
                }, n))
            }

            function a(e, t, n) {
                return i(e, t, angular.extend({
                    center: !0,
                    dimBackground: !1,
                    fitRipple: !0
                }, n))
            }

            function o(e, t, n) {
                return i(e, t, angular.extend({
                    center: !1,
                    dimBackground: !0,
                    outline: !1,
                    rippleSize: "full"
                }, n))
            }

            function r(e, t, n) {
                return i(e, t, angular.extend({
                    center: !1,
                    dimBackground: !0,
                    outline: !1,
                    rippleSize: "full"
                }, n))
            }

            function i(n, a, o) {
                function r() {
                    var e = a.data("$mdRippleContainer");
                    return e ? e : (e = angular.element('<div class="md-ripple-container">'), a.append(e), a.data("$mdRippleContainer", e), e)
                }

                function i(e) {
                    function t(e) {
                        var t = "#" === e.charAt(0) ? e.substr(1) : e,
                            n = t.length / 3,
                            a = t.substr(0, n),
                            o = t.substr(n, n),
                            r = t.substr(2 * n);
                        return 1 === n && (a += a, o += o, r += r), "rgba(" + parseInt(a, 16) + "," + parseInt(o, 16) + "," + parseInt(r, 16) + ",0.1)"
                    }

                    function n(e) {
                        return e.replace(")", ", 0.1)").replace("(", "a(")
                    }
                    if (e) return 0 === e.indexOf("rgba") ? e.replace(/\d?\.?\d*\s*\)\s*$/, "0.1)") : 0 === e.indexOf("rgb") ? n(e) : 0 === e.indexOf("#") ? t(e) : void 0
                }

                function l(e, n) {
                    g.splice(g.indexOf(e), 1), 0 === g.length && r().css({
                        backgroundColor: ""
                    }), t(function() {
                        e.remove()
                    }, n, !1)
                }

                function d(e) {
                    var t = g.indexOf(e),
                        n = b[t] || {},
                        a = g.length > 1 ? !1 : E,
                        r = g.length > 1 ? !1 : y;
                    a || n.animating || r ? e.addClass("md-ripple-visible") : e && (e.removeClass("md-ripple-visible"), o.outline && e.css({
                        width: p + "px",
                        height: p + "px",
                        marginLeft: -1 * p + "px",
                        marginTop: -1 * p + "px"
                    }), l(e, o.outline ? 450 : 650))
                }

                function s(n, l) {
                    function s(e) {
                        var t = angular.element('<div class="md-ripple" data-counter="' + f++ + '">');
                        return g.unshift(t), b.unshift({
                            animating: !0
                        }), u.append(t), e && t.css(e), t
                    }

                    function m(e, t) {
                        var n, a, r, i = u.prop("offsetWidth"),
                            l = u.prop("offsetHeight");
                        return o.isMenuItem ? a = Math.sqrt(Math.pow(i, 2) + Math.pow(l, 2)) : o.outline ? (r = M.getBoundingClientRect(), e -= r.left, t -= r.top, i = Math.max(e, i - e), l = Math.max(t, l - t), a = 2 * Math.sqrt(Math.pow(i, 2) + Math.pow(l, 2))) : (n = o.fullRipple ? 1.1 : .8, a = Math.sqrt(Math.pow(i, 2) + Math.pow(l, 2)) * n, o.fitRipple && (a = Math.min(l, i, a))), a
                    }

                    function c(e, t, n) {
                        function a(e) {
                            return e.replace("rgba", "rgb").replace(/,[^\),]+\)/, ")")
                        }
                        var r = M.getBoundingClientRect(),
                            i = {
                                backgroundColor: a(x),
                                borderColor: a(x),
                                width: e + "px",
                                height: e + "px"
                            };
                        return o.outline ? (i.width = 0, i.height = 0) : i.marginLeft = i.marginTop = e * -.5 + "px", o.center ? i.left = i.top = "50%" : (i.left = Math.round((t - r.left) / u.prop("offsetWidth") * 100) + "%", i.top = Math.round((n - r.top) / u.prop("offsetHeight") * 100) + "%"), i
                    }
                    x = i(a.attr("md-ink-ripple")) || i(e.getComputedStyle(o.colorElement[0]).color || "rgb(0, 0, 0)");
                    var u = r(),
                        h = m(n, l),
                        v = c(h, n, l),
                        E = s(v),
                        y = g.indexOf(E),
                        $ = b[y] || {};
                    return p = h, $.animating = !0, t(function() {
                        o.dimBackground && u.css({
                            backgroundColor: x
                        }), E.addClass("md-ripple-placed md-ripple-scaled"), E.css(o.outline ? {
                            borderWidth: .5 * h + "px",
                            marginLeft: h * -.5 + "px",
                            marginTop: h * -.5 + "px"
                        } : {
                            left: "50%",
                            top: "50%"
                        }), d(E), t(function() {
                            $.animating = !1, d(E)
                        }, o.outline ? 450 : 225, !1)
                    }, 0, !1), E
                }

                function m(e) {
                    u() && (s(e.pointer.x, e.pointer.y), y = !0)
                }

                function c() {
                    y = !1;
                    var e = g[g.length - 1];
                    t(function() {
                        d(e)
                    }, 0, !1)
                }

                function u() {
                    function e(e) {
                        return e && e.hasAttribute && e.hasAttribute("disabled")
                    }
                    var t = M.parentNode,
                        n = t && t.parentNode,
                        a = n && n.parentNode;
                    return !(e(M) || e(t) || e(n) || e(a))
                }
                if (a.controller("mdNoInk")) return angular.noop;
                o = angular.extend({
                    colorElement: a,
                    mousedown: !0,
                    hover: !0,
                    focus: !0,
                    center: !1,
                    mousedownPauseTime: 150,
                    dimBackground: !1,
                    outline: !1,
                    fullRipple: !0,
                    isMenuItem: !1,
                    fitRipple: !1
                }, o);
                var p, h = a.controller("mdInkRipple") || {},
                    f = 0,
                    g = [],
                    b = [],
                    v = a.attr("md-highlight"),
                    E = !1,
                    y = !1,
                    M = a[0],
                    $ = a.attr("md-ripple-size"),
                    x = i(a.attr("md-ink-ripple")) || i(o.colorElement.length && e.getComputedStyle(o.colorElement[0]).color || "rgb(0, 0, 0)");
                switch ($) {
                    case "full":
                        o.fullRipple = !0;
                        break;
                    case "partial":
                        o.fullRipple = !1
                }
                return o.mousedown && a.on("$md.pressdown", m).on("$md.pressup", c), h.createRipple = s, v && n.$watch(v, function(e) {
                        E = e, E && !g.length && t(function() {
                            s(0, 0)
                        }, 0, !1), angular.forEach(g, d)
                    }),
                    function() {
                        a.off("$md.pressdown", m).off("$md.pressup", c), r().remove()
                    }
            }
            return {
                attachButtonBehavior: n,
                attachCheckboxBehavior: a,
                attachTabBehavior: o,
                attachListControlBehavior: r,
                attach: i
            }
        }

        function n() {
            return function() {
                return {
                    controller: angular.noop
                }
            }
        }
        angular.module("material.core").factory("$mdInkRipple", t).directive("mdInkRipple", e).directive("mdNoInk", n()).directive("mdNoBar", n()).directive("mdNoStretch", n()), e.$inject = ["$mdInkRipple"], t.$inject = ["$window", "$timeout"]
    }(),
    function() {
        "use strict";
        angular.module("material.core.theming.palette", []).constant("$mdColorPalette", {
            red: {
                50: "#ffebee",
                100: "#ffcdd2",
                200: "#ef9a9a",
                300: "#e57373",
                400: "#ef5350",
                500: "#f44336",
                600: "#e53935",
                700: "#d32f2f",
                800: "#c62828",
                900: "#b71c1c",
                A100: "#ff8a80",
                A200: "#ff5252",
                A400: "#ff1744",
                A700: "#d50000",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100",
                contrastStrongLightColors: "500 600 700 A200 A400 A700"
            },
            pink: {
                50: "#fce4ec",
                100: "#f8bbd0",
                200: "#f48fb1",
                300: "#f06292",
                400: "#ec407a",
                500: "#e91e63",
                600: "#d81b60",
                700: "#c2185b",
                800: "#ad1457",
                900: "#880e4f",
                A100: "#ff80ab",
                A200: "#ff4081",
                A400: "#f50057",
                A700: "#c51162",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100",
                contrastStrongLightColors: "500 600 A200 A400 A700"
            },
            purple: {
                50: "#f3e5f5",
                100: "#e1bee7",
                200: "#ce93d8",
                300: "#ba68c8",
                400: "#ab47bc",
                500: "#9c27b0",
                600: "#8e24aa",
                700: "#7b1fa2",
                800: "#6a1b9a",
                900: "#4a148c",
                A100: "#ea80fc",
                A200: "#e040fb",
                A400: "#d500f9",
                A700: "#aa00ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200 A400 A700"
            },
            "deep-purple": {
                50: "#ede7f6",
                100: "#d1c4e9",
                200: "#b39ddb",
                300: "#9575cd",
                400: "#7e57c2",
                500: "#673ab7",
                600: "#5e35b1",
                700: "#512da8",
                800: "#4527a0",
                900: "#311b92",
                A100: "#b388ff",
                A200: "#7c4dff",
                A400: "#651fff",
                A700: "#6200ea",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200"
            },
            indigo: {
                50: "#e8eaf6",
                100: "#c5cae9",
                200: "#9fa8da",
                300: "#7986cb",
                400: "#5c6bc0",
                500: "#3f51b5",
                600: "#3949ab",
                700: "#303f9f",
                800: "#283593",
                900: "#1a237e",
                A100: "#8c9eff",
                A200: "#536dfe",
                A400: "#3d5afe",
                A700: "#304ffe",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200 A400"
            },
            blue: {
                50: "#e3f2fd",
                100: "#bbdefb",
                200: "#90caf9",
                300: "#64b5f6",
                400: "#42a5f5",
                500: "#2196f3",
                600: "#1e88e5",
                700: "#1976d2",
                800: "#1565c0",
                900: "#0d47a1",
                A100: "#82b1ff",
                A200: "#448aff",
                A400: "#2979ff",
                A700: "#2962ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "100 200 300 400 A100",
                contrastStrongLightColors: "500 600 700 A200 A400 A700"
            },
            "light-blue": {
                50: "#e1f5fe",
                100: "#b3e5fc",
                200: "#81d4fa",
                300: "#4fc3f7",
                400: "#29b6f6",
                500: "#03a9f4",
                600: "#039be5",
                700: "#0288d1",
                800: "#0277bd",
                900: "#01579b",
                A100: "#80d8ff",
                A200: "#40c4ff",
                A400: "#00b0ff",
                A700: "#0091ea",
                contrastDefaultColor: "dark",
                contrastLightColors: "500 600 700 800 900 A700",
                contrastStrongLightColors: "500 600 700 800 A700"
            },
            cyan: {
                50: "#e0f7fa",
                100: "#b2ebf2",
                200: "#80deea",
                300: "#4dd0e1",
                400: "#26c6da",
                500: "#00bcd4",
                600: "#00acc1",
                700: "#0097a7",
                800: "#00838f",
                900: "#006064",
                A100: "#84ffff",
                A200: "#18ffff",
                A400: "#00e5ff",
                A700: "#00b8d4",
                contrastDefaultColor: "dark",
                contrastLightColors: "500 600 700 800 900",
                contrastStrongLightColors: "500 600 700 800"
            },
            teal: {
                50: "#e0f2f1",
                100: "#b2dfdb",
                200: "#80cbc4",
                300: "#4db6ac",
                400: "#26a69a",
                500: "#009688",
                600: "#00897b",
                700: "#00796b",
                800: "#00695c",
                900: "#004d40",
                A100: "#a7ffeb",
                A200: "#64ffda",
                A400: "#1de9b6",
                A700: "#00bfa5",
                contrastDefaultColor: "dark",
                contrastLightColors: "500 600 700 800 900",
                contrastStrongLightColors: "500 600 700"
            },
            green: {
                50: "#e8f5e9",
                100: "#c8e6c9",
                200: "#a5d6a7",
                300: "#81c784",
                400: "#66bb6a",
                500: "#4caf50",
                600: "#43a047",
                700: "#388e3c",
                800: "#2e7d32",
                900: "#1b5e20",
                A100: "#b9f6ca",
                A200: "#69f0ae",
                A400: "#00e676",
                A700: "#00c853",
                contrastDefaultColor: "dark",
                contrastLightColors: "500 600 700 800 900",
                contrastStrongLightColors: "500 600 700"
            },
            "light-green": {
                50: "#f1f8e9",
                100: "#dcedc8",
                200: "#c5e1a5",
                300: "#aed581",
                400: "#9ccc65",
                500: "#8bc34a",
                600: "#7cb342",
                700: "#689f38",
                800: "#558b2f",
                900: "#33691e",
                A100: "#ccff90",
                A200: "#b2ff59",
                A400: "#76ff03",
                A700: "#64dd17",
                contrastDefaultColor: "dark",
                contrastLightColors: "800 900",
                contrastStrongLightColors: "800 900"
            },
            lime: {
                50: "#f9fbe7",
                100: "#f0f4c3",
                200: "#e6ee9c",
                300: "#dce775",
                400: "#d4e157",
                500: "#cddc39",
                600: "#c0ca33",
                700: "#afb42b",
                800: "#9e9d24",
                900: "#827717",
                A100: "#f4ff81",
                A200: "#eeff41",
                A400: "#c6ff00",
                A700: "#aeea00",
                contrastDefaultColor: "dark",
                contrastLightColors: "900",
                contrastStrongLightColors: "900"
            },
            yellow: {
                50: "#fffde7",
                100: "#fff9c4",
                200: "#fff59d",
                300: "#fff176",
                400: "#ffee58",
                500: "#ffeb3b",
                600: "#fdd835",
                700: "#fbc02d",
                800: "#f9a825",
                900: "#f57f17",
                A100: "#ffff8d",
                A200: "#ffff00",
                A400: "#ffea00",
                A700: "#ffd600",
                contrastDefaultColor: "dark"
            },
            amber: {
                50: "#fff8e1",
                100: "#ffecb3",
                200: "#ffe082",
                300: "#ffd54f",
                400: "#ffca28",
                500: "#ffc107",
                600: "#ffb300",
                700: "#ffa000",
                800: "#ff8f00",
                900: "#ff6f00",
                A100: "#ffe57f",
                A200: "#ffd740",
                A400: "#ffc400",
                A700: "#ffab00",
                contrastDefaultColor: "dark"
            },
            orange: {
                50: "#fff3e0",
                100: "#ffe0b2",
                200: "#ffcc80",
                300: "#ffb74d",
                400: "#ffa726",
                500: "#ff9800",
                600: "#fb8c00",
                700: "#f57c00",
                800: "#ef6c00",
                900: "#e65100",
                A100: "#ffd180",
                A200: "#ffab40",
                A400: "#ff9100",
                A700: "#ff6d00",
                contrastDefaultColor: "dark",
                contrastLightColors: "800 900",
                contrastStrongLightColors: "800 900"
            },
            "deep-orange": {
                50: "#fbe9e7",
                100: "#ffccbc",
                200: "#ffab91",
                300: "#ff8a65",
                400: "#ff7043",
                500: "#ff5722",
                600: "#f4511e",
                700: "#e64a19",
                800: "#d84315",
                900: "#bf360c",
                A100: "#ff9e80",
                A200: "#ff6e40",
                A400: "#ff3d00",
                A700: "#dd2c00",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100 A200",
                contrastStrongLightColors: "500 600 700 800 900 A400 A700"
            },
            brown: {
                50: "#efebe9",
                100: "#d7ccc8",
                200: "#bcaaa4",
                300: "#a1887f",
                400: "#8d6e63",
                500: "#795548",
                600: "#6d4c41",
                700: "#5d4037",
                800: "#4e342e",
                900: "#3e2723",
                A100: "#d7ccc8",
                A200: "#bcaaa4",
                A400: "#8d6e63",
                A700: "#5d4037",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200",
                contrastStrongLightColors: "300 400"
            },
            grey: {
                0: "#ffffff",
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                1000: "#000000",
                A100: "#ffffff",
                A200: "#eeeeee",
                A400: "#bdbdbd",
                A700: "#616161",
                contrastDefaultColor: "dark",
                contrastLightColors: "600 700 800 900"
            },
            "blue-grey": {
                50: "#eceff1",
                100: "#cfd8dc",
                200: "#b0bec5",
                300: "#90a4ae",
                400: "#78909c",
                500: "#607d8b",
                600: "#546e7a",
                700: "#455a64",
                800: "#37474f",
                900: "#263238",
                A100: "#cfd8dc",
                A200: "#b0bec5",
                A400: "#78909c",
                A700: "#455a64",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300",
                contrastStrongLightColors: "400 500"
            }
        })
    }(),
    function() {
        "use strict";

        function e(e) {
            function t(e, t) {
                return t = t || {}, d[e] = o(e, t), g
            }

            function n(e, t) {
                return o(e, angular.extend({}, d[e] || {}, t))
            }

            function o(e, t) {
                var n = $.filter(function(e) {
                    return !t[e]
                });
                if (n.length) throw new Error("Missing colors %1 in palette %2!".replace("%1", n.join(", ")).replace("%2", e));
                return t
            }

            function r(e, t) {
                if (s[e]) return s[e];
                t = t || "default";
                var n = "string" == typeof t ? s[t] : t,
                    a = new i(e);
                return n && angular.forEach(n.colors, function(e, t) {
                    a.colors[t] = {
                        name: e.name,
                        hues: angular.extend({}, e.hues)
                    }
                }), s[e] = a, a
            }

            function i(e) {
                function t(e) {
                    if (e = 0 === arguments.length ? !0 : !!e, e !== n.isDark) {
                        n.isDark = e, n.foregroundPalette = n.isDark ? u : c, n.foregroundShadow = n.isDark ? p : h;
                        var t = n.isDark ? M : y,
                            a = n.isDark ? y : M;
                        return angular.forEach(t, function(e, t) {
                            var o = n.colors[t],
                                r = a[t];
                            if (o)
                                for (var i in o.hues) o.hues[i] === r[i] && (o.hues[i] = e[i])
                        }), n
                    }
                }
                var n = this;
                n.name = e, n.colors = {}, n.dark = t, t(!1), v.forEach(function(e) {
                    var t = (n.isDark ? M : y)[e];
                    n[e + "Palette"] = function(a, o) {
                        var r = n.colors[e] = {
                            name: a,
                            hues: angular.extend({}, t, o)
                        };
                        return Object.keys(r.hues).forEach(function(e) {
                            if (!t[e]) throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1", e).replace("%2", n.name).replace("%3", a).replace("%4", Object.keys(t).join(", ")))
                        }), Object.keys(r.hues).map(function(e) {
                            return r.hues[e]
                        }).forEach(function(t) {
                            if (-1 == $.indexOf(t)) throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1", t).replace("%2", n.name).replace("%3", e).replace("%4", a).replace("%5", $.join(", ")))
                        }), n
                    }, n[e + "Color"] = function() {
                        var t = Array.prototype.slice.call(arguments);
                        return console.warn("$mdThemingProviderTheme." + e + "Color() has been deprecated. Use $mdThemingProviderTheme." + e + "Palette() instead."), n[e + "Palette"].apply(n, t)
                    }
                })
            }

            function f(e, t) {
                function n(e) {
                    return void 0 === e || "" === e ? !0 : void 0 !== a.THEMES[e]
                }

                function a(t, n) {
                    void 0 === n && (n = t, t = void 0), void 0 === t && (t = e), a.inherit(n, n)
                }
                return a.inherit = function(a, o) {
                    function r(e) {
                        n(e) || t.warn("Attempted to use unregistered theme '" + e + "'. Register it with $mdThemingProvider.theme().");
                        var o = a.data("$mdThemeName");
                        o && a.removeClass("md-" + o + "-theme"), a.addClass("md-" + e + "-theme"), a.data("$mdThemeName", e)
                    }
                    var i = o.controller("mdTheme"),
                        l = a.attr("md-theme-watch");
                    if ((E || angular.isDefined(l)) && "false" != l) {
                        var d = e.$watch(function() {
                            return i && i.$mdTheme || b
                        }, r);
                        a.on("$destroy", d)
                    } else {
                        var s = i && i.$mdTheme || b;
                        r(s)
                    }
                }, a.THEMES = angular.extend({}, s), a.defaultTheme = function() {
                    return b
                }, a.registered = n, a
            }
            d = {}, s = {}, m = {};
            var g, b = "default",
                E = !1;
            return angular.extend(d, e), f.$inject = ["$rootScope", "$log"], g = {
                definePalette: t,
                extendPalette: n,
                theme: r,
                setDefaultTheme: function(e) {
                    b = e
                },
                alwaysWatchTheme: function(e) {
                    E = e
                },
                $get: f,
                _LIGHT_DEFAULT_HUES: y,
                _DARK_DEFAULT_HUES: M,
                _PALETTES: d,
                _THEMES: s,
                _parseRules: a,
                _rgba: l
            }
        }

        function t(e, t, n) {
            return {
                priority: 100,
                link: {
                    pre: function(a, o, r) {
                        var i = {
                            $setTheme: function(t) {
                                e.registered(t) || n.warn("attempted to use unregistered theme '" + t + "'"), i.$mdTheme = t
                            }
                        };
                        o.data("$mdThemeController", i), i.$setTheme(t(r.mdTheme)(a)), r.$observe("mdTheme", i.$setTheme)
                    }
                }
            }
        }

        function n(e) {
            return e
        }

        function a(e, t, n) {
            r(e, t), n = n.replace(/THEME_NAME/g, e.name);
            var a = [],
                o = e.colors[t],
                i = new RegExp(".md-" + e.name + "-theme", "g"),
                s = new RegExp("('|\")?{{\\s*(" + t + ")-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}(\"|')?", "g"),
                m = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow)-?(\d\.?\d*)?\s*\}\}'?"?/g,
                c = d[o.name];
            return n = n.replace(m, function(t, n, a, o) {
                return "foreground" === n ? "shadow" == a ? e.foregroundShadow : e.foregroundPalette[a] || e.foregroundPalette[1] : (0 === a.indexOf("hue") && (a = e.colors[n].hues[a]), l((d[e.colors[n].name][a] || "").value, o))
            }), angular.forEach(o.hues, function(t, o) {
                var r = n.replace(s, function(e, n, a, o, r) {
                    return l(c[t]["color" === o ? "value" : "contrast"], r)
                });
                "default" !== o && (r = r.replace(i, ".md-" + e.name + "-theme.md-" + o)), a.push(r)
            }), a
        }

        function o(e) {
            function t(e) {
                var t = e.contrastDefaultColor,
                    n = e.contrastLightColors || [],
                    a = e.contrastStrongLightColors || [],
                    o = e.contrastDarkColors || [];
                "string" == typeof n && (n = n.split(" ")), "string" == typeof a && (a = a.split(" ")), "string" == typeof o && (o = o.split(" ")), delete e.contrastDefaultColor, delete e.contrastLightColors, delete e.contrastStrongLightColors, delete e.contrastDarkColors, angular.forEach(e, function(r, l) {
                    function d() {
                        return "light" === t ? o.indexOf(l) > -1 ? f : a.indexOf(l) > -1 ? b : g : n.indexOf(l) > -1 ? a.indexOf(l) > -1 ? b : g : f
                    }
                    if (!angular.isObject(r)) {
                        var s = i(r);
                        if (!s) throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1", r).replace("%2", e.name).replace("%3", l));
                        e[l] = {
                            value: s,
                            contrast: d()
                        }
                    }
                })
            }
            var n = document.getElementsByTagName("head")[0],
                o = n.firstElementChild,
                r = e.has("$MD_THEME_CSS") ? e.get("$MD_THEME_CSS") : "";
            angular.forEach(d, t);
            var l = {},
                c = r.split(/\}(?!(\}|'|"|;))/).filter(function(e) {
                    return e && e.length
                }).map(function(e) {
                    return e.trim() + "}"
                }),
                u = new RegExp("md-(" + v.join("|") + ")", "g");
            v.forEach(function(e) {
                l[e] = ""
            }), c.forEach(function(e) {
                for (var t, n = (e.match(u), 0); t = v[n]; n++)
                    if (e.indexOf(".md-" + t) > -1) return l[t] += e;
                for (n = 0; t = v[n]; n++)
                    if (e.indexOf(t) > -1) return l[t] += e;
                return l[E] += e
            }), angular.forEach(s, function(e) {
                m[e.name] || (v.forEach(function(t) {
                    for (var r = a(e, t, l[t]); r.length;) {
                        var i = document.createElement("style");
                        i.setAttribute("type", "text/css"), i.appendChild(document.createTextNode(r.shift())), n.insertBefore(i, o)
                    }
                }), e.colors.primary.name == e.colors.accent.name && console.warn("$mdThemingProvider: Using the same palette for primary and accent. This violates the material design spec."), m[e.name] = !0)
            })
        }

        function r(e, t) {
            if (!d[(e.colors[t] || {}).name]) throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1", e.name).replace("%2", t).replace("%3", Object.keys(d).join(", ")))
        }

        function i(e) {
            if (angular.isArray(e) && 3 == e.length) return e;
            if (/^rgb/.test(e)) return e.replace(/(^\s*rgba?\(|\)\s*$)/g, "").split(",").map(function(e, t) {
                return 3 == t ? parseFloat(e, 10) : parseInt(e, 10)
            });
            if ("#" == e.charAt(0) && (e = e.substring(1)), /^([a-fA-F0-9]{3}){1,2}$/g.test(e)) {
                var t = e.length / 3,
                    n = e.substr(0, t),
                    a = e.substr(t, t),
                    o = e.substr(2 * t);
                return 1 === t && (n += n, a += a, o += o), [parseInt(n, 16), parseInt(a, 16), parseInt(o, 16)]
            }
        }

        function l(e, t) {
            return 4 == e.length && (e = angular.copy(e), t ? e.pop() : t = e.pop()), t && ("number" == typeof t || "string" == typeof t && t.length) ? "rgba(" + e.join(",") + "," + t + ")" : "rgb(" + e.join(",") + ")"
        }
        angular.module("material.core.theming", ["material.core.theming.palette"]).directive("mdTheme", t).directive("mdThemable", n).provider("$mdTheming", e).run(o);
        var d, s, m, c = {
                name: "dark",
                1: "rgba(0,0,0,0.87)",
                2: "rgba(0,0,0,0.54)",
                3: "rgba(0,0,0,0.26)",
                4: "rgba(0,0,0,0.12)"
            },
            u = {
                name: "light",
                1: "rgba(255,255,255,1.0)",
                2: "rgba(255,255,255,0.7)",
                3: "rgba(255,255,255,0.3)",
                4: "rgba(255,255,255,0.12)"
            },
            p = "1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)",
            h = "",
            f = i("rgba(0,0,0,0.87)"),
            g = i("rgba(255,255,255,0.87"),
            b = i("rgb(255,255,255)"),
            v = ["primary", "accent", "warn", "background"],
            E = "primary",
            y = {
                accent: {
                    "default": "A200",
                    "hue-1": "A100",
                    "hue-2": "A400",
                    "hue-3": "A700"
                },
                background: {
                    "default": "A100",
                    "hue-1": "300",
                    "hue-2": "800",
                    "hue-3": "900"
                }
            },
            M = {
                background: {
                    "default": "800",
                    "hue-1": "300",
                    "hue-2": "600",
                    "hue-3": "900"
                }
            };
        v.forEach(function(e) {
            var t = {
                "default": "500",
                "hue-1": "300",
                "hue-2": "800",
                "hue-3": "A100"
            };
            y[e] || (y[e] = t), M[e] || (M[e] = t)
        });
        var $ = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700"];
        e.$inject = ["$mdColorPalette"], t.$inject = ["$mdTheming", "$interpolate", "$log"], n.$inject = ["$mdTheming"], o.$inject = ["$injector"]
    }(),
    function() {
        "use strict";
        angular.module("material.components.autocomplete", ["material.core", "material.components.icon"])
    }(),
    function() {
        "use strict";

        function e(e) {
            return e
        }
        angular.module("material.components.backdrop", ["material.core"]).directive("mdBackdrop", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E"
            }
        }

        function t(e) {
            function t(e, t, o, r, i, l, d, s, m) {
                function c(n, a, m) {
                    a = o.extractElementByName(a, "md-bottom-sheet"), h = i('<md-backdrop class="md-opaque md-bottom-sheet-backdrop">')(n), h.on("click", function() {
                        r(d.cancel)
                    }), l.inherit(h, m.parent), e.enter(h, m.parent, null);
                    var c = new p(a, m.parent);
                    return m.bottomSheet = c, m.targetEvent && angular.element(m.targetEvent.target).blur(), l.inherit(c.element, m.parent), m.disableParentScroll && (m.lastOverflow = m.parent.css("overflow"), m.parent.css("overflow", "hidden")), e.enter(c.element, m.parent).then(function() {
                        var e = angular.element(a[0].querySelector("button") || a[0].querySelector("a") || a[0].querySelector("[ng-click]"));
                        e.focus(), m.escapeToClose && (m.rootElementKeyupCallback = function(e) {
                            e.keyCode === t.KEY_CODE.ESCAPE && r(d.cancel)
                        }, s.on("keyup", m.rootElementKeyupCallback))
                    })
                }

                function u(t, n, a) {
                    var o = a.bottomSheet;
                    return e.leave(h), e.leave(o.element).then(function() {
                        a.disableParentScroll && (a.parent.css("overflow", a.lastOverflow), delete a.lastOverflow), o.cleanup(), a.targetEvent && angular.element(a.targetEvent.target).focus()
                    })
                }

                function p(e, o) {
                    function i(n) {
                        e.css(t.CSS.TRANSITION_DURATION, "0ms")
                    }

                    function l(n) {
                        var o = n.pointer.distanceY;
                        5 > o && (o = Math.max(-a, o / 2)), e.css(t.CSS.TRANSFORM, "translate3d(0," + (a + o) + "px,0)")
                    }

                    function s(a) {
                        if (a.pointer.distanceY > 0 && (a.pointer.distanceY > 20 || Math.abs(a.pointer.velocityY) > n)) {
                            var o = e.prop("offsetHeight") - a.pointer.distanceY,
                                i = Math.min(o / a.pointer.velocityY * .75, 500);
                            e.css(t.CSS.TRANSITION_DURATION, i + "ms"), r(d.cancel)
                        } else e.css(t.CSS.TRANSITION_DURATION, ""), e.css(t.CSS.TRANSFORM, "")
                    }
                    var c = m.register(o, "drag", {
                        horizontal: !1
                    });
                    return o.on("$md.dragstart", i).on("$md.drag", l).on("$md.dragend", s), {
                        element: e,
                        cleanup: function() {
                            c(), o.off("$md.dragstart", i).off("$md.drag", l).off("$md.dragend", s)
                        }
                    }
                }
                var h;
                return {
                    themable: !0,
                    targetEvent: null,
                    onShow: c,
                    onRemove: u,
                    escapeToClose: !0,
                    disableParentScroll: !0
                }
            }
            var n = .5,
                a = 80;
            return t.$inject = ["$animate", "$mdConstant", "$mdUtil", "$timeout", "$compile", "$mdTheming", "$mdBottomSheet", "$rootElement", "$mdGesture"], e("$mdBottomSheet").setDefaults({
                methods: ["disableParentScroll", "escapeToClose", "targetEvent"],
                options: t
            })
        }
        angular.module("material.components.bottomSheet", ["material.core", "material.components.backdrop"]).directive("mdBottomSheet", e).provider("$mdBottomSheet", t), t.$inject = ["$$interimElementProvider"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a) {
            function o(e) {
                return angular.isDefined(e.href) || angular.isDefined(e.ngHref) || angular.isDefined(e.uiSref)
            }

            function r(e, t) {
                return o(t) ? '<a class="md-button" ng-transclude></a>' : '<button class="md-button" ng-transclude></button>'
            }

            function i(r, i, l) {
                var d = i[0];
                t(i), e.attachButtonBehavior(r, i);
                var s = d.textContent.trim();
                s || n.expect(i, "aria-label"), o(l) && angular.isDefined(l.ngDisabled) && r.$watch(l.ngDisabled, function(e) {
                    i.attr("tabindex", e ? -1 : 0)
                }), r.mouseActive = !1, i.on("mousedown", function() {
                    r.mouseActive = !0, a(function() {
                        r.mouseActive = !1
                    }, 100)
                }).on("focus", function() {
                    r.mouseActive === !1 && i.addClass("md-focused")
                }).on("blur", function() {
                    i.removeClass("md-focused")
                })
            }
            return {
                restrict: "EA",
                replace: !0,
                transclude: !0,
                template: r,
                link: i
            }
        }
        angular.module("material.components.button", ["material.core"]).directive("mdButton", e), e.$inject = ["$mdInkRipple", "$mdTheming", "$mdAria", "$timeout"]
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "E",
                link: function(t, n, a) {
                    e(n)
                }
            }
        }
        angular.module("material.components.card", ["material.core"]).directive("mdCard", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r, i) {
            function l(t, l) {
                return l.type = "checkbox", l.tabindex = l.tabindex || "0", t.attr("role", l.type),
                    function(t, l, s, m) {
                        function c(e, n, a) {
                            s[e] && t.$watch(s[e], function(e) {
                                a[e] && l.attr(n, a[e])
                            })
                        }

                        function u(e) {
                            var t = e.which || e.keyCode;
                            (t === a.KEY_CODE.SPACE || t === a.KEY_CODE.ENTER) && (e.preventDefault(), l.hasClass("md-focused") || l.addClass("md-focused"), p(e))
                        }

                        function p(e) {
                            l[0].hasAttribute("disabled") || t.$apply(function() {
                                var t = s.ngChecked ? s.checked : !m.$viewValue;
                                m.$setViewValue(t, e && e.type), m.$render()
                            })
                        }

                        function h() {
                            m.$viewValue ? l.addClass(d) : l.removeClass(d)
                        }
                        m = m || r.fakeNgModel(), o(l), s.ngChecked && t.$watch(t.$eval.bind(t, s.ngChecked), m.$setViewValue.bind(m)), c("ngDisabled", "tabindex", {
                            "true": "-1",
                            "false": s.tabindex
                        }), n.expectWithText(l, "aria-label"), e.link.pre(t, {
                            on: angular.noop,
                            0: {}
                        }, s, [m]), t.mouseActive = !1, l.on("click", p).on("keypress", u).on("mousedown", function() {
                            t.mouseActive = !0, i(function() {
                                t.mouseActive = !1
                            }, 100)
                        }).on("focus", function() {
                            t.mouseActive === !1 && l.addClass("md-focused")
                        }).on("blur", function() {
                            l.removeClass("md-focused")
                        }), m.$render = h
                    }
            }
            e = e[0];
            var d = "md-checked";
            return {
                restrict: "E",
                transclude: !0,
                require: "?ngModel",
                template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',
                compile: l
            }
        }
        angular.module("material.components.checkbox", ["material.core"]).directive("mdCheckbox", e), e.$inject = ["inputDirective", "$mdInkRipple", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil", "$timeout"]
    }(),
    function() {
        "use strict";
        angular.module("material.components.chips", ["material.core", "material.components.autocomplete"])
    }(),
    function() {
        "use strict";

        function e(e) {
            function n(e, t) {
                this.$scope = e, this.$element = t
            }
            return {
                restrict: "E",
                controller: ["$scope", "$element", n],
                link: function(n, a, o) {
                    a[0];
                    e(a), n.$broadcast("$mdContentLoaded", a), t(a[0])
                }
            }
        }

        function t(e) {
            angular.element(e).on("$md.pressdown", function(t) {
                "t" === t.pointer.type && (t.$materialScrollFixed || (t.$materialScrollFixed = !0, 0 === e.scrollTop ? e.scrollTop = 1 : e.scrollHeight === e.scrollTop + e.offsetHeight && (e.scrollTop -= 1)))
            })
        }
        angular.module("material.components.content", ["material.core"]).directive("mdContent", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            return {
                restrict: "E",
                link: function(n, a, o) {
                    t(a), e(function() {
                        var e = a[0].querySelector("md-content");
                        e && e.scrollHeight > e.clientHeight && a.addClass("md-content-overflow")
                    })
                }
            }
        }

        function t(e) {
            function t(e, t) {
                return {
                    template: ['<md-dialog md-theme="{{ dialog.theme }}" aria-label="{{ dialog.ariaLabel }}">', '<md-content role="document" tabIndex="0">', '<h2 class="md-title">{{ dialog.title }}</h2>', "<p>{{ dialog.content }}</p>", "</md-content>", '<div class="md-actions">', '<md-button ng-if="dialog.$type == \'confirm\'" ng-click="dialog.abort()">', "{{ dialog.cancel }}", "</md-button>", '<md-button ng-click="dialog.hide()" class="md-primary">', "{{ dialog.ok }}", "</md-button>", "</div>", "</md-dialog>"].join(""),
                    controller: function() {
                        this.hide = function() {
                            e.hide(!0)
                        }, this.abort = function() {
                            e.cancel()
                        }
                    },
                    controllerAs: "dialog",
                    bindToController: !0,
                    theme: t.defaultTheme()
                }
            }

            function n(e, t, n, a, o, r, i, l, d, s, m) {
                function c(e) {
                    var t = document.querySelector("md-dialog");
                    t && !t.contains(e.target) && (e.stopImmediatePropagation(), t.focus())
                }

                function u(e, s, m) {
                    function u() {
                        var e = s[0].querySelector(".dialog-close");
                        if (!e) {
                            var t = s[0].querySelectorAll(".md-actions button");
                            e = t[t.length - 1]
                        }
                        return angular.element(e)
                    }
                    s = n.extractElementByName(s, "md-dialog"), m.parent = angular.element(m.parent), m.popInTarget = angular.element((m.targetEvent || {}).target);
                    var p = u();
                    if (m.hasBackdrop) {
                        var f = m.parent[0] == t[0].body && t[0].documentElement && t[0].documentElement.scrollTop ? angular.element(t[0].documentElement) : m.parent,
                            v = f.prop("scrollTop");
                        m.backdrop = angular.element('<md-backdrop class="md-dialog-backdrop md-opaque">'), m.backdrop.css("top", v + "px"), o.inherit(m.backdrop, m.parent), d.enter(m.backdrop, m.parent), s.css("top", v + "px")
                    }
                    var E = "dialog",
                        y = p;
                    return "alert" === m.$type && (E = "alertdialog", y = s.find("md-content")), h(s.find("md-dialog"), E, m), document.addEventListener("focus", c, !0), m.disableParentScroll && (m.lastOverflow = m.parent.css("overflow"), m.parent.css("overflow", "hidden")), b(s, m.parent, m.popInTarget && m.popInTarget.length && m.popInTarget).then(function() {
                        g(s, !0), m.escapeToClose && (m.rootElementKeyupCallback = function(e) {
                            e.keyCode === a.KEY_CODE.ESCAPE && i(r.cancel)
                        }, l.on("keyup", m.rootElementKeyupCallback)), m.clickOutsideToClose && (m.dialogClickOutsideCallback = function(e) {
                            e.target === s[0] && i(r.cancel)
                        }, s.on("click", m.dialogClickOutsideCallback)), m.focusOnOpen && y.focus()
                    })
                }

                function p(e, t, n) {
                    return n.backdrop && d.leave(n.backdrop), n.disableParentScroll && (n.parent.css("overflow", n.lastOverflow), delete n.lastOverflow), n.escapeToClose && l.off("keyup", n.rootElementKeyupCallback), n.clickOutsideToClose && t.off("click", n.dialogClickOutsideCallback), g(t, !1), document.removeEventListener("focus", c, !0), v(t, n.parent, n.popInTarget && n.popInTarget.length && n.popInTarget).then(function() {
                        n.scope.$destroy(), t.remove(), n.popInTarget && n.popInTarget.focus()
                    })
                }

                function h(t, a, o) {
                    t.attr({
                        role: a,
                        tabIndex: "-1"
                    });
                    var r = t.find("md-content");
                    0 === r.length && (r = t);
                    var i = t.attr("id") || "dialog_" + n.nextUid();
                    r.attr("id", i), t.attr("aria-describedby", i), o.ariaLabel ? e.expect(t, "aria-label", o.ariaLabel) : e.expectAsync(t, "aria-label", function() {
                        var e = r.text().split(/\s+/);
                        return e.length > 3 && (e = e.slice(0, 3).concat("...")), e.join(" ")
                    })
                }

                function f(e, t) {
                    return -1 !== t.indexOf(e.nodeName) ? !0 : void 0
                }

                function g(e, t) {
                    function n(e) {
                        for (; e.parentNode;) {
                            if (e === document.body) return;
                            for (var o = e.parentNode.children, r = 0; r < o.length; r++) e === o[r] || f(o[r], ["SCRIPT", "STYLE"]) || o[r].setAttribute(a, t);
                            n(e = e.parentNode)
                        }
                    }
                    var a = "aria-hidden";
                    e = e[0], n(e)
                }

                function b(e, t, o) {
                    var r = e.find("md-dialog");
                    return t.append(e), E(r, o), s(function() {
                        r.addClass("transition-in").css(a.CSS.TRANSFORM, "")
                    }), n.transitionEndPromise(r)
                }

                function v(e, t, a) {
                    var o = e.find("md-dialog");
                    return o.addClass("transition-out").removeClass("transition-in"), E(o, a), n.transitionEndPromise(o)
                }

                function E(e, t) {
                    if (t) {
                        var n = t[0].getBoundingClientRect(),
                            o = e[0].getBoundingClientRect(),
                            r = Math.min(.5, n.width / o.width),
                            i = Math.min(.5, n.height / o.height);
                        e.css(a.CSS.TRANSFORM, "translate3d(" + (-o.left + n.left + n.width / 2 - o.width / 2) + "px," + (-o.top + n.top + n.height / 2 - o.height / 2) + "px,0) scale(" + r + "," + i + ")")
                    }
                }
                return {
                    hasBackdrop: !0,
                    isolateScope: !0,
                    onShow: u,
                    onRemove: p,
                    clickOutsideToClose: !1,
                    escapeToClose: !0,
                    targetEvent: null,
                    focusOnOpen: !0,
                    disableParentScroll: !0,
                    transformTemplate: function(e) {
                        return '<div class="md-dialog-container">' + e + "</div>"
                    }
                }
            }
            return t.$inject = ["$mdDialog", "$mdTheming"], n.$inject = ["$mdAria", "$document", "$mdUtil", "$mdConstant", "$mdTheming", "$mdDialog", "$timeout", "$rootElement", "$animate", "$$rAF", "$q"], e("$mdDialog").setDefaults({
                methods: ["disableParentScroll", "hasBackdrop", "clickOutsideToClose", "escapeToClose", "targetEvent", "parent"],
                options: n
            }).addPreset("alert", {
                methods: ["title", "content", "ariaLabel", "ok", "theme"],
                options: t
            }).addPreset("confirm", {
                methods: ["title", "content", "ariaLabel", "ok", "cancel", "theme"],
                options: t
            })
        }
        angular.module("material.components.dialog", ["material.core", "material.components.backdrop"]).directive("mdDialog", e).provider("$mdDialog", t), e.$inject = ["$$rAF", "$mdTheming"], t.$inject = ["$$interimElementProvider"]
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "E",
                link: e
            }
        }
        angular.module("material.components.divider", ["material.core"]).directive("mdDivider", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, n, a, o) {
            function r(t, r, i, l) {
                function d() {
                    for (var e in n.MEDIA) o(e), o.getQuery(n.MEDIA[e]).addListener($);
                    return o.watchResponsiveAttributes(["md-cols", "md-row-height"], i, m)
                }

                function s() {
                    x();
                    for (var e in n.MEDIA) o.getQuery(n.MEDIA[e]).removeListener($)
                }

                function m(e) {
                    null == e ? l.invalidateLayout() : o(e) && l.invalidateLayout()
                }

                function c(e) {
                    var n = {
                        tileSpans: g(),
                        colCount: b(),
                        rowMode: y(),
                        rowHeight: E(),
                        gutter: v()
                    };
                    if (e || !angular.equals(n, T)) {
                        var o = f(),
                            i = a(n.colCount, n.tileSpans, o).map(function(e, t) {
                                return {
                                    grid: {
                                        element: r,
                                        style: h(n.colCount, t, n.gutter, n.rowMode, n.rowHeight)
                                    },
                                    tiles: e.map(function(e, t) {
                                        return {
                                            element: angular.element(o[t]),
                                            style: p(e.position, e.spans, n.colCount, n.rowCount, n.gutter, n.rowMode, n.rowHeight)
                                        }
                                    })
                                }
                            }).reflow().performance();
                        t.mdOnLayout({
                            $event: {
                                performance: i
                            }
                        }), T = n
                    }
                }

                function u(e) {
                    return C + e + A
                }

                function p(e, t, n, a, o, r, i) {
                    var l = 1 / n * 100,
                        d = (n - 1) / n,
                        s = w({
                            share: l,
                            gutterShare: d,
                            gutter: o
                        }),
                        m = {
                            left: k({
                                unit: s,
                                offset: e.col,
                                gutter: o
                            }),
                            width: N({
                                unit: s,
                                span: t.col,
                                gutter: o
                            }),
                            paddingTop: "",
                            marginTop: "",
                            top: "",
                            height: ""
                        };
                    switch (r) {
                        case "fixed":
                            m.top = k({
                                unit: i,
                                offset: e.row,
                                gutter: o
                            }), m.height = N({
                                unit: i,
                                span: t.row,
                                gutter: o
                            });
                            break;
                        case "ratio":
                            var c = l / i,
                                u = w({
                                    share: c,
                                    gutterShare: d,
                                    gutter: o
                                });
                            m.paddingTop = N({
                                unit: u,
                                span: t.row,
                                gutter: o
                            }), m.marginTop = k({
                                unit: u,
                                offset: e.row,
                                gutter: o
                            });
                            break;
                        case "fit":
                            var p = (a - 1) / a,
                                c = 1 / a * 100,
                                u = w({
                                    share: c,
                                    gutterShare: p,
                                    gutter: o
                                });
                            m.top = k({
                                unit: u,
                                offset: e.row,
                                gutter: o
                            }), m.height = N({
                                unit: u,
                                span: t.row,
                                gutter: o
                            })
                    }
                    return m
                }

                function h(e, t, n, a, o) {
                    var r = {
                        height: "",
                        paddingBottom: ""
                    };
                    switch (a) {
                        case "fixed":
                            r.height = N({
                                unit: o,
                                span: t,
                                gutter: n
                            });
                            break;
                        case "ratio":
                            var i = 1 === e ? 0 : (e - 1) / e,
                                l = 1 / e * 100,
                                d = l * (1 / o),
                                s = w({
                                    share: d,
                                    gutterShare: i,
                                    gutter: n
                                });
                            r.paddingBottom = N({
                                unit: s,
                                span: t,
                                gutter: n
                            });
                            break;
                        case "fit":
                    }
                    return r
                }

                function f() {
                    return l.tiles.map(function(e) {
                        return e.element
                    })
                }

                function g() {
                    return l.tiles.map(function(e) {
                        return {
                            row: parseInt(o.getResponsiveAttribute(e.attrs, "md-rowspan"), 10) || 1,
                            col: parseInt(o.getResponsiveAttribute(e.attrs, "md-colspan"), 10) || 1
                        }
                    })
                }

                function b() {
                    var e = parseInt(o.getResponsiveAttribute(i, "md-cols"), 10);
                    if (isNaN(e)) throw "md-grid-list: md-cols attribute was not found, or contained a non-numeric value";
                    return e
                }

                function v() {
                    return M(o.getResponsiveAttribute(i, "md-gutter") || 1)
                }

                function E() {
                    var e = o.getResponsiveAttribute(i, "md-row-height");
                    switch (y()) {
                        case "fixed":
                            return M(e);
                        case "ratio":
                            var t = e.split(":");
                            return parseFloat(t[0]) / parseFloat(t[1]);
                        case "fit":
                            return 0
                    }
                }

                function y() {
                    var e = o.getResponsiveAttribute(i, "md-row-height");
                    return "fit" == e ? "fit" : -1 !== e.indexOf(":") ? "ratio" : "fixed"
                }

                function M(e) {
                    return /\D$/.test(e) ? e : e + "px"
                }
                r.attr("role", "list"), l.layoutDelegate = c;
                var $ = angular.bind(l, l.invalidateLayout),
                    x = d();
                t.$on("$destroy", s);
                var T, C = e.startSymbol(),
                    A = e.endSymbol(),
                    w = e(u("share") + "% - (" + u("gutter") + " * " + u("gutterShare") + ")"),
                    k = e("calc((" + u("unit") + " + " + u("gutter") + ") * " + u("offset") + ")"),
                    N = e("calc((" + u("unit") + ") * " + u("span") + " + (" + u("span") + " - 1) * " + u("gutter") + ")")
            }
            return {
                restrict: "E",
                controller: t,
                scope: {
                    mdOnLayout: "&"
                },
                link: r
            }
        }

        function t(e) {
            this.invalidated = !1, this.tilesAdded = !1, this.$timeout_ = e, this.tiles = [], this.layoutDelegate = angular.noop
        }

        function n(e) {
            function t(t, n) {
                var r, i, l, d, s, m;
                return d = e.time(function() {
                    i = a(t, n)
                }), r = {
                    layoutInfo: function() {
                        return i
                    },
                    map: function(t) {
                        return s = e.time(function() {
                            var e = r.layoutInfo();
                            l = t(e.positioning, e.rowCount)
                        }), r
                    },
                    reflow: function(t) {
                        return m = e.time(function() {
                            var e = t || o;
                            e(l.grid, l.tiles)
                        }), r
                    },
                    performance: function() {
                        return {
                            tileCount: n.length,
                            layoutTime: d,
                            mapTime: s,
                            reflowTime: m,
                            totalTime: d + s + m
                        }
                    }
                }
            }

            function n(e, t) {
                e.element.css(e.style), t.forEach(function(e) {
                    e.element.css(e.style)
                })
            }

            function a(e, t) {
                function n(t, n) {
                    if (t.col > e) throw "md-grid-list: Tile at position " + n + " has a colspan (" + t.col + ") that exceeds the column count (" + e + ")";
                    for (var i = 0, m = 0; m - i < t.col;) l >= e ? a() : (i = s.indexOf(0, l), -1 !== i && -1 !== (m = r(i + 1)) ? l = m + 1 : (i = m = 0, a()));
                    return o(i, t.col, t.row), l = i + t.col, {
                        col: i,
                        row: d
                    }
                }

                function a() {
                    l = 0, d++, o(0, e, -1)
                }

                function o(e, t, n) {
                    for (var a = e; e + t > a; a++) s[a] = Math.max(s[a] + n, 0)
                }

                function r(e) {
                    var t;
                    for (t = e; t < s.length; t++)
                        if (0 !== s[t]) return t;
                    return t === s.length ? t : void 0
                }

                function i() {
                    for (var t = [], n = 0; e > n; n++) t.push(0);
                    return t
                }
                var l = 0,
                    d = 0,
                    s = i();
                return {
                    positioning: t.map(function(e, t) {
                        return {
                            spans: e,
                            position: n(e, t)
                        }
                    }),
                    rowCount: d + Math.max.apply(Math, s)
                }
            }
            var o = n;
            return t.animateWith = function(e) {
                o = angular.isFunction(e) ? e : n
            }, t
        }

        function a(e) {
            function t(t, n, a, o) {
                n.attr("role", "listitem");
                var r = e.watchResponsiveAttributes(["md-colspan", "md-rowspan"], a, angular.bind(o, o.invalidateLayout));
                o.addTile(n, a, t.$parent.$index), t.$on("$destroy", function() {
                    r(), o.removeTile(n, a)
                }), angular.isDefined(t.$parent.$index) && t.$watch(function() {
                    return t.$parent.$index
                }, function(e, t) {
                    o.removeTile(n, a), o.addTile(n, a, e)
                })
            }
            return {
                restrict: "E",
                require: "^mdGridList",
                template: "<figure ng-transclude></figure>",
                transclude: !0,
                scope: {},
                link: t
            }
        }

        function o() {
            return {
                template: "<figcaption ng-transclude></figcaption>",
                transclude: !0
            }
        }
        angular.module("material.components.gridList", ["material.core"]).directive("mdGridList", e).directive("mdGridTile", a).directive("mdGridTileFooter", o).directive("mdGridTileHeader", o).factory("$mdGridLayout", n), e.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia"], t.$inject = ["$timeout"], t.prototype = {
            addTile: function(e, t, n) {
                var a = {
                    element: e,
                    attrs: t
                };
                angular.isUndefined(n) ? this.tiles.push(a) : this.tiles.splice(n, 0, a), this.tilesAdded = !0, this.invalidateLayout()
            },
            removeTile: function(e, t) {
                var n = this._findTileIndex(t); - 1 !== n && (this.tiles.splice(n, 1), this.invalidateLayout())
            },
            invalidateLayout: function() {
                this.invalidated || (this.invalidated = !0, this.$timeout_(angular.bind(this, this.layout)))
            },
            layout: function() {
                try {
                    this.layoutDelegate(this.tilesAdded)
                } finally {
                    this.invalidated = !1, this.tilesAdded = !1
                }
            },
            _findTileIndex: function(e) {
                for (var t = 0; t < this.tiles.length; t++)
                    if (this.tiles[t].attrs == e) return t;
                return -1
            }
        }, n.$inject = ["$mdUtil"], a.$inject = ["$mdMedia"]
    }(),
    function() {
        "use strict";

        function e(e, t, n) {
            function a(e, t) {
                return t.mdFontIcon ? '<span class="md-font" ng-class="fontIcon"></span>' : ""
            }

            function o(a, o, r) {
                function i() {
                    var e = o.parent();
                    return e.attr("aria-label") || e.text() ? !0 : e.parent().attr("aria-label") || e.parent().text() ? !0 : !1
                }
                t(o);
                var l = r.alt || a.fontIcon || a.svgIcon,
                    d = r.$normalize(r.$attr.mdSvgIcon || r.$attr.mdSvgSrc || "");
                "" == r.alt || i() ? n.expect(o, "aria-hidden", "true") : (n.expect(o, "aria-label", l), n.expect(o, "role", "img")), d && r.$observe(d, function(t) {
                    o.empty(), t && e(t).then(function(e) {
                        o.append(e)
                    })
                })
            }
            return {
                scope: {
                    fontIcon: "@mdFontIcon",
                    svgIcon: "@mdSvgIcon",
                    svgSrc: "@mdSvgSrc"
                },
                restrict: "E",
                template: a,
                link: o
            }
        }
        angular.module("material.components.icon", ["material.core"]).directive("mdIcon", e), e.$inject = ["$mdIcon", "$mdTheming", "$mdAria"]
    }(),
    function() {
        "use strict";

        function e() {}

        function t(e, t) {
            this.url = e, this.iconSize = t || a.defaultIconSize
        }

        function n(e, t, n, a, o) {
            function r(t) {
                return function(n) {
                    return f[t] = c(n) ? n : new u(n, e[t]), f[t].clone()
                }
            }

            function i(t) {
                var a = e[t];
                return a ? d(a.url).then(function(e) {
                    return new u(e, a)
                }) : n.reject(t)
            }

            function l(t) {
                function a(e) {
                    var a = t.slice(t.lastIndexOf(":") + 1),
                        o = e.querySelector("#" + a);
                    return o ? new u(o, r) : n.reject(t)
                }
                var o = t.substring(0, t.lastIndexOf(":")) || "$default",
                    r = e[o];
                return r ? d(r.url).then(a) : n.reject(t)
            }

            function d(e) {
                return t.get(e, {
                    cache: o
                }).then(function(e) {
                    return angular.element("<div>").append(e.data).find("svg")[0]
                })
            }

            function s(e) {
                var t;
                return angular.isString(e) && (t = "icon " + e + " not found", a.warn(t)), n.reject(t || e)
            }

            function m(e) {
                var t = angular.isString(e) ? e : e.message || e.data || e.statusText;
                return a.warn(t), n.reject(t)
            }

            function c(e) {
                return angular.isDefined(e.element) && angular.isDefined(e.config)
            }

            function u(e, t) {
                "svg" != e.tagName && (e = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(e)[0]), e.getAttribute("xmlns") || e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.element = e, this.config = t, this.prepare()
            }

            function p() {
                var t = this.config ? this.config.iconSize : e.defaultIconSize;
                angular.forEach({
                    fit: "",
                    height: "100%",
                    width: "100%",
                    preserveAspectRatio: "xMidYMid meet",
                    viewBox: this.element.getAttribute("viewBox") || "0 0 " + t + " " + t
                }, function(e, t) {
                    this.element.setAttribute(t, e)
                }, this), angular.forEach({
                    "pointer-events": "none",
                    display: "block"
                }, function(e, t) {
                    this.element.style[t] = e
                }, this)
            }

            function h() {
                return this.element.cloneNode(!0)
            }
            var f = {},
                g = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
            return u.prototype = {
                    clone: h,
                    prepare: p
                },
                function(e) {
                    return e = e || "", f[e] ? n.when(f[e].clone()) : g.test(e) ? d(e).then(r(e)) : (-1 == e.indexOf(":") && (e = "$default:" + e), i(e)["catch"](l)["catch"](s)["catch"](m).then(r(e)))
                }
        }
        angular.module("material.components.icon").provider("$mdIcon", e);
        var a = {
            defaultIconSize: 24
        };
        e.prototype = {
            icon: function(e, n, o) {
                return -1 == e.indexOf(":") && (e = "$default:" + e), a[e] = new t(n, o), this
            },
            iconSet: function(e, n, o) {
                return a[e] = new t(n, o), this
            },
            defaultIconSet: function(e, n) {
                var o = "$default";
                return a[o] || (a[o] = new t(e, n)), a[o].iconSize = n || a.defaultIconSize, this
            },
            defaultIconSize: function(e) {
                return a.defaultIconSize = e, this
            },
            preloadIcons: function(e) {
                var t = this,
                    n = [{
                        id: "tabs-arrow",
                        url: "tabs-arrow.svg",
                        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><polygon points="15.4,7.4 14,6 8,12 14,18 15.4,16.6 10.8,12 "/></g></svg>'
                    }, {
                        id: "close",
                        url: "close.svg",
                        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/></g></svg>'
                    }, {
                        id: "cancel",
                        url: "cancel.svg",
                        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><path d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm5 13.59l-1.41 1.41-3.59-3.59-3.59 3.59-1.41-1.41 3.59-3.59-3.59-3.59 1.41-1.41 3.59 3.59 3.59-3.59 1.41 1.41-3.59 3.59 3.59 3.59z"/></g></svg>'
                    }, {
                        id: "menu",
                        url: "menu.svg",
                        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><path d="M 50 0 L 100 14 L 92 80 L 50 100 L 8 80 L 0 14 Z" fill="#b2b2b2"></path><path d="M 50 5 L 6 18 L 13.5 77 L 50 94 Z" fill="#E42939"></path><path d="M 50 5 L 94 18 L 86.5 77 L 50 94 Z" fill="#B72833"></path><path d="M 50 7 L 83 75 L 72 75 L 65 59 L 50 59 L 50 50 L 61 50 L 50 26 Z" fill="#b2b2b2"></path><path d="M 50 7 L 17 75 L 28 75 L 35 59 L 50 59 L 50 50 L 39 50 L 50 26 Z" fill="#fff"></path></svg>'
                    }, {
                        id: "toggle-arrow",
                        url: "toggle-arrow-svg",
                        svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 48 48"><path d="M24 16l-12 12 2.83 2.83 9.17-9.17 9.17 9.17 2.83-2.83z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>'
                    }];
                n.forEach(function(n) {
                    t.icon(n.id, n.url), e.put(n.url, n.svg)
                })
            },
            $get: ["$http", "$q", "$log", "$templateCache", function(e, t, o, r) {
                return this.preloadIcons(r), new n(a, e, t, o, r)
            }]
        }
    }(),
    function() {
        function e(e, t) {
            function n(t, n, a) {
                e(n)
            }

            function a(e, n, a) {
                var o = this;
                o.isErrorGetter = a.mdIsError && t(a.mdIsError), o.delegateClick = function() {
                    o.input.focus()
                }, o.element = n, o.setFocused = function(e) {
                    n.toggleClass("md-input-focused", !!e)
                }, o.setHasValue = function(e) {
                    n.toggleClass("md-input-has-value", !!e)
                }, o.setInvalid = function(e) {
                    n.toggleClass("md-input-invalid", !!e)
                }, e.$watch(function() {
                    return o.label && o.input
                }, function(e) {
                    e && !o.label.attr("for") && o.label.attr("for", o.input.attr("id"))
                })
            }
            return a.$inject = ["$scope", "$element", "$attrs"], {
                restrict: "E",
                link: n,
                controller: a
            }
        }

        function t() {
            return {
                restrict: "E",
                require: "^?mdInputContainer",
                link: function(e, t, n, a) {
                    a && !n.mdNoFloat && (a.label = t, e.$on("$destroy", function() {
                        a.label = null
                    }))
                }
            }
        }

        function n(e, t) {
            function n(n, a, o, r) {
                function i(e) {
                    return s.setHasValue(!m.$isEmpty(e)), e
                }

                function l() {
                    s.setHasValue(a.val().length > 0 || (a[0].validity || {}).badInput)
                }

                function d() {
                    function o(e) {
                        return s(), e
                    }

                    function r() {
                        d.style.height = "auto", d.scrollTop = 0;
                        var e = i();
                        e && (d.style.height = e + "px")
                    }

                    function i() {
                        var e = d.scrollHeight - d.offsetHeight;
                        return d.offsetHeight + (e > 0 ? e : 0)
                    }

                    function l(e) {
                        d.scrollTop = 0;
                        var t = d.scrollHeight - d.offsetHeight,
                            n = d.offsetHeight + t;
                        d.style.height = n + "px"
                    }
                    var d = a[0],
                        s = e.debounce(r, 1);
                    m ? (m.$formatters.push(o), m.$viewChangeListeners.push(o)) : s(), a.on("keydown input", s), a.on("scroll", l), angular.element(t).on("resize", s), n.$on("$destroy", function() {
                        angular.element(t).off("resize", s)
                    })
                }
                var s = r[0],
                    m = r[1] || e.fakeNgModel(),
                    c = angular.isDefined(o.readonly);
                if (s) {
                    if (s.input) throw new Error("<md-input-container> can only have *one* <input> or <textarea> child element!");
                    s.input = a, a.addClass("md-input"), a.attr("id") || a.attr("id", "input_" + e.nextUid()), "textarea" === a[0].tagName.toLowerCase() && d();
                    var u = s.isErrorGetter || function() {
                        return m.$invalid && m.$touched
                    };
                    n.$watch(u, s.setInvalid), m.$parsers.push(i), m.$formatters.push(i), a.on("input", l), c || a.on("focus", function(e) {
                        s.setFocused(!0)
                    }).on("blur", function(e) {
                        s.setFocused(!1), l()
                    }), n.$on("$destroy", function() {
                        s.setFocused(!1), s.setHasValue(!1), s.input = null
                    })
                }
            }
            return {
                restrict: "E",
                require: ["^?mdInputContainer", "?ngModel"],
                link: n
            }
        }

        function a(e) {
            function t(t, n, a, o) {
                function r(e) {
                    return s.text((n.val() || e || "").length + "/" + i), e
                }
                var i, l = o[0],
                    d = o[1],
                    s = angular.element('<div class="md-char-counter">');
                a.$set("ngTrim", "false"), d.element.append(s), l.$formatters.push(r), l.$viewChangeListeners.push(r), n.on("input keydown", function() {
                    r()
                }), t.$watch(a.mdMaxlength, function(t) {
                    i = t, angular.isNumber(t) && t > 0 ? (s.parent().length || e.enter(s, d.element, angular.element(d.element[0].lastElementChild)), r()) : e.leave(s)
                }), l.$validators["md-maxlength"] = function(e, t) {
                    return !angular.isNumber(i) || 0 > i ? !0 : (e || n.val() || t || "").length <= i
                }
            }
            return {
                restrict: "A",
                require: ["ngModel", "^mdInputContainer"],
                link: t
            }
        }

        function o() {
            function e(e, t, n, a) {
                if (a && !angular.isDefined(a.element.attr("md-no-float"))) {
                    var o = n.placeholder;
                    t.removeAttr("placeholder");
                    var r = '<div class="md-placeholder" ng-click="delegateClick()">' + o + "</div>";
                    a.element.append(r)
                }
            }
            return {
                restrict: "A",
                require: "^^?mdInputContainer",
                link: e
            }
        }
        angular.module("material.components.input", ["material.core"]).directive("mdInputContainer", e).directive("label", t).directive("input", n).directive("textarea", n).directive("mdMaxlength", a).directive("placeholder", o), e.$inject = ["$mdTheming", "$parse"], n.$inject = ["$mdUtil", "$window"], a.$inject = ["$animate"]
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "E",
                compile: function(t) {
                    return t[0].setAttribute("role", "list"), e
                }
            }
        }

        function t(e, t, n) {
            var a = ["md-checkbox", "md-switch"];
            return {
                restrict: "E",
                controller: "MdListController",
                compile: function(o, r) {
                    function i() {
                        for (var e, t, n = ["md-switch", "md-checkbox"], a = 0; t = n[a]; ++a)
                            if ((e = o.find(t)[0]) && !e.hasAttribute("aria-label")) {
                                var r = o.find("p")[0];
                                if (!r) return;
                                e.setAttribute("aria-label", "Toggle " + r.textContent)
                            }
                    }

                    function l(t) {
                        var n;
                        if ("div" == t ? (n = angular.element('<div class="md-no-style md-list-item-inner">'), n.append(o.contents()), o.addClass("md-proxy-focus")) : (n = angular.element('<md-button class="md-no-style"><div class="md-list-item-inner"></div></md-button>'), n[0].setAttribute("ng-click", o[0].getAttribute("ng-click")), o[0].removeAttribute("ng-click"), n.children().eq(0).append(o.contents())), o[0].setAttribute("tabindex", "-1"), o.append(n), u && u.hasAttribute("ng-click")) {
                            e.expect(u, "aria-label");
                            var a = angular.element('<md-button class="md-secondary-container md-icon-button">');
                            a.attr("ng-click", u.getAttribute("ng-click")), u.removeAttribute("ng-click"), u.setAttribute("tabindex", "-1"), u.classList.remove("md-secondary"), a.append(u), u = a[0]
                        }
                        u && (u.hasAttribute("ng-click") || r.ngClick && d(u)) && (o.addClass("md-with-secondary"), o.append(u))
                    }

                    function d(e) {
                        return -1 != a.indexOf(e.nodeName.toLowerCase())
                    }

                    function s(e, o, r, i) {
                        function l() {
                            var e = o.children();
                            e.length && !e[0].hasAttribute("ng-click") && angular.forEach(a, function(e) {
                                angular.forEach(o[0].firstElementChild.querySelectorAll(e), function(e) {
                                    s.push(e)
                                })
                            })
                        }

                        function d() {
                            (s.length || o[0].firstElementChild.hasAttribute("ng-click")) && (o.addClass("md-clickable"), i.attachRipple(e, angular.element(o[0].querySelector(".md-no-style"))))
                        }
                        var s = [];
                        l(), d(), o.hasClass("md-proxy-focus") && s.length && angular.forEach(s, function(t) {
                            t = angular.element(t), e.mouseActive = !1, t.on("mousedown", function() {
                                e.mouseActive = !0, n(function() {
                                    e.mouseActive = !1
                                }, 100)
                            }).on("focus", function() {
                                e.mouseActive === !1 && o.addClass("md-focused"), t.on("blur", function n() {
                                    o.removeClass("md-focused"), t.off("blur", n)
                                })
                            })
                        }), o[0].firstElementChild.hasAttribute("ng-click") || s.length || o[0].firstElementChild.addEventListener("keypress", function(e) {
                            "INPUT" != e.target.nodeName && e.keyCode == t.KEY_CODE.SPACE && (o[0].firstElementChild.click(), e.preventDefault(), e.stopPropagation())
                        }), o.off("click"), o.off("keypress"), s.length && o.children().eq(0).on("click", function(e) {
                            o[0].firstElementChild.contains(e.target) && angular.forEach(s, function(t) {
                                e.target === t || t.contains(e.target) || angular.element(t).triggerHandler("click")
                            })
                        })
                    }
                    var m, c, u = o[0].querySelector(".md-secondary");
                    if (o[0].setAttribute("role", "listitem"), r.ngClick) l("button");
                    else {
                        for (var p, h = 0; p = a[h]; ++h)
                            if (c = o[0].querySelector(p)) {
                                m = !0;
                                break
                            }
                        m ? l("div") : o.addClass("md-no-proxy")
                    }
                    return i(), s
                }
            }
        }

        function n(e, t, n) {
            function a(e, t) {
                var a = {};
                n.attachListControlBehavior(e, t, a)
            }
            var o = this;
            o.attachRipple = a
        }
        angular.module("material.components.list", ["material.core"]).controller("MdListController", n).directive("mdList", e).directive("mdListItem", t), e.$inject = ["$mdTheming"], t.$inject = ["$mdAria", "$mdConstant", "$timeout"], n.$inject = ["$scope", "$element", "$mdInkRipple"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(e) {
                return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), a
            }

            function a(n, a, r) {
                t(a);
                var i = a[0],
                    l = r.mdDiameter || 48,
                    d = l / 48;
                i.style[e.CSS.TRANSFORM] = "scale(" + d + ")", r.$observe("value", function(e) {
                    var t = o(e);
                    a.attr("aria-valuenow", t)
                })
            }

            function o(e) {
                return Math.max(0, Math.min(e || 0, 100))
            }
            return {
                restrict: "E",
                template: '<div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div>',
                compile: n
            }
        }
        angular.module("material.components.progressCircular", ["material.core"]).directive("mdProgressCircular", e), e.$inject = ["$mdConstant", "$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, n, a) {
            function o(e, t, n) {
                return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), r
            }

            function r(o, r, l) {
                a(r);
                var d = r[0].querySelector(".md-bar1").style,
                    s = r[0].querySelector(".md-bar2").style,
                    m = angular.element(r[0].querySelector(".md-container"));
                l.$observe("value", function(e) {
                    if ("query" != l.mdMode) {
                        var a = i(e);
                        r.attr("aria-valuenow", a), s[n.CSS.TRANSFORM] = t[a]
                    }
                }), l.$observe("mdBufferValue", function(e) {
                    d[n.CSS.TRANSFORM] = t[i(e)]
                }), e(function() {
                    m.addClass("md-ready")
                })
            }

            function i(e) {
                return e > 100 ? 100 : 0 > e ? 0 : Math.ceil(e || 0)
            }
            return {
                restrict: "E",
                template: '<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',
                compile: o
            }
        }
        angular.module("material.components.progressLinear", ["material.core"]).directive("mdProgressLinear", e), e.$inject = ["$$rAF", "$mdConstant", "$mdTheming"];
        var t = function() {
            function e(e) {
                var t = e / 100,
                    n = (e - 100) / 2;
                return "translateX(" + n.toString() + "%) scale(" + t.toString() + ", 1)"
            }
            for (var t = new Array(101), n = 0; 101 > n; n++) t[n] = e(n);
            return t
        }()
    }(),
    function() {
        "use strict";

        function e(e, t, n, a) {
            function o(o, r, i, l) {
                function d() {
                    r.hasClass("md-focused") || r.addClass("md-focused")
                }

                function s(n) {
                    var a = n.which || n.keyCode;
                    switch (a) {
                        case t.KEY_CODE.LEFT_ARROW:
                        case t.KEY_CODE.UP_ARROW:
                            n.preventDefault(), m.selectPrevious(), d();
                            break;
                        case t.KEY_CODE.RIGHT_ARROW:
                        case t.KEY_CODE.DOWN_ARROW:
                            n.preventDefault(), m.selectNext(), d();
                            break;
                        case t.KEY_CODE.ENTER:
                            var o = angular.element(e.getClosest(r[0], "form"));
                            o.length > 0 && o.triggerHandler("submit")
                    }
                }
                n(r);
                var m = l[0],
                    c = l[1] || e.fakeNgModel();
                m.init(c), o.mouseActive = !1, r.attr({
                    role: "radiogroup",
                    tabIndex: r.attr("tabindex") || "0"
                }).on("keydown", s).on("mousedown", function(e) {
                    o.mouseActive = !0, a(function() {
                        o.mouseActive = !1
                    }, 100)
                }).on("focus", function() {
                    o.mouseActive === !1 && m.$element.addClass("md-focused")
                }).on("blur", function() {
                    m.$element.removeClass("md-focused")
                })
            }

            function r(e) {
                this._radioButtonRenderFns = [], this.$element = e
            }

            function i() {
                return {
                    init: function(e) {
                        this._ngModelCtrl = e, this._ngModelCtrl.$render = angular.bind(this, this.render)
                    },
                    add: function(e) {
                        this._radioButtonRenderFns.push(e)
                    },
                    remove: function(e) {
                        var t = this._radioButtonRenderFns.indexOf(e); - 1 !== t && this._radioButtonRenderFns.splice(t, 1)
                    },
                    render: function() {
                        this._radioButtonRenderFns.forEach(function(e) {
                            e()
                        })
                    },
                    setViewValue: function(e, t) {
                        this._ngModelCtrl.$setViewValue(e, t), this.render()
                    },
                    getViewValue: function() {
                        return this._ngModelCtrl.$viewValue
                    },
                    selectNext: function() {
                        return l(this.$element, 1)
                    },
                    selectPrevious: function() {
                        return l(this.$element, -1)
                    },
                    setActiveDescendant: function(e) {
                        this.$element.attr("aria-activedescendant", e)
                    }
                }
            }

            function l(t, n) {
                var a = e.iterator(t[0].querySelectorAll("md-radio-button"), !0);
                if (a.count()) {
                    var o = function(e) {
                            return !angular.element(e).attr("disabled")
                        },
                        r = t[0].querySelector("md-radio-button.md-checked"),
                        i = a[0 > n ? "previous" : "next"](r, o) || a.first();
                    angular.element(i).triggerHandler("click")
                }
            }
            return r.prototype = i(), {
                restrict: "E",
                controller: ["$element", r],
                require: ["mdRadioGroup", "?ngModel"],
                link: {
                    pre: o
                }
            }
        }

        function t(e, t, n) {
            function a(a, r, i, l) {
                function d(e) {
                    r[0].hasAttribute("disabled") || a.$apply(function() {
                        l.setViewValue(i.value, e && e.type)
                    })
                }

                function s() {
                    var e = l.getViewValue() == i.value;
                    e !== c && (c = e, r.attr("aria-checked", e), e ? (r.addClass(o), l.setActiveDescendant(r.attr("id"))) : r.removeClass(o))
                }

                function m(n, a) {
                    function o() {
                        return i.id || "radio_" + t.nextUid()
                    }
                    a.ariaId = o(), n.attr({
                        id: a.ariaId,
                        role: "radio",
                        "aria-checked": "false"
                    }), e.expectWithText(n, "aria-label")
                }
                var c;
                n(r), m(r, a), l.add(s), i.$observe("value", s), r.on("click", d).on("$destroy", function() {
                    l.remove(s)
                })
            }
            var o = "md-checked";
            return {
                restrict: "E",
                require: "^mdRadioGroup",
                transclude: !0,
                template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',
                link: a
            }
        }
        angular.module("material.components.radioButton", ["material.core"]).directive("mdRadioGroup", e).directive("mdRadioButton", t), e.$inject = ["$mdUtil", "$mdConstant", "$mdTheming", "$timeout"], t.$inject = ["$mdAria", "$mdUtil", "$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r) {
            function i(a, i) {
                var l = a.find("md-select-label").remove();
                if (l.length) {
                    if (!l[0].firstElementChild) {
                        var d = angular.element("<span>");
                        d.append(l.contents()), l.append(d)
                    }
                } else l = angular.element("<md-select-label><span></span></md-select-label>");
                if (l.append('<span class="md-select-icon" aria-hidden="true"></span>'), l.addClass("md-select-label"), l.attr("id", "select_label_" + t.nextUid()), a.find("md-content").length || a.append(angular.element("<md-content>").append(a.contents())), i.mdOnOpen && a.find("md-content").prepend(angular.element("<md-progress-circular>").attr("md-mode", "indeterminate").attr("ng-hide", "$$loadingAsyncDone").wrap("<div>").parent()), i.name) {
                    var s = angular.element('<select class="md-visually-hidden">');
                    s.attr({
                        name: "." + i.name,
                        "ng-model": i.ngModel,
                        "aria-hidden": "true",
                        tabindex: "-1"
                    });
                    var m = a.find("md-option");
                    angular.forEach(m, function(e) {
                        var t = angular.element("<option>" + e.innerHTML + "</option>");
                        e.hasAttribute("ng-value") ? t.attr("ng-value", e.getAttribute("ng-value")) : e.hasAttribute("value") && t.attr("value", e.getAttribute("value")), s.append(t)
                    }), a.parent().append(s)
                }
                var c = '<div class="md-select-menu-container"><md-select-menu ' + (angular.isDefined(i.multiple) ? "multiple" : "") + ">" + a.html() + "</md-select-menu></div>";
                return a.empty().append(l), i.tabindex = i.tabindex || "0", n(a),
                    function(n, a, i, l) {
                        function d() {
                            f && (b = b || f.find("md-select-menu").controller("mdSelectMenu"), v.setLabelText(b.selectedLabels()))
                        }

                        function s() {
                            f = angular.element(c);
                            var e = f.find("md-select-menu");
                            e.data("$ngModelController", E), e.data("$mdSelectController", v), g = n.$new(), f = o(f)(g), b = f.find("md-select-menu").controller("mdSelectMenu")
                        }

                        function m(e) {
                            var t = [32, 13, 38, 40];
                            if (-1 != t.indexOf(e.keyCode)) e.preventDefault(), u(e);
                            else if (e.keyCode <= 90 && e.keyCode >= 31) {
                                e.preventDefault();
                                var n = b.optNodeForKeyboardSearch(e);
                                if (!n) return;
                                var a = angular.element(n).controller("mdOption");
                                b.isMultiple || b.deselect(Object.keys(b.selected)[0]), b.select(a.hashKey, a.value), b.refreshViewValue(), E.$render()
                            }
                        }

                        function u() {
                            n.$evalAsync(function() {
                                p = !0, e.show({
                                    scope: g,
                                    preserveScope: !0,
                                    skipCompile: !0,
                                    element: f,
                                    target: a[0],
                                    hasBackdrop: !0,
                                    loadingAsync: i.mdOnOpen ? n.$eval(i.mdOnOpen) || !0 : !1
                                }).then(function(e) {
                                    p = !1
                                })
                            })
                        }
                        var p, h, f, g, b, v = l[0],
                            E = l[1],
                            y = l[2],
                            M = a.find("md-select-label"),
                            $ = 0 !== M.text().length;
                        if (s(), i.name && y) {
                            var x = a.parent()[0].querySelector('select[name=".' + i.name + '"]');
                            y.$removeControl(angular.element(x).controller())
                        }
                        var T = E.$render;
                        E.$render = function() {
                            T(), d()
                        };
                        var C;
                        v.setLabelText = function(e) {
                            if (!$) {
                                v.setIsPlaceholder(!e);
                                var t = e || i.placeholder || "",
                                    n = $ ? M : M.children().eq(0);
                                C || (n.text("M"), C = n[0].offsetHeight);
                                var a = !1,
                                    o = !1;
                                do n.text(t), n[0].offsetHeight > C ? (t = t.slice(0, -1), o = !0) : (1 == o && (t = t.slice(0, -3) + "...", n.text(t)), a = !0); while (!a)
                            }
                        }, v.setIsPlaceholder = function(e) {
                            e ? M.addClass("md-placeholder") : M.removeClass("md-placeholder")
                        }, n.$$postDigest(d);
                        var b, A;
                        i.$observe("ngMultiple", function(e) {
                            A && A();
                            var t = r(e);
                            A = n.$watch(function() {
                                return t(n)
                            }, function(e, t) {
                                (void 0 !== e || void 0 !== t) && (e ? a.attr("multiple", "multiple") : a.removeAttr("multiple"), f && (b.setMultiple(e), T = E.$render, E.$render = function() {
                                    T(), d()
                                }, b.refreshViewValue(), E.$render()))
                            })
                        }), i.$observe("disabled", function(e) {
                            "string" == typeof e && (e = !0), (void 0 === h || h !== e) && (h = e, e ? (a.attr({
                                tabindex: -1,
                                "aria-disabled": "true"
                            }), a.off("click", u), a.off("keydown", m)) : (a.attr({
                                tabindex: i.tabindex,
                                "aria-disabled": "false"
                            }), a.on("click", u), a.on("keydown", m)))
                        }), i.disabled || i.ngDisabled || (a.attr({
                            tabindex: i.tabindex,
                            "aria-disabled": "false"
                        }), a.on("click", u), a.on("keydown", m)), a.attr({
                            role: "combobox",
                            id: "select_" + t.nextUid(),
                            "aria-expanded": "false",
                            "aria-labelledby": M.attr("id")
                        }), n.$on("$destroy", function() {
                            p ? e.cancel().then(function() {
                                f.remove()
                            }) : f.remove()
                        })
                    }
            }
            a.startSymbol(), a.endSymbol();
            return {
                restrict: "E",
                require: ["mdSelect", "ngModel", "?^form"],
                compile: i,
                controller: function() {}
            }
        }

        function t(e, t, n) {
            function a(e, a, o, r) {
                function i() {
                    a.attr({
                        id: "select_menu_" + t.nextUid(),
                        role: "listbox",
                        "aria-multiselectable": s.isMultiple ? "true" : "false"
                    })
                }

                function l(e) {
                    (13 == e.keyCode || 32 == e.keyCode) && d(e)
                }

                function d(n) {
                    var a = t.getClosest(n.target, "md-option"),
                        o = a && angular.element(a).data("$mdOptionController");
                    if (a && o) {
                        var r = s.hashGetter(o.value),
                            i = angular.isDefined(s.selected[r]);
                        e.$apply(function() {
                            s.isMultiple ? i ? s.deselect(r) : s.select(r, o.value) : i || (s.deselect(Object.keys(s.selected)[0]), s.select(r, o.value)), s.refreshViewValue()
                        })
                    }
                }
                var s = r[0],
                    m = r[1];
                n(a), a.on("click", d), a.on("keypress", l), m && s.init(m), i()
            }

            function o(t, n, a) {
                function o() {
                    var e = d.ngModel.$modelValue || d.ngModel.$viewValue;
                    if (angular.isArray(e)) {
                        var t = Object.keys(d.selected),
                            n = e.map(d.hashGetter),
                            a = t.filter(function(e) {
                                return -1 === n.indexOf(e)
                            });
                        a.forEach(d.deselect), n.forEach(function(t, n) {
                            d.select(t, e[n])
                        })
                    }
                }

                function i() {
                    var e = d.ngModel.$viewValue || d.ngModel.$modelValue;
                    Object.keys(d.selected).forEach(d.deselect), d.select(d.hashGetter(e), e)
                }
                var d = this;
                d.isMultiple = angular.isDefined(n.multiple), d.selected = {}, d.options = {};
                var s;
                d.setMultiple = function(e) {
                    function a(e, t) {
                        return angular.isArray(e || t || [])
                    }
                    var r = d.ngModel;
                    d.isMultiple = e, s && s(), d.isMultiple ? (r.$validators["md-multiple"] = a, r.$render = o, t.$watchCollection(n.ngModel, function(e) {
                        a(e) && o(e)
                    })) : (delete r.$validators["md-multiple"], r.$render = i)
                };
                var m, c, u, p = "",
                    h = 300;
                d.optNodeForKeyboardSearch = function(e) {
                    m && clearTimeout(m), m = setTimeout(function() {
                        m = void 0, p = "", u = void 0, c = void 0
                    }, h), p += String.fromCharCode(e.keyCode);
                    var t = new RegExp("^" + p, "i");
                    c || (c = a.find("md-option"), u = new Array(c.length), angular.forEach(c, function(e, t) {
                        u[t] = e.textContent.trim()
                    }));
                    for (var n = 0; n < u.length; ++n)
                        if (t.test(u[n])) return c[n]
                }, d.init = function(n) {
                    if (d.ngModel = n, n.$options && n.$options.trackBy) {
                        var a = {},
                            o = e(n.$options.trackBy);
                        d.hashGetter = function(e, n) {
                            return a.$value = e, o(n || t, a)
                        }
                    } else d.hashGetter = function(e) {
                        return angular.isObject(e) ? "$$object_" + (e.$$mdSelectId || (e.$$mdSelectId = ++l)) : e
                    };
                    d.setMultiple(d.isMultiple)
                }, d.selectedLabels = function() {
                    var e = r(a[0].querySelectorAll("md-option[selected]"));
                    return e.length ? e.map(function(e) {
                        return e.textContent
                    }).join(", ") : ""
                }, d.select = function(e, t) {
                    var n = d.options[e];
                    n && n.setSelected(!0), d.selected[e] = t
                }, d.deselect = function(e) {
                    var t = d.options[e];
                    t && t.setSelected(!1), delete d.selected[e]
                }, d.addOption = function(e, t) {
                    if (angular.isDefined(d.options[e])) throw new Error('Duplicate md-option values are not allowed in a select. Duplicate value "' + t.value + '" found.');
                    d.options[e] = t, angular.isDefined(d.selected[e]) && (d.select(e, t.value), d.refreshViewValue())
                }, d.removeOption = function(e) {
                    delete d.options[e]
                }, d.refreshViewValue = function() {
                    var e, t = [];
                    for (var n in d.selected) t.push((e = d.options[n]) ? e.value : d.selected[n]);
                    d.ngModel.$setViewValue(d.isMultiple ? t : t[0])
                }
            }
            return o.$inject = ["$scope", "$attrs", "$element"], {
                restrict: "E",
                require: ["mdSelectMenu", "?ngModel"],
                controller: o,
                link: {
                    pre: a
                }
            }
        }

        function n(e, t) {
            function n(e, t) {
                return e.append(angular.element('<div class="md-text">').append(e.contents())), e.attr("tabindex", t.tabindex || "0"), a
            }

            function a(n, a, o, r) {
                function i(e, t) {
                    var a = s.hashGetter(t, n),
                        o = s.hashGetter(e, n);
                    d.hashKey = o, d.value = e, s.removeOption(a, d), s.addOption(o, d)
                }

                function l() {
                    a.attr({
                        role: "option",
                        "aria-selected": "false",
                        id: "select_option_" + t.nextUid()
                    })
                }
                var d = r[0],
                    s = r[1];
                angular.isDefined(o.ngValue) ? n.$watch(o.ngValue, i) : angular.isDefined(o.value) ? i(o.value) : n.$watch(function() {
                    return a.text()
                }, i), n.$$postDigest(function() {
                    o.$observe("selected", function(e) {
                        angular.isDefined(e) && (e ? (s.isMultiple || s.deselect(Object.keys(s.selected)[0]), s.select(d.hashKey, d.value)) : s.deselect(d.hashKey), s.refreshViewValue(), s.ngModel.$render())
                    })
                }), e.attachButtonBehavior(n, a), l(), n.$on("$destroy", function() {
                    s.removeOption(d.hashKey, d)
                })
            }

            function o(e) {
                this.selected = !1, this.setSelected = function(t) {
                    t && !this.selected ? e.attr({
                        selected: "selected",
                        "aria-selected": "true"
                    }) : !t && this.selected && (e.removeAttr("selected"), e.attr("aria-selected", "false")), this.selected = t
                }
            }
            return o.$inject = ["$element"], {
                restrict: "E",
                require: ["mdOption", "^^mdSelectMenu"],
                controller: o,
                compile: n
            }
        }

        function a() {
            function e(e, t) {
                var n = e.find("label");
                n.length || (n = angular.element("<label>"), e.prepend(n)), t.label && n.text(t.label)
            }
            return {
                restrict: "E",
                compile: e
            }
        }

        function o(e) {
            function t(e, t, o, l, d, s, m, c) {
                function u(n, a, i) {
                    function c() {
                        i.selectEl.attr("aria-labelledby", i.target.attr("id")), i.target.attr("aria-expanded", "true")
                    }

                    function u() {
                        function o(e) {
                            var t = r(p),
                                n = t.indexOf(i.focusedNode); - 1 === n ? n = 0 : "next" === e && n < t.length - 1 ? n++ : "prev" === e && n > 0 && n--;
                            var a = i.focusedNode = t[n];
                            a && a.focus()
                        }

                        function d() {
                            o("next")
                        }

                        function s() {
                            o("prev")
                        }

                        function m() {
                            c.isMultiple || (i.restoreFocus = !0, n.$evalAsync(function() {
                                e.hide(c.ngModel.$viewValue)
                            }))
                        }
                        if (!i.isRemoved) {
                            var c = i.selectEl.controller("mdSelectMenu") || {};
                            a.addClass("md-clickable"), i.backdrop && i.backdrop.on("click", function(t) {
                                t.preventDefault(), t.stopPropagation(), i.restoreFocus = !1, n.$apply(e.cancel)
                            }), i.selectEl.on("keydown", function(a) {
                                switch (a.keyCode) {
                                    case t.KEY_CODE.SPACE:
                                    case t.KEY_CODE.ENTER:
                                        var o = l.getClosest(a.target, "md-option");
                                        o && (i.selectEl.triggerHandler({
                                            type: "click",
                                            target: o
                                        }), a.preventDefault());
                                        break;
                                    case t.KEY_CODE.TAB:
                                    case t.KEY_CODE.ESCAPE:
                                        a.preventDefault(), i.restoreFocus = !0, n.$apply(e.cancel)
                                }
                            }), i.selectEl.on("keydown", function(e) {
                                switch (e.keyCode) {
                                    case t.KEY_CODE.UP_ARROW:
                                        return s();
                                    case t.KEY_CODE.DOWN_ARROW:
                                        return d();
                                    default:
                                        if (e.keyCode >= 31 && e.keyCode <= 90) {
                                            var n = i.selectEl.controller("mdSelectMenu").optNodeForKeyboardSearch(e);
                                            n && n.focus()
                                        }
                                }
                            }), i.selectEl.on("click", m), i.selectEl.on("keydown", function(e) {
                                (32 == e.keyCode || 13 == e.keyCode) && m()
                            })
                        }
                    }
                    if (!i.target) throw new Error('$mdSelect.show() expected a target element in options.target but got "' + i.target + '"!');
                    angular.extend(i, {
                        isRemoved: !1,
                        target: angular.element(i.target),
                        parent: angular.element(i.parent),
                        selectEl: a.find("md-select-menu"),
                        contentEl: a.find("md-content"),
                        backdrop: i.hasBackdrop && angular.element('<md-backdrop class="md-select-backdrop md-click-catcher">')
                    }), i.resizeFn = function() {
                        o(function() {
                            o(function() {
                                h(n, a, i)
                            })
                        })
                    }, angular.element(m).on("resize", i.resizeFn), angular.element(m).on("orientationchange", i.resizeFn), c(), a.removeClass("md-leave");
                    var p = i.selectEl[0].getElementsByTagName("md-option");
                    return i.loadingAsync && i.loadingAsync.then ? i.loadingAsync.then(function() {
                        n.$$loadingAsyncDone = !0, o(function() {
                            o(function() {
                                i.isRemoved || h(n, a, i)
                            })
                        })
                    }) : i.loadingAsync && (n.$$loadingAsyncDone = !0), i.disableParentScroll && (i.restoreScroll = l.disableScrollAround(i.target)), s(u, 75, !1), i.backdrop && (d.inherit(i.backdrop, i.parent), i.parent.append(i.backdrop)), i.parent.append(a), o(function() {
                        o(function() {
                            i.isRemoved || h(n, a, i)
                        })
                    }), l.transitionEndPromise(i.selectEl, {
                        timeout: 350
                    })
                }

                function p(e, t, n) {
                    n.isRemoved = !0, t.addClass("md-leave").removeClass("md-clickable"), n.target.attr("aria-expanded", "false"), angular.element(m).off("resize", n.resizefn), angular.element(m).off("orientationchange", n.resizefn), n.resizeFn = void 0;
                    var a = n.selectEl.controller("mdSelect");
                    return a && a.setLabelText(n.selectEl.controller("mdSelectMenu").selectedLabels()), l.transitionEndPromise(t, {
                        timeout: 350
                    }).then(function() {
                        t.removeClass("md-active"), n.parent[0].removeChild(t[0]), n.backdrop && n.backdrop.remove(), n.disableParentScroll && n.restoreScroll(), n.restoreFocus && n.target.focus()
                    })
                }

                function h(e, r, d) {
                    var s, m = r[0],
                        c = d.target[0],
                        u = d.parent[0],
                        p = d.selectEl[0],
                        h = d.contentEl[0],
                        f = u.getBoundingClientRect(),
                        g = c.getBoundingClientRect(),
                        b = !1,
                        v = {
                            left: f.left + i,
                            top: i,
                            bottom: f.height - i,
                            right: f.width - i - (l.floatingScrollbars() ? 16 : 0)
                        },
                        E = {
                            top: g.top - v.top,
                            left: g.left - v.left,
                            right: v.right - (g.left + g.width),
                            bottom: v.bottom - (g.top + g.height)
                        },
                        y = f.width - 2 * i,
                        M = h.scrollHeight > h.offsetHeight,
                        $ = p.querySelector("md-option[selected]"),
                        x = p.getElementsByTagName("md-option"),
                        T = p.getElementsByTagName("md-optgroup");
                    s = $ ? $ : T.length ? T[0] : x.length ? x[0] : h.firstElementChild || h, h.offsetWidth > y && (h.style["max-width"] = y + "px"), b && (h.style["min-width"] = g.width + "px"), M && p.classList.add("md-overflow");
                    var C = p.getBoundingClientRect(),
                        A = a(s);
                    if (s) {
                        var w = window.getComputedStyle(s);
                        A.paddingLeft = parseInt(w.paddingLeft, 10) || 0, A.paddingRight = parseInt(w.paddingRight, 10) || 0
                    }
                    var k = s;
                    if ("MD-OPTGROUP" === (k.tagName || "").toUpperCase() && (k = x[0] || h.firstElementChild || h), M) {
                        var N = h.offsetHeight / 2;
                        h.scrollTop = A.top + A.height / 2 - N, E.top < N ? h.scrollTop = Math.min(A.top, h.scrollTop + N - E.top) : E.bottom < N && (h.scrollTop = Math.max(A.top + A.height - C.height, h.scrollTop - N + E.bottom))
                    }
                    var S, _, H;
                    b ? (S = g.left, _ = g.top + g.height, H = "50% 0", _ + C.height > v.bottom && (_ = g.top - C.height, H = "50% 100%")) : (S = g.left + A.left - A.paddingLeft, _ = g.top + g.height / 2 - A.height / 2 - A.top + h.scrollTop, H = A.left + g.width / 2 + "px " + (A.top + A.height / 2 - h.scrollTop) + "px 0px", m.style.minWidth = g.width + A.paddingLeft + A.paddingRight + "px");
                    var j = m.getBoundingClientRect();
                    m.style.left = n(v.left, S, v.right - j.width) + "px", m.style.top = n(v.top, _, v.bottom - j.height) + "px", p.style[t.CSS.TRANSFORM_ORIGIN] = H, p.style[t.CSS.TRANSFORM] = "scale(" + Math.min(g.width / C.width, 1) + "," + Math.min(g.height / C.height, 1) + ")", o(function() {
                        r.addClass("md-active"), p.style[t.CSS.TRANSFORM] = "", k && (d.focusedNode = k, k.focus())
                    })
                }
                return {
                    parent: "body",
                    onShow: u,
                    onRemove: p,
                    hasBackdrop: !0,
                    disableParentScroll: !0,
                    themable: !0
                }
            }

            function n(e, t, n) {
                return Math.max(e, Math.min(t, n))
            }

            function a(e) {
                return e ? {
                    left: e.offsetLeft,
                    top: e.offsetTop,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                } : {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                }
            }
            return t.$inject = ["$mdSelect", "$mdConstant", "$$rAF", "$mdUtil", "$mdTheming", "$timeout", "$window", "$document"], e("$mdSelect").setDefaults({
                methods: ["target"],
                options: t
            })
        }

        function r(e) {
            for (var t = [], n = 0; n < e.length; ++n) t.push(e.item(n));
            return t
        }
        var i = 8,
            l = 0;
        angular.module("material.components.select", ["material.core", "material.components.backdrop"]).directive("mdSelect", e).directive("mdSelectMenu", t).directive("mdOption", n).directive("mdOptgroup", a).provider("$mdSelect", o), e.$inject = ["$mdSelect", "$mdUtil", "$mdTheming", "$interpolate", "$compile", "$parse"], t.$inject = ["$parse", "$mdUtil", "$mdTheming"], n.$inject = ["$mdInkRipple", "$mdUtil"], o.$inject = ["$$interimElementProvider"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            return function(n) {
                function a() {
                    return e.when(n).then(function(e) {
                        return i = e, e
                    })
                }
                var o, r = "SideNav '" + n + "' is not available!",
                    i = e.get(n);
                return i || e.notFoundError(n), o = {
                    isOpen: function() {
                        return i && i.isOpen()
                    },
                    isLockedOpen: function() {
                        return i && i.isLockedOpen()
                    },
                    toggle: function() {
                        return i ? i.toggle() : t.reject(r)
                    },
                    open: function() {
                        return i ? i.open() : t.reject(r)
                    },
                    close: function() {
                        return i ? i.close() : t.reject(r)
                    },
                    then: function(e) {
                        var n = i ? t.when(i) : a();
                        return n.then(e || angular.noop)
                    }
                }
            }
        }

        function t() {
            return {
                restrict: "A",
                require: "^mdSidenav",
                link: function(e, t, n, a) {
                    a.focusElement(t)
                }
            }
        }

        function n(e, t, n, a, o, r, i, l, d, s) {
            function m(m, c, u, p) {
                function h(e, n) {
                    m.isLockedOpen = e, e === n ? c.toggleClass("md-locked-open", !!e) : t[e ? "addClass" : "removeClass"](c, "md-locked-open"), C.toggleClass("md-locked-open", !!e)
                }

                function f(e) {
                    var n = c.parent();
                    n[e ? "on" : "off"]("keydown", v), C[e ? "on" : "off"]("click", E), e && (M = s[0].activeElement);
                    var a = p.focusElement();
                    return g(e), $ = d.all([e ? t.enter(C, n) : t.leave(C), t[e ? "removeClass" : "addClass"](c, "md-closed")]).then(function() {
                        m.isOpen && a && a.focus()
                    })
                }

                function g(e) {
                    var t = c.parent();
                    e ? (y = t.css("overflow"), t.css("overflow", "hidden")) : angular.isDefined(y) && (t.css("overflow", y), y = void 0)
                }

                function b(t) {
                    if (m.isOpen == t) return d.when(!0);
                    var n = d.defer();
                    return m.isOpen = t, e(function() {
                        $.then(function(e) {
                            m.isOpen || (M && M.focus(), M = null), n.resolve(e)
                        })
                    }, 0, !1), n.promise
                }

                function v(e) {
                    var t = e.keyCode === r.KEY_CODE.ESCAPE;
                    return t ? E(e) : d.when(!0)
                }

                function E(e) {
                    return e.preventDefault(), e.stopPropagation(), p.close()
                }
                var y, M = null,
                    $ = d.when(!0),
                    x = n(u.mdIsLockedOpen),
                    T = function() {
                        return x(m.$parent, {
                            $media: function(e) {
                                return a.warn("$media is deprecated for is-locked-open. Use $mdMedia instead."), o(e)
                            },
                            $mdMedia: o
                        })
                    },
                    C = i('<md-backdrop class="md-sidenav-backdrop md-opaque ng-enter">')(m);
                c.on("$destroy", p.destroy), l.inherit(C, c), m.$watch(T, h), m.$watch("isOpen", f), p.$toggleOpen = b, p.focusElement(p.focusElement() || c)
            }
            return {
                restrict: "E",
                scope: {
                    isOpen: "=?mdIsOpen"
                },
                controller: "$mdSidenavController",
                compile: function(e) {
                    return e.addClass("md-closed"), e.attr("tabIndex", "-1"), m
                }
            }
        }

        function a(e, t, n, a, o) {
            var r, i = this;
            i.isOpen = function() {
                return !!e.isOpen
            }, i.isLockedOpen = function() {
                return !!e.isLockedOpen
            }, i.open = function() {
                return i.$toggleOpen(!0)
            }, i.close = function() {
                return i.$toggleOpen(!1)
            }, i.toggle = function() {
                return i.$toggleOpen(!e.isOpen)
            }, i.focusElement = function(e) {
                return angular.isDefined(e) && (r = e), r
            }, i.$toggleOpen = function() {
                return o.when(e.isOpen)
            }, i.destroy = a.register(i, n.mdComponentId)
        }
        angular.module("material.components.sidenav", ["material.core", "material.components.backdrop"]).factory("$mdSidenav", e).directive("mdSidenav", n).directive("mdSidenavFocus", t).controller("$mdSidenavController", a), e.$inject = ["$mdComponentRegistry", "$q"], n.$inject = ["$timeout", "$animate", "$parse", "$log", "$mdMedia", "$mdConstant", "$compile", "$mdTheming", "$q", "$document"], a.$inject = ["$scope", "$element", "$attrs", "$mdComponentRegistry", "$q"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r, i, l) {
            function d(e, t) {
                return e.attr({
                    tabIndex: 0,
                    role: "slider"
                }), n.expect(e, "aria-label"), s
            }

            function s(n, d, s, m) {
                function c() {
                    b(), M(), g()
                }

                function u(e) {
                    K = parseFloat(e), d.attr("aria-valuemin", e), c()
                }

                function p(e) {
                    W = parseFloat(e), d.attr("aria-valuemax", e), c()
                }

                function h(e) {
                    Y = parseFloat(e), g()
                }

                function f(e) {
                    d.attr("aria-disabled", !!e)
                }

                function g() {
                    if (angular.isDefined(s.mdDiscrete)) {
                        var e = Math.floor((W - K) / Y);
                        if (!X) {
                            var n = t.getComputedStyle(q[0]);
                            X = angular.element('<canvas style="position:absolute;">'), Z = X[0].getContext("2d"), Z.fillStyle = n.backgroundColor || "black", q.append(X)
                        }
                        var a = v();
                        X[0].width = a.width, X[0].height = a.height;
                        for (var o, r = 0; e >= r; r++) o = Math.floor(a.width * (r / e)), Z.fillRect(o - 1, 0, 2, a.height)
                    }
                }

                function b() {
                    Q = R[0].getBoundingClientRect()
                }

                function v() {
                    return V(), Q
                }

                function E(e) {
                    if (!d[0].hasAttribute("disabled")) {
                        var t;
                        e.keyCode === o.KEY_CODE.LEFT_ARROW ? t = -Y : e.keyCode === o.KEY_CODE.RIGHT_ARROW && (t = Y), t && ((e.metaKey || e.ctrlKey || e.altKey) && (t *= 4), e.preventDefault(), e.stopPropagation(), n.$evalAsync(function() {
                            y(m.$viewValue + t)
                        }))
                    }
                }

                function y(e) {
                    m.$setViewValue($(x(e)))
                }

                function M() {
                    isNaN(m.$viewValue) && (m.$viewValue = m.$modelValue);
                    var e = (m.$viewValue - K) / (W - K);
                    n.modelValue = m.$viewValue, d.attr("aria-valuenow", m.$viewValue), T(e), U.text(m.$viewValue)
                }

                function $(e) {
                    return angular.isNumber(e) ? Math.max(K, Math.min(W, e)) : void 0
                }

                function x(e) {
                    return angular.isNumber(e) ? Math.round(e / Y) * Y : void 0
                }

                function T(e) {
                    F.css("width", 100 * e + "%"), O.css("left", 100 * e + "%"), d.toggleClass("md-min", 0 === e)
                }

                function C(e) {
                    if (!L()) {
                        d.addClass("active"), d[0].focus(), b();
                        var t = D(j(e.pointer.x)),
                            a = $(x(t));
                        n.$apply(function() {
                            y(a), T(P(a))
                        })
                    }
                }

                function A(e) {
                    if (!L()) {
                        d.removeClass("dragging active");
                        var t = D(j(e.pointer.x)),
                            a = $(x(t));
                        n.$apply(function() {
                            y(a), M()
                        })
                    }
                }

                function w(e) {
                    L() || (J = !0, e.stopPropagation(), d.addClass("dragging"), S(e))
                }

                function k(e) {
                    J && (e.stopPropagation(), S(e))
                }

                function N(e) {
                    J && (e.stopPropagation(), J = !1)
                }

                function S(e) {
                    ee ? H(e.pointer.x) : _(e.pointer.x)
                }

                function _(e) {
                    n.$evalAsync(function() {
                        y(D(j(e)))
                    })
                }

                function H(e) {
                    var t = D(j(e)),
                        n = $(x(t));
                    T(j(e)), U.text(n)
                }

                function j(e) {
                    return Math.max(0, Math.min(1, (e - Q.left) / Q.width))
                }

                function D(e) {
                    return K + e * (W - K)
                }

                function P(e) {
                    return (e - K) / (W - K)
                }
                r(d), m = m || {
                    $setViewValue: function(e) {
                        this.$viewValue = e, this.$viewChangeListeners.forEach(function(e) {
                            e()
                        })
                    },
                    $parsers: [],
                    $formatters: [],
                    $viewChangeListeners: []
                };
                var I = s.ngDisabled && l(s.ngDisabled),
                    L = I ? function() {
                        return I(n.$parent)
                    } : angular.noop,
                    B = angular.element(d[0].querySelector(".md-thumb")),
                    U = angular.element(d[0].querySelector(".md-thumb-text")),
                    O = B.parent(),
                    R = angular.element(d[0].querySelector(".md-track-container")),
                    F = angular.element(d[0].querySelector(".md-track-fill")),
                    q = angular.element(d[0].querySelector(".md-track-ticks")),
                    V = a.throttle(b, 5e3);
                s.min ? s.$observe("min", u) : u(0), s.max ? s.$observe("max", p) : p(100), s.step ? s.$observe("step", h) : h(1);
                var G = angular.noop;
                s.ngDisabled && (G = n.$parent.$watch(s.ngDisabled, f)), i.register(d, "drag"), d.on("keydown", E).on("$md.pressdown", C).on("$md.pressup", A).on("$md.dragstart", w).on("$md.drag", k).on("$md.dragend", N), setTimeout(c);
                var z = e.throttle(c);
                angular.element(t).on("resize", z), n.$on("$destroy", function() {
                    angular.element(t).off("resize", z), G()
                }), m.$render = M, m.$viewChangeListeners.push(M), m.$formatters.push($), m.$formatters.push(x);
                var K, W, Y, X, Z, Q = {};
                b();
                var J = !1,
                    ee = angular.isDefined(s.mdDiscrete);

            }
            return {
                scope: {},
                require: "?ngModel",
                template: '<div class="md-slider-wrapper">        <div class="md-track-container">          <div class="md-track"></div>          <div class="md-track md-track-fill"></div>          <div class="md-track-ticks"></div>        </div>        <div class="md-thumb-container">          <div class="md-thumb"></div>          <div class="md-focus-thumb"></div>          <div class="md-focus-ring"></div>          <div class="md-sign">            <span class="md-thumb-text"></span>          </div>          <div class="md-disabled-thumb"></div>        </div>      </div>',
                compile: d
            }
        }
        angular.module("material.components.slider", ["material.core"]).directive("mdSlider", e), e.$inject = ["$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant", "$mdTheming", "$mdGesture", "$parse"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o) {
            function r(e) {
                function n(e, t) {
                    t.addClass("md-sticky-clone"), t.css("top", h + "px");
                    var n = {
                        element: e,
                        clone: t
                    };
                    return p.items.push(n), c.parent().prepend(n.clone), u(),
                        function() {
                            p.items.forEach(function(t, n) {
                                t.element[0] === e[0] && (p.items.splice(n, 1), t.clone.remove())
                            }), u()
                        }
                }

                function o() {
                    p.items.forEach(r), p.items = p.items.sort(function(e, t) {
                        return e.top < t.top ? -1 : 1
                    });
                    for (var e, t = c.prop("scrollTop"), n = p.items.length - 1; n >= 0; n--)
                        if (t > p.items[n].top) {
                            e = p.items[n];
                            break
                        }
                    d(e)
                }

                function r(e) {
                    var t = e.element[0];
                    for (e.top = 0, e.left = 0; t && t !== c[0];) e.top += t.offsetTop, e.left += t.offsetLeft, t = t.offsetParent;
                    e.height = e.element.prop("offsetHeight"), e.clone.css("margin-left", e.left + "px")
                }

                function i() {
                    var e = c.prop("scrollTop"),
                        t = e > (i.prevScrollTop || 0);
                    i.prevScrollTop = e, 0 === e ? d(null) : t && p.next ? p.next.top - e <= 0 ? d(p.next) : p.current && (p.next.top - e <= p.next.height ? m(p.current, p.next.top - p.next.height - e) : m(p.current, null)) : !t && p.current && (e < p.current.top && d(p.prev), p.current && p.next && (e >= p.next.top - p.current.height ? m(p.current, p.next.top - e - p.current.height) : m(p.current, null)))
                }

                function d(e) {
                    if (p.current !== e) {
                        p.current && (m(p.current, null), s(p.current, null)), e && s(e, "active"), p.current = e;
                        var t = p.items.indexOf(e);
                        p.next = p.items[t + 1], p.prev = p.items[t - 1], s(p.next, "next"), s(p.prev, "prev")
                    }
                }

                function s(e, t) {
                    e && e.state !== t && (e.state && (e.clone.attr("sticky-prev-state", e.state), e.element.attr("sticky-prev-state", e.state)), e.clone.attr("sticky-state", t), e.element.attr("sticky-state", t), e.state = t)
                }

                function m(e, n) {
                    e && (null === n || void 0 === n ? e.translateY && (e.translateY = null, e.clone.css(t.CSS.TRANSFORM, "")) : (e.translateY = n, e.clone.css(t.CSS.TRANSFORM, "translate3d(" + e.left + "px," + n + "px,0)")))
                }
                var c = e.$element,
                    u = a.throttle(o);
                l(c), c.on("$scrollstart", u), c.on("$scroll", i);
                var p, h = c.prop("offsetTop");
                return p = {
                    prev: null,
                    current: null,
                    next: null,
                    items: [],
                    add: n,
                    refreshElements: o
                }
            }

            function i(t) {
                var n, a = angular.element("<div>");
                e[0].body.appendChild(a[0]);
                for (var o = ["sticky", "-webkit-sticky"], r = 0; r < o.length; ++r)
                    if (a.css({
                            position: o[r],
                            top: 0,
                            "z-index": 2
                        }), a.css("position") == o[r]) {
                        n = o[r];
                        break
                    }
                return a.remove(), n
            }

            function l(e) {
                function t() {
                    +o.now() - r > i ? (n = !1, e.triggerHandler("$scrollend")) : (e.triggerHandler("$scroll"), a(t))
                }
                var n, r, i = 200;
                e.on("scroll touchmove", function() {
                    n || (n = !0, a(t), e.triggerHandler("$scrollstart")), e.triggerHandler("$scroll"), r = +o.now()
                })
            }
            var d = i();
            return function(e, t, n) {
                var a = t.controller("mdContent");
                if (a)
                    if (d) t.css({
                        position: d,
                        top: 0,
                        "z-index": 2
                    });
                    else {
                        var o = a.$element.data("$$sticky");
                        o || (o = r(a), a.$element.data("$$sticky", o));
                        var i = o.add(t, n || t.clone());
                        e.$on("$destroy", i)
                    }
            }
        }
        angular.module("material.components.sticky", ["material.core", "material.components.content"]).factory("$mdSticky", e), e.$inject = ["$document", "$mdConstant", "$compile", "$$rAF", "$mdUtil"]
    }(),
    function() {
        "use strict";

        function e(e, t, n) {
            return {
                restrict: "E",
                replace: !0,
                transclude: !0,
                template: '<h2 class="md-subheader"><div class="md-subheader-inner"><span class="md-subheader-content"></span></div></h2>',
                compile: function(a, o, r) {
                    var i = a[0].outerHTML;
                    return function(a, o, l) {
                        function d(e) {
                            return angular.element(e[0].querySelector(".md-subheader-content"))
                        }
                        n(o), r(a, function(e) {
                            d(o).append(e)
                        }), o.hasClass("md-no-sticky") || r(a, function(r) {
                            var l = t(angular.element(i))(a);
                            n(l), d(l).append(r), e(a, o, l)
                        })
                    }
                }
            }
        }
        angular.module("material.components.subheader", ["material.core", "material.components.sticky"]).directive("mdSubheader", e), e.$inject = ["$mdSticky", "$compile", "$mdTheming"]
    }(),
    function() {
        "use strict";
        var e = angular.module("material.components.swipe", []);
        ["SwipeLeft", "SwipeRight"].forEach(function(t) {
            var n = "md" + t,
                a = "$md." + t.toLowerCase();
            e.directive(n, ["$parse", function(e) {
                function t(t, o, r) {
                    var i = e(r[n]);
                    o.on(a, function(e) {
                        t.$apply(function() {
                            i(t, {
                                $event: e
                            })
                        })
                    })
                }
                return {
                    restrict: "A",
                    link: t
                }
            }])
        })
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r, i, l) {
            function d(e, t) {
                var a = s.compile(e, t);
                return e.addClass("md-dragging"),
                    function(e, t, d, s) {
                        function m(n) {
                            h(e) || (n.stopPropagation(), t.addClass("md-dragging"), b = {
                                width: f.prop("offsetWidth")
                            }, t.removeClass("transition"))
                        }

                        function c(e) {
                            if (b) {
                                e.stopPropagation(), e.srcEvent && e.srcEvent.preventDefault();
                                var t = e.pointer.distanceX / b.width,
                                    n = s.$viewValue ? 1 + t : t;
                                n = Math.max(0, Math.min(1, n)), f.css(o.CSS.TRANSFORM, "translate3d(" + 100 * n + "%,0,0)"), b.translate = n
                            }
                        }

                        function u(e) {
                            if (b) {
                                e.stopPropagation(), t.removeClass("md-dragging"), f.css(o.CSS.TRANSFORM, "");
                                var n = s.$viewValue ? b.translate < .5 : b.translate > .5;
                                n && p(!s.$viewValue), b = null
                            }
                        }

                        function p(t) {
                            e.$apply(function() {
                                s.$setViewValue(t), s.$render()
                            })
                        }
                        s = s || n.fakeNgModel();
                        var h = r(d.ngDisabled),
                            f = angular.element(t[0].querySelector(".md-thumb-container")),
                            g = angular.element(t[0].querySelector(".md-container"));
                        i(function() {
                            t.removeClass("md-dragging")
                        }), a(e, t, d, s), angular.isDefined(d.ngDisabled) && e.$watch(h, function(e) {
                            t.attr("tabindex", e ? -1 : 0)
                        }), l.register(g, "drag"), g.on("$md.dragstart", m).on("$md.drag", c).on("$md.dragend", u);
                        var b
                    }
            }
            var s = e[0];
            return {
                restrict: "E",
                transclude: !0,
                template: '<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',
                require: "?ngModel",
                compile: d
            }
        }
        angular.module("material.components.switch", ["material.core", "material.components.checkbox"]).directive("mdSwitch", e), e.$inject = ["mdCheckboxDirective", "$mdTheming", "$mdUtil", "$document", "$mdConstant", "$parse", "$$rAF", "$mdGesture"]
    }(),
    function() {
        "use strict";
        angular.module("material.components.tabs", ["material.core", "material.components.icon"])
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E"
            }
        }

        function t(e) {
            function t(e, t, a, o) {
                function r(r, i, d) {
                    return i = o.extractElementByName(i, "md-toast"), n = d.content, i.addClass(d.position.split(" ").map(function(e) {
                        return "md-" + e
                    }).join(" ")), d.parent.addClass(l(d.position)), d.onSwipe = function(t, n) {
                        i.addClass("md-" + t.type.replace("$md.", "")), e(a.cancel)
                    }, i.on("$md.swipeleft $md.swiperight", d.onSwipe), t.enter(i, d.parent)
                }

                function i(e, n, a) {
                    return n.off("$md.swipeleft $md.swiperight", a.onSwipe), a.parent.removeClass(l(a.position)), t.leave(n)
                }

                function l(e) {
                    return "md-toast-open-" + (e.indexOf("top") > -1 ? "top" : "bottom")
                }
                return {
                    onShow: r,
                    onRemove: i,
                    position: "bottom left",
                    themable: !0,
                    hideDelay: 3e3
                }
            }
            var n, a = e("$mdToast").setDefaults({
                methods: ["position", "hideDelay", "capsule"],
                options: t
            }).addPreset("simple", {
                argOption: "content",
                methods: ["content", "action", "highlightAction", "theme", "parent"],
                options: ["$mdToast", "$mdTheming", function(e, t) {
                    var a = {
                        template: ['<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">', "<span flex>{{ toast.content }}</span>", '<md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-highlight\': toast.highlightAction}">', "{{ toast.action }}", "</md-button>", "</md-toast>"].join(""),
                        controller: ["$scope", function(t) {
                            var a = this;
                            t.$watch(function() {
                                return n
                            }, function() {
                                a.content = n
                            }), this.resolve = function() {
                                e.hide()
                            }
                        }],
                        theme: t.defaultTheme(),
                        controllerAs: "toast",
                        bindToController: !0
                    };
                    return a
                }]
            }).addMethod("updateContent", function(e) {
                n = e
            });
            return t.$inject = ["$timeout", "$animate", "$mdToast", "$mdUtil"], a
        }
        angular.module("material.components.toast", ["material.core", "material.components.button"]).directive("mdToast", e).provider("$mdToast", t), t.$inject = ["$$interimElementProvider"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a) {
            return {
                restrict: "E",
                controller: angular.noop,
                link: function(o, r, i) {
                    function l() {
                        function a(t, n) {
                            r.parent()[0] === n.parent()[0] && (m && m.off("scroll", h), n.on("scroll", h), n.attr("scroll-shrink", "true"), m = n, e(l))
                        }

                        function l() {
                            s = r.prop("offsetHeight"), m.css("margin-top", -s * p + "px"), d()
                        }

                        function d(e) {
                            var n = e ? e.target.scrollTop : u;
                            f(), c = Math.min(s / p, Math.max(0, c + n - u)), r.css(t.CSS.TRANSFORM, "translate3d(0," + -c * p + "px,0)"), m.css(t.CSS.TRANSFORM, "translate3d(0," + (s - c) * p + "px,0)"), u = n
                        }
                        var s, m, c = 0,
                            u = 0,
                            p = i.mdShrinkSpeedFactor || .5,
                            h = e.throttle(d),
                            f = n.debounce(l, 5e3);
                        o.$on("$mdContentLoaded", a)
                    }
                    a(r), angular.isDefined(i.mdScrollShrink) && l()
                }
            }
        }
        angular.module("material.components.toolbar", ["material.core", "material.components.content"]).directive("mdToolbar", e), e.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r, i, l, d) {
            function s(s, u, p) {
                function h() {
                    f(), b(), y(), g()
                }

                function f() {
                    angular.isDefined(p.mdDelay) || (s.delay = m)
                }

                function g() {
                    s.$watch("visible", function(e) {
                        e ? $() : x()
                    }), s.$on("$destroy", function() {
                        s.visible = !1, u.remove(), angular.element(t).off("resize", _)
                    })
                }

                function b() {
                    u.detach(), u.attr("role", "tooltip"), u.attr("id", p.id || "tooltip_" + o.nextUid())
                }

                function v() {
                    for (var e = u.parent();
                        "none" == t.getComputedStyle(e[0])["pointer-events"];) e = e.parent();
                    return e
                }

                function E() {
                    for (var e = u.parent()[0]; e && e !== i[0] && e !== document.body && (!e.tagName || "md-content" != e.tagName.toLowerCase());) e = e.parentNode;
                    return e
                }

                function y() {
                    var e = s.hasOwnProperty("autohide") ? s.autohide : p.hasOwnProperty("mdAutohide");
                    C.on("focus mouseenter touchstart", function() {
                        M(!0)
                    }), C.on("blur mouseleave touchend touchcancel", function() {
                        (a[0].activeElement !== C[0] || e) && M(!1)
                    }), angular.element(t).on("resize", _)
                }

                function M(t) {
                    M.value = !!t, M.queued || (t ? (M.queued = !0, e(function() {
                        s.visible = M.value, M.queued = !1
                    }, s.delay)) : e(function() {
                        s.visible = !1
                    }))
                }

                function $() {
                    C.attr("aria-describedby", u.attr("id")), S.append(u), T(), angular.forEach([u, A, w], function(e) {
                        l.addClass(e, "md-show")
                    })
                }

                function x() {
                    C.removeAttr("aria-describedby"), d.all([l.removeClass(w, "md-show"), l.removeClass(A, "md-show"), l.removeClass(u, "md-show")]).then(function() {
                        s.visible || u.detach()
                    })
                }

                function T() {
                    function e() {
                        var e = "left" === k || "right" === k ? 2 * Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height / 2, 2)) : 2 * Math.sqrt(Math.pow(a.width / 2, 2) + Math.pow(a.height, 2)),
                            t = "left" === k ? {
                                left: 100,
                                top: 50
                            } : "right" === k ? {
                                left: 0,
                                top: 50
                            } : "top" === k ? {
                                left: 50,
                                top: 100
                            } : {
                                left: 50,
                                top: 0
                            };
                        A.css({
                            width: e + "px",
                            height: e + "px",
                            left: t.left + "%",
                            top: t.top + "%"
                        })
                    }

                    function t(e) {
                        var t = {
                            left: e.left,
                            top: e.top
                        };
                        return t.left = Math.min(t.left, S.prop("scrollWidth") - a.width - c), t.left = Math.max(t.left, c), t.top = Math.min(t.top, S.prop("scrollHeight") - a.height - c), t.top = Math.max(t.top, c), t
                    }

                    function n(e) {
                        return "left" === e ? {
                            left: r.left - a.width - c,
                            top: r.top + r.height / 2 - a.height / 2
                        } : "right" === e ? {
                            left: r.left + r.width + c,
                            top: r.top + r.height / 2 - a.height / 2
                        } : "top" === e ? {
                            left: r.left + r.width / 2 - a.width / 2,
                            top: r.top - a.height - c
                        } : {
                            left: r.left + r.width / 2 - a.width / 2,
                            top: r.top + r.height + c
                        }
                    }
                    var a = o.offsetRect(u, S),
                        r = o.offsetRect(C, S),
                        i = n(k);
                    k ? i = t(i) : i.top > u.prop("offsetParent").scrollHeight - a.height - c && (i = t(n("top"))), u.css({
                        top: i.top + "px",
                        left: i.left + "px"
                    }), e()
                }
                r(u);
                var C = v(),
                    A = angular.element(u[0].getElementsByClassName("md-background")[0]),
                    w = angular.element(u[0].getElementsByClassName("md-content")[0]),
                    k = p.mdDirection,
                    N = E(),
                    S = angular.element(N || document.body),
                    _ = n.throttle(function() {
                        s.visible && T()
                    });
                return h()
            }
            var m = 300,
                c = 8;
            return {
                restrict: "E",
                transclude: !0,
                template: '        <div class="md-background"></div>        <div class="md-content" ng-transclude></div>',
                scope: {
                    visible: "=?mdVisible",
                    delay: "=?mdDelay",
                    autohide: "=?mdAutohide"
                },
                link: s
            }
        }
        angular.module("material.components.tooltip", ["material.core"]).directive("mdTooltip", e), e.$inject = ["$timeout", "$window", "$$rAF", "$document", "$mdUtil", "$mdTheming", "$rootElement", "$animate", "$q"]
    }(),
    function() {
        "use strict";
        angular.module("material.components.whiteframe", [])
    }(),
    function() {
        "use strict";

        function e(e, o, r, i, l, d, s, m) {
            function c() {
                f(), l(function() {
                    g(), h(), p()
                })
            }

            function u() {
                function e() {
                    var e = V.ul.getBoundingClientRect(),
                        n = {};
                    e.right > r.right - a && (n.left = t.right - e.width + "px"), V.$.ul.css(n)
                }
                if (!V) return l(u, 0, !1);
                var t = V.wrap.getBoundingClientRect(),
                    o = V.snap.getBoundingClientRect(),
                    r = V.root.getBoundingClientRect(),
                    i = o.bottom - r.top,
                    d = r.bottom - o.top,
                    s = t.left - r.left,
                    m = t.width,
                    c = {
                        left: s + "px",
                        minWidth: m + "px",
                        maxWidth: Math.max(t.right - r.left, r.right - t.left) - a + "px"
                    };
                i > d && r.height - t.bottom - a < n ? (c.top = "auto", c.bottom = d + "px", c.maxHeight = Math.min(n, t.top - r.top - a) + "px") : (c.top = i + "px", c.bottom = "auto", c.maxHeight = Math.min(n, r.bottom - t.bottom - a) + "px"), V.$.ul.css(c), l(e, 0, !1)
            }

            function p() {
                V.$.root.length && (d(V.$.ul), V.$.ul.detach(), V.$.root.append(V.$.ul))
            }

            function h() {
                e.autofocus && V.input.focus()
            }

            function f() {
                var t = parseInt(e.delay, 10) || 0;
                e.$watch("searchText", t ? r.debounce(x, t) : x), M(E), e.$watch("selectedItem", y), e.$watch("$mdAutocompleteCtrl.hidden", function(e, t) {
                    !e && t && u()
                }), angular.element(s).on("resize", u)
            }

            function g() {
                V = {
                    main: o[0],
                    ul: o.find("ul")[0],
                    input: o.find("input")[0],
                    wrap: o.find("md-autocomplete-wrap")[0],
                    root: document.body
                }, V.snap = b(), V.$ = v(V)
            }

            function b() {
                for (var e = o; e.length; e = e.parent())
                    if (angular.isDefined(e.attr("md-autocomplete-snap"))) return e[0];
                return V.wrap
            }

            function v(e) {
                var t = {};
                for (var n in e) t[n] = angular.element(e[n]);
                return t
            }

            function E(t, n) {
                t && (e.searchText = k(t)), e.itemChange && t !== n && e.itemChange(N(t))
            }

            function y(e, t) {
                for (var n = 0; n < W.length; ++n) W[n](e, t)
            }

            function M(e) {
                -1 == W.indexOf(e) && W.push(e)
            }

            function $(e) {
                var t = W.indexOf(e); - 1 != t && W.splice(t, 1)
            }

            function x(t, n) {
                R.index = S(), (t || t !== n) && t !== k(e.selectedItem) && (e.selectedItem = null, e.textChange && t !== n && e.textChange(N(e.selectedItem)), j() ? O() : (R.loading = !1, R.matches = [], R.hidden = _(), L()))
            }

            function T() {
                K || (R.hidden = !0)
            }

            function C() {
                return angular.isString(e.searchText) ? (R.hidden = _(), void(R.hidden || O())) : e.searchText = ""
            }

            function A(e) {
                switch (e.keyCode) {
                    case i.KEY_CODE.DOWN_ARROW:
                        if (R.loading) return;
                        e.preventDefault(), R.index = Math.min(R.index + 1, R.matches.length - 1), U(), B();
                        break;
                    case i.KEY_CODE.UP_ARROW:
                        if (R.loading) return;
                        e.preventDefault(), R.index = R.index < 0 ? R.matches.length - 1 : Math.max(0, R.index - 1), U(), B();
                        break;
                    case i.KEY_CODE.ENTER:
                        if (R.hidden || R.loading || R.index < 0) return;
                        e.preventDefault(), D(R.index);
                        break;
                    case i.KEY_CODE.ESCAPE:
                        R.matches = [], R.hidden = !0, R.index = S();
                        break;
                    case i.KEY_CODE.TAB:
                }
            }

            function w() {
                return angular.isNumber(e.minLength) ? e.minLength : 1
            }

            function k(t) {
                return t && e.itemText ? e.itemText(N(t)) : t
            }

            function N(e) {
                if (e) {
                    var t = {};
                    return R.itemName && (t[R.itemName] = e), t
                }
            }

            function S() {
                return e.autoselect ? 0 : -1
            }

            function _() {
                return j() ? 1 === R.matches.length && e.searchText === k(R.matches[0]) && e.selectedItem === R.matches[0] : !0
            }

            function H() {
                return k(R.matches[R.index])
            }

            function j() {
                return e.searchText.length >= w()
            }

            function D(t) {
                e.selectedItem = R.matches[t], e.searchText = k(e.selectedItem) || e.searchText, R.hidden = !0, R.index = 0, R.matches = []
            }

            function P() {
                e.searchText = "", D(-1), V.input.focus()
            }

            function I(t) {
                function n(n) {
                    z[o] = n, t === e.searchText && (G = null, R.loading = !1, R.matches = n, R.hidden = _(), L(), u())
                }
                var a = e.$parent.$eval(q),
                    o = t.toLowerCase();
                angular.isArray(a) ? n(a) : (R.loading = !0, a.success && a.success(n), a.then && a.then(n), a.error && a.error(function() {
                    R.loading = !1
                }))
            }

            function L() {
                if (!R.hidden) switch (R.matches.length) {
                    case 0:
                        return R.messages.splice(0);
                    case 1:
                        return R.messages.push({
                            display: "There is 1 match available."
                        });
                    default:
                        return R.messages.push({
                            display: "There are " + R.matches.length + " matches available."
                        })
                }
            }

            function B() {
                R.messages.push({
                    display: H()
                })
            }

            function U() {
                var e = t * R.index,
                    n = e + t,
                    a = V.ul.clientHeight;
                e < V.ul.scrollTop ? V.ul.scrollTop = e : n > V.ul.scrollTop + a && (V.ul.scrollTop = n - a)
            }

            function O() {
                var t = e.searchText,
                    n = t.toLowerCase();
                G && G.cancel && (G.cancel(), G = null), !e.noCache && z[n] ? (R.matches = z[n], L()) : I(t), R.hidden = _()
            }
            var R = this,
                F = e.itemsExpr.split(/ in /i),
                q = F[1],
                V = null,
                G = null,
                z = {},
                K = !1,
                W = [];
            return R.scope = e, R.parent = e.$parent, R.itemName = F[0], R.matches = [], R.loading = !1, R.hidden = !0, R.index = null, R.messages = [], R.id = r.nextUid(), R.keydown = A, R.blur = T, R.focus = C, R.clear = P, R.select = D, R.getCurrentDisplayValue = H, R.registerSelectedItemWatcher = M, R.unregisterSelectedItemWatcher = $, R.listEnter = function() {
                K = !0
            }, R.listLeave = function() {
                K = !1
            }, R.mouseUp = function() {
                V.input.focus()
            }, c()
        }
        angular.module("material.components.autocomplete").controller("MdAutocompleteCtrl", e);
        var t = 41,
            n = 5.5 * t,
            a = 8;
        e.$inject = ["$scope", "$element", "$mdUtil", "$mdConstant", "$timeout", "$mdTheming", "$window", "$rootElement"]
    }(),
    function() {
        "use strict";

        function e(e) {
            function t(t, n, a) {
                t.contents = a.$mdAutocompleteTemplate, delete a.$mdAutocompleteTemplate, angular.forEach(t.$$isolateBindings, function(e, n) {
                    e.optional && angular.isUndefined(t[n]) && (t[n] = a.hasOwnProperty(a.$normalize(e.attrName)))
                }), e(n)
            }
            return {
                controller: "MdAutocompleteCtrl",
                controllerAs: "$mdAutocompleteCtrl",
                link: t,
                scope: {
                    name: "@",
                    searchText: "=?mdSearchText",
                    selectedItem: "=?mdSelectedItem",
                    itemsExpr: "@mdItems",
                    itemText: "&mdItemText",
                    placeholder: "@placeholder",
                    noCache: "=?mdNoCache",
                    itemChange: "&?mdSelectedItemChange",
                    textChange: "&?mdSearchTextChange",
                    isDisabled: "=?ngDisabled",
                    minLength: "=?mdMinLength",
                    delay: "=?mdDelay",
                    autofocus: "=?mdAutofocus",
                    floatingLabel: "@?mdFloatingLabel",
                    autoselect: "=?mdAutoselect",
                    menuClass: "@?mdMenuClass"
                },
                template: function(e, t) {
                    return t.$mdAutocompleteTemplate = e.html(), '          <md-autocomplete-wrap role="listbox">            <md-input-container ng-if="floatingLabel">              <label>{{floatingLabel}}</label>              <input type="text"                  id="fl-input-{{$mdAutocompleteCtrl.id}}"                  name="{{name}}"                  autocomplete="off"                  ng-disabled="isDisabled"                  ng-model="$mdAutocompleteCtrl.scope.searchText"                  ng-keydown="$mdAutocompleteCtrl.keydown($event)"                  ng-blur="$mdAutocompleteCtrl.blur()"                  ng-focus="$mdAutocompleteCtrl.focus()"                  aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                  aria-label="{{floatingLabel}}"                  aria-autocomplete="list"                  aria-haspopup="true"                  aria-activedescendant=""                  aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>                            </md-input-container>            <input type="text"                id="input-{{$mdAutocompleteCtrl.id}}"                name="{{name}}"                ng-if="!floatingLabel"                autocomplete="off"                ng-disabled="isDisabled"                ng-model="$mdAutocompleteCtrl.scope.searchText"                ng-keydown="$mdAutocompleteCtrl.keydown($event)"                ng-blur="$mdAutocompleteCtrl.blur()"                ng-focus="$mdAutocompleteCtrl.focus()"                placeholder="{{placeholder}}"                aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                aria-label="{{placeholder}}"                aria-autocomplete="list"                aria-haspopup="true"                aria-activedescendant=""                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>            <button                type="button"                tabindex="-1"                ng-if="$mdAutocompleteCtrl.scope.searchText && !isDisabled"                ng-click="$mdAutocompleteCtrl.clear()">              <md-icon md-svg-icon="cancel"></md-icon>              <span class="md-visually-hidden">Clear</span>            </button>            <md-progress-linear                ng-if="$mdAutocompleteCtrl.loading"                md-mode="indeterminate"></md-progress-linear>            <ul role="presentation"                class="md-autocomplete-suggestions {{menuClass || \'\'}}"                id="ul-{{$mdAutocompleteCtrl.id}}"                ng-mouseenter="$mdAutocompleteCtrl.listEnter()"                ng-mouseleave="$mdAutocompleteCtrl.listLeave()"                ng-mouseup="$mdAutocompleteCtrl.mouseUp()">              <li ng-repeat="(index, item) in $mdAutocompleteCtrl.matches"                  ng-class="{ selected: index === $mdAutocompleteCtrl.index }"                  ng-hide="$mdAutocompleteCtrl.hidden"                  ng-click="$mdAutocompleteCtrl.select(index)"                  md-autocomplete-list-item-template="contents"                  md-autocomplete-list-item="$mdAutocompleteCtrl.itemName">              </li>            </ul>          </md-autocomplete-wrap>          <aria-status              class="md-visually-hidden"              role="status"              aria-live="assertive">            <p ng-repeat="message in $mdAutocompleteCtrl.messages">{{message.display}}</p>          </aria-status>'
                }
            }
        }
        angular.module("material.components.autocomplete").directive("mdAutocomplete", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e, t, n) {
            function a(e) {
                return e ? e.replace(/[\*\[\]\(\)\{\}\\\^\$]/g, "\\$&") : e
            }

            function o(e, t) {
                var n = "";
                return t.indexOf("^") >= 1 && (n += "^"), n += e, t.indexOf("$") >= 1 && (n += "$"), new RegExp(a(n), t.replace(/[\$\^]/g, ""))
            }
            var r = t.attr("md-highlight-text"),
                i = n(t.text())(e),
                l = t.attr("md-highlight-flags") || "",
                d = e.$watch(r, function(e) {
                    var n = o(e, l),
                        a = i.replace(n, '<span class="highlight">$&</span>');
                    t.html(a)
                });
            t.on("$destroy", function() {
                d()
            })
        }
        angular.module("material.components.autocomplete").controller("MdHighlightCtrl", e), e.$inject = ["$scope", "$element", "$interpolate"]
    }(),
    function() {
        "use strict";

        function e() {
            return {
                terminal: !0,
                scope: !1,
                controller: "MdHighlightCtrl"
            }
        }
        angular.module("material.components.autocomplete").directive("mdHighlightText", e)
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(n, a, o) {
                var r = n.$parent.$mdAutocompleteCtrl,
                    i = r.parent.$new(!1, r.parent),
                    l = r.scope.$eval(o.mdAutocompleteListItem);
                i[l] = n.item, a.html(r.scope.$eval(o.mdAutocompleteListItemTemplate)), e(a.contents())(i), a.attr({
                    role: "option",
                    id: "item_" + t.nextUid()
                })
            }
            return {
                terminal: !0,
                link: n,
                scope: !1
            }
        }
        angular.module("material.components.autocomplete").directive("mdAutocompleteListItem", e), e.$inject = ["$compile", "$mdUtil"]
    }(),
    function() {
        "use strict";

        function e(e) {
            function n(n, a) {
                return n.append(t),
                    function(t, n, a) {
                        n.addClass("md-chip"), e(n)
                    }
            }
            return {
                restrict: "E",
                requires: "^mdChips",
                compile: n
            }
        }
        angular.module("material.components.chips").directive("mdChip", e);
        var t = '      <span ng-if="!$mdChipsCtrl.readonly" class="md-visually-hidden">        {{$mdChipsCtrl.deleteHint}}      </span>';
        e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e) {
            function t(t, n, a, o) {
                n.on("click", function(e) {
                    t.$apply(function() {
                        o.removeChip(t.$$replacedScope.$index)
                    })
                }), e(function() {
                    n.attr({
                        tabindex: -1,
                        ariaHidden: !0
                    }), n.find("button").attr("tabindex", "-1")
                })
            }
            return {
                restrict: "A",
                require: "^mdChips",
                scope: !1,
                link: t
            }
        }
        angular.module("material.components.chips").directive("mdChipRemove", e), e.$inject = ["$timeout"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(t, n, a) {
                var o = t.$parent.$mdChipsCtrl,
                    r = o.parent.$new(!1, o.parent);
                r.$$replacedScope = t, r.$chip = t.$chip, r.$mdChipsCtrl = o, n.html(o.$scope.$eval(a.mdChipTransclude)), e(n.contents())(r)
            }
            return {
                restrict: "EA",
                terminal: !0,
                link: n,
                scope: !1
            }
        }
        angular.module("material.components.chips").directive("mdChipTransclude", e), e.$inject = ["$compile", "$mdUtil"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o) {
            this.$timeout = o, this.$mdConstant = t, this.$scope = e, this.parent = e.$parent, this.$log = n, this.$element = a, this.ngModelCtrl = null, this.userInputNgModelCtrl = null, this.userInputElement = null, this.items = [], this.selectedChip = -1, this.deleteHint = "Press delete to remove this chip.", this.deleteButtonLabel = "Remove", this.chipBuffer = "", this.useMdOnAppend = !1
        }
        angular.module("material.components.chips").controller("MdChipsCtrl", e), e.$inject = ["$scope", "$mdConstant", "$log", "$element", "$timeout"], e.prototype.inputKeydown = function(e) {
            var t = this.getChipBuffer();
            switch (e.keyCode) {
                case this.$mdConstant.KEY_CODE.ENTER:
                    if (this.$scope.requireMatch || !t) break;
                    e.preventDefault(), this.appendChip(t), this.resetChipBuffer();
                    break;
                case this.$mdConstant.KEY_CODE.BACKSPACE:
                    if (t) break;
                    e.stopPropagation(), this.items.length && this.selectAndFocusChipSafe(this.items.length - 1)
            }
        }, e.prototype.chipKeydown = function(e) {
            if (!this.getChipBuffer()) switch (e.keyCode) {
                case this.$mdConstant.KEY_CODE.BACKSPACE:
                case this.$mdConstant.KEY_CODE.DELETE:
                    if (this.selectedChip < 0) return;
                    e.preventDefault(), this.removeAndSelectAdjacentChip(this.selectedChip);
                    break;
                case this.$mdConstant.KEY_CODE.LEFT_ARROW:
                    e.preventDefault(), this.selectedChip < 0 && (this.selectedChip = this.items.length), this.items.length && this.selectAndFocusChipSafe(this.selectedChip - 1);
                    break;
                case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
                    e.preventDefault(), this.selectAndFocusChipSafe(this.selectedChip + 1);
                    break;
                case this.$mdConstant.KEY_CODE.ESCAPE:
                case this.$mdConstant.KEY_CODE.TAB:
                    if (this.selectedChip < 0) return;
                    e.preventDefault(), this.onFocus()
            }
        }, e.prototype.getPlaceholder = function() {
            var e = this.items.length && ("" == this.secondaryPlaceholder || this.secondaryPlaceholder);
            return e ? this.placeholder : this.secondaryPlaceholder
        }, e.prototype.removeAndSelectAdjacentChip = function(e) {
            var t = this.getAdjacentChipIndex(e);
            this.removeChip(e), this.$timeout(function() {
                this.selectAndFocusChipSafe(t)
            }.bind(this))
        }, e.prototype.resetSelectedChip = function() {
            this.selectedChip = -1
        }, e.prototype.getAdjacentChipIndex = function(e) {
            var t = this.items.length - 1;
            return 0 == t ? -1 : e == t ? e - 1 : e
        }, e.prototype.appendChip = function(e) {
            this.items.indexOf(e) + 1 || (this.useMdOnAppend && this.mdOnAppend && (e = this.mdOnAppend({
                $chip: e
            })), this.items.push(e))
        }, e.prototype.useMdOnAppendExpression = function() {
            this.useMdOnAppend = !0
        }, e.prototype.getChipBuffer = function() {
            return this.userInputElement ? this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue : this.userInputElement[0].value : this.chipBuffer
        }, e.prototype.resetChipBuffer = function() {
            this.userInputElement ? this.userInputNgModelCtrl ? (this.userInputNgModelCtrl.$setViewValue(""), this.userInputNgModelCtrl.$render()) : this.userInputElement[0].value = "" : this.chipBuffer = ""
        }, e.prototype.removeChip = function(e) {
            this.items.splice(e, 1)
        }, e.prototype.removeChipAndFocusInput = function(e) {
            this.removeChip(e), this.onFocus()
        }, e.prototype.selectAndFocusChipSafe = function(e) {
            return this.items.length ? e === this.items.length ? this.onFocus() : (e = Math.max(e, 0), e = Math.min(e, this.items.length - 1), this.selectChip(e), void this.focusChip(e)) : (this.selectChip(-1), void this.onFocus())
        }, e.prototype.selectChip = function(e) {
            e >= -1 && e <= this.items.length ? this.selectedChip = e : this.$log.warn("Selected Chip index out of bounds; ignoring.")
        }, e.prototype.selectAndFocusChip = function(e) {
            this.selectChip(e), -1 != e && this.focusChip(e)
        }, e.prototype.focusChip = function(e) {
            this.$element[0].querySelector('md-chip[index="' + e + '"] .md-chip-content').focus()
        }, e.prototype.configureNgModel = function(e) {
            this.ngModelCtrl = e;
            var t = this;
            e.$render = function() {
                t.items = t.ngModelCtrl.$viewValue
            }
        }, e.prototype.onFocus = function() {
            var e = this.$element[0].querySelectorAll("input")[0];
            e && e.focus(), this.resetSelectedChip()
        }, e.prototype.configureUserInput = function(e) {
            this.userInputElement = e;
            var t = e.controller("ngModel");
            t != this.ngModelCtrl && (this.userInputNgModelCtrl = t);
            var n = this.$scope,
                a = this;
            e.attr({
                tabindex: 0
            }).on("keydown", function(e) {
                n.$apply(function() {
                    a.inputKeydown(e)
                })
            }).on("focus", function() {
                a.selectedChip = -1
            })
        }, e.prototype.configureAutocomplete = function(e) {
            e.registerSelectedItemWatcher(function(e) {
                e && (this.appendChip(e), this.resetChipBuffer())
            }.bind(this))
        }
    }(),
    function() {
        "use strict";

        function e(e, r, i) {
            function l(t, l) {
                function d(e) {
                    if (l.ngModel) {
                        var t = s[0].querySelector(e);
                        return t && t.outerHTML
                    }
                }
                var s = l.$mdUserTemplate;
                l.$mdUserTemplate = null;
                var m = d("[md-chip-remove]") || o,
                    c = d("md-chip-template") || a,
                    u = d("md-autocomplete") || d("input") || n,
                    p = s.find("md-chip");
                return function(t, a, o, d) {
                    angular.forEach(t.$$isolateBindings, function(e, n) {
                        e.optional && angular.isUndefined(t[n]) && (t[n] = l.hasOwnProperty(l.$normalize(e.attrName)))
                    }), e(a);
                    var s = d[0];
                    if (s.chipContentsTemplate = c, s.chipRemoveTemplate = m, s.chipInputTemplate = u, a.attr({
                            ariaHidden: !0,
                            tabindex: -1
                        }).on("focus", function() {
                            s.onFocus()
                        }), l.ngModel && (s.configureNgModel(a.controller("ngModel")), o.mdOnAppend && s.useMdOnAppendExpression(), u != n && i(function() {
                            0 === u.indexOf("<md-autocomplete") && s.configureAutocomplete(a.find("md-autocomplete").controller("mdAutocomplete")), s.configureUserInput(a.find("input"))
                        })), p.length > 0) {
                        var h = r(p)(t.$parent);
                        i(function() {
                            a.find("md-chips-wrap").prepend(h)
                        })
                    }
                }
            }
            return {
                template: function(e, n) {
                    return n.$mdUserTemplate = e.clone(), t
                },
                require: ["mdChips"],
                restrict: "E",
                controller: "MdChipsCtrl",
                controllerAs: "$mdChipsCtrl",
                bindToController: !0,
                compile: l,
                scope: {
                    readonly: "=readonly",
                    placeholder: "@",
                    secondaryPlaceholder: "@",
                    mdOnAppend: "&",
                    deleteHint: "@",
                    deleteButtonLabel: "@",
                    requireMatch: "=?mdRequireMatch"
                }
            }
        }
        angular.module("material.components.chips").directive("mdChips", e);
        var t = '      <md-chips-wrap          ng-if="!$mdChipsCtrl.readonly || $mdChipsCtrl.items.length > 0"          ng-keydown="$mdChipsCtrl.chipKeydown($event)"          class="md-chips">        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"            index="{{$index}}"            ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index}">          <div class="md-chip-content"              tabindex="-1"              aria-hidden="true"              ng-click="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>          <div class="md-chip-remove-container"              md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>        </md-chip>        <div ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl"            class="md-chip-input-container"            md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>        </div>      </md-chips-wrap>',
            n = '        <input            tabindex="0"            placeholder="{{$mdChipsCtrl.getPlaceholder()}}"            aria-label="{{$mdChipsCtrl.getPlaceholder()}}"            ng-model="$mdChipsCtrl.chipBuffer"            ng-focus="$mdChipsCtrl.resetSelectedChip()"            ng-keydown="$mdChipsCtrl.inputKeydown($event)">',
            a = "      <span>{{$chip}}</span>",
            o = '      <button          class="md-chip-remove"          ng-if="!$mdChipsCtrl.readonly"          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"          aria-hidden="true"          tabindex="-1">        <md-icon md-svg-icon="close"></md-icon>        <span class="md-visually-hidden">          {{$mdChipsCtrl.deleteButtonLabel}}        </span>      </button>';
        e.$inject = ["$mdTheming", "$compile", "$timeout"]
    }(),
    function() {
        "use strict";

        function e() {
            this.selectedItem = null, this.searchText = ""
        }
        angular.module("material.components.chips").controller("MdContactChipsCtrl", e), e.prototype.queryContact = function(e) {
            var t = this.contactQuery({
                $query: e
            });
            return this.filterSelected ? t.filter(this.filterSelectedContacts.bind(this)) : t
        }, e.prototype.filterSelectedContacts = function(e) {
            return -1 == this.contacts.indexOf(e)
        }
    }(),
    function() {
        "use strict";

        function e(e) {
            function n(t, n) {
                return function(t, a, o, r) {
                    angular.forEach(t.$$isolateBindings, function(e, a) {
                        e.optional && angular.isUndefined(t[a]) && (t[a] = n.hasOwnProperty(n.$normalize(e.attrName)))
                    }), e(a), a.attr("tabindex", "-1")
                }
            }
            return {
                template: function(e, n) {
                    return t
                },
                restrict: "E",
                controller: "MdContactChipsCtrl",
                controllerAs: "$mdContactChipsCtrl",
                bindToController: !0,
                compile: n,
                scope: {
                    contactQuery: "&mdContacts",
                    placeholder: "@",
                    secondaryPlaceholder: "@",
                    contactName: "@mdContactName",
                    contactImage: "@mdContactImage",
                    contactEmail: "@mdContactEmail",
                    filterSelected: "=",
                    contacts: "=ngModel",
                    requireMatch: "=?mdRequireMatch"
                }
            }
        }
        angular.module("material.components.chips").directive("mdContactChips", e);
        var t = '<md-chips class="md-contact-chips"    ng-model="$mdContactChipsCtrl.contacts"          md-require-match="$mdContactChipsCtrl.requireMatch"          md-autocomplete-snap>          <md-autocomplete              md-menu-class="md-contact-chips-suggestions"              md-selected-item="$mdContactChipsCtrl.selectedItem"              md-search-text="$mdContactChipsCtrl.searchText"              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)" md-item-text="$mdContactChipsCtrl.mdContactName" md-no-cache="$mdContactChipsCtrl.filterSelected"              md-autoselect              placeholder="{{$mdContactChipsCtrl.contacts.length == 0 ?                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">            <div class="md-contact-suggestion">              <img                   ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"                  alt="{{item[$mdContactChipsCtrl.contactName]}}" />              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText">                {{item[$mdContactChipsCtrl.contactName]}}              </span>              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>            </div>          </md-autocomplete>          <md-chip-template>            <div class="md-contact-avatar">              <img                   ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}" />            </div>            <div class="md-contact-name">              {{$chip[$mdContactChipsCtrl.contactName]}}            </div>          </md-chip-template>      </md-chips>';

        e.$inject = ["$mdTheming"]
    }(),
    function() {
        "use strict";

        function e(e) {
            function t(t, n, a, o) {
                var r = t.$parent.$index;
                t.$watch("template", function(t) {
                    n.html(t), e(n.contents())(o.tabs[r].parent)
                })
            }
            return {
                restrict: "A",
                link: t,
                scope: {
                    template: "=mdLabelTemplate"
                },
                require: "^mdTabs"
            }
        }
        angular.module("material.components.tabs").directive("mdLabelTemplate", e), e.$inject = ["$compile"]
    }(),
    function() {
        "use strict";

        function e(e, t) {
            function n(t, n) {
                n.html(t.tab.template), e(n.contents())(t.tab.parent)
            }
            return {
                terminal: !0,
                scope: {
                    tab: "=mdTabData",
                    active: "=mdActive"
                },
                link: n
            }
        }
        angular.module("material.components.tabs").directive("mdTabContent", e), e.$inject = ["$compile", "$mdUtil"]
    }(),
    function() {
        "use strict";

        function e() {
            function e(e, t, n, a) {
                function o() {
                    function e() {
                        return n.label
                    }

                    function a() {
                        var e = t.find("md-tab-label");
                        return e.length ? e.remove().html() : void 0
                    }

                    function o() {
                        var e = t.html();
                        return t.empty(), e
                    }
                    n.label || (t.find("md-tab-label")[0] || t[0]).innerHTML;
                    return e() || a() || o()
                }

                function r() {
                    var e = t.find("md-tab-body"),
                        a = e.length ? e.html() : n.label ? t.html() : null;
                    return e.length ? e.remove() : n.label && t.empty(), a
                }
                var i = t.parent()[0].getElementsByTagName("md-tab"),
                    l = Array.prototype.indexOf.call(i, t[0]),
                    d = a.insertTab({
                        scope: e,
                        parent: e.$parent,
                        index: l,
                        template: r(),
                        label: o()
                    }, l);
                e.deselect = e.deselect || angular.noop, e.select = e.select || angular.noop, e.$watch("active", function(e) {
                    e && a.select(d.getIndex())
                }), e.$watch("disabled", function() {
                    a.refreshIndex()
                }), e.$on("$destroy", function() {
                    a.removeTab(d)
                })
            }
            return {
                require: "^mdTabs",
                terminal: !0,
                scope: {
                    label: "@",
                    active: "=?mdActive",
                    disabled: "=?ngDisabled",
                    select: "&?mdOnSelect",
                    deselect: "&?mdOnDeselect"
                },
                link: e
            }
        }
        angular.module("material.components.tabs").directive("mdTab", e)
    }(),
    function() {
        "use strict";

        function e() {
            function e(e, t, n, a) {
                a.attachRipple(e, t)
            }
            return {
                require: "^mdTabs",
                link: e
            }
        }
        angular.module("material.components.tabs").directive("mdTabItem", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "A",
                compile: function(t, n) {
                    var a = e(n.mdTabScroll, null, !0);
                    return function(e, t) {
                        t.on("mousewheel", function(t) {
                            e.$apply(function() {
                                a(e, {
                                    $event: t
                                })
                            })
                        })
                    }
                }
            }
        }
        angular.module("material.components.tabs").directive("mdTabScroll", e), e.$inject = ["$parse"]
    }(),
    function() {
        "use strict";

        function e(e, t, n, a, o, r, i, l) {
            function d() {
                e.$watch("selectedIndex", y), e.$watch("$mdTabsCtrl.focusIndex", p), e.$watch("$mdTabsCtrl.offsetLeft", u), angular.element(n).on("resize", function() {
                    e.$apply(g)
                }), a(x, 0, !1), a($, 0, !1)
            }

            function s() {
                var e = {};
                return e.wrapper = t[0].getElementsByTagName("md-tabs-wrapper")[0], e.canvas = e.wrapper.getElementsByTagName("md-tabs-canvas")[0], e.paging = e.canvas.getElementsByTagName("md-pagination-wrapper")[0], e.tabs = e.paging.getElementsByTagName("md-tab-item"), e.dummies = e.canvas.getElementsByTagName("md-dummy-tab"), e.inkBar = e.paging.getElementsByTagName("md-ink-bar")[0], e.contentsWrapper = t[0].getElementsByTagName("md-tabs-content-wrapper")[0], e.contents = e.contentsWrapper.getElementsByTagName("md-tab-content"), e
            }

            function m(t) {
                switch (t.keyCode) {
                    case o.KEY_CODE.LEFT_ARROW:
                        t.preventDefault(), c(-1, !0);
                        break;
                    case o.KEY_CODE.RIGHT_ARROW:
                        t.preventDefault(), c(1, !0);
                        break;
                    case o.KEY_CODE.SPACE:
                    case o.KEY_CODE.ENTER:
                        t.preventDefault(), B || (e.selectedIndex = L.focusIndex)
                }
                L.lastClick = !1
            }

            function c(t, n) {
                var a, o = n ? L.focusIndex : e.selectedIndex;
                for (a = o + t; L.tabs[a] && L.tabs[a].scope.disabled; a += t);
                L.tabs[a] && (n ? L.focusIndex = a : e.selectedIndex = a)
            }

            function u(t) {
                var n = w() ? "" : "-" + t + "px";
                angular.element(U.paging).css("left", n), e.$broadcast("$mdTabsPaginationChanged")
            }

            function p(e, t) {
                e !== t && U.tabs[e] && (f(), h())
            }

            function h() {
                U.dummies[L.focusIndex].focus()
            }

            function f() {
                if (!w()) {
                    var e = U.tabs[L.focusIndex],
                        t = e.offsetLeft,
                        n = e.offsetWidth + t;
                    L.offsetLeft = Math.max(L.offsetLeft, _(n - U.canvas.clientWidth)), L.offsetLeft = Math.min(L.offsetLeft, _(t))
                }
            }

            function g() {
                L.lastSelectedIndex = e.selectedIndex, x(), L.offsetLeft = _(L.offsetLeft)
            }

            function b(n, a) {
                var o = {
                        getIndex: function() {
                            return L.tabs.indexOf(r)
                        },
                        isActive: function() {
                            return this.getIndex() === e.selectedIndex
                        },
                        isLeft: function() {
                            return this.getIndex() < e.selectedIndex
                        },
                        isRight: function() {
                            return this.getIndex() > e.selectedIndex
                        },
                        hasFocus: function() {
                            return !L.lastClick && L.hasFocus && this.getIndex() === L.focusIndex
                        },
                        id: i.nextUid()
                    },
                    r = angular.extend(o, n);
                return n.template || (L.hasContent = !1, t.addClass("md-no-tab-content")), angular.isDefined(a) ? L.tabs.splice(a, 0, r) : L.tabs.push(r), r
            }

            function v(e) {
                L.tabs.splice(e.getIndex(), 1), E(), a(function() {
                    x(), L.offsetLeft = _(L.offsetLeft)
                })
            }

            function E() {
                e.selectedIndex = C(e.selectedIndex), L.focusIndex = C(L.focusIndex)
            }

            function y(t, n) {
                t !== n && (e.selectedIndex = C(t), L.lastSelectedIndex = n, x(), $(), e.$broadcast("$mdTabsChanged"), L.tabs[n] && L.tabs[n].scope.deselect(), L.tabs[t] && L.tabs[t].scope.select())
            }

            function M() {
                M.watcher || (M.watcher = e.$watch(function() {
                    a(function() {
                        M.watcher && t.prop("offsetParent") && (M.watcher(), M.watcher = null, e.$apply(g))
                    }, 0, !1)
                }))
            }

            function $() {
                if (!e.dynamicHeight) return t.css("height", "");
                var n = U.contents[e.selectedIndex],
                    a = n.offsetHeight,
                    o = U.wrapper.offsetHeight,
                    r = a + o,
                    i = t.prop("clientHeight");
                i !== r && (B = !0, l.animate(t, {
                    height: i + "px"
                }, {
                    height: r + "px"
                }).then(function() {
                    t.css("height", ""), B = !1
                }))
            }

            function x() {
                if (L.tabs.length) {
                    if (!t.prop("offsetParent")) return M();
                    var n = e.selectedIndex,
                        a = U.paging.offsetWidth,
                        o = U.tabs[n],
                        r = o.offsetLeft,
                        i = a - r - o.offsetWidth;
                    T(), angular.element(U.inkBar).css({
                        left: r + "px",
                        right: i + "px"
                    })
                }
            }

            function T() {
                var t = e.selectedIndex,
                    n = L.lastSelectedIndex,
                    a = angular.element(U.inkBar);
                a.removeClass("md-left md-right"), angular.isNumber(n) && (n > t ? a.addClass("md-left") : t > n && a.addClass("md-right"))
            }

            function C(e) {
                var t, n, a = Math.max(L.tabs.length - e, e);
                for (t = 0; a >= t; t++) {
                    if (n = L.tabs[e + t], n && n.scope.disabled !== !0) return n.getIndex();
                    if (n = L.tabs[e - t], n && n.scope.disabled !== !0) return n.getIndex()
                }
                return e
            }

            function A() {
                switch (e.stretchTabs) {
                    case "always":
                        return !0;
                    case "never":
                        return !1;
                    default:
                        return !k() && n.matchMedia("(max-width: 600px)").matches
                }
            }

            function w() {
                return e.centerTabs && !k()
            }

            function k() {
                if (e.noPagination) return !1;
                var n = t.prop("clientWidth");
                return angular.forEach(U.tabs, function(e) {
                    n -= e.offsetWidth
                }), 0 > n
            }

            function N(t) {
                B || (L.focusIndex = e.selectedIndex = t), L.lastClick = !0
            }

            function S(e) {
                k() && (e.preventDefault(), L.offsetLeft = _(L.offsetLeft - e.wheelDelta))
            }

            function _(e) {
                if (!U.tabs.length || !k()) return 0;
                var t = U.tabs[U.tabs.length - 1],
                    n = t.offsetLeft + t.offsetWidth;
                return e = Math.max(0, e), e = Math.min(n - U.canvas.clientWidth, e)
            }

            function H() {
                var e, t, n = U.canvas.clientWidth,
                    a = n + L.offsetLeft;
                for (e = 0; e < U.tabs.length && (t = U.tabs[e], !(t.offsetLeft + t.offsetWidth > a)); e++);
                L.offsetLeft = _(t.offsetLeft)
            }

            function j() {
                var e, t;
                for (e = 0; e < U.tabs.length && (t = U.tabs[e], !(t.offsetLeft + t.offsetWidth >= L.offsetLeft)); e++);
                L.offsetLeft = _(t.offsetLeft + t.offsetWidth - U.canvas.clientWidth)
            }

            function D() {
                return L.offsetLeft > 0
            }

            function P() {
                var e = U.tabs[U.tabs.length - 1];
                return e && e.offsetLeft + e.offsetWidth > U.canvas.clientWidth + L.offsetLeft
            }

            function I(e, t) {
                var n = {
                    colorElement: angular.element(U.inkBar)
                };
                r.attachTabBehavior(e, t, n)
            }
            var L = this,
                B = !1,
                U = s();
            L.scope = e, L.parent = e.$parent, L.tabs = [], L.lastSelectedIndex = null, L.focusIndex = 0, L.offsetLeft = 0, L.hasContent = !0, L.hasFocus = !1, L.lastClick = !1, L.redirectFocus = h, L.attachRipple = I, L.shouldStretchTabs = A, L.shouldPaginate = k, L.shouldCenterTabs = w, L.insertTab = b, L.removeTab = v, L.select = N, L.scroll = S, L.nextPage = H, L.previousPage = j, L.keydown = m, L.canPageForward = P, L.canPageBack = D, L.refreshIndex = E, L.incrementSelectedIndex = c, L.updateInkBarStyles = x, d()
        }
        angular.module("material.components.tabs").controller("MdTabsController", e), e.$inject = ["$scope", "$element", "$window", "$timeout", "$mdConstant", "$mdInkRipple", "$mdUtil", "$animate"]
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                scope: {
                    noPagination: "=?mdNoPagination",
                    dynamicHeight: "=?mdDynamicHeight",
                    centerTabs: "=?mdCenterTabs",
                    selectedIndex: "=?mdSelected",
                    stretchTabs: "@?mdStretchTabs"
                },
                transclude: !0,
                template: '        <md-tabs-wrapper ng-class="{ \'md-stretch-tabs\': $mdTabsCtrl.shouldStretchTabs() }">          <md-tab-data ng-transclude></md-tab-data>          <md-prev-button              tabindex="-1"              role="button"              aria-label="Previous Page"              aria-disabled="{{!$mdTabsCtrl.canPageBack()}}"              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }"              ng-if="$mdTabsCtrl.shouldPaginate()"              ng-click="$mdTabsCtrl.previousPage()">            <md-icon md-svg-icon="tabs-arrow"></md-icon>          </md-prev-button>          <md-next-button              tabindex="-1"              role="button"              aria-label="Next Page"              aria-disabled="{{!$mdTabsCtrl.canPageForward()}}"              ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }"              ng-if="$mdTabsCtrl.shouldPaginate()"              ng-click="$mdTabsCtrl.nextPage()">            <md-icon md-svg-icon="tabs-arrow"></md-icon>          </md-next-button>          <md-tabs-canvas              tabindex="0"              aria-activedescendant="tab-item-{{$mdTabsCtrl.tabs[$mdTabsCtrl.focusIndex].id}}"              ng-focus="$mdTabsCtrl.redirectFocus()"              ng-class="{ \'md-paginated\': $mdTabsCtrl.shouldPaginate() }"              ng-keydown="$mdTabsCtrl.keydown($event)"              role="tablist">            <md-pagination-wrapper                ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs() }"                md-tab-scroll="$mdTabsCtrl.scroll($event)">              <md-tab-item                  tabindex="-1"                  class="md-tab"                  style="max-width: {{ tabWidth ? tabWidth + \'px\' : \'none\' }}"                  ng-repeat="tab in $mdTabsCtrl.tabs"                  role="tab"                  aria-controls="tab-content-{{tab.id}}"                  aria-selected="{{tab.isActive()}}"                  aria-disabled="{{tab.scope.disabled || \'false\'}}"                  ng-click="$mdTabsCtrl.select(tab.getIndex())"                  ng-class="{                      \'md-active\':    tab.isActive(),                      \'md-focused\':   tab.hasFocus(),                      \'md-disabled\':  tab.scope.disabled                  }"                  ng-disabled="tab.scope.disabled"                  md-swipe-left="$mdTabsCtrl.nextPage()"                  md-swipe-right="$mdTabsCtrl.previousPage()"                  md-label-template="tab.label"></md-tab-item>              <md-ink-bar ng-hide="noInkBar"></md-ink-bar>            </md-pagination-wrapper>            <div class="md-visually-hidden md-dummy-wrapper">              <md-dummy-tab                  tabindex="-1"                  id="tab-item-{{tab.id}}"                  role="tab"                  aria-controls="tab-content-{{tab.id}}"                  aria-selected="{{tab.isActive()}}"                  aria-disabled="{{tab.scope.disabled || \'false\'}}"                  ng-focus="$mdTabsCtrl.hasFocus = true"                  ng-blur="$mdTabsCtrl.hasFocus = false"                  ng-repeat="tab in $mdTabsCtrl.tabs"                  md-label-template="tab.label"></md-dummy-tab>            </div>          </md-tabs-canvas>        </md-tabs-wrapper>        <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent">          <md-tab-content              id="tab-content-{{tab.id}}"              role="tabpanel"              aria-labelledby="tab-item-{{tab.id}}"              md-tab-data="tab"              md-swipe-left="$mdTabsCtrl.incrementSelectedIndex(1)"              md-swipe-right="$mdTabsCtrl.incrementSelectedIndex(-1)"              ng-if="$mdTabsCtrl.hasContent"              ng-repeat="(index, tab) in $mdTabsCtrl.tabs"               ng-class="{                \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null,                \'md-active\':        tab.isActive(),                \'md-left\':          tab.isLeft(),                \'md-right\':         tab.isRight(),                \'md-no-scroll\':     dynamicHeight              }"></md-tab-content>        </md-tabs-content-wrapper>      ',
                controller: "MdTabsController",
                controllerAs: "$mdTabsCtrl",
                link: function(t, n, a) {
                    angular.forEach(t.$$isolateBindings, function(e, n) {
                        e.optional && angular.isUndefined(t[n]) && (t[n] = a.hasOwnProperty(a.$normalize(e.attrName)))
                    }), a.$observe("mdNoBar", function(e) {
                        t.noInkBar = angular.isDefined(e)
                    }), t.selectedIndex = angular.isNumber(t.selectedIndex) ? t.selectedIndex : 0, e(n)
                }
            }
        }
        angular.module("material.components.tabs").directive("mdTabs", e), e.$inject = ["$mdTheming"]
    }(),
    function() {
        angular.module("material.core").constant("$MD_THEME_CSS", "/* mixin definition ; sets LTR and RTL within the same style call */md-autocomplete.md-THEME_NAME-theme {  background: '{{background-50}}'; }  md-autocomplete.md-THEME_NAME-theme button md-icon path {    fill: '{{background-600}}'; }  md-autocomplete.md-THEME_NAME-theme button:after {    background: '{{background-600-0.3}}'; }.md-autocomplete-suggestions.md-THEME_NAME-theme {  background: '{{background-50}}'; }  .md-autocomplete-suggestions.md-THEME_NAME-theme li {    border-top: 1px solid '{{background-300}}';    color: '{{background-900}}'; }    .md-autocomplete-suggestions.md-THEME_NAME-theme li .highlight {      color: '{{background-600}}'; }    .md-autocomplete-suggestions.md-THEME_NAME-theme li:hover, .md-autocomplete-suggestions.md-THEME_NAME-theme li.selected {      background: '{{background-200}}'; }md-backdrop.md-opaque.md-THEME_NAME-theme {  background-color: '{{foreground-4-0.5}}'; }md-bottom-sheet.md-THEME_NAME-theme {  background-color: '{{background-50}}';  border-top-color: '{{background-300}}'; }  md-bottom-sheet.md-THEME_NAME-theme.md-list md-item {    color: '{{foreground-1}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    background-color: '{{background-50}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    color: '{{foreground-1}}'; }a.md-button.md-THEME_NAME-theme, .md-button.md-THEME_NAME-theme {  border-radius: 3px; }  a.md-button.md-THEME_NAME-theme:not([disabled]):hover, .md-button.md-THEME_NAME-theme:not([disabled]):hover {    background-color: '{{background-500-0.2}}'; }  a.md-button.md-THEME_NAME-theme:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme:not([disabled]).md-focused {    background-color: '{{background-500-0.2}}'; }  a.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover, .md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover {    background-color: transparent; }  a.md-button.md-THEME_NAME-theme.md-fab, .md-button.md-THEME_NAME-theme.md-fab {    border-radius: 50%;    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-fab md-icon, .md-button.md-THEME_NAME-theme.md-fab md-icon {      color: '{{accent-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover {      background-color: '{{accent-color}}'; }    a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused {      background-color: '{{accent-A700}}'; }  a.md-button.md-THEME_NAME-theme.md-primary, .md-button.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }    a.md-button.md-THEME_NAME-theme.md-primary.md-raised, a.md-button.md-THEME_NAME-theme.md-primary.md-fab, .md-button.md-THEME_NAME-theme.md-primary.md-raised, .md-button.md-THEME_NAME-theme.md-primary.md-fab {      color: '{{primary-contrast}}';      background-color: '{{primary-color}}'; }      a.md-button.md-THEME_NAME-theme.md-primary.md-raised md-icon, a.md-button.md-THEME_NAME-theme.md-primary.md-fab md-icon, .md-button.md-THEME_NAME-theme.md-primary.md-raised md-icon, .md-button.md-THEME_NAME-theme.md-primary.md-fab md-icon {        color: '{{primary-contrast}}'; }      a.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover {        background-color: '{{primary-color}}'; }      a.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused {        background-color: '{{primary-600}}'; }  a.md-button.md-THEME_NAME-theme.md-fab, .md-button.md-THEME_NAME-theme.md-fab {    border-radius: 50%;    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover {      background-color: '{{accent-color}}'; }    a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused {      background-color: '{{accent-A700}}'; }  a.md-button.md-THEME_NAME-theme.md-raised, .md-button.md-THEME_NAME-theme.md-raised {    color: '{{background-contrast}}';    background-color: '{{background-50}}'; }    a.md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover {      background-color: '{{background-50}}'; }    a.md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused {      background-color: '{{background-200}}'; }  a.md-button.md-THEME_NAME-theme.md-warn, .md-button.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }    a.md-button.md-THEME_NAME-theme.md-warn.md-raised, a.md-button.md-THEME_NAME-theme.md-warn.md-fab, .md-button.md-THEME_NAME-theme.md-warn.md-raised, .md-button.md-THEME_NAME-theme.md-warn.md-fab {      color: '{{warn-contrast}}';      background-color: '{{warn-color}}'; }      a.md-button.md-THEME_NAME-theme.md-warn.md-raised md-icon, a.md-button.md-THEME_NAME-theme.md-warn.md-fab md-icon, .md-button.md-THEME_NAME-theme.md-warn.md-raised md-icon, .md-button.md-THEME_NAME-theme.md-warn.md-fab md-icon {        color: '{{warn-contrast}}'; }      a.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover {        background-color: '{{warn-color}}'; }      a.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused {        background-color: '{{warn-700}}'; }  a.md-button.md-THEME_NAME-theme.md-accent, .md-button.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }    a.md-button.md-THEME_NAME-theme.md-accent.md-raised, a.md-button.md-THEME_NAME-theme.md-accent.md-fab, .md-button.md-THEME_NAME-theme.md-accent.md-raised, .md-button.md-THEME_NAME-theme.md-accent.md-fab {      color: '{{accent-contrast}}';      background-color: '{{accent-color}}'; }      a.md-button.md-THEME_NAME-theme.md-accent.md-raised md-icon, a.md-button.md-THEME_NAME-theme.md-accent.md-fab md-icon, .md-button.md-THEME_NAME-theme.md-accent.md-raised md-icon, .md-button.md-THEME_NAME-theme.md-accent.md-fab md-icon {        color: '{{accent-contrast}}'; }      a.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover {        background-color: '{{accent-color}}'; }      a.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused {        background-color: '{{accent-700}}'; }  a.md-button.md-THEME_NAME-theme[disabled], a.md-button.md-THEME_NAME-theme.md-raised[disabled], a.md-button.md-THEME_NAME-theme.md-fab[disabled], .md-button.md-THEME_NAME-theme[disabled], .md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled] {    color: '{{foreground-2}}';    cursor: not-allowed; }    a.md-button.md-THEME_NAME-theme[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon, .md-button.md-THEME_NAME-theme[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon, .md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon {      color: '{{foreground-2}}'; }  a.md-button.md-THEME_NAME-theme.md-raised[disabled], a.md-button.md-THEME_NAME-theme.md-fab[disabled], .md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled] {    background-color: '{{foreground-4}}'; }  a.md-button.md-THEME_NAME-theme[disabled], .md-button.md-THEME_NAME-theme[disabled] {    background-color: 'transparent'; }md-card.md-THEME_NAME-theme {  background-color: '{{background-color}}';  border-radius: 2px; }  md-card.md-THEME_NAME-theme .md-card-image {    border-radius: 2px 2px 0 0; }md-checkbox.md-THEME_NAME-theme .md-ripple {  color: '{{accent-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked.md-focused .md-container:before {  background-color: '{{accent-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon {  background-color: '{{accent-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple {  color: '{{primary-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon {  background-color: '{{primary-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked.md-focused .md-container:before {  background-color: '{{primary-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple {  color: '{{warn-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon {  background-color: '{{warn-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked.md-focused:not([disabled]) .md-container:before {  background-color: '{{warn-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-icon {  border-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon {  background-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-label {  color: '{{foreground-3}}'; }md-chips.md-THEME_NAME-theme {  background: '{{background-50}}'; }  md-chips.md-THEME_NAME-theme .md-chip {    background: '{{background-300}}';    color: '{{background-800}}'; }    md-chips.md-THEME_NAME-theme .md-chip.md-focused {      background: '{{primary-color}}';      color: '{{primary-contrast}}'; }      md-chips.md-THEME_NAME-theme .md-chip.md-focused md-icon {        color: '{{primary-contrast}}'; }  md-chips.md-THEME_NAME-theme md-chip-remove .md-button md-icon path {    fill: '{{background-500}}'; }.md-contact-suggestion span.md-contact-email {  color: '{{background-400}}'; }md-content.md-THEME_NAME-theme {  background-color: '{{background-color}}'; }md-dialog.md-THEME_NAME-theme {  border-radius: 4px;  background-color: '{{background-color}}'; }  md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions {    border-top-color: '{{foreground-4}}'; }md-divider.md-THEME_NAME-theme {  border-top-color: '{{foreground-4}}'; }md-icon.md-THEME_NAME-theme {  color: '{{foreground-2}}'; }  md-icon.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  md-icon.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  md-icon.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-input-container.md-THEME_NAME-theme .md-input {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}';  text-shadow: '{{foreground-shadow}}'; }  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder, md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder {    color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme > md-icon {  color: '{{foreground-1}}'; }md-input-container.md-THEME_NAME-theme label, md-input-container.md-THEME_NAME-theme .md-placeholder {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme ng-messages, md-input-container.md-THEME_NAME-theme [ng-message], md-input-container.md-THEME_NAME-theme [data-ng-message], md-input-container.md-THEME_NAME-theme [x-ng-message] {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label {  color: '{{foreground-2}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input {  border-color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused md-icon {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input {  border-color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid.md-input-focused label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid data-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid x-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid [ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [data-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [x-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme .md-input[disabled], [disabled] md-input-container.md-THEME_NAME-theme .md-input {  border-bottom-color: transparent;  color: '{{foreground-3}}';  background-image: linear-gradient(to right, '{{foreground-4}}' 0%, '{{foreground-4}}' 33%, transparent 0%);  background-image: -ms-linear-gradient(left, transparent 0%, '{{foreground-4}}' 100%); }md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3, md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4, md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3, md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4 {  color: '{{foreground-1}}'; }md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p, md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p {  color: '{{foreground-2}}'; }md-list.md-THEME_NAME-theme .md-proxy-focus.md-focused div.md-no-style {  background-color: '{{background-100}}'; }md-list.md-THEME_NAME-theme md-list-item > md-icon {  color: '{{foreground-2}}'; }  md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight {    color: '{{primary-color}}'; }    md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight.md-accent {      color: '{{accent-color}}'; }md-list.md-THEME_NAME-theme md-list-item button {  background-color: '{{background-color}}'; }  md-list.md-THEME_NAME-theme md-list-item button.md-button:not([disabled]):hover {    background-color: '{{background-color}}'; }md-progress-circular.md-THEME_NAME-theme {  background-color: transparent; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-gap {    border-top-color: '{{primary-color}}';    border-bottom-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-top-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-right-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle {    border-left-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-gap {    border-top-color: '{{warn-color}}';    border-bottom-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-top-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-right-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle {    border-left-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-gap {    border-top-color: '{{accent-color}}';    border-bottom-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-top-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-right-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle {    border-left-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme .md-container {  background-color: '{{primary-100}}'; }md-progress-linear.md-THEME_NAME-theme .md-bar {  background-color: '{{primary-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-container {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar {  background-color: '{{warn-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-container {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar {  background-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1 {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before {  background: radial-gradient('{{warn-100}}' 0%, '{{warn-100}}' 16%, transparent 42%); }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1 {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before {  background: radial-gradient('{{accent-100}}' 0%, '{{accent-100}}' 16%, transparent 42%); }md-radio-button.md-THEME_NAME-theme .md-off {  border-color: '{{foreground-2}}'; }md-radio-button.md-THEME_NAME-theme .md-on {  background-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-off {  border-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme .md-container .md-ripple {  color: '{{accent-600}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-on, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-on {  background-color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off {  border-color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple {  color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple {  color: '{{primary-600}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-on, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on {  background-color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off {  border-color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple {  color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple, md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple {  color: '{{warn-600}}'; }md-radio-group.md-THEME_NAME-theme[disabled], md-radio-button.md-THEME_NAME-theme[disabled] {  color: '{{foreground-3}}'; }  md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-off, md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off {    border-color: '{{foreground-3}}'; }  md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-on, md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on {    border-color: '{{foreground-3}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked .md-container:before {  background-color: '{{accent-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked:not([disabled]).md-primary .md-container:before {  background-color: '{{primary-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-primary .md-container:before {  background-color: '{{warn-color-0.26}}'; }md-select.md-THEME_NAME-theme.ng-invalid.ng-dirty .md-select-label {  color: '{{warn-500}}' !important;  border-bottom-color: '{{warn-500}}' !important; }md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-label {  border-bottom-color: '{{primary-color}}';  color: '{{ foreground-1 }}'; }  md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-label.md-placeholder {    color: '{{ foreground-1 }}'; }md-select.md-THEME_NAME-theme:not([disabled]):focus.md-accent .md-select-label {  border-bottom-color: '{{accent-color}}'; }md-select.md-THEME_NAME-theme:not([disabled]):focus.md-warn .md-select-label {  border-bottom-color: '{{warn-color}}'; }md-select.md-THEME_NAME-theme[disabled] .md-select-label {  color: '{{foreground-3}}'; }  md-select.md-THEME_NAME-theme[disabled] .md-select-label.md-placeholder {    color: '{{foreground-3}}'; }md-select.md-THEME_NAME-theme .md-select-label {  border-bottom-color: '{{foreground-4}}'; }  md-select.md-THEME_NAME-theme .md-select-label.md-placeholder {    color: '{{foreground-2}}'; }md-select-menu.md-THEME_NAME-theme md-optgroup {  color: '{{foreground-2}}'; }  md-select-menu.md-THEME_NAME-theme md-optgroup md-option {    color: '{{foreground-1}}'; }md-select-menu.md-THEME_NAME-theme md-option[selected] {  color: '{{primary-500}}'; }  md-select-menu.md-THEME_NAME-theme md-option[selected]:focus {    color: '{{primary-600}}'; }  md-select-menu.md-THEME_NAME-theme md-option[selected].md-accent {    color: '{{accent-500}}'; }    md-select-menu.md-THEME_NAME-theme md-option[selected].md-accent:focus {      color: '{{accent-600}}'; }md-select-menu.md-THEME_NAME-theme md-option:focus:not([selected]) {  background: '{{background-200}}'; }md-sidenav.md-THEME_NAME-theme {  background-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme .md-track {  background-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme .md-track-ticks {  background-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-focus-thumb {  background-color: '{{foreground-2}}'; }md-slider.md-THEME_NAME-theme .md-focus-ring {  border-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-disabled-thumb {  border-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme.md-min .md-thumb:after {  background-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme .md-track.md-track-fill {  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb:after {  border-color: '{{accent-color}}';  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-sign {  background-color: '{{accent-color}}'; }  md-slider.md-THEME_NAME-theme .md-sign:after {    border-top-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb-text {  color: '{{accent-contrast}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-track.md-track-fill {  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after {  border-color: '{{warn-color}}';  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-sign {  background-color: '{{warn-color}}'; }  md-slider.md-THEME_NAME-theme.md-warn .md-sign:after {    border-top-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text {  color: '{{warn-contrast}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-track.md-track-fill {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after {  border-color: '{{primary-color}}';  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-sign {  background-color: '{{primary-color}}'; }  md-slider.md-THEME_NAME-theme.md-primary .md-sign:after {    border-top-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text {  color: '{{primary-contrast}}'; }md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after {  border-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after {  background-color: '{{foreground-3}}'; }.md-subheader.md-THEME_NAME-theme {  color: '{{ foreground-2-0.23 }}';  background-color: '{{background-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme .md-thumb {  background-color: '{{background-50}}'; }md-switch.md-THEME_NAME-theme .md-bar {  background-color: '{{background-500}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-thumb {  background-color: '{{accent-color}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-bar {  background-color: '{{accent-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-focused .md-thumb:before {  background-color: '{{accent-color-0.26}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-thumb {  background-color: '{{primary-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-bar {  background-color: '{{primary-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary.md-focused .md-thumb:before {  background-color: '{{primary-color-0.26}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-thumb {  background-color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-bar {  background-color: '{{warn-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn.md-focused .md-thumb:before {  background-color: '{{warn-color-0.26}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-thumb {  background-color: '{{background-400}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-bar {  background-color: '{{foreground-4}}'; }md-tabs.md-THEME_NAME-theme md-tabs-wrapper {  background-color: transparent;  border-color: '{{foreground-4}}'; }md-tabs.md-THEME_NAME-theme .md-paginator md-icon {  color: '{{primary-color}}'; }md-tabs.md-THEME_NAME-theme md-ink-bar {  color: '{{accent-color}}';  background: '{{accent-color}}'; }md-tabs.md-THEME_NAME-theme .md-tab {  color: '{{foreground-2}}'; }  md-tabs.md-THEME_NAME-theme .md-tab[disabled] {    color: '{{foreground-3}}'; }  md-tabs.md-THEME_NAME-theme .md-tab.md-active, md-tabs.md-THEME_NAME-theme .md-tab.md-focused {    color: '{{primary-color}}'; }  md-tabs.md-THEME_NAME-theme .md-tab.md-focused {    background: '{{primary-color-0.1}}'; }  md-tabs.md-THEME_NAME-theme .md-tab .md-ripple-container {    color: '{{accent-100}}'; }md-tabs.md-THEME_NAME-theme.md-accent md-tabs-wrapper {  background-color: '{{accent-color}}'; }md-tabs.md-THEME_NAME-theme.md-accent md-tab-item:not([disabled]) {  color: '{{accent-100}}'; }  md-tabs.md-THEME_NAME-theme.md-accent md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-accent md-tab-item:not([disabled]).md-focused {    color: '{{accent-contrast}}'; }  md-tabs.md-THEME_NAME-theme.md-accent md-tab-item:not([disabled]).md-focused {    background: '{{accent-contrast-0.1}}'; }md-tabs.md-THEME_NAME-theme.md-accent md-ink-bar {  color: '{{primary-600-1}}';  background: '{{primary-600-1}}'; }md-tabs.md-THEME_NAME-theme.md-primary md-tabs-wrapper {  background-color: '{{primary-color}}'; }md-tabs.md-THEME_NAME-theme.md-primary md-tab-item:not([disabled]) {  color: '{{primary-100}}'; }  md-tabs.md-THEME_NAME-theme.md-primary md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-primary md-tab-item:not([disabled]).md-focused {    color: '{{primary-contrast}}'; }  md-tabs.md-THEME_NAME-theme.md-primary md-tab-item:not([disabled]).md-focused {    background: '{{primary-contrast-0.1}}'; }md-tabs.md-THEME_NAME-theme.md-warn md-tabs-wrapper {  background-color: '{{warn-color}}'; }md-tabs.md-THEME_NAME-theme.md-warn md-tab-item:not([disabled]) {  color: '{{warn-100}}'; }  md-tabs.md-THEME_NAME-theme.md-warn md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-warn md-tab-item:not([disabled]).md-focused {    color: '{{warn-contrast}}'; }  md-tabs.md-THEME_NAME-theme.md-warn md-tab-item:not([disabled]).md-focused {    background: '{{warn-contrast-0.1}}'; }md-toolbar > md-tabs.md-THEME_NAME-theme md-tabs-wrapper {  background-color: '{{primary-color}}'; }md-toolbar > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]) {  color: '{{primary-100}}'; }  md-toolbar > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-active, md-toolbar > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    color: '{{primary-contrast}}'; }  md-toolbar > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    background: '{{primary-contrast-0.1}}'; }md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-tabs-wrapper {  background-color: '{{accent-color}}'; }md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]) {  color: '{{accent-100}}'; }  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-active, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    color: '{{accent-contrast}}'; }  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    background: '{{accent-contrast-0.1}}'; }md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme md-ink-bar {  color: '{{primary-600-1}}';  background: '{{primary-600-1}}'; }md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme md-tabs-wrapper {  background-color: '{{warn-color}}'; }md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]) {  color: '{{warn-100}}'; }  md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-active, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    color: '{{warn-contrast}}'; }  md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme md-tab-item:not([disabled]).md-focused {    background: '{{warn-contrast-0.1}}'; }md-toast.md-THEME_NAME-theme {  background-color: #323232;  color: '{{background-50}}'; }  md-toast.md-THEME_NAME-theme .md-button {    color: '{{background-50}}'; }    md-toast.md-THEME_NAME-theme .md-button.md-highlight {      color: '{{primary-A200}}'; }      md-toast.md-THEME_NAME-theme .md-button.md-highlight.md-accent {        color: '{{accent-A200}}'; }      md-toast.md-THEME_NAME-theme .md-button.md-highlight.md-warn {        color: '{{warn-A200}}'; }md-toolbar.md-THEME_NAME-theme {  background-color: '{{primary-color}}';  color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme .md-button {    color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-accent {    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-warn {    background-color: '{{warn-color}}';    color: '{{warn-contrast}}'; }md-tooltip.md-THEME_NAME-theme {  color: '{{background-A100}}'; }  md-tooltip.md-THEME_NAME-theme .md-background {    background-color: '{{foreground-2}}'; }");

    }();
var DocsApp = angular.module("docsApp", ["ngMaterial", "ngRoute", "angularytics", "ngMessages"]).config(["SERVICES", "COMPONENTS", "DEMOS", "PAGES", "$routeProvider", "$mdThemingProvider", function(e, t, n, a, o, r) {
    o.when("/", {
        templateUrl: "partials/home.tmpl.html"
    }).when("/layout/:tmpl", {
        templateUrl: function(e) {
            return "partials/layout-" + e.tmpl + ".tmpl.html"
        }
    }).when("/layout/", {
        redirectTo: function() {
            return "/layout/container"
        }
    }).when("/demo/", {
        redirectTo: function() {
            return n[0].url
        }
    }).when("/api/", {
        redirectTo: function() {
            return t[0].docs[0].url
        }
    }).when("/getting-started", {
        templateUrl: "partials/getting-started.tmpl.html"
    }), r.theme("docs-dark", "default").primaryPalette("yellow").dark(), angular.forEach(a, function(e, t) {
        angular.forEach(e, function(e) {
            o.when(e.url, {
                templateUrl: e.outputPath,
                controller: "GuideCtrl"
            })
        })
    }), angular.forEach(t, function(e) {
        angular.forEach(e.docs, function(t) {
            t.url = "/" + t.url, o.when(t.url, {
                templateUrl: t.outputPath,
                resolve: {
                    component: function() {
                        return e
                    },
                    doc: function() {
                        return t
                    }
                },
                controller: "ComponentDocCtrl"
            })
        })
    }), angular.forEach(e, function(e) {
        e.url = "/" + e.url, o.when(e.url, {
            templateUrl: e.outputPath,
            resolve: {
                component: function() {
                    return void 0
                },
                doc: function() {
                    return e
                }
            },
            controller: "ComponentDocCtrl"
        })
    }), angular.forEach(n, function(e) {
        var n;
        angular.forEach(t, function(t) {
            e.name === t.name && (n = t)
        }), n = n || angular.extend({}, e), o.when(e.url, {
            templateUrl: "partials/demo.tmpl.html",
            controller: "DemoCtrl",
            resolve: {
                component: function() {
                    return n
                },
                demos: function() {
                    return e.demos
                }
            }
        })
    }), o.otherwise("/")
}]).config(["AngularyticsProvider", function(e) {
    e.setEventHandlers(["Console", "GoogleUniversal"])
}]).run(["Angularytics", "$rootScope", "$timeout", function(e, t, n) {
    e.init()
}]).factory("menu", ["SERVICES", "COMPONENTS", "DEMOS", "PAGES", "$location", "$rootScope", function(e, t, n, a, o, r) {
    function i(e, t) {
        return e.name < t.name ? -1 : 1
    }

    function l() {
        var e = o.path(),
            t = function(t, n) {
                e === n.url && (u.selectSection(t), u.selectPage(t, n))
            };
        d.forEach(function(e) {
            e.children ? e.children.forEach(function(e) {
                e.pages && e.pages.forEach(function(n) {
                    t(e, n)
                })
            }) : e.pages ? e.pages.forEach(function(n) {
                t(e, n)
            }) : "link" === e.type && t(e, e)
        })
    }
    var d = [{
            name: "Getting Started",
            url: "/getting-started",
            type: "link"
        }],
        s = [];
    angular.forEach(n, function(e) {
        s.push({
            name: e.label,
            url: e.url
        })
    }), d.push({
        name: "Demos",
        pages: s.sort(i),
        type: "toggle"
    }), d.push(), d.push({
        name: "Customization",
        type: "heading",
        children: [{
            name: "CSS",
            type: "toggle",
            pages: [{
                name: "Typography",
                url: "/CSS/typography",
                type: "link"
            }]
        }, {
            name: "Theming",
            type: "toggle",
            pages: [{
                name: "Introduction and Terms",
                url: "/Theming/01_introduction",
                type: "link"
            }, {
                name: "Declarative Syntax",
                url: "/Theming/02_declarative_syntax",
                type: "link"
            }, {
                name: "Configuring a Theme",
                url: "/Theming/03_configuring_a_theme",
                type: "link"
            }, {
                name: "Multiple Themes",
                url: "/Theming/04_multiple_themes",
                type: "link"
            }]
        }]
    });
    var m = {},
        c = {};
    t.forEach(function(e) {
        e.docs.forEach(function(e) {
            angular.isDefined(e["private"]) || (c[e.type] = c[e.type] || [], c[e.type].push(e), m[e.module] = m[e.module] || [], m[e.module].push(e))
        })
    }), e.forEach(function(e) {
        angular.isDefined(e["private"]) || (c[e.type] = c[e.type] || [], c[e.type].push(e), m[e.module] = m[e.module] || [], m[e.module].push(e))
    }), d.push({
        name: "API Reference",
        type: "heading",
        children: [{
            name: "Layout",
            type: "toggle",
            pages: [{
                name: "Container Elements",
                id: "layoutContainers",
                url: "/layout/container"
            }, {
                name: "Grid System",
                id: "layoutGrid",
                url: "/layout/grid"
            }, {
                name: "Child Alignment",
                id: "layoutAlign",
                url: "/layout/alignment"
            }, {
                name: "Options",
                id: "layoutOptions",
                url: "/layout/options"
            }]
        }, {
            name: "Services",
            pages: c.service.sort(i),
            type: "toggle"
        }, {
            name: "Directives",
            pages: c.directive.sort(i),
            type: "toggle"
        }]
    });
    var u;
    return r.$on("$locationChangeSuccess", l), u = {
        sections: d,
        selectSection: function(e) {
            u.openedSection = e
        },
        toggleSelectSection: function(e) {
            u.openedSection = u.openedSection === e ? null : e
        },
        isSectionSelected: function(e) {
            return u.openedSection === e
        },
        selectPage: function(e, t) {
            u.currentSection = e, u.currentPage = t
        },
        isPageSelected: function(e) {
            return u.currentPage === e
        }
    }
}]).directive("menuLink", function() {
    return {
        scope: {
            section: "="
        },
        templateUrl: "partials/menu-link.tmpl.html",
        link: function(e, t) {
            var n = t.parent().controller();
            e.isSelected = function() {
                return n.isSelected(e.section)
            }, e.focusSection = function() {
                n.autoFocusContent = !0
            }
        }
    }
}).directive("menuToggle", function() {
    return {
        scope: {
            section: "="
        },
        templateUrl: "partials/menu-toggle.tmpl.html",
        link: function(e, t) {
            var n = t.parent().controller();
            e.isOpen = function() {
                return n.isOpen(e.section)
            }, e.toggle = function() {
                n.toggleOpen(e.section)
            };
            var a = t[0].parentNode.parentNode.parentNode;
            if (a.classList.contains("parent-list-item")) {
                var o = a.querySelector("h2");
                t[0].firstChild.setAttribute("aria-describedby", o.id)
            }
        }
    }
}).controller("DocsCtrl", ["$scope", "COMPONENTS", "BUILDCONFIG", "$mdSidenav", "$timeout", "$mdDialog", "menu", "$location", "$rootScope", "$log", function(e, t, n, a, o, r, i, l, d, s) {
    function m() {
        o(function() {
            a("left").close()
        })
    }

    function c() {
        o(function() {
            a("left").open()
        })
    }

    function u() {
        return l.path()
    }

    function p(e) {
        i.selectPage(null, null), l.path("/")
    }

    function h() {
        e.closeMenu(), y.autoFocusContent && (f(), y.autoFocusContent = !1)
    }

    function f(e) {
        e && e.preventDefault(), o(function() {
            M.focus()
        }, 90)
    }

    function g(e) {
        return i.isPageSelected(e)
    }

    function b(e) {
        var t = !1,
            n = i.openedSection;
        return n === e ? t = !0 : e.children && e.children.forEach(function(e) {
            e === n && (t = !0)
        }), t
    }

    function v(e) {
        return i.isSectionSelected(e)
    }

    function E(e) {
        i.toggleSelectSection(e)
    }
    var y = this;
    e.COMPONENTS = t, e.BUILDCONFIG = n, e.menu = i, e.path = u, e.goHome = p, e.openMenu = c, e.closeMenu = m, e.isSectionSelected = b, d.$on("$locationChangeSuccess", h), e.focusMainContent = f, this.isOpen = v, this.isSelected = g, this.toggleOpen = E, this.autoFocusContent = !1;
    var M = document.querySelector("[role='main']")
}]).controller("HomeCtrl", ["$scope", "$rootScope", "$http", function(e, t, n) {
    t.currentComponent = t.currentDoc = null, e.version = "", e.versionURL = "";
    Math.round((new Date).getTime() / 1e3);
    n.get("version.json").then(function(t) {
        var n = t.data.sha || "",
            a = t.data.url;
        n && (e.versionURL = a + n, e.version = n.substr(0, 6))
    })
}]).controller("GuideCtrl", ["$rootScope", function(e) {
    e.currentComponent = e.currentDoc = null
}]).controller("LayoutCtrl", ["$scope", "$attrs", "$location", "$rootScope", function(e, t, n, a) {
    a.currentComponent = a.currentDoc = null, e.layoutDemo = {
        mainAxis: "center",
        crossAxis: "center",
        direction: "row"
    }, e.layoutAlign = function() {
        return e.layoutDemo.mainAxis + " " + e.layoutDemo.crossAxis
    }
}]).controller("ComponentDocCtrl", ["$scope", "doc", "component", "$rootScope", "$templateCache", "$http", "$q", function(e, t, n, a, o, r, i) {
    a.currentComponent = n, a.currentDoc = t
}]).controller("DemoCtrl", ["$rootScope", "$scope", "component", "demos", "$http", "$templateCache", "$q", function(e, t, n, a, o, r, i) {
    e.currentComponent = n, e.currentDoc = null, t.demos = [], angular.forEach(a, function(e) {
        var n = [e.index].concat(e.js || []).concat(e.css || []).concat(e.html || []);
        n.forEach(function(e) {
            e.httpPromise = o.get(e.outputPath, {
                cache: r
            }).then(function(t) {
                return e.contents = t.data.replace("<head/>", ""), e.contents
            })
        }), e.$files = n, t.demos.push(e)
    }), t.demos = t.demos.sort(function(e, t) {
        return e.name > t.name ? 1 : -1
    })
}]).filter("nospace", function() {
    return function(e) {
        return e ? e.replace(/ /g, "") : ""
    }
}).filter("humanizeDoc", function() {
    return function(e) {
        return e ? "directive" === e.type ? e.name.replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase()
        }) : e.label || e.name : void 0
    }
}).filter("directiveBrackets", function() {
    return function(e) {
        return e.indexOf("-") > -1 ? "<" + e + ">" : e
    }
});
DocsApp.constant("BUILDCONFIG", {
    ngVersion: "1.3.15",
    version: "0.9.0-rc1",
    repository: "https://github.com/angular/material",
    commit: "c964609e1f8842418d8494fe6bb8f276885aafa6",
    date: "2015-04-17 17:29:11 -0400"
}), DocsApp.constant("COMPONENTS", [{
    name: "material.components.bottomSheet",
    type: "module",
    outputPath: "partials/api/material.components.bottomSheet/index.html",
    url: "api/material.components.bottomSheet",
    label: "material.components.bottomSheet",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "$mdBottomSheet",
        type: "service",
        outputPath: "partials/api/material.components.bottomSheet/service/$mdBottomSheet.html",
        url: "api/material.components.bottomSheet/service/$mdBottomSheet",
        label: "$mdBottomSheet",
        hasDemo: !1,
        module: "material.components.bottomSheet",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/bottomSheet/bottomSheet.js"
    }]
}, {
    name: "material.components.button",
    type: "module",
    outputPath: "partials/api/material.components.button/index.html",
    url: "api/material.components.button",
    label: "material.components.button",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdButton",
        type: "directive",
        outputPath: "partials/api/material.components.button/directive/mdButton.html",
        url: "api/material.components.button/directive/mdButton",
        label: "mdButton",
        hasDemo: !0,
        module: "material.components.button",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/button/button.js"
    }]
}, {
    name: "material.components.card",
    type: "module",
    outputPath: "partials/api/material.components.card/index.html",
    url: "api/material.components.card",
    label: "material.components.card",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdCard",
        type: "directive",
        outputPath: "partials/api/material.components.card/directive/mdCard.html",
        url: "api/material.components.card/directive/mdCard",
        label: "mdCard",
        hasDemo: !0,
        module: "material.components.card",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/card/card.js"
    }]
}, {
    name: "material.components.checkbox",
    type: "module",
    outputPath: "partials/api/material.components.checkbox/index.html",
    url: "api/material.components.checkbox",
    label: "material.components.checkbox",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdCheckbox",
        type: "directive",
        outputPath: "partials/api/material.components.checkbox/directive/mdCheckbox.html",
        url: "api/material.components.checkbox/directive/mdCheckbox",
        label: "mdCheckbox",
        hasDemo: !0,
        module: "material.components.checkbox",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/checkbox/checkbox.js"
    }]
}, {
    name: "material.components.content",
    type: "module",
    outputPath: "partials/api/material.components.content/index.html",
    url: "api/material.components.content",
    label: "material.components.content",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdContent",
        type: "directive",
        outputPath: "partials/api/material.components.content/directive/mdContent.html",
        url: "api/material.components.content/directive/mdContent",
        label: "mdContent",
        hasDemo: !0,
        module: "material.components.content",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/content/content.js"
    }]
}, {
    name: "material.components.dialog",
    type: "module",
    outputPath: "partials/api/material.components.dialog/index.html",
    url: "api/material.components.dialog",
    label: "material.components.dialog",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "$mdDialog",
        type: "service",
        outputPath: "partials/api/material.components.dialog/service/$mdDialog.html",
        url: "api/material.components.dialog/service/$mdDialog",
        label: "$mdDialog",
        hasDemo: !1,
        module: "material.components.dialog",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/dialog/dialog.js"
    }]
}, {
    name: "material.components.divider",
    type: "module",
    outputPath: "partials/api/material.components.divider/index.html",
    url: "api/material.components.divider",
    label: "material.components.divider",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdDivider",
        type: "directive",
        outputPath: "partials/api/material.components.divider/directive/mdDivider.html",
        url: "api/material.components.divider/directive/mdDivider",
        label: "mdDivider",
        hasDemo: !0,
        module: "material.components.divider",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/divider/divider.js"
    }]
}, {
    name: "material.components.gridList",
    type: "module",
    outputPath: "partials/api/material.components.gridList/index.html",
    url: "api/material.components.gridList",
    label: "material.components.gridList",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdGridList",
        type: "directive",
        outputPath: "partials/api/material.components.gridList/directive/mdGridList.html",
        url: "api/material.components.gridList/directive/mdGridList",
        label: "mdGridList",
        hasDemo: !0,
        module: "material.components.gridList",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/gridList/gridList.js"
    }, {
        name: "mdGridTile",
        type: "directive",
        outputPath: "partials/api/material.components.gridList/directive/mdGridTile.html",
        url: "api/material.components.gridList/directive/mdGridTile",
        label: "mdGridTile",
        hasDemo: !0,
        module: "material.components.gridList",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/gridList/gridList.js"
    }]
}, {
    name: "material.components.icon",
    type: "module",
    outputPath: "partials/api/material.components.icon/index.html",
    url: "api/material.components.icon",
    label: "material.components.icon",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdIcon",
        type: "directive",
        outputPath: "partials/api/material.components.icon/directive/mdIcon.html",
        url: "api/material.components.icon/directive/mdIcon",
        label: "mdIcon",
        hasDemo: !0,
        module: "material.components.icon",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/icon/icon.js"
    }, {
        name: "$mdIconProvider",
        type: "service",
        outputPath: "partials/api/material.components.icon/service/$mdIconProvider.html",
        url: "api/material.components.icon/service/$mdIconProvider",
        label: "$mdIconProvider",
        hasDemo: !1,
        module: "material.components.icon",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/icon/icon.js"
    }, {
        name: "$mdIcon",
        type: "service",
        outputPath: "partials/api/material.components.icon/service/$mdIcon.html",
        url: "api/material.components.icon/service/$mdIcon",
        label: "$mdIcon",
        hasDemo: !1,
        module: "material.components.icon",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/icon/icon.js"
    }]
}, {
    name: "material.components.input",
    type: "module",
    outputPath: "partials/api/material.components.input/index.html",
    url: "api/material.components.input",
    label: "material.components.input",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdInputContainer",
        type: "directive",
        outputPath: "partials/api/material.components.input/directive/mdInputContainer.html",
        url: "api/material.components.input/directive/mdInputContainer",
        label: "mdInputContainer",
        hasDemo: !0,
        module: "material.components.input",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/input/input.js"
    }, {
        name: "mdInput",
        type: "directive",
        outputPath: "partials/api/material.components.input/directive/mdInput.html",
        url: "api/material.components.input/directive/mdInput",
        label: "mdInput",
        hasDemo: !0,
        module: "material.components.input",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/input/input.js"
    }]
}, {
    name: "material.components.list",
    type: "module",
    outputPath: "partials/api/material.components.list/index.html",
    url: "api/material.components.list",
    label: "material.components.list",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdList",
        type: "directive",
        outputPath: "partials/api/material.components.list/directive/mdList.html",
        url: "api/material.components.list/directive/mdList",
        label: "mdList",
        hasDemo: !0,
        module: "material.components.list",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/list/list.js"
    }, {
        name: "mdListItem",
        type: "directive",
        outputPath: "partials/api/material.components.list/directive/mdListItem.html",
        url: "api/material.components.list/directive/mdListItem",
        label: "mdListItem",
        hasDemo: !0,
        module: "material.components.list",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/list/list.js"
    }]
}, {
    name: "material.components.progressCircular",
    type: "module",
    outputPath: "partials/api/material.components.progressCircular/index.html",
    url: "api/material.components.progressCircular",
    label: "material.components.progressCircular",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdProgressCircular",
        type: "directive",
        outputPath: "partials/api/material.components.progressCircular/directive/mdProgressCircular.html",
        url: "api/material.components.progressCircular/directive/mdProgressCircular",
        label: "mdProgressCircular",
        hasDemo: !0,
        module: "material.components.progressCircular",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/progressCircular/progressCircular.js"
    }]
}, {
    name: "material.components.progressLinear",
    type: "module",
    outputPath: "partials/api/material.components.progressLinear/index.html",
    url: "api/material.components.progressLinear",
    label: "material.components.progressLinear",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdProgressLinear",
        type: "directive",
        outputPath: "partials/api/material.components.progressLinear/directive/mdProgressLinear.html",
        url: "api/material.components.progressLinear/directive/mdProgressLinear",
        label: "mdProgressLinear",
        hasDemo: !0,
        module: "material.components.progressLinear",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/progressLinear/progressLinear.js"
    }]
}, {
    name: "material.components.radioButton",
    type: "module",
    outputPath: "partials/api/material.components.radioButton/index.html",
    url: "api/material.components.radioButton",
    label: "material.components.radioButton",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdRadioGroup",
        type: "directive",
        outputPath: "partials/api/material.components.radioButton/directive/mdRadioGroup.html",
        url: "api/material.components.radioButton/directive/mdRadioGroup",
        label: "mdRadioGroup",
        hasDemo: !0,
        module: "material.components.radioButton",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/radioButton/radioButton.js"
    }, {
        name: "mdRadioButton",
        type: "directive",
        outputPath: "partials/api/material.components.radioButton/directive/mdRadioButton.html",
        url: "api/material.components.radioButton/directive/mdRadioButton",
        label: "mdRadioButton",
        hasDemo: !0,
        module: "material.components.radioButton",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/radioButton/radioButton.js"
    }]
}, {
    name: "material.components.select",
    type: "module",
    outputPath: "partials/api/material.components.select/index.html",
    url: "api/material.components.select",
    label: "material.components.select",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdSelect",
        type: "directive",
        outputPath: "partials/api/material.components.select/directive/mdSelect.html",
        url: "api/material.components.select/directive/mdSelect",
        label: "mdSelect",
        hasDemo: !0,
        module: "material.components.select",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/select/select.js"
    }]
}, {
    name: "material.components.sidenav",
    type: "module",
    outputPath: "partials/api/material.components.sidenav/index.html",
    url: "api/material.components.sidenav",
    label: "material.components.sidenav",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "$mdSidenav",
        type: "service",
        outputPath: "partials/api/material.components.sidenav/service/$mdSidenav.html",
        url: "api/material.components.sidenav/service/$mdSidenav",
        label: "$mdSidenav",
        hasDemo: !1,
        module: "material.components.sidenav",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/sidenav/sidenav.js"
    }, {
        name: "mdSidenavFocus",
        type: "directive",
        outputPath: "partials/api/material.components.sidenav/directive/mdSidenavFocus.html",
        url: "api/material.components.sidenav/directive/mdSidenavFocus",
        label: "mdSidenavFocus",
        hasDemo: !0,
        module: "material.components.sidenav",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/sidenav/sidenav.js"
    }, {
        name: "mdSidenav",
        type: "directive",
        outputPath: "partials/api/material.components.sidenav/directive/mdSidenav.html",
        url: "api/material.components.sidenav/directive/mdSidenav",
        label: "mdSidenav",
        hasDemo: !0,
        module: "material.components.sidenav",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/sidenav/sidenav.js"
    }]
}, {
    name: "material.components.slider",
    type: "module",
    outputPath: "partials/api/material.components.slider/index.html",
    url: "api/material.components.slider",
    label: "material.components.slider",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdSlider",
        type: "directive",
        outputPath: "partials/api/material.components.slider/directive/mdSlider.html",
        url: "api/material.components.slider/directive/mdSlider",
        label: "mdSlider",
        hasDemo: !0,
        module: "material.components.slider",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/slider/slider.js"
    }]
}, {
    name: "material.components.subheader",
    type: "module",
    outputPath: "partials/api/material.components.subheader/index.html",
    url: "api/material.components.subheader",
    label: "material.components.subheader",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdSubheader",
        type: "directive",
        outputPath: "partials/api/material.components.subheader/directive/mdSubheader.html",
        url: "api/material.components.subheader/directive/mdSubheader",
        label: "mdSubheader",
        hasDemo: !0,
        module: "material.components.subheader",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/subheader/subheader.js"
    }]
}, {
    name: "material.components.swipe",
    type: "module",
    outputPath: "partials/api/material.components.swipe/index.html",
    url: "api/material.components.swipe",
    label: "material.components.swipe",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdSwipeLeft",
        type: "directive",
        outputPath: "partials/api/material.components.swipe/directive/mdSwipeLeft.html",
        url: "api/material.components.swipe/directive/mdSwipeLeft",
        label: "mdSwipeLeft",
        hasDemo: !0,
        module: "material.components.swipe",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/swipe/swipe.js"
    }, {
        name: "mdSwipeRight",
        type: "directive",
        outputPath: "partials/api/material.components.swipe/directive/mdSwipeRight.html",
        url: "api/material.components.swipe/directive/mdSwipeRight",
        label: "mdSwipeRight",
        hasDemo: !0,
        module: "material.components.swipe",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/swipe/swipe.js"
    }]
}, {
    name: "material.components.switch",
    type: "module",
    outputPath: "partials/api/material.components.switch/index.html",
    url: "api/material.components.switch",
    label: "material.components.switch",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdSwitch",
        type: "directive",
        outputPath: "partials/api/material.components.switch/directive/mdSwitch.html",
        url: "api/material.components.switch/directive/mdSwitch",
        label: "mdSwitch",
        hasDemo: !0,
        module: "material.components.switch",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/switch/switch.js"
    }]
}, {
    name: "material.components.toast",
    type: "module",
    outputPath: "partials/api/material.components.toast/index.html",
    url: "api/material.components.toast",
    label: "material.components.toast",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "$mdToast",
        type: "service",
        outputPath: "partials/api/material.components.toast/service/$mdToast.html",
        url: "api/material.components.toast/service/$mdToast",
        label: "$mdToast",
        hasDemo: !1,
        module: "material.components.toast",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/toast/toast.js"
    }]
}, {
    name: "material.components.toolbar",
    type: "module",
    outputPath: "partials/api/material.components.toolbar/index.html",
    url: "api/material.components.toolbar",
    label: "material.components.toolbar",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdToolbar",
        type: "directive",
        outputPath: "partials/api/material.components.toolbar/directive/mdToolbar.html",
        url: "api/material.components.toolbar/directive/mdToolbar",
        label: "mdToolbar",
        hasDemo: !0,
        module: "material.components.toolbar",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/toolbar/toolbar.js"
    }]
}, {
    name: "material.components.tooltip",
    type: "module",
    outputPath: "partials/api/material.components.tooltip/index.html",
    url: "api/material.components.tooltip",
    label: "material.components.tooltip",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdTooltip",
        type: "directive",
        outputPath: "partials/api/material.components.tooltip/directive/mdTooltip.html",
        url: "api/material.components.tooltip/directive/mdTooltip",
        label: "mdTooltip",
        hasDemo: !0,
        module: "material.components.tooltip",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/tooltip/tooltip.js"
    }]
}, {
    name: "material.components.autocomplete",
    type: "module",
    outputPath: "partials/api/material.components.autocomplete/index.html",
    url: "api/material.components.autocomplete",
    label: "material.components.autocomplete",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdAutocomplete",
        type: "directive",
        outputPath: "partials/api/material.components.autocomplete/directive/mdAutocomplete.html",
        url: "api/material.components.autocomplete/directive/mdAutocomplete",
        label: "mdAutocomplete",
        hasDemo: !0,
        module: "material.components.autocomplete",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/autocomplete/autocomplete.js"
    }, {
        name: "mdHighlightText",
        type: "directive",
        outputPath: "partials/api/material.components.autocomplete/directive/mdHighlightText.html",
        url: "api/material.components.autocomplete/directive/mdHighlightText",
        label: "mdHighlightText",
        hasDemo: !0,
        module: "material.components.autocomplete",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/autocomplete/autocomplete.js"
    }]
}, {
    name: "material.components.chips",
    type: "module",
    outputPath: "partials/api/material.components.chips/index.html",
    url: "api/material.components.chips",
    label: "material.components.chips",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdChip",
        type: "directive",
        outputPath: "partials/api/material.components.chips/directive/mdChip.html",
        url: "api/material.components.chips/directive/mdChip",
        label: "mdChip",
        hasDemo: !0,
        module: "material.components.chips",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/chips/chips.js"
    }, {
        name: "mdChipRemove",
        type: "directive",
        outputPath: "partials/api/material.components.chips/directive/mdChipRemove.html",
        url: "api/material.components.chips/directive/mdChipRemove",
        label: "mdChipRemove",
        hasDemo: !0,
        module: "material.components.chips",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/chips/chips.js"
    }, {
        name: "mdChips",
        type: "directive",
        outputPath: "partials/api/material.components.chips/directive/mdChips.html",
        url: "api/material.components.chips/directive/mdChips",
        label: "mdChips",
        hasDemo: !0,
        module: "material.components.chips",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/chips/chips.js"
    }, {
        name: "mdContactChips",
        type: "directive",
        outputPath: "partials/api/material.components.chips/directive/mdContactChips.html",
        url: "api/material.components.chips/directive/mdContactChips",
        label: "mdContactChips",
        hasDemo: !0,
        module: "material.components.chips",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/chips/chips.js"
    }]
}, {
    name: "material.components.tabs",
    type: "module",
    outputPath: "partials/api/material.components.tabs/index.html",
    url: "api/material.components.tabs",
    label: "material.components.tabs",
    hasDemo: !1,
    module: ".",
    githubUrl: "https://github.com/angular/material/blob/master/src/components/./..js",
    docs: [{
        name: "mdTab",
        type: "directive",
        outputPath: "partials/api/material.components.tabs/directive/mdTab.html",
        url: "api/material.components.tabs/directive/mdTab",
        label: "mdTab",
        hasDemo: !0,
        module: "material.components.tabs",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/tabs/tabs.js"
    }, {
        name: "mdTabs",
        type: "directive",
        outputPath: "partials/api/material.components.tabs/directive/mdTabs.html",
        url: "api/material.components.tabs/directive/mdTabs",
        label: "mdTabs",
        hasDemo: !0,
        module: "material.components.tabs",
        githubUrl: "https://github.com/angular/material/blob/master/src/components/tabs/tabs.js"
    }]
}]), DocsApp.constant("PAGES", {
    CSS: [{
        name: "Typography",
        outputPath: "partials/CSS/typography.html",
        url: "/CSS/typography",
        label: "Typography"
    }],
    Theming: [{
        name: "Introduction and Terms",
        outputPath: "partials/Theming/01_introduction.html",
        url: "/Theming/01_introduction",
        label: "Introduction and Terms"
    }, {
        name: "Declarative Syntax",
        outputPath: "partials/Theming/02_declarative_syntax.html",
        url: "/Theming/02_declarative_syntax",
        label: "Declarative Syntax"
    }, {
        name: "Configuring a Theme",
        outputPath: "partials/Theming/03_configuring_a_theme.html",
        url: "/Theming/03_configuring_a_theme",
        label: "Configuring a Theme"
    }, {
        name: "Multiple Themes",
        outputPath: "partials/Theming/04_multiple_themes.html",
        url: "/Theming/04_multiple_themes",
        label: "Multiple Themes"
    }]
}), angular.module("docsApp").constant("DEMOS", [{
    name: "material.components.autocomplete",
    label: "Autocomplete",
    demos: [{
        id: "autocompletedemoBasicUsage",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/autocomplete/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.autocomplete",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/autocomplete/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "autocompleteDemo",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "autocompletedemoFloatingLabel",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/autocomplete/demoFloatingLabel/script.js"
        }],
        moduleName: "material.components.autocomplete",
        name: "demoFloatingLabel",
        label: "Floating Label",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/autocomplete/demoFloatingLabel/index.html"
        },
        ngModule: {
            module: "autocompleteFloatingLabelDemo",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.autocomplete"
}, {
    name: "material.components.bottomSheet",
    label: "Bottom Sheet",
    demos: [{
        id: "bottomSheetdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/style.css"
        }],
        html: [{
            name: "bottom-sheet-grid-template.html",
            label: "bottom-sheet-grid-template.html",
            fileType: "html",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/bottom-sheet-grid-template.html"
        }, {
            name: "bottom-sheet-list-template.html",
            label: "bottom-sheet-list-template.html",
            fileType: "html",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/bottom-sheet-list-template.html"
        }, {
            name: "readme.html",
            label: "readme.html",
            fileType: "html",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/readme.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.bottomSheet",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/bottomSheet/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "bottomSheetDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.bottomSheet"
}, {
    name: "material.components.button",
    label: "Button",
    demos: [{
        id: "buttondemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/button/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/button/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.button",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/button/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "buttonsDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.button"
}, {
    name: "material.components.card",
    label: "Card",
    demos: [{
        id: "carddemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/card/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/card/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.card",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/card/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "cardDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.card"
}, {
    name: "material.components.checkbox",
    label: "Checkbox",
    demos: [{
        id: "checkboxdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/checkbox/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/checkbox/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.checkbox",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/checkbox/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "checkboxDemo1",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "checkboxdemoSyncing",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/checkbox/demoSyncing/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/checkbox/demoSyncing/script.js"
        }],
        moduleName: "material.components.checkbox",
        name: "demoSyncing",
        label: "Syncing",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/checkbox/demoSyncing/index.html"
        },
        ngModule: {
            module: "checkboxDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.checkbox"
}, {
    name: "material.components.chips",
    label: "Chips",
    demos: [{
        id: "chipsdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/chips/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/chips/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.chips",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/chips/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "chipsDemo",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "chipsdemoContactChips",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/chips/demoContactChips/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/chips/demoContactChips/script.js"
        }],
        moduleName: "material.components.chips",
        name: "demoContactChips",
        label: "Contact Chips",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/chips/demoContactChips/index.html"
        },
        ngModule: {
            module: "contactChipsDemo",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "chipsdemoCustomInputs",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/chips/demoCustomInputs/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/chips/demoCustomInputs/script.js"
        }],
        moduleName: "material.components.chips",
        name: "demoCustomInputs",
        label: "Custom Inputs",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/chips/demoCustomInputs/index.html"
        },
        ngModule: {
            module: "chipsCustomInputDemo",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "chipsdemoStaticChips",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/chips/demoStaticChips/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/chips/demoStaticChips/script.js"
        }],
        moduleName: "material.components.chips",
        name: "demoStaticChips",
        label: "Static Chips",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/chips/demoStaticChips/index.html"
        },
        ngModule: {
            module: "staticChipsDemo",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.chips"
}, {
    name: "material.components.content",
    label: "Content",
    demos: [{
        id: "contentdemoBasicUsage",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/content/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.content",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/content/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "contentDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.content"
}, {
    name: "material.components.dialog",
    label: "Dialog",
    demos: [{
        id: "dialogdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/dialog/demoBasicUsage/style.css"
        }],
        html: [{
            name: "dialog1.tmpl.html",
            label: "dialog1.tmpl.html",
            fileType: "html",
            outputPath: "demo-partials/dialog/demoBasicUsage/dialog1.tmpl.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/dialog/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.dialog",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/dialog/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "dialogDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.dialog"
}, {
    name: "material.components.divider",
    label: "Divider",
    demos: [{
        id: "dividerdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/divider/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/divider/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.divider",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/divider/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "dividerDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.divider"
}, {
    name: "material.components.gridList",
    label: "Grid List",
    demos: [{
        id: "gridListdemoBasicUsage",
        css: [{
            name: "styles.css",
            label: "styles.css",
            fileType: "css",
            outputPath: "demo-partials/gridList/demoBasicUsage/styles.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/gridList/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.gridList",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/gridList/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "gridListDemo1",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "gridListdemoDynamicTiles",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/gridList/demoDynamicTiles/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/gridList/demoDynamicTiles/script.js"
        }],
        moduleName: "material.components.gridList",
        name: "demoDynamicTiles",
        label: "Dynamic Tiles",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/gridList/demoDynamicTiles/index.html"
        },
        ngModule: {
            module: "gridListDemoApp",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "gridListdemoResponsiveUsage",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/gridList/demoResponsiveUsage/script.js"
        }],
        moduleName: "material.components.gridList",
        name: "demoResponsiveUsage",
        label: "Responsive Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/gridList/demoResponsiveUsage/index.html"
        },
        ngModule: {
            module: "gridListDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.gridList"
}, {
    name: "material.components.icon",
    label: "Icon",
    demos: [{
        id: "icondemoFontIcons",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/icon/demoFontIcons/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/icon/demoFontIcons/script.js"
        }],
        moduleName: "material.components.icon",
        name: "demoFontIcons",
        label: "Font Icons",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/icon/demoFontIcons/index.html"
        },
        ngModule: {
            module: "appDemoFontIcons",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "icondemoLoadSvgIconsFromUrl",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/icon/demoLoadSvgIconsFromUrl/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/icon/demoLoadSvgIconsFromUrl/script.js"
        }],
        moduleName: "material.components.icon",
        name: "demoLoadSvgIconsFromUrl",
        label: "Load Svg Icons From Url",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/icon/demoLoadSvgIconsFromUrl/index.html"
        },
        ngModule: {
            module: "appDemoSvgIcons",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "icondemoSvgIconSets",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/icon/demoSvgIconSets/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/icon/demoSvgIconSets/script.js"
        }],
        moduleName: "material.components.icon",
        name: "demoSvgIconSets",
        label: "Svg Icon Sets",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/icon/demoSvgIconSets/index.html"
        },
        ngModule: {
            module: "appSvgIconSets",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "icondemoUsingTemplateCache",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/icon/demoUsingTemplateCache/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/icon/demoUsingTemplateCache/script.js"
        }],
        moduleName: "material.components.icon",
        name: "demoUsingTemplateCache",
        label: "Using Template Cache",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/icon/demoUsingTemplateCache/index.html"
        },
        ngModule: {
            module: "appUsingTemplateCache",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.icon"
}, {
    name: "material.components.input",
    label: "Input",
    demos: [{
        id: "inputdemoBasicUsage",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/input/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.input",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/input/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "inputBasicDemo",
            dependencies: ["ngMaterial", "ngMessages"]
        }
    }, {
        id: "inputdemoErrors",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/input/demoErrors/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/input/demoErrors/script.js"
        }],
        moduleName: "material.components.input",
        name: "demoErrors",
        label: "Errors",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/input/demoErrors/index.html"
        },
        ngModule: {
            module: "inputErrorsApp",
            dependencies: ["ngMaterial", "ngMessages"]
        }
    }, {
        id: "inputdemoIcons",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/input/demoIcons/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/input/demoIcons/script.js"
        }],
        moduleName: "material.components.input",
        name: "demoIcons",
        label: "Icons",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/input/demoIcons/index.html"
        },
        ngModule: {
            module: "inputIconDemo",
            dependencies: ["ngMaterial", "ngMessages"]
        }
    }],
    url: "/demo/material.components.input"
}, {
    name: "material.components.list",
    label: "List",
    demos: [{
        id: "listdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/list/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/list/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.list",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/list/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "listDemo1",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "listdemoListControls",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/list/demoListControls/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/list/demoListControls/script.js"
        }],
        moduleName: "material.components.list",
        name: "demoListControls",
        label: "List Controls",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/list/demoListControls/index.html"
        },
        ngModule: {
            module: "listDemo2",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.list"
}, {
    name: "material.components.progressCircular",
    label: "Progress Circular",
    demos: [{
        id: "progressCirculardemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/progressCircular/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/progressCircular/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.progressCircular",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/progressCircular/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "progressCircularDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.progressCircular"
}, {
    name: "material.components.progressLinear",
    label: "Progress Linear",
    demos: [{
        id: "progressLineardemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/progressLinear/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/progressLinear/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.progressLinear",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/progressLinear/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "progressLinearDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.progressLinear"
}, {
    name: "material.components.radioButton",
    label: "Radio Button",
    demos: [{
        id: "radioButtondemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/radioButton/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/radioButton/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.radioButton",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/radioButton/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "radioDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.radioButton"
}, {
    name: "material.components.select",
    label: "Select",
    demos: [{
        id: "selectdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/select/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/select/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.select",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/select/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "selectDemoBasic",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "selectdemoOptionGroups",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/select/demoOptionGroups/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/select/demoOptionGroups/script.js"
        }],
        moduleName: "material.components.select",
        name: "demoOptionGroups",
        label: "Option Groups",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/select/demoOptionGroups/index.html"
        },
        ngModule: {
            module: "selectDemoOptGroups",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "selectdemoOptionsWithAsyncSearch",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/select/demoOptionsWithAsyncSearch/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/select/demoOptionsWithAsyncSearch/script.js"
        }],
        moduleName: "material.components.select",
        name: "demoOptionsWithAsyncSearch",
        label: "Options With Async Search",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/select/demoOptionsWithAsyncSearch/index.html"
        },
        ngModule: {
            module: "selectDemoOptionsAsync",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "selectdemoValidations",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/select/demoValidations/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/select/demoValidations/script.js"
        }],
        moduleName: "material.components.select",
        name: "demoValidations",
        label: "Validations",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/select/demoValidations/index.html"
        },
        ngModule: {
            module: "selectDemoBasic",
            dependencies: ["ngMaterial", "ngMessages"]
        }
    }],
    url: "/demo/material.components.select"
}, {
    name: "material.components.sidenav",
    label: "Sidenav",
    demos: [{
        id: "sidenavdemoBasicUsage",
        css: [],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/sidenav/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.sidenav",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/sidenav/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "sidenavDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.sidenav"
}, {
    name: "material.components.slider",
    label: "Slider",
    demos: [{
        id: "sliderdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/slider/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/slider/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.slider",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/slider/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "sliderDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.slider"
}, {
    name: "material.components.subheader",
    label: "Subheader",
    demos: [{
        id: "subheaderdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/subheader/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/subheader/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.subheader",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/subheader/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "subheaderBasicDemo",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.subheader"
}, {
    name: "material.components.switch",
    label: "Switch",
    demos: [{
        id: "switchdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/switch/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/switch/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.switch",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/switch/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "switchDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.switch"
}, {
    name: "material.components.tabs",
    label: "Tabs",
    demos: [{
        id: "tabsdemoDynamicHeight",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/tabs/demoDynamicHeight/style.css"
        }],
        html: [{
            name: "readme.html",
            label: "readme.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoDynamicHeight/readme.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/tabs/demoDynamicHeight/script.js"
        }],
        moduleName: "material.components.tabs",
        name: "demoDynamicHeight",
        label: "Dynamic Height",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoDynamicHeight/index.html"
        },
        ngModule: {
            module: "tabsDemoDynamicHeight",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "tabsdemoDynamicTabs",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/tabs/demoDynamicTabs/style.css"
        }],
        html: [{
            name: "readme.html",
            label: "readme.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoDynamicTabs/readme.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/tabs/demoDynamicTabs/script.js"
        }],
        moduleName: "material.components.tabs",
        name: "demoDynamicTabs",
        label: "Dynamic Tabs",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoDynamicTabs/index.html"
        },
        ngModule: {
            module: "tabsDemoDynamicTabs",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "tabsdemoStaticTabs",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/tabs/demoStaticTabs/style.css"
        }],
        html: [{
            name: "readme.html",
            label: "readme.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoStaticTabs/readme.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/tabs/demoStaticTabs/script.js"
        }],
        moduleName: "material.components.tabs",
        name: "demoStaticTabs",
        label: "Static Tabs",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/tabs/demoStaticTabs/index.html"
        },
        ngModule: {
            module: "tabsDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.tabs"
}, {
    name: "material.components.toast",
    label: "Toast",
    demos: [{
        id: "toastdemoBasicUsage",
        css: [],
        html: [{
            name: "toast-template.html",
            label: "toast-template.html",
            fileType: "html",
            outputPath: "demo-partials/toast/demoBasicUsage/toast-template.html"
        }],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/toast/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.toast",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/toast/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "toastDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.toast"
}, {
    name: "material.components.toolbar",
    label: "Toolbar",
    demos: [{
        id: "toolbardemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/toolbar/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/toolbar/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.toolbar",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/toolbar/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "toolbarDemo1",
            dependencies: ["ngMaterial"]
        }
    }, {
        id: "toolbardemoScrollShrink",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/toolbar/demoScrollShrink/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/toolbar/demoScrollShrink/script.js"
        }],
        moduleName: "material.components.toolbar",
        name: "demoScrollShrink",
        label: "Scroll Shrink",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/toolbar/demoScrollShrink/index.html"
        },
        ngModule: {
            module: "toolbarDemo2",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.toolbar"
}, {
    name: "material.components.tooltip",
    label: "Tooltip",
    demos: [{
        id: "tooltipdemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/tooltip/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/tooltip/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.tooltip",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/tooltip/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "tooltipDemo1",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.tooltip"
}, {
    name: "material.components.whiteframe",
    label: "Whiteframe",
    demos: [{
        id: "whiteframedemoBasicUsage",
        css: [{
            name: "style.css",
            label: "style.css",
            fileType: "css",
            outputPath: "demo-partials/whiteframe/demoBasicUsage/style.css"
        }],
        html: [],
        js: [{
            name: "script.js",
            label: "script.js",
            fileType: "js",
            outputPath: "demo-partials/whiteframe/demoBasicUsage/script.js"
        }],
        moduleName: "material.components.whiteframe",
        name: "demoBasicUsage",
        label: "Basic Usage",
        index: {
            name: "index.html",
            label: "index.html",
            fileType: "html",
            outputPath: "demo-partials/whiteframe/demoBasicUsage/index.html"
        },
        ngModule: {
            module: "whiteframeBasicUsage",
            dependencies: ["ngMaterial"]
        }
    }],
    url: "/demo/material.components.whiteframe"
}]), DocsApp.directive("layoutAlign", function() {
    return angular.noop
}).directive("layout", function() {
    return angular.noop
}).directive("docsDemo", ["$mdUtil", function(e) {
    function t(e, t, n, a) {
        function o(e) {
            switch (e) {
                case "index.html":
                    return "HTML";
                case "script.js":
                    return "JS";
                case "style.css":
                    return "CSS";
                default:
                    return e
            }
        }
        var r = this;
        r.interpolateCode = angular.isDefined(n.interpolateCode), r.demoId = a(n.demoId || "")(e.$parent), r.demoTitle = a(n.demoTitle || "")(e.$parent), r.demoModule = a(n.demoModule || "")(e.$parent), r.files = {
            css: [],
            js: [],
            html: []
        }, r.addFile = function(e, t) {
            var n = {
                name: o(e),
                contentsPromise: t,
                fileType: e.split(".").pop()
            };
            t.then(function(e) {
                n.contents = e
            }), "index.html" === e ? r.files.index = n : "readme.html" === e ? r.demoDescription = n : (r.files[n.fileType] = r.files[n.fileType] || [], r.files[n.fileType].push(n)), r.orderedFiles = [].concat(r.files.index || []).concat(r.files.js || []).concat(r.files.css || []).concat(r.files.html || [])
        }
    }
    return {
        restrict: "E",
        scope: !0,
        templateUrl: "partials/docs-demo.tmpl.html",
        transclude: !0,
        controller: ["$scope", "$element", "$attrs", "$interpolate", t],
        controllerAs: "demoCtrl",
        bindToController: !0
    }
}]).directive("demoFile", ["$q", "$interpolate", function(e, t) {
    function n(n, a) {
        var o = a.contents,
            r = n.html(),
            i = a.name;
        return n.contents().remove(),
            function(n, a, l, d) {
                d.addFile(t(i)(n), e.when(n.$eval(o) || r)), a.remove()
            }
    }
    return {
        restrict: "E",
        require: "^docsDemo",
        compile: n
    }
}]).filter("toHtml", ["$sce", function(e) {
    return function(t) {
        return e.trustAsHtml(t)
    }
}]), DocsApp.directive("demoInclude", ["$q", "$http", "$compile", "$templateCache", "$timeout", function(e, t, n, a, o) {
    function r(t, a, r) {
        function i() {
            m.index.contentsPromise.then(function(o) {
                s = angular.element('<div class="demo-content ' + c + '">');
                var r, i, m = !!c;
                m ? (angular.bootstrap(s[0], [c]), r = s.scope(), i = s.injector().get("$compile"), t.$on("$destroy", function() {
                    r.$destroy()
                })) : (r = t.$new(), i = n), e.all([l(), d()])["finally"](function() {
                    r.$evalAsync(function() {
                        a.append(s), s.html(o), i(s.contents())(r)
                    })
                })
            })
        }

        function l() {
            return e.all(m.css.map(function(e) {
                return e.contentsPromise
            })).then(function(e) {
                e = e.join("\n");
                var n = angular.element("<style>" + e + "</style>");
                document.body.appendChild(n[0]), t.$on("$destroy", function() {
                    n.remove()
                })
            })
        }

        function d() {
            return e.all(m.html.map(function(e) {
                return e.contentsPromise.then(function(n) {
                    var a = s.injector().get("$templateCache");
                    a.put(e.name, n), t.$on("$destroy", function() {
                        a.remove(e.name)
                    })
                })
            }))
        }
        var s, m = t.$eval(r.files) || {},
            c = t.$eval(r.module) || "";
        o(i)
    }
    return {
        restrict: "E",
        link: r
    }
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/demo.tmpl.html", '<docs-demo ng-repeat="demo in demos" \n  demo-id="{{demo.id}}" demo-title="{{demo.label}}" demo-module="{{demo.ngModule.module}}">\n  <demo-file ng-repeat="file in demo.$files"\n             name="{{file.name}}" contents="file.httpPromise">\n  </demo-file>\n</docs-demo>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/docs-demo.tmpl.html", '<div layout="column" class="doc-content">\n  <div flex layout="column" style="z-index:1">\n\n    <div class="doc-description" ng-bind-html="demoCtrl.demoDescription.contents | toHtml"></div>\n\n    <div ng-transclude></div>\n\n    <section class="demo-container md-whiteframe-z1"\n      ng-class="{\'show-source\': demoCtrl.$showSource}" >\n\n      <md-toolbar class="demo-toolbar">\n        <div class="md-toolbar-tools">\n          <h3>{{demoCtrl.demoTitle}}</h3>\n          <span flex></span>\n          <md-button\n            style="min-width: 72px; margin-left: auto;"\n            ng-click="demoCtrl.$showSource = !demoCtrl.$showSource">\n            <div flex layout="row" layout-align="center center">\n              <md-icon md-svg-src="img/icons/ic_visibility_24px.svg"\n                 style="margin: 0 4px 0 0;">\n              </md-icon>\n              Source\n            </div>\n          </md-button>\n        </div>\n      </md-toolbar>\n\n      <!-- Source views -->\n      <md-tabs class="demo-source-tabs" ng-show="demoCtrl.$showSource" style="min-height: 0;">\n        <md-tab ng-repeat="file in demoCtrl.orderedFiles" label="{{file.name}}">\n          <md-content md-scroll-y class="demo-source-container">\n            <hljs class="no-header" code="file.contentsPromise" lang="{{file.fileType}}" should-interpolate="demoCtrl.interpolateCode">\n            </hljs>\n          </md-content>\n        </md-tab>\n      </md-tabs>\n\n      <!-- Live Demos -->\n      <demo-include files="demoCtrl.files" module="demoCtrl.demoModule" class="{{demoCtrl.demoId}}">\n      </demo-include>\n    </section>\n\n  </div>\n</div>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/getting-started.tmpl.html", '<div ng-controller="GuideCtrl" layout="column" class="doc-content">\n  <md-content>\n    <p><em>New to Angular.js? Before getting into Angular Material, it might be helpful to\n      <a href="https://egghead.io/articles/new-to-angularjs-start-learning-here" target="_blank"\n         title="Link opens in a new window">read about the framework</a>.</em></p>\n\n    <h2>How do I start?</h2>\n    <ul style="margin-bottom: 2em;">\n      <li><a href="http://codepen.io/collection/AxKKgY/" target="_blank"\n             title="Link opens in a new window">Fork a Codepen</a></li>\n      <li><a href="https://github.com/angular/material-start" target="_blank"\n             title="Link opens in a new window">Clone a Github Starter Project</a></li>\n    </ul>\n\n    <h3>Including Angular Material and its dependencies</h3>\n    <ul style="margin-bottom: 2em;">\n      <li><a href="https://github.com/angular/material#bower">Using Bower</a></li>\n      <li><a href="https://github.com/angular/material#cdn">Using a CDN</a> (example below)</li>\n    </ul>\n\n    <iframe height=\'272\' scrolling=\'no\' data-default-tab="html"\n            src=\'//codepen.io/marcysutton/embed/OPbpKm?height=272&theme-id=11083\'\n            frameborder=\'no\' allowtransparency=\'true\' allowfullscreen=\'true\' style=\'width: 100%;\'>\n      See the Pen <a href=\'http://codepen.io/marcysutton/pen/OPbpKm/\'>Angular Material Dependencies</a>\n      on <a href=\'http://codepen.io\'>CodePen</a>.\n    </iframe>\n\n    <md-divider></md-divider>\n\n    <h2>Contributing to Angular Material</h2>\n    <ul style="margin-bottom: 2em;">\n      <li>To contribute, fork our GitHub <a href="https://github.com/angular/material">repository</a>.</li>\n      <li>Please read our <a href="https://github.com/angular/material#contributing">contributor guidelines</a>.</li>\n      <li>For problems,\n          <a href="https://github.com/angular/material/issues?q=is%3Aissue+is%3Aopen" target="_blank">\n              search the issues\n          </a> and/or\n          <a href="https://github.com/angular/material/issues/new" target="_blank">\n              create a new issue\n          </a>.\n      </li>\n      <li>For questions,\n          <a href="https://groups.google.com/forum/#!forum/ngmaterial" target="_blank">\n              search the forum\n          </a> and/or post a new message.\n      </li>\n    </ul>\n  </md-content>\n</div>\n');

}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/home.tmpl.html", '<div ng-controller="HomeCtrl" layout="column" class="doc-content">\n    <md-content>\n        <p>The <strong>Angular Material</strong> project is an implementation of Material Design in Angular.js. This project provides a set of reusable, well-tested, and accessible UI components based on the Material Design system.</p>\n\n        <p>Similar to the\n            <a href="http://www.polymer-project.org/">Polymer</a> project\'s\n            <a href="http://www.polymer-project.org/docs/elements/paper-elements.html">Paper elements</a> collection, Angular Material is supported internally at Google by the Angular.js, Material Design UX and other product teams.\n        </p>\n\n        <ul class="buckets" layout layout-align="center center" layout-wrap>\n          <li flex="25" flex-md="50" flex-sm="50">\n            <md-card>\n              <md-card-content>\n                <a ng-href="#/getting-started">Getting Started</a>\n              </md-card-content>\n            </md-card>\n          </li>\n          <li flex="25" flex-md="50" flex-sm="50">\n            <md-card>\n              <md-card-content>\n                <a ng-href="#/demo/">Demos</a>\n              </md-card-content>\n            </md-card>\n          </li>\n          <li flex="25" flex-md="50" flex-sm="50">\n            <md-card>\n              <md-card-content>\n                <a ng-href="#/CSS/typography">Customization</a>\n              </md-card-content>\n            </md-card>\n          </li>\n          <li flex="25" flex-md="50" flex-sm="50">\n            <md-card>\n              <md-card-content>\n                <a ng-href="#/api/">API Reference</a>\n              </md-card-content>\n            </md-card>\n          </li>\n        </ul>\n\n        <h2 class="md-title">What is Material Design?</h2>\n        <p>\n            <a href="http://www.google.com/design/spec/material-design/">Material Design</a> is a specification for a\n            unified system of visual, motion, and interaction design that adapts across different devices and different\n            screen sizes.\n\n            Below is a brief video that presents the Material Design system:\n        </p>\n\n        <md-content>\n          <div style="max-width: 560px; margin: 0 auto;">\n            <div class="responsive-video">\n              <iframe title="Material Design" src="//www.youtube.com/embed/Q8TXgCzxEnw" frameborder="0" allowfullscreen></iframe>\n            </div>\n          </div>\n        </md-content>\n        <ul>\n            <li>These docs were generated from source in the `master` branch:\n                <ul style="padding-top:5px;">\n                    <li>\n                        at commit <a ng-href="{{BUILDCONFIG.repository}}/commit/{{BUILDCONFIG.commit}}" target="_blank">\n                        v{{BUILDCONFIG.version}}  -  SHA {{BUILDCONFIG.commit.substring(0,7)}}\n                    </a>.\n                    </li>\n                    <li>\n                        on {{BUILDCONFIG.date}} GMT.\n                    </li>\n                </ul>\n\n            </li>\n        </ul>\n        <br/>\n        <br/>\n    </md-content>\n</div>\n\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/layout-alignment.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <p>\n    The <code>layout-align</code> attribute takes two words.\n    The first word says how the children will be aligned in the layout\'s direction, and the second word says how the children will be aligned perpindicular to the layout\'s direction.</p>\n\n    <p>Only one word is required for the attribute. For example, <code>layout="row" layout-align="center"</code> would make the elements center horizontally and use the default behavior vertically.</p>\n\n    <p><code>layout="column" layout-align="center end"</code> would make\n    children align along the center vertically and along the end (right) horizontally.</p>\n  <table>\n    <tr>\n      <td>layout-align</td>\n      <td>Sets child alignment.</td>\n    </tr>\n    <tr>\n      <td>layout-align-sm</td>\n      <td>Sets child alignment on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-sm</td>\n      <td>Sets child alignment on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-md</td>\n      <td>Sets child alignment on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-md</td>\n      <td>Sets child alignment on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>layout-align-lg</td>\n      <td>Sets child alignment on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-lg</td>\n      <td>Sets child alignment on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n  <p>\n   See below for more examples:\n  </p>\n\n  <section class="layout-panel-parent">\n    <div ng-panel="layoutDemo">\n      <docs-demo demo-title=\'layout="{{layoutDemo.direction}}" layout-align="{{layoutAlign()}}"\' class="small-demo" interpolate-code="true">\n        <demo-file name="index.html">\n          <div layout="{{layoutDemo.direction}}" layout-align="{{layoutAlign()}}">\n            <div>one</div>\n            <div>two</div>\n            <div>three</div>\n          </div>\n        </demo-file>\n      </docs-demo>\n    </div>\n  </section>\n\n  <div layout="column" layout-gt-sm="row" layout-align="space-around">\n\n    <div>\n      <md-subheader>Layout Direction</md-subheader>\n      <md-radio-group ng-model="layoutDemo.direction">\n        <md-radio-button value="row">row</md-radio-button>\n        <md-radio-button value="column">column</md-radio-button>\n      </md-radio-group>\n    </div>\n    <div>\n      <md-subheader>Alignment in Layout Direction ({{layoutDemo.direction == \'row\' ? \'horizontal\' : \'vertical\'}})</md-subheader>\n      <md-radio-group ng-model="layoutDemo.mainAxis">\n        <md-radio-button value="start">start</md-radio-button>\n        <md-radio-button value="center">center</md-radio-button>\n        <md-radio-button value="end">end</md-radio-button>\n        <md-radio-button value="space-around">space-around</md-radio-button>\n        <md-radio-button value="space-between">space-between</md-radio-button>\n      </md-radio-group>\n    </div>\n    <div>\n      <md-subheader>Alignment in Perpendicular Direction ({{layoutDemo.direction == \'column\' ? \'horizontal\' : \'vertical\'}})</md-subheader>\n      <md-radio-group ng-model="layoutDemo.crossAxis">\n        <md-radio-button value="start">start</md-radio-button>\n        <md-radio-button value="center">center</md-radio-button>\n        <md-radio-button value="end">end</md-radio-button>\n      </md-radio-group>\n    </div>\n\n  </div>\n</div>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/layout-container.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <h3>Overview</h3>\n  <p>\n    Angular Material\'s responsive CSS layout is built on\n    <a href="http://www.w3.org/TR/css3-flexbox/">flexbox</a>.\n  </p>\n\n  <p>\n    The layout system is based upon element attributes rather than CSS classes.\n    Attributes provide an easy way to set a value (eg <code>layout="row"</code>), and additionally\n    helps us separate concerns: attributes define layout, and classes define styling.\n  </p>\n\n  <md-divider></md-divider>\n  <h3>Layout Attribute</h3>\n  <p>\n    Use the <code>layout</code> attribute on an element to arrange its children\n    horizontally in a row (<code>layout="row"</code>), or vertically in\n    a column (<code>layout="column"</code>). \n  </p>\n\n  <hljs lang="html">\n    <div layout="row">\n      <div>I\'m left.</div>\n      <div>I\'m right.</div>\n    </div>\n    <div layout="column">\n      <div>I\'m above.</div>\n      <div>I\'m below.</div>\n    </div>\n  </hljs>\n\n  <p>\n    See <a href="#/layout/options">Layout Options</a> for information on responsive layouts and other options.\n  </p>\n</div>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/layout-grid.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <p>\n    To customize the size and position of elements in a layout, use the\n    <code>flex</code>, <code>offset</code>, and <code>flex-order</code> attributes.\n  </p>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Flex Attribute" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row">\n        <div flex>\n          [flex]\n        </div>\n        <div flex>\n          [flex]\n        </div>\n        <div flex hide-sm>\n          [flex]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    Add the <code>flex</code> attribute to a layout\'s child element, and it\n    will flex (stretch) to fill the available area.\n  </p>\n\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Flex Percent Values" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-wrap>\n        <div flex="33">\n          [flex="33"]\n        </div>\n        <div flex="55">\n          [flex="55"]\n        </div>\n        <div flex>\n          [flex]\n        </div>\n        <div flex="66">\n          [flex]\n        </div>\n        <div flex="33">\n          [flex]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    A layout child\'s <code>flex</code> attribute can be given an integer value from 0-100.\n    The element will stretch to the percentage of available space matching the value.\n    <br/><br/>\n    The <code>flex</code> attribute value is restricted to 33, 66, and multiples\n    of five.\n    <br/>\n    For example: <code>flex="5", flex="20", "flex="33", flex="50", flex="66", flex="75", ...</code>.\n  </p>\n  <p>\n  See the <a href="#/layout/options">layout options page</a> for more information on responsive flex attributes.\n  </p>\n\n  <md-divider></md-divider>\n  <docs-demo demo-title="Flex Order Attribute" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-margin>\n        <div flex flex-order="3">\n          [flex-order="3"]\n        </div>\n        <div flex flex-order="2">\n          [flex-order="2"]\n        </div>\n        <div flex flex-order="1">\n          [flex-order="1"]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    Add the <code>flex-order</code> attribute to a layout child to set its\n    position within the layout. Any value from 0-9 is accepted.\n  </p>\n  <table>\n    <tr>\n      <td>flex-order</td>\n      <td>Sets element order.</td>\n    </tr>\n    <tr>\n      <td>flex-order-sm</td>\n      <td>Sets element order on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-sm</td>\n      <td>Sets element order on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-md</td>\n      <td>Sets element order on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-md</td>\n      <td>Sets element order on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>flex-order-lg</td>\n      <td>Sets element order on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-lg</td>\n      <td>Sets element order on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n  <md-divider></md-divider>\n  <docs-demo demo-title="Flex Offset Attribute" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row">\n        <div flex offset="33">\n          [flex offset="33"]\n        </div>\n        <div flex>\n          [flex]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    Add the <code>offset</code> attribute to a layout child to set its\n    offset percentage within the layout. Values must be multiples \n    of <code>5</code>, or <code>33</code>, <code>34</code>, <code>66</code>, <code>67</code>.\n  </p>\n  <table>\n    <tr>\n      <td>offset</td>\n      <td>Sets element offset.</td>\n    </tr>\n    <tr>\n      <td>offset-sm</td>\n      <td>Sets element offset on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>offset-gt-sm</td>\n      <td>Sets element offset on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>offset-md</td>\n      <td>Sets element offset on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>offset-gt-md</td>\n      <td>Sets element offset on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>offset-lg</td>\n      <td>Sets element offset on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>offset-gt-lg</td>\n      <td>Sets element offset on devices greater than 1200px wide.</td>\n    </tr>\n</div>\n\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/layout-options.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content layout-options">\n\n  <docs-demo demo-title="Responsive Layout" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-sm="column">\n        <div flex>\n          I\'m above on mobile, and to the left on larger devices.\n        </div>\n        <div flex>\n          I\'m below on mobile, and to the right on larger devices.\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    See the <a href="#/layout/container">Layout Container</a> page for a basic explanation\n    of layout attributes.\n    <br/>\n    To make your layout change depending upon the device size, there are\n    other <code>layout</code> attributes available:\n  </p>\n\n  <table>\n    <tr>\n      <td>layout</td>\n      <td>Sets the default layout on all devices.</td>\n    </tr>\n    <tr>\n      <td>layout-sm</td>\n      <td>Sets the layout on devices less than 600px wide (phones).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-sm</td>\n      <td>Sets the layout on devices greater than 600px wide (bigger than phones).</td>\n    </tr>\n    <tr>\n      <td>layout-md</td>\n      <td>Sets the layout on devices between 600px and 960px wide (tablets in portrait).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-md</td>\n      <td>Sets the layout on devices greater than 960px wide (bigger than tablets in portrait).</td>\n    </tr>\n    <tr>\n      <td>layout-lg</td>\n      <td>Sets the layout on devices between 960 and 1200px wide (tablets in landscape).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-lg</td>\n      <td>Sets the layout on devices greater than 1200px wide (computers and large screens).</td>\n    </tr>\n  </table>\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Layout Margin, Padding and Fill" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-margin layout-fill layout-padding>\n        <div flex>I\'m on the left, and there\'s an empty area around me.</div>\n        <div flex>I\'m on the right, and there\'s an empty area around me.</div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    <code>layout-margin</code> adds margin around each <code>flex</code> child. It also adds a margin to the layout container itself.\n    <br/>\n    <code>layout-padding</code> adds padding inside each <code>flex</code> child. It also adds padding to the layout container itself.\n    <br/>\n    <code>layout-fill</code> forces the layout element to fill its parent container.\n  </p>\n\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Wrap" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-wrap>\n        <div flex="33">[flex=33]</div>\n        <div flex="66">[flex=66]</div>\n        <div flex="66">[flex=66]</div>\n        <div flex="33">[flex=33]</div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    <code>layout-wrap</code> allows <code>flex</code> children to wrap within the container if the elements use more than 100%.\n    <br/>\n  </p>\n\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Responsive Flex & Offset Attributes" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row">\n        <div flex="66" flex-sm="33">\n          I flex to one-third of the space on mobile, and two-thirds on other devices.\n        </div>\n        <div flex="33" flex-sm="66">\n          I flex to two-thirds of the space on mobile, and one-third on other devices.\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    See the <a href="#/layout/grid">Layout Grid</a> page for a basic explanation\n    of flex and offset attributes.\n  </p>\n\n  <table>\n    <tr>\n      <td>flex</td>\n      <td>Sets flex.</td>\n    </tr>\n    <tr>\n      <td>flex-sm</td>\n      <td>Sets flex on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-gt-sm</td>\n      <td>Sets flex on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-md</td>\n      <td>Sets flex on devices between 600px and 960px wide..</td>\n    </tr>\n    <tr>\n      <td>flex-gt-md</td>\n      <td>Sets flex on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>flex-lg</td>\n      <td>Sets flex on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>flex-gt-lg</td>\n      <td>Sets flex on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Hide and Show Attributes" class="small-demo">\n    <demo-file name="index.html">\n      <div layout layout-align="center center">\n        <md-subheader hide-sm>\n          I\'m hidden on mobile and shown on larger devices.\n        </md-subheader>\n        <md-subheader hide-gt-sm>\n          I\'m shown on mobile and hidden on larger devices.\n        </md-subheader>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <br/>\n  <table>\n    <tr>\n      <td>hide</td>\n      <td><code>display: none</code></td>\n    </tr>\n    <tr>\n      <td>hide-sm</td>\n      <td><code>display: none</code> on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-sm</td>\n      <td><code>display: none</code> on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-md</td>\n      <td><code>display: none</code> on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-md</td>\n      <td><code>display: none</code> on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>hide-lg</td>\n      <td><code>display: none</code> on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-lg</td>\n      <td><code>display: none</code> on devices greater than 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>show</td>\n      <td>Negates hide.</td>\n    </tr>\n    <tr>\n      <td>show-sm</td>\n      <td>Negates hide on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>show-gt-sm</td>\n      <td>Negates hide on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>show-md</td>\n      <td>Negates hide on devices between 600px and 960px wide..</td>\n    </tr>\n    <tr>\n      <td>show-gt-md</td>\n      <td>Negates hide on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>show-lg</td>\n      <td>Negates hide on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>show-gt-lg</td>\n      <td>Negates hide on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n\n</div>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/menu-link.tmpl.html", '<md-button ng-class="{\'active\' : isSelected()}"\n  ng-href="#{{section.url}}" ng-click="focusSection()">\n  {{section | humanizeDoc}}\n  <span class="md-visually-hidden"\n    ng-if="isSelected()">\n    current page\n  </span>\n</md-button>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/menu-toggle.tmpl.html", '<md-button class="md-button-toggle"\n  ng-click="toggle()"\n  aria-controls="docs-menu-{{section.name | nospace}}"\n  aria-expanded="{{isOpen()}}">\n  <div flex layout="row">\n    {{section.name}}\n    <span flex=""></span>\n    <span aria-hidden="true" class="md-toggle-icon"\n    ng-class="{\'toggled\' : isOpen()}">\n      <md-icon md-svg-src="toggle-arrow"></md-icon>\n    </span>\n  </div>\n  <span class="md-visually-hidden">\n    Toggle {{isOpen()? \'expanded\' : \'collapsed\'}}\n  </span>\n</md-button>\n\n<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n  <li ng-repeat="page in section.pages">\n    <menu-link section="page"></menu-link>\n  </li>\n</ul>\n')
}]), angular.module("docsApp").run(["$templateCache", function(e) {
    e.put("partials/view-source.tmpl.html", '<md-dialog class="view-source-dialog">\n\n  <md-tabs>\n    <md-tab ng-repeat="file in files"\n                  active="file === data.selectedFile"\n                  ng-click="data.selectedFile = file" >\n        <span class="window_label">{{file.viewType}}</span>\n    </md-tab>\n  </md-tabs>\n\n  <div class="md-content" md-scroll-y flex>\n    <div ng-repeat="file in files">\n      <hljs code="file.content"\n        lang="{{file.fileType}}"\n        ng-show="file === data.selectedFile" >\n      </hljs>\n    </div>\n  </div>\n\n  <div class="md-actions" layout="horizontal">\n    <md-button class="md-button-light" ng-click="$hideDialog()">\n      Done\n    </md-button>\n  </div>\n</md-dialog>\n')
}]), DocsApp.directive("hljs", ["$timeout", "$q", "$interpolate", function(e, t, n) {
    return {
        restrict: "E",
        compile: function(a, o) {
            var r;
            return o.code || (r = a.html(), a.empty()),
                function(a, o, i) {
                    function l(e, t) {
                        var n = t.find("code"),
                            a = e.split("\n");
                        a = a.filter(function(e) {
                            return e.trim().length
                        });
                        var o = a[0].match(/^\s*/)[0],
                            r = new RegExp("^" + o);
                        a = a.map(function(e) {
                            return e.replace(r, "").replace(/\s+$/, "")
                        });
                        var l = hljs.highlight(i.language || i.lang, a.join("\n"), !0);
                        l.value = l.value.replace(/=<span class="hljs-value">""<\/span>/gi, "").replace("<head>", "").replace("<head/>", ""), n.append(l.value).addClass("highlight")
                    }
                    i.code && (r = a.$eval(i.code));
                    var d = a.$eval(i.shouldInterpolate);
                    t.when(r).then(function(t) {
                        if (t) {
                            d && (t = n(t)(a));
                            var r = angular.element('<pre><code class="highlight" ng-non-bindable></code></pre>');
                            o.append(r), e(function() {
                                l(t, r)
                            }, 34, !1)
                        }
                    })
                }
        }
    }
}]);
var hljs = new function() {
    function e(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function t(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var n = e && e.exec(t);
        return n && 0 == n.index
    }

    function a(e) {
        var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
        return t = t.map(function(e) {
            return e.replace(/^lang(uage)?-/, "")
        }), t.filter(function(e) {
            return b(e) || "no-highlight" == e
        })[0]
    }

    function o(e, t) {
        var n = {};
        for (var a in e) n[a] = e[a];
        if (t)
            for (var a in t) n[a] = t[a];
        return n
    }

    function r(e) {
        var n = [];
        return function a(e, o) {
            for (var r = e.firstChild; r; r = r.nextSibling) 3 == r.nodeType ? o += r.nodeValue.length : "br" == t(r) ? o += 1 : 1 == r.nodeType && (n.push({
                event: "start",
                offset: o,
                node: r
            }), o = a(r, o), n.push({
                event: "stop",
                offset: o,
                node: r
            }));
            return o
        }(e, 0), n
    }

    function i(n, a, o) {
        function r() {
            return n.length && a.length ? n[0].offset != a[0].offset ? n[0].offset < a[0].offset ? n : a : "start" == a[0].event ? n : a : n.length ? n : a
        }

        function i(n) {
            function a(t) {
                return " " + t.nodeName + '="' + e(t.value) + '"'
            }
            m += "<" + t(n) + Array.prototype.map.call(n.attributes, a).join("") + ">"
        }

        function l(e) {
            m += "</" + t(e) + ">"
        }

        function d(e) {
            ("start" == e.event ? i : l)(e.node)
        }
        for (var s = 0, m = "", c = []; n.length || a.length;) {
            var u = r();
            if (m += e(o.substr(s, u[0].offset - s)), s = u[0].offset, u == n) {
                c.reverse().forEach(l);
                do d(u.splice(0, 1)[0]), u = r(); while (u == n && u.length && u[0].offset == s);
                c.reverse().forEach(i)
            } else "start" == u[0].event ? c.push(u[0].node) : c.pop(), d(u.splice(0, 1)[0])
        }
        return m + e(o.substr(s))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function n(n, a) {
            return RegExp(t(n), "m" + (e.cI ? "i" : "") + (a ? "g" : ""))
        }

        function a(r, i) {
            if (!r.compiled) {
                if (r.compiled = !0, r.k = r.k || r.bK, r.k) {
                    var l = {},
                        d = function(t, n) {
                            e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
                                var n = e.split("|");
                                l[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                            })
                        };
                    "string" == typeof r.k ? d("keyword", r.k) : Object.keys(r.k).forEach(function(e) {
                        d(e, r.k[e])
                    }), r.k = l
                }
                r.lR = n(r.l || /\b[A-Za-z0-9_]+\b/, !0), i && (r.bK && (r.b = "\\b(" + r.bK.split(" ").join("|") + ")\\b"), r.b || (r.b = /\B|\b/), r.bR = n(r.b), r.e || r.eW || (r.e = /\B|\b/), r.e && (r.eR = n(r.e)), r.tE = t(r.e) || "", r.eW && i.tE && (r.tE += (r.e ? "|" : "") + i.tE)), r.i && (r.iR = n(r.i)), void 0 === r.r && (r.r = 1), r.c || (r.c = []);
                var s = [];
                r.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        s.push(o(e, t))
                    }) : s.push("self" == e ? r : e)
                }), r.c = s, r.c.forEach(function(e) {
                    a(e, r)
                }), r.starts && a(r.starts, i);
                var m = r.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([r.tE, r.i]).map(t).filter(Boolean);
                r.t = m.length ? n(m.join("|"), !0) : {
                    exec: function(e) {
                        return null
                    }
                }, r.continuation = {}
            }
        }
        a(e)
    }

    function d(t, a, o, r) {
        function i(e, t) {
            for (var a = 0; a < t.c.length; a++)
                if (n(t.c[a].bR, e)) return t.c[a]
        }

        function m(e, t) {
            return n(e.eR, t) ? e : e.eW ? m(e.parent, t) : void 0
        }

        function c(e, t) {
            return !o && n(t.iR, e)
        }

        function u(e, t) {
            var n = $.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(n) && e.k[n]
        }

        function p(e, t, n, a) {
            var o = a ? "" : v.classPrefix,
                r = '<span class="' + o,
                i = n ? "" : "</span>";
            return r += e + '">', r + t + i
        }

        function h() {
            if (!x.k) return e(A);
            var t = "",
                n = 0;
            x.lR.lastIndex = 0;
            for (var a = x.lR.exec(A); a;) {
                t += e(A.substr(n, a.index - n));
                var o = u(x, a);
                o ? (w += o[1], t += p(o[0], e(a[0]))) : t += e(a[0]), n = x.lR.lastIndex, a = x.lR.exec(A)
            }
            return t + e(A.substr(n))
        }

        function f() {
            if (x.sL && !E[x.sL]) return e(A);
            var t = x.sL ? d(x.sL, A, !0, x.continuation.top) : s(A);
            return x.r > 0 && (w += t.r), "continuous" == x.subLanguageMode && (x.continuation.top = t.top), p(t.language, t.value, !1, !0)
        }

        function g() {
            return void 0 !== x.sL ? f() : h()
        }

        function y(t, n) {
            var a = t.cN ? p(t.cN, "", !0) : "";
            t.rB ? (T += a, A = "") : t.eB ? (T += e(n) + a, A = "") : (T += a, A = n), x = Object.create(t, {
                parent: {
                    value: x
                }
            })
        }

        function M(t, n) {
            if (A += t, void 0 === n) return T += g(), 0;
            var a = i(n, x);
            if (a) return T += g(), y(a, n), a.rB ? 0 : n.length;
            var o = m(x, n);
            if (o) {
                var r = x;
                r.rE || r.eE || (A += n), T += g();
                do x.cN && (T += "</span>"), w += x.r, x = x.parent; while (x != o.parent);
                return r.eE && (T += e(n)), A = "", o.starts && y(o.starts, ""), r.rE ? 0 : n.length
            }
            if (c(n, x)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (x.cN || "<unnamed>") + '"');
            return A += n, n.length || 1
        }
        var $ = b(t);
        if (!$) throw new Error('Unknown language: "' + t + '"');
        l($);
        for (var x = r || $, T = "", C = x; C != $; C = C.parent) C.cN && (T += p(C.cN, T, !0));
        var A = "",
            w = 0;
        try {
            for (var k, N, S = 0;;) {
                if (x.t.lastIndex = S, k = x.t.exec(a), !k) break;
                N = M(a.substr(S, k.index - S), k[0]), S = k.index + N
            }
            M(a.substr(S));
            for (var C = x; C.parent; C = C.parent) C.cN && (T += "</span>");
            return {
                r: w,
                value: T,
                language: t,
                top: x
            }
        } catch (_) {
            if (-1 != _.message.indexOf("Illegal")) return {
                r: 0,
                value: e(a)
            };
            throw _
        }
    }

    function s(t, n) {
        n = n || v.languages || Object.keys(E);
        var a = {
                r: 0,
                value: e(t)
            },
            o = a;
        return n.forEach(function(e) {
            if (b(e)) {
                var n = d(e, t, !1);
                n.language = e, n.r > o.r && (o = n), n.r > a.r && (o = a, a = n)
            }
        }), o.language && (a.second_best = o), a
    }

    function m(e) {
        return v.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t, n, a) {
            return t.replace(/\t/g, v.tabReplace)
        })), v.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function c(e) {
        var t = v.useBR ? e.innerHTML.replace(/\n/g, "").replace(/<br>|<br [^>]*>/g, "\n").replace(/<[^>]*>/g, "") : e.textContent,
            n = a(e);
        if ("no-highlight" != n) {
            var o = n ? d(n, t, !0) : s(t),
                l = r(e);
            if (l.length) {
                var c = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
                c.innerHTML = o.value, o.value = i(l, r(c), t)
            }
            o.value = m(o.value), e.innerHTML = o.value, e.className += " hljs " + (!n && o.language || ""), e.result = {
                language: o.language,
                re: o.r
            }, o.second_best && (e.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            })
        }
    }

    function u(e) {
        v = o(v, e)
    }

    function p() {
        if (!p.called) {
            p.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, c)
        }
    }

    function h() {
        addEventListener("DOMContentLoaded", p, !1), addEventListener("load", p, !1)
    }

    function f(e, t) {
        var n = E[e] = t(this);
        n.aliases && n.aliases.forEach(function(t) {
            y[t] = e
        })
    }

    function g() {
        return Object.keys(E)
    }

    function b(e) {
        return E[e] || E[y[e]]
    }
    var v = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        E = {},
        y = {};
    this.highlight = d, this.highlightAuto = s, this.fixMarkup = m, this.highlightBlock = c, this.configure = u, this.initHighlighting = p, this.initHighlightingOnLoad = h, this.registerLanguage = f, this.listLanguages = g, this.getLanguage = b, this.inherit = o, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [this.BE]
    }, this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [this.BE]
    }, this.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$",
        c: [this.PWM]
    }, this.CBCM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [this.PWM]
    }, this.HCM = {
        cN: "comment",
        b: "#",
        e: "$",
        c: [this.PWM]
    }, this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    }, this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    }, this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    }, this.CSSNM = {
        cN: "number",
        b: this.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, this.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [this.BE]
        }]
    }, this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    }, this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    }
};
hljs.registerLanguage("javascript", function(e) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
        },
        c: [{
            cN: "pi",
            b: /^\s*('|")use strict('|")/,
            r: 10
        }, e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: />;/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [e.CLCM, e.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + e.IR,
            r: 0
        }]
    }
}), hljs.registerLanguage("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        n = {
            cN: "function",
            b: t + "\\(",
            rB: !0,
            eE: !0,
            e: "\\("
        };
    return {
        cI: !0,
        i: "[=/|']",
        c: [e.CBCM, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [n, e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "tag",
            b: t,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [e.CBCM, {
                cN: "rule",
                b: "[^\\s]",
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: !0,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [n, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            }]
        }]
    }
}), hljs.registerLanguage("xml", function(e) {
    var t = "[A-Za-z0-9\\._:-]+",
        n = {
            b: /<\?(php)?(?!\w)/,
            e: /\?>/,
            sL: "php",
            subLanguageMode: "continuous"
        },
        a = {
            eW: !0,
            i: /</,
            r: 0,
            c: [n, {
                cN: "attribute",
                b: t,
                r: 0
            }, {
                b: "=",
                r: 0,
                c: [{
                    cN: "value",
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s\/>]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [a],
            starts: {
                e: "</style>",
                rE: !0,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [a],
            starts: {
                e: "</script>",
                rE: !0,
                sL: "javascript"
            }
        }, {
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }, n, {
            cN: "pi",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "title",
                b: "[^ /><]+",
                r: 0
            }, a]
        }]
    }
}), DocsApp.directive("ngPanel", ["$animate", function(e) {
    return {
        restrict: "EA",
        transclude: "element",
        terminal: !0,
        compile: function(t, n) {
            var a = n.ngPanel || n["for"],
                o = /^(\S+)(?:\s+track by (.+?))?$/,
                r = o.exec(a),
                i = !0,
                l = r[1],
                d = r[2];
            return d ? i = !1 : d = r[1],
                function(t, n, a, o, r) {
                    var s, m;
                    t[i ? "$watchCollection" : "$watch"](d, function(a) {
                        s && e.leave(s), m && (m.$destroy(), m = null);
                        i ? a : t.$eval(l);
                        m = t.$new(), r(m, function(t) {
                            s = t, e.enter(t, null, n)
                        })
                    })
                }
        }
    }
}]), DocsApp.constant("SERVICES", [{
    name: "$mdMedia",
    type: "service",
    outputPath: "partials/api/material.core/service/$mdMedia.html",
    url: "api/material.core/service/$mdMedia",
    label: "$mdMedia",
    hasDemo: !1,
    module: "material.core",
    githubUrl: "https://github.com/angular/material/blob/master/src/core/services//material.core.js"
}]);
