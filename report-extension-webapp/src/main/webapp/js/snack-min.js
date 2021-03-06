/*!
 * snack.js (c) Ryan Florence
 * https://github.com/rpflorence/snack
 * MIT License
 * Inspiration and code adapted from
 *  MooTools      (c) Valerio Proietti   MIT license
 *  jQuery        (c) John Resig         Dual license MIT or GPL Version 2
 *  contentLoaded (c) Diego Perini       MIT License
 *  Zepto.js      (c) Thomas Fuchs       MIT License
 */
typeof Object.create != "function" && (Object.create = function (a) {
    function b() {
    }

    b.prototype = a;
    return new b
}), !function (a) {
    var b = a.snack = {}, c = 0, d = Object.prototype.toString, e = [].indexOf, f = [].push;
    b.extend = function () {
        if (arguments.length == 1)return b.extend(b, arguments[0]);
        var a = arguments[0];
        for (var c, d = 1, e = arguments.length; d < e; d++)for (c in arguments[d])a[c] = arguments[d][c];
        return a
    }, b.extend({v: "1.2.3", bind: function (a, b, c) {
        c = c || [];
        return function () {
            f.apply(c, arguments);
            return a.apply(b, c)
        }
    }, punch: function (a, c, d, e) {
        var f = a[c];
        a[c] = e ? function () {
            f.apply(a, arguments);
            return d.apply(a, arguments)
        } : function () {
            var c = [].slice.call(arguments, 0);
            c.unshift(b.bind(f, a));
            return d.apply(a, c)
        }
    }, create: function (a, c) {
        var d = Object.create(a);
        if (!c)return d;
        for (var e in c) {
            if (!c.hasOwnProperty(e))continue;
            if (!a[e] || typeof c[e] != "function") {
                d[e] = c[e];
                continue
            }
            b.punch(d, e, c[e])
        }
        return d
    }, id: function () {
        return++c
    }, each: function (a, b, c) {
        if (a.length === void 0) {
            for (var d in a)a.hasOwnProperty(d) && b.call(c, a[d], d, a);
            return a
        }
        for (var e = 0, f = a.length; e < f; e++)b.call(c, a[e], e, a);
        return a
    }, parseJSON: function (b) {
        if (typeof b == "string") {
            b = b.replace(/^\s+|\s+$/g, "");
            var c = /^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""));
            if (!c)throw"Invalid JSON";
            var d = a.JSON;
            return d && d.parse ? d.parse(b) : (new Function("return " + b))()
        }
    }, isArray: function (a) {
        return a instanceof Array || d.call(a) == "[object Array]"
    }, indexOf: e ? function (a, b) {
        return e.call(b, a)
    } : function (a, b) {
        for (var c = 0, d = b.length; c < d; c++)if (b[c] === a)return c;
        return-1
    }})
}(window), !function (a, b) {
    var c = {}, d;
    a.wrap = function (b, e) {
        typeof b == "string" && (b = d(b, e)), b.length || (b = [b]);
        var f = Object.create(c), g = 0, h = b.length;
        for (; g < h; g++)f[g] = b[g];
        f.length = h, f.id = a.id();
        return f
    }, a.extend(a.wrap, {define: function (b, d) {
        if (typeof b != "string")for (var e in b)a.wrap.define(e, b[e]); else c[b] = d
    }, defineEngine: function (a) {
        d = a
    }}), a.wrap.defineEngine(function (a, c) {
        typeof c == "string" && (c = b.querySelector(c));
        return(c || b).querySelectorAll(a)
    })
}(snack, document), !function (a, b, c) {
    function l() {
        try {
            i.doScroll("left")
        } catch (a) {
            setTimeout(l, 50);
            return
        }
        k("poll")
    }

    function k(d) {
        if (d.type != "readystatechange" || c.readyState == "complete")(d.type == "load" ? b : c)[e](f + d.type, k, !1), !g && (g = !0) && a.each(j, function (a) {
            a.apply(c)
        })
    }

    var d = c.addEventListener ? "addEventListener" : "attachEvent", e = c.addEventListener ? "removeEventListener" : "detachEvent", f = c.addEventListener ? "" : "on", g = !1, h = !0, i = c.documentElement, j = [];
    a.extend({stopPropagation: function (a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    }, preventDefault: function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }}), a.listener = function (b, g) {
        b.delegate && (b.capture = !0, _handler = g, g = function (d) {
            var e = d.target || d.srcElement, f = typeof b.delegate == "string" ? a.wrap(b.delegate, b.node) : b.delegate(b.node);
            while (e && a.indexOf(e, f) == -1)e = e.parentNode;
            e && e !== this && e !== c && _handler.call(e, d, e)
        }), b.context && (g = a.bind(g, b.context));
        var h = {attach: function () {
            b.node[d](f + b.event, g, b.capture)
        }, detach: function () {
            b.node[e](f + b.event, g, b.capture)
        }, fire: function () {
            g.apply(b.node, arguments)
        }};
        h.attach();
        return h
    }, a.ready = function (a) {
        g ? a.apply(c) : j.push(a)
    };
    if (c.createEventObject && i.doScroll) {
        try {
            h = !b.frameElement
        } catch (m) {
        }
        h && l()
    }
    c[d](f + "DOMContentLoaded", k, !1), c[d](f + "readystatechange", k, !1), b[d](f + "load", k, !1)
}(snack, window, document), !function (a) {
    a.publisher = function (b) {
        var c = {};
        b = b || {}, a.extend(b, {subscribe: function (b, d, e) {
            var f = {fn: d, ctxt: e || {}};
            c[b] || (c[b] = []);
            var g = {attach: function () {
                c[b].push(f)
            }, detach: function () {
                c[b].splice(a.indexOf(d, c[b]), 1)
            }};
            g.attach();
            return g
        }, publish: function (b, d) {
            if (!c[b])return!1;
            a.each(c[b], function (a) {
                a.fn.apply(a.ctxt, d || [])
            });
            return c[b].length
        }});
        return b
    }, a.publisher(a)
}(snack), !function (a, b, c) {
    function e() {
    }

    a.JSONP = function (b, d) {
        var e = "jsonp" + a.id(), f = c.createElement("script"), g = !1;
        a.JSONP[e] = function (b) {
            g = !1, delete a.JSONP[e], d(b)
        }, typeof b.data == "object" && (b.data = a.toQueryString(b.data));
        var h = {send: function () {
            g = !0, f.src = b.url + "?" + b.key + "=snack.JSONP." + e + "&" + b.data, c.getElementsByTagName("head")[0].appendChild(f)
        }, cancel: function () {
            g && f.parentNode && f.parentNode.removeChild(f), g = !1, a.JSONP[e] = function () {
                delete a.JSONP[e]
            }
        }};
        b.now !== !1 && h.send();
        return h
    }, a.toQueryString = function (b, c) {
        var d = [];
        a.each(b, function (b, e) {
            c && (e = c + "[" + e + "]");
            var f;
            if (a.isArray(b)) {
                var g = {};
                a.each(b, function (a, b) {
                    g[b] = a
                }), f = a.toQueryString(g, e)
            } else typeof b == "object" ? f = a.toQueryString(b, e) : f = e + "=" + encodeURIComponent(b);
            b !== null && d.push(f)
        });
        return d.join("&")
    };
    var d = function () {
        var a = function () {
            return new XMLHttpRequest
        }, b = function () {
            return new ActiveXObject("MSXML2.XMLHTTP")
        }, c = function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        };
        try {
            a();
            return a
        } catch (d) {
            try {
                b();
                return b
            } catch (d) {
                c();
                return c
            }
        }
    }();
    a.request = function (b, c) {
        if (!(this instanceof a.request))return new a.request(b, c);
        var e = this;
        e.options = a.extend({}, e.options, b), e.callback = c, e.xhr = new d, e.headers = e.options.headers, e.options.now !== !1 && e.send()
    }, a.request.prototype = {options: {exception: e, url: "", data: "", method: "get", now: !0, headers: {"X-Requested-With": "XMLHttpRequest", Accept: "text/javascript, text/html, application/xml, text/xml, */*"}, async: !0, emulation: !0, urlEncoded: !0, encoding: "utf-8"}, onStateChange: function () {
        var a = this, b = a.xhr;
        if (b.readyState == 4 && !!a.running) {
            a.running = !1, a.status = 0;
            try {
                var c = b.status;
                a.status = c == 1223 ? 204 : c
            } catch (d) {
            }
            b.onreadystatechange = e;
            var f = a.status >= 200 && a.status < 300 ? [!1, a.xhr.responseText || "", a.xhr.responseXML] : [a.status];
            a.callback.apply(a, f)
        }
    }, setHeader: function (a, b) {
        this.headers[a] = b;
        return this
    }, getHeader: function (a) {
        try {
            return this.xhr.getResponseHeader(a)
        } catch (b) {
            return null
        }
    }, send: function () {
        var b = this, d = b.options;
        if (b.running)return b;
        b.running = !0;
        var e = d.data || "", f = String(d.url), g = d.method.toLowerCase();
        typeof e != "string" && (e = a.toQueryString(e));
        if (d.emulation && a.indexOf(g, ["get", "post"]) < 0) {
            var h = "_method=" + g;
            e = e ? h + "&" + e : h, g = "post"
        }
        if (d.urlEncoded && a.indexOf(g, ["post", "put"]) > -1) {
            var i = d.encoding ? "; charset=" + d.encoding : "";
            b.headers["Content-type"] = "application/x-www-form-urlencoded" + i
        }
        f || (f = c.location.pathname);
        var j = f.lastIndexOf("/");
        j > -1 && (j = f.indexOf("#")) > -1 && (f = f.substr(0, j)), e && g == "get" && (f += (f.indexOf("?") > -1 ? "&" : "?") + e, e = null);
        var k = b.xhr;
        k.open(g.toUpperCase(), f, open.async, d.user, d.password), d.user && "withCredentials"in k && (k.withCredentials = !0), k.onreadystatechange = a.bind(b.onStateChange, b);
        for (var l in b.headers)try {
            k.setRequestHeader(l, b.headers[l])
        } catch (m) {
            d.exception.apply(b, [l, b.headers[l]])
        }
        k.send(e), d.async || b.onStateChange();
        return b
    }, cancel: function () {
        var a = this;
        if (!a.running)return a;
        a.running = !1;
        var b = a.xhr;
        b.abort(), b.onreadystatechange = e, a.xhr = new d;
        return a
    }}
}(snack, window, document), !function (a, b) {
    function d(b, c, d, e) {
        var f = b.data(d);
        f && a.each(f, function (a) {
            a[c].apply(b, e)
        });
        return b
    }

    function c(a) {
        return a.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "")
    }

    a.wrap.define({data: function () {
        var a = {};
        return function (b, c) {
            var d = a[this.id];
            d || (d = a[this.id] = {});
            if (c === void 1)return d[b];
            return d[b] = c
        }
    }(), each: function (b, c) {
        return a.each(this, b, c)
    }, addClass: function (a) {
        return this.each(function (b) {
            c(b.className).indexOf(a) > -1 || (b.className = c(b.className + " " + a))
        })
    }, removeClass: function (a) {
        return this.each(function (b) {
            b.className = b.className.replace(new RegExp("(^|\\s)" + a + "(?:\\s|$)"), "$1")
        })
    }, attach: function (b, c, d) {
        var e = b.split("."), f = [];
        e[1] && (f = this.data(e[1]) || []), this.each(function (b) {
            var g = {node: b, event: e[0]};
            d && (g.delegate = d), f.push(a.listener(g, c))
        }), e[1] && this.data(e[1], f);
        return this
    }, detach: function (a) {
        d(this, "detach", a, null, !0), this.data(a, null);
        return this
    }, fire: function (a, b) {
        return d(this, "fire", a, b)
    }, delegate: function (a, b, c) {
        return this.attach(a, c, b)
    }})
}(snack, document)