(() => {
    "use strict";
    var t = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
        n = "[1-9]\\d?",
        e = "\\d\\d",
        r = "[^\\s]+",
        i = /\[([^]*?)\]/gm;

    function o(t, n) {
        for (var e = [], r = 0, i = t.length; r < i; r++) e.push(t[r].substr(0, n));
        return e
    }
    var a = function (t) {
        return function (n, e) {
            var r = e[t].map((function (t) {
                return t.toLowerCase()
            })).indexOf(n.toLowerCase());
            return r > -1 ? r : null
        }
    };

    function u(t) {
        for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
        for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r];
            for (var a in o) t[a] = o[a]
        }
        return t
    }
    var c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        f = o(s, 3),
        l = {
            dayNamesShort: o(c, 3),
            dayNames: c,
            monthNamesShort: f,
            monthNames: s,
            amPm: ["am", "pm"],
            DoFn: function (t) {
                return t + ["th", "st", "nd", "rd"][t % 10 > 3 ? 0 : (t - t % 10 != 10 ? 1 : 0) * t % 10]
            }
        },
        d = u({}, l),
        y = function (t, n) {
            for (void 0 === n && (n = 2), t = String(t); t.length < n;) t = "0" + t;
            return t
        },
        h = {
            D: function (t) {
                return String(t.getDate())
            },
            DD: function (t) {
                return y(t.getDate())
            },
            Do: function (t, n) {
                return n.DoFn(t.getDate())
            },
            d: function (t) {
                return String(t.getDay())
            },
            dd: function (t) {
                return y(t.getDay())
            },
            ddd: function (t, n) {
                return n.dayNamesShort[t.getDay()]
            },
            dddd: function (t, n) {
                return n.dayNames[t.getDay()]
            },
            M: function (t) {
                return String(t.getMonth() + 1)
            },
            MM: function (t) {
                return y(t.getMonth() + 1)
            },
            MMM: function (t, n) {
                return n.monthNamesShort[t.getMonth()]
            },
            MMMM: function (t, n) {
                return n.monthNames[t.getMonth()]
            },
            YY: function (t) {
                return y(String(t.getFullYear()), 4).substr(2)
            },
            YYYY: function (t) {
                return y(t.getFullYear(), 4)
            },
            h: function (t) {
                return String(t.getHours() % 12 || 12)
            },
            hh: function (t) {
                return y(t.getHours() % 12 || 12)
            },
            H: function (t) {
                return String(t.getHours())
            },
            HH: function (t) {
                return y(t.getHours())
            },
            m: function (t) {
                return String(t.getMinutes())
            },
            mm: function (t) {
                return y(t.getMinutes())
            },
            s: function (t) {
                return String(t.getSeconds())
            },
            ss: function (t) {
                return y(t.getSeconds())
            },
            S: function (t) {
                return String(Math.round(t.getMilliseconds() / 100))
            },
            SS: function (t) {
                return y(Math.round(t.getMilliseconds() / 10), 2)
            },
            SSS: function (t) {
                return y(t.getMilliseconds(), 3)
            },
            a: function (t, n) {
                return t.getHours() < 12 ? n.amPm[0] : n.amPm[1]
            },
            A: function (t, n) {
                return t.getHours() < 12 ? n.amPm[0].toUpperCase() : n.amPm[1].toUpperCase()
            },
            ZZ: function (t) {
                var n = t.getTimezoneOffset();
                return (n > 0 ? "-" : "+") + y(100 * Math.floor(Math.abs(n) / 60) + Math.abs(n) % 60, 4)
            },
            Z: function (t) {
                var n = t.getTimezoneOffset();
                return (n > 0 ? "-" : "+") + y(Math.floor(Math.abs(n) / 60), 2) + ":" + y(Math.abs(n) % 60, 2)
            }
        },
        m = function (t) {
            return +t - 1
        },
        g = [null, n],
        p = [null, r],
        b = ["isPm", r, function (t, n) {
            var e = t.toLowerCase();
            return e === n.amPm[0] ? 0 : e === n.amPm[1] ? 1 : null
        }],
        v = ["timezoneOffset", "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?", function (t) {
            var n = (t + "").match(/([+-]|\d\d)/gi);
            if (n) {
                var e = 60 * +n[1] + parseInt(n[2], 10);
                return "+" === n[0] ? e : -e
            }
            return 0
        }],
        w = (a("monthNamesShort"), a("monthNames"), {
            default: "ddd MMM DD YYYY HH:mm:ss",
            shortDate: "M/D/YY",
            mediumDate: "MMM D, YYYY",
            longDate: "MMMM D, YYYY",
            fullDate: "dddd, MMMM D, YYYY",
            isoDate: "YYYY-MM-DD",
            isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
            shortTime: "HH:mm",
            mediumTime: "HH:mm:ss",
            longTime: "HH:mm:ss.SSS"
        });
    const _ = function (n, e, r) {
        if (void 0 === e && (e = w.default), void 0 === r && (r = {}), "number" == typeof n && (n = new Date(n)), "[object Date]" !== Object.prototype.toString.call(n) || isNaN(n.getTime())) throw new Error("Invalid Date pass to format");
        var o = [];
        e = (e = w[e] || e).replace(i, (function (t, n) {
            return o.push(n), "@@@"
        }));
        var a = u(u({}, d), r);
        return (e = e.replace(t, (function (t) {
            return h[t](n, a)
        }))).replace(/@@@/g, (function () {
            return o.shift()
        }))
    };
    var O = function () {
            try {
                (new Date).toLocaleDateString("i")
            } catch (t) {
                return "RangeError" === t.name
            }
            return !1
        }() ? function (t, n) {
            return t.toLocaleDateString(n, {
                year: "numeric",
                month: "long",
                day: "numeric"
            })
        } : function (t) {
            return _(t, "mediumDate")
        },
        M = function () {
            try {
                (new Date).toLocaleString("i")
            } catch (t) {
                return "RangeError" === t.name
            }
            return !1
        }() ? function (t, n) {
            return t.toLocaleString(n, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
            })
        } : function (t) {
            return _(t, "haDateTime")
        },
        S = function () {
            try {
                (new Date).toLocaleTimeString("i")
            } catch (t) {
                return "RangeError" === t.name
            }
            return !1
        }() ? function (t, n) {
            return t.toLocaleTimeString(n, {
                hour: "numeric",
                minute: "2-digit"
            })
        } : function (t) {
            return _(t, "shortTime")
        },
        D = function (t) {
            return t < 10 ? "0" + t : t
        };

    function j(t) {
        return t.substr(0, t.indexOf("."))
    }
    var k = ["closed", "locked", "off"],
        Y = (new Set(["fan", "input_boolean", "light", "switch", "group", "automation"]), function (t, n, e, r) {
            r = r || {}, e = null == e ? {} : e;
            var i = new Event(n, {
                bubbles: void 0 === r.bubbles || r.bubbles,
                cancelable: Boolean(r.cancelable),
                composed: void 0 === r.composed || r.composed
            });
            return i.detail = e, t.dispatchEvent(i), i
        });
    new Set(["call-service", "divider", "section", "weblink", "cast", "select"]);
    var E = function (t) {
        Y(window, "haptic", t)
    };

    function P(t) {
        return (P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    var H, T, x, N, I, z, F, L, R, C, Z, A, W = ["entity-id", "last-changed", "last-updated", "last-triggered", "position", "tilt-position", "brightness"],
        U = function (t) {
            return "object" === P(t) && !Array.isArray(t) && !!t
        },
        V = function (t) {
            return !t || ["unknown", "unavailable"].includes(t.state)
        },
        B = function (t, n) {
            return n.hide_unavailable && (V(t) || n.attribute && void 0 === t.attributes[n.attribute])
        },
        J = function (t) {
            if (U(t) && !(t.entity || t.attribute || t.icon)) throw new Error("Entity object requires at least one 'entity', 'attribute' or 'icon'.");
            if ("string" == typeof t && "" === t) throw new Error("Entity ID string must not be blank.");
            if ("string" != typeof t && !U(t)) throw new Error("Entity config must be a valid entity ID string or entity object.")
        },
        q = function (t, n) {
            return !1 === n.name ? null : n.name || (n.entity ? t.attributes.friendly_name || (e = t.entity_id).substr(e.indexOf(".") + 1) : null) || null;
            var e
        },
        G = function (t) {
            return U(null == t ? void 0 : t.styles) ? Object.keys(t.styles).map((function (n) {
                return "".concat(n, ": ").concat(t.styles[n], ";")
            })).join("") : ""
        };

    function K(t) {
        return (K = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function Q(t, n) {
        return n || (n = t.slice(0)), Object.freeze(Object.defineProperties(t, {
            raw: {
                value: Object.freeze(n)
            }
        }))
    }

    function X(t, n) {
        var e = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            n && (r = r.filter((function (n) {
                return Object.getOwnPropertyDescriptor(t, n).enumerable
            }))), e.push.apply(e, r)
        }
        return e
    }

    function $(t) {
        for (var n = 1; n < arguments.length; n++) {
            var e = null != arguments[n] ? arguments[n] : {};
            n % 2 ? X(Object(e), !0).forEach((function (n) {
                tt(t, n, e[n])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : X(Object(e)).forEach((function (n) {
                Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n))
            }))
        }
        return t
    }

    function tt(t, n, e) {
        return n in t ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[n] = e, t
    }

    function nt(t, n) {
        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
    }

    function et(t, n) {
        for (var e = 0; e < n.length; e++) {
            var r = n[e];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    function rt(t, n) {
        return (rt = Object.setPrototypeOf || function (t, n) {
            return t.__proto__ = n, t
        })(t, n)
    }

    function it(t, n) {
        return !n || "object" !== K(n) && "function" != typeof n ? function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }(t) : n
    }

    function ot(t) {
        return (ot = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
        })(t)
    }
    var at = window.LitElement || Object.getPrototypeOf(customElements.get("hui-masonry-view") || customElements.get("hui-view")),
        ut = at.prototype,
        ct = ut.html,
        st = ut.css;
    console.info("%c MULTIPLE-ENTITY-ROW %c 4.2.0 ", "color: cyan; background: black; font-weight: bold;", "color: darkblue; background: white; font-weight: bold;");
    var ft = function (t) {
        ! function (t, n) {
            if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(n && n.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), n && rt(t, n)
        }(u, t);
        var n, e, r, i, o, a = (i = u, o = function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
            } catch (t) {
                return !1
            }
        }(), function () {
            var t, n = ot(i);
            if (o) {
                var e = ot(this).constructor;
                t = Reflect.construct(n, arguments, e)
            } else t = n.apply(this, arguments);
            return it(this, t)
        });

        function u() {
            return nt(this, u), a.apply(this, arguments)
        }
        return n = u, r = [{
            key: "properties",
            get: function () {
                return {
                    _hass: Object,
                    config: Object,
                    stateObj: Object
                }
            }
        }, {
            key: "styles",
            get: function () {
                return function (t) {
                    return t(H || (n = ["\n    .icon-small {\n        width: auto;\n    }\n    .entity {\n        text-align: center;\n        cursor: pointer;\n    }\n    .entity span {\n        font-size: 10px;\n        color: var(--secondary-text-color);\n    }\n    .entities-row {\n        flex-direction: row;\n        display: inline-flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n    .entities-row .entity {\n        margin-right: 16px;\n    }\n    .entities-row .entity:last-of-type {\n        margin-right: 0;\n    }\n    .entities-column {\n        flex-direction: column;\n        display: flex;\n        align-items: flex-end;\n        justify-content: space-evenly;\n    }\n    .entities-column .entity div {\n        display: inline-block;\n        vertical-align: middle;\n    }\n"], e || (e = n.slice(0)), H = Object.freeze(Object.defineProperties(n, {
                        raw: {
                            value: Object.freeze(e)
                        }
                    }))));
                    var n, e
                }(st)
            }
        }], (e = [{
            key: "setConfig",
            value: function (t) {
                if (!t || !t.entity) throw new Error("Please define a main entity.");
                t.entities && t.entities.forEach((function (t) {
                    return J(t)
                })), t.secondary_info && J(t.secondary_info), this.entityIds = function (t) {
                    var n, e;
                    return [t.entity, null === (n = t.secondary_info) || void 0 === n ? void 0 : n.entity].concat(null === (e = t.entities) || void 0 === e ? void 0 : e.map((function (t) {
                        return "string" == typeof t ? t : t.entity
                    }))).filter((function (t) {
                        return t
                    }))
                }(t), this.onRowClick = this.clickHandler(t.entity, t.tap_action), this.config = t
            }
        }, {
            key: "shouldUpdate",
            value: function (t) {
                return function (t, n) {
                    if (n.has("config")) return !0;
                    var e = n.get("_hass");
                    return !!e && t.entityIds.some((function (n) {
                        return e.states[n] !== t._hass.states[n]
                    }))
                }(this, t)
            }
        }, {
            key: "hass",
            set: function (t) {
                var n, e, r, i = this;
                this._hass = t, t && this.config && (this.stateObj = t.states[this.config.entity], U(this.config.secondary_info) && (this.info = null !== (r = t.states[this.config.secondary_info.entity]) && void 0 !== r ? r : this.stateObj), this.entities = null !== (n = null === (e = this.config.entities) || void 0 === e ? void 0 : e.map((function (n) {
                    var e = "string" == typeof n ? {
                        entity: n
                    } : n;
                    return $($({}, e), {}, {
                        stateObj: e.entity ? t.states[e.entity] : i.stateObj
                    })
                }))) && void 0 !== n ? n : [])
            }
        }, {
            key: "render",
            value: function () {
                var t = this;
                return this._hass && this.config ? this.stateObj ? ct(x || (x = Q(['<hui-generic-entity-row\n            .hass="', '"\n            .config="', '"\n            .secondaryText="', '"\n        >\n            <div class="', '">\n                ', "", "\n            </div>\n        </hui-generic-entity-row>"])), this._hass, this.config, this.renderSecondaryInfo(), this.config.column ? "entities-column" : "entities-row", this.entities.map((function (n) {
                    return t.renderEntity(n.stateObj, n)
                })), this.renderMainEntity()) : this.renderWarning() : ct(T || (T = Q([""])))
            }
        }, {
            key: "renderSecondaryInfo",
            value: function () {
                if (!this.config.secondary_info || "string" == typeof (t = this.config.secondary_info) && W.includes(t) || B(this.info, this.config.secondary_info)) return null;
                var t;
                if ("string" == typeof this.config.secondary_info) return ct(N || (N = Q(["", ""])), this.config.secondary_info);
                var n = q(this.info, this.config.secondary_info);
                return ct(I || (I = Q(["", " ", ""])), n, this.renderValue(this.info, this.config.secondary_info))
            }
        }, {
            key: "renderMainEntity",
            value: function () {
                return !1 === this.config.show_state ? null : ct(z || (z = Q(['<div class="state entity" style="', '" @click="', '">\n            ', "\n            <div>", "</div>\n        </div>"])), G(this.config), this.onRowClick, this.config.state_header && ct(F || (F = Q(["<span>", "</span>"])), this.config.state_header), this.renderValue(this.stateObj, this.config))
            }
        }, {
            key: "renderEntity",
            value: function (t, n) {
                if (!t || B(t, n)) return null;
                var e = this.clickHandler(t.entity_id, n.tap_action);
                return ct(L || (L = Q(['<div class="entity" style="', '" @click="', '">\n            <span>', "</span>\n            <div>", "</div>\n        </div>"])), G(n), e, q(t, n), n.icon ? this.renderIcon(t, n) : this.renderValue(t, n))
            }
        }, {
            key: "renderValue",
            value: function (t, n) {
                return !0 === n.toggle ? ct(R || (R = Q(['<ha-entity-toggle .stateObj="', '" .hass="', '"></ha-entity-toggle>'])), t, this._hass) : n.format ? this.renderFormat(t, n) : function (t, n, e) {
                    if (V(n)) return t.localize("state.default.".concat(n.state));
                    var r = j(n.entity_id),
                        i = function (e) {
                            return n.attributes.device_class && t.localize("component.".concat(r, ".state.").concat(n.attributes.device_class, ".").concat(e)) || t.localize("component.".concat(r, ".state._.").concat(e)) || e
                        };
                    if (e.attribute) return e.attribute in n.attributes ? "".concat(i(n.attributes[e.attribute])).concat(e.unit ? " ".concat(e.unit) : "") : t.localize("state.default.unavailable");
                    if (!1 !== e.unit && (e.unit || n.attributes.unit_of_measurement)) return "".concat(n.state, " ").concat(e.unit || n.attributes.unit_of_measurement);
                    if ("input_datetime" === r) {
                        var o;
                        if (!n.attributes.has_time) return o = new Date(n.attributes.year, n.attributes.month - 1, n.attributes.day), O(o, t.language);
                        if (!n.attributes.has_date) {
                            var a = new Date;
                            return o = new Date(a.getFullYear(), a.getMonth(), a.getDay(), n.attributes.hour, n.attributes.minute), S(o, t.language)
                        }
                        return o = new Date(n.attributes.year, n.attributes.month - 1, n.attributes.day, n.attributes.hour, n.attributes.minute), M(o, t.language)
                    }
                    return i(n.state)
                }(this._hass, t, n)
            }
        }, {
            key: "renderFormat",
            value: function (t, n) {
                var e = function (t, n) {
                    return void 0 !== n.attribute ? t.attributes[n.attribute] : t.state
                }(t, n);
                if (["relative", "total", "date", "time", "datetime"].includes(n.format)) {
                    var r = new Date(e);
                    return r instanceof Date && !isNaN(r.getTime()) ? ct(C || (C = Q(["<hui-timestamp-display\n                .ts=", "\n                .format=", "\n                .hass=", "\n            ></hui-timestamp-display>"])), r, n.format, this._hass) : e
                }
                if (isNaN(parseFloat(e)) || !isFinite(e)) return e;
                if ("brightness" === n.format) return "".concat(Math.round(e / 255 * 100), " %");
                if ("duration" === n.format) return function (t) {
                    var n = Math.floor(t / 3600),
                        e = Math.floor(t % 3600 / 60),
                        r = Math.floor(t % 3600 % 60);
                    return n > 0 ? n + ":" + D(e) + ":" + D(r) : e > 0 ? e + ":" + D(r) : r > 0 ? "" + r : null
                }(e);
                if (n.format.startsWith("precision")) {
                    var i = function (t, n) {
                            return !1 === n.unit ? null : void 0 !== n.attribute ? n.unit : n.unit || t.attributes.unit_of_measurement
                        }(t, n),
                        o = parseInt(n.format.slice(-1), 10);
                    return "".concat(parseFloat(e).toFixed(o)).concat(i ? " ".concat(i) : "")
                }
                return e
            }
        }, {
            key: "renderIcon",
            value: function (t, n) {
                return ct(Z || (Z = Q(['<state-badge\n            class="icon-small"\n            .stateObj="', '"\n            .overrideIcon="', '"\n            .stateColor="', '"\n        ></state-badge>'])), t, !0 === n.icon ? t.attributes.icon || null : n.icon, n.state_color)
            }
        }, {
            key: "renderWarning",
            value: function () {
                return ct(A || (A = Q(["<hui-warning>\n            ", "\n        </hui-warning>"])), this._hass.localize("ui.panel.lovelace.warning.entity_not_found", "entity", this.config.entity))
            }
        }, {
            key: "clickHandler",
            value: function (t, n) {
                var e = this;
                return function () {
                    return function (t, n, e, r, i) {
                        var o;
                        if (e.tap_action && (o = e.tap_action), o || (o = {
                                action: "more-info"
                            }), !o.confirmation || o.confirmation.exemptions && o.confirmation.exemptions.some((function (t) {
                                return t.user === n.user.id
                            })) || confirm(o.confirmation.text || "Are you sure you want to " + o.action + "?")) switch (o.action) {
                            case "more-info":
                                (o.entity || e.entity || e.camera_image) && (Y(t, "hass-more-info", {
                                    entityId: o.entity ? o.entity : e.entity ? e.entity : e.camera_image
                                }), o.haptic && E(o.haptic));
                                break;
                            case "navigate":
                                o.navigation_path && (function (t, n, e) {
                                    void 0 === e && (e = !1), e ? history.replaceState(null, "", n) : history.pushState(null, "", n), Y(window, "location-changed", {
                                        replace: e
                                    })
                                }(0, o.navigation_path), o.haptic && E(o.haptic));
                                break;
                            case "url":
                                o.url_path && window.open(o.url_path), o.haptic && E(o.haptic);
                                break;
                            case "toggle":
                                e.entity && (function (t, n) {
                                    (function (t, n, e) {
                                        void 0 === e && (e = !0);
                                        var r, i = j(n),
                                            o = "group" === i ? "homeassistant" : i;
                                        switch (i) {
                                            case "lock":
                                                r = e ? "unlock" : "lock";
                                                break;
                                            case "cover":
                                                r = e ? "open_cover" : "close_cover";
                                                break;
                                            default:
                                                r = e ? "turn_on" : "turn_off"
                                        }
                                        t.callService(o, r, {
                                            entity_id: n
                                        })
                                    })(t, n, k.includes(t.states[n].state))
                                }(n, e.entity), o.haptic && E(o.haptic));
                                break;
                            case "call-service":
                                if (!o.service) return;
                                var a = o.service.split(".", 2),
                                    u = a[0],
                                    c = a[1],
                                    s = Object.assign({}, o.service_data);
                                "entity" === s.entity_id && (s.entity_id = e.entity), n.callService(u, c, s), o.haptic && E(o.haptic);
                                break;
                            case "fire-dom-event":
                                Y(t, "ll-custom", o), o.haptic && E(o.haptic)
                        }
                    }(e, e._hass, {
                        entity: t,
                        tap_action: n
                    })
                }
            }
        }]) && et(n.prototype, e), r && et(n, r), u
    }(at);
    customElements.define("multiple-entity-row", ft)
})();