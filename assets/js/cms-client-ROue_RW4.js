import { g as Ze, b as X, d as et, i as tt, e as rt, f as rr, a as be, c as nr, p as sr, h as ir } from "./sanity.shared-CtFB0wjo.js";
import { A as ar, a as or, p as nt, f as K, O as x, i as re, c as cr, S as ur, b as ce, d as st, m as lr, o as Z, e as dr, g as hr, h as fr, _ as ve, j as Ce, k as pr, l as it, n as A, s as gr, q as F, r as Q, t as yr, u as mr, v as wr } from "./shareReplay-Dm5F4Ty_.js";
var br = new ar(or), vr = br;
function P() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r[e] = arguments[e];
  var t = nt(r);
  return K(r, t);
}
function Se(r, e) {
  var t = re(r) ? r : function() {
    return r;
  }, n = function(s) {
    return s.error(t());
  };
  return new x(n);
}
function Cr(r) {
  return !!r && (r instanceof x || re(r.lift) && re(r.subscribe));
}
var at = cr(function(r) {
  return function() {
    r(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function w(r, e) {
  return new Promise(function(t, n) {
    var s = !1, i;
    r.subscribe({
      next: function(a) {
        i = a, s = !0;
      },
      error: n,
      complete: function() {
        s ? t(i) : n(new at());
      }
    });
  });
}
function pe(r, e) {
  return new Promise(function(t, n) {
    var s = new ur({
      next: function(i) {
        t(i), s.unsubscribe();
      },
      error: n,
      complete: function() {
        n(new at());
      }
    });
    r.subscribe(s);
  });
}
function Er(r) {
  return r instanceof Date && !isNaN(r);
}
function $r(r, e, t) {
  return t === void 0 && (t = st), function(n) {
    Oe(e, function() {
      for (var s = r.length, i = new Array(s), a = s, o = s, c = function(h) {
        Oe(e, function() {
          var p = K(r[h], e), d = !1;
          p.subscribe(ce(n, function(f) {
            i[h] = f, d || (d = !0, o--), o || n.next(t(i.slice()));
          }, function() {
            --a || n.complete();
          }));
        }, n);
      }, u = 0; u < s; u++)
        c(u);
    });
  };
}
function Oe(r, e, t) {
  e();
}
function Ir() {
  return lr(1);
}
function Ar() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r[e] = arguments[e];
  return Ir()(K(r, nt(r)));
}
function Sr(r, e, t) {
  return t === void 0 && (t = vr), new x(function(n) {
    var s = Er(r) ? +r - t.now() : r;
    s < 0 && (s = 0);
    var i = 0;
    return t.schedule(function() {
      n.closed || (n.next(i++), n.complete());
    }, s);
  });
}
var Tr = Array.isArray;
function jr(r) {
  return r.length === 1 && Tr(r[0]) ? r[0] : r;
}
function Te(r) {
  return Z(function(e, t) {
    var n = null, s = !1, i;
    n = e.subscribe(ce(t, void 0, void 0, function(a) {
      i = dr(r(a, Te(r)(e))), n ? (n.unsubscribe(), n = null, i.subscribe(t)) : s = !0;
    })), s && (n.unsubscribe(), n = null, i.subscribe(t));
  });
}
function xr(r, e, t, n, s) {
  return function(i, a) {
    var o = t, c = e, u = 0;
    i.subscribe(ce(a, function(h) {
      var p = u++;
      c = o ? r(c, h, p) : (o = !0, h);
    }, (function() {
      o && a.next(c), a.complete();
    })));
  };
}
function Rr(r, e) {
  return Z(xr(r, e, arguments.length >= 2, !1, !0));
}
function ot() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r[e] = arguments[e];
  var t = hr(r);
  return t ? fr(ot.apply(void 0, ve([], Ce(r))), pr(t)) : Z(function(n, s) {
    $r(ve([n], Ce(jr(r))))(s);
  });
}
function Or() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r[e] = arguments[e];
  return ot.apply(void 0, ve([], Ce(r)));
}
function ct(r) {
  return Z(function(e, t) {
    try {
      e.subscribe(t);
    } finally {
      t.add(r);
    }
  });
}
function qr(r, e, t) {
  var n = re(r) || e || t ? { next: r, error: e, complete: t } : r;
  return n ? Z(function(s, i) {
    var a;
    (a = n.subscribe) === null || a === void 0 || a.call(n);
    var o = !0;
    s.subscribe(ce(i, function(c) {
      var u;
      (u = n.next) === null || u === void 0 || u.call(n, c), i.next(c);
    }, function() {
      var c;
      o = !1, (c = n.complete) === null || c === void 0 || c.call(n), i.complete();
    }, function(c) {
      var u;
      o = !1, (u = n.error) === null || u === void 0 || u.call(n, c), i.error(c);
    }, function() {
      var c, u;
      o && ((c = n.unsubscribe) === null || c === void 0 || c.call(n)), (u = n.finalize) === null || u === void 0 || u.call(n);
    }));
  }) : st;
}
const ut = !(typeof navigator > "u") && navigator.product === "ReactNative", lt = { timeout: ut ? 6e4 : 12e4 }, Pr = function(r) {
  const e = { ...lt, ...typeof r == "string" ? { url: r } : r };
  if (e.timeout = dt(e.timeout), e.query) {
    const { url: t, searchParams: n } = (function(s) {
      const i = s.indexOf("?");
      if (i === -1) return { url: s, searchParams: new URLSearchParams() };
      const a = s.slice(0, i), o = s.slice(i + 1);
      if (!ut) return { url: a, searchParams: new URLSearchParams(o) };
      if (typeof decodeURIComponent != "function") throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
      const c = new URLSearchParams();
      for (const u of o.split("&")) {
        const [h, p] = u.split("=");
        h && c.append(qe(h), qe(p || ""));
      }
      return { url: a, searchParams: c };
    })(e.url);
    for (const [s, i] of Object.entries(e.query)) {
      if (i !== void 0) if (Array.isArray(i)) for (const o of i) n.append(s, o);
      else n.append(s, i);
      const a = n.toString();
      a && (e.url = `${t}?${a}`);
    }
  }
  return e.method = e.body && !e.method ? "POST" : (e.method || "GET").toUpperCase(), e;
};
function qe(r) {
  return decodeURIComponent(r.replace(/\+/g, " "));
}
function dt(r) {
  if (r === !1 || r === 0) return !1;
  if (r.connect || r.socket) return r;
  const e = Number(r);
  return isNaN(e) ? dt(lt.timeout) : { connect: e, socket: e };
}
const _r = /^https?:\/\//i, Fr = function(r) {
  if (!_r.test(r.url)) throw new Error(`"${r.url}" is not a valid URL`);
};
function ht(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
const Dr = ["request", "response", "progress", "error", "abort"], Pe = ["processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders"];
function ft(r, e) {
  const t = [], n = Pe.reduce((i, a) => (i[a] = i[a] || [], i), { processOptions: [Pr], validateOptions: [Fr] });
  function s(i) {
    const a = typeof i == "object" && i.callSiteStack ? i.callSiteStack : void 0, o = a ? void 0 : new Error(), c = Dr.reduce((l, y) => (l[y] = /* @__PURE__ */ (function() {
      const b = /* @__PURE__ */ Object.create(null);
      let v = 0;
      return { publish: function(C) {
        for (const m in b) b[m](C);
      }, subscribe: function(C) {
        const m = v++;
        return b[m] = C, function() {
          delete b[m];
        };
      } };
    })(), l), {}), u = /* @__PURE__ */ ((l) => function(y, b, ...v) {
      const C = y === "onError";
      let m = b;
      for (let $ = 0; $ < l[y].length && (m = (0, l[y][$])(m, ...v), !C || m); $++) ;
      return m;
    })(n), h = u("processOptions", i);
    u("validateOptions", h);
    const p = { options: h, channels: c, applyMiddleware: u };
    let d;
    const f = c.request.subscribe((l) => {
      d = e(l, (y, b) => ((v, C, m) => {
        let $ = v, S = C;
        if (!$) try {
          S = u("onResponse", C, m);
        } catch (k) {
          S = null, $ = k;
        }
        if ($ = $ && u("onError", $, m), $) {
          if ($ instanceof Error) {
            const k = a?.stack || o?.stack;
            if (typeof k == "string") {
              const te = k.split(`
`).slice(a ? 1 : 2);
              te.length > 0 && ($.stack += `
` + te.join(`
`));
            }
          }
          c.error.publish($);
        } else S && c.response.publish(S);
      })(y, b, l));
    });
    c.abort.subscribe(() => {
      f(), d && d.abort();
    });
    const g = u("onReturn", c, p);
    return g === c && c.request.publish(p), g;
  }
  return s.use = function(i) {
    if (!i) throw new Error("Tried to add middleware that resolved to falsey value");
    if (typeof i == "function") throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
    if (i.onReturn && n.onReturn.length > 0) throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
    return Pe.forEach((a) => {
      i[a] && n[a].push(i[a]);
    }), t.push(i), s;
  }, s.clone = () => ft(t, e), r.forEach(s.use), s;
}
var _e, Fe, Mr = /* @__PURE__ */ ht((function() {
  if (Fe) return _e;
  Fe = 1;
  var r = function(t) {
    return t.replace(/^\s+|\s+$/g, "");
  }, e = function(t) {
    return Object.prototype.toString.call(t) === "[object Array]";
  };
  return _e = function(t) {
    if (!t) return {};
    for (var n = /* @__PURE__ */ Object.create(null), s = r(t).split(`
`), i = 0; i < s.length; i++) {
      var a = s[i], o = a.indexOf(":"), c = r(a.slice(0, o)).toLowerCase(), u = r(a.slice(o + 1));
      typeof n[c] > "u" ? n[c] = u : e(n[c]) ? n[c].push(u) : n[c] = [n[c], u];
    }
    return n;
  };
})());
let Ee = class {
  onabort;
  onerror;
  onreadystatechange;
  ontimeout;
  readyState = 0;
  response;
  responseText = "";
  responseType = "";
  status;
  statusText;
  withCredentials;
  #e;
  #t;
  #r;
  #s = {};
  #n;
  #i = {};
  #a;
  open(e, t, n) {
    this.#e = e, this.#t = t, this.#r = "", this.readyState = 1, this.onreadystatechange?.(), this.#n = void 0;
  }
  abort() {
    this.#n && this.#n.abort();
  }
  getAllResponseHeaders() {
    return this.#r;
  }
  setRequestHeader(e, t) {
    this.#s[e] = t;
  }
  setInit(e, t = !0) {
    this.#i = e, this.#a = t;
  }
  send(e) {
    const t = this.responseType !== "arraybuffer", n = { ...this.#i, method: this.#e, headers: this.#s, body: e };
    typeof AbortController == "function" && this.#a && (this.#n = new AbortController(), typeof EventTarget < "u" && this.#n.signal instanceof EventTarget && (n.signal = this.#n.signal)), typeof document < "u" && (n.credentials = this.withCredentials ? "include" : "omit"), fetch(this.#t, n).then((s) => (s.headers.forEach((i, a) => {
      this.#r += `${a}: ${i}\r
`;
    }), this.status = s.status, this.statusText = s.statusText, this.readyState = 3, this.onreadystatechange?.(), t ? s.text() : s.arrayBuffer())).then((s) => {
      typeof s == "string" ? this.responseText = s : this.response = s, this.readyState = 4, this.onreadystatechange?.();
    }).catch((s) => {
      s.name !== "AbortError" ? this.onerror?.(s) : this.onabort?.();
    });
  }
};
const $e = typeof XMLHttpRequest == "function" ? "xhr" : "fetch", kr = $e === "xhr" ? XMLHttpRequest : Ee, Lr = (r, e) => {
  const t = r.options, n = r.applyMiddleware("finalizeOptions", t), s = {}, i = r.applyMiddleware("interceptRequest", void 0, { adapter: $e, context: r });
  if (i) {
    const l = setTimeout(e, 0, null, i);
    return { abort: () => clearTimeout(l) };
  }
  let a = new kr();
  a instanceof Ee && typeof n.fetch == "object" && a.setInit(n.fetch, n.useAbortSignal ?? !0);
  const o = n.headers, c = n.timeout;
  let u = !1, h = !1, p = !1;
  if (a.onerror = (l) => {
    g(a instanceof Ee ? l instanceof Error ? l : new Error(`Request error while attempting to reach ${n.url}`, { cause: l }) : new Error(`Request error while attempting to reach is ${n.url}${l.lengthComputable ? `(${l.loaded} of ${l.total} bytes transferred)` : ""}`));
  }, a.ontimeout = (l) => {
    g(new Error(`Request timeout while attempting to reach ${n.url}${l.lengthComputable ? `(${l.loaded} of ${l.total} bytes transferred)` : ""}`));
  }, a.onabort = () => {
    f(!0), u = !0;
  }, a.onreadystatechange = function() {
    c && (f(), s.socket = setTimeout(() => d("ESOCKETTIMEDOUT"), c.socket)), !u && a && a.readyState === 4 && a.status !== 0 && (function() {
      if (!(u || h || p)) {
        if (a.status === 0) return void g(new Error("Unknown XHR error"));
        f(), h = !0, e(null, { body: a.response || (a.responseType === "" || a.responseType === "text" ? a.responseText : ""), url: n.url, method: n.method, headers: Mr(a.getAllResponseHeaders()), statusCode: a.status, statusMessage: a.statusText });
      }
    })();
  }, a.open(n.method, n.url, !0), a.withCredentials = !!n.withCredentials, o && a.setRequestHeader) for (const l in o) o.hasOwnProperty(l) && a.setRequestHeader(l, o[l]);
  return n.rawBody && (a.responseType = "arraybuffer"), r.applyMiddleware("onRequest", { options: n, adapter: $e, request: a, context: r }), a.send(n.body || null), c && (s.connect = setTimeout(() => d("ETIMEDOUT"), c.connect)), { abort: function() {
    u = !0, a && a.abort();
  } };
  function d(l) {
    p = !0, a.abort();
    const y = new Error(l === "ESOCKETTIMEDOUT" ? `Socket timed out on request to ${n.url}` : `Connection timed out on request to ${n.url}`);
    y.code = l, r.channels.error.publish(y);
  }
  function f(l) {
    (l || u || a && a.readyState >= 2 && s.connect) && clearTimeout(s.connect), s.socket && clearTimeout(s.socket);
  }
  function g(l) {
    if (h) return;
    f(!0), h = !0, a = null;
    const y = l || new Error(`Network error while attempting to reach ${n.url}`);
    y.isNetworkError = !0, y.request = n, e(y);
  }
}, Vr = (r = [], e = Lr) => ft(r, e);
var De, Me, ke, Le, Ve, ge = { exports: {} };
Ve || (Ve = 1, (function(r, e) {
  e.formatArgs = function(n) {
    if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors) return;
    const s = "color: " + this.color;
    n.splice(1, 0, s, "color: inherit");
    let i = 0, a = 0;
    n[0].replace(/%[a-zA-Z%]/g, (o) => {
      o !== "%%" && (i++, o === "%c" && (a = i));
    }), n.splice(a, 0, s);
  }, e.save = function(n) {
    try {
      n ? e.storage.setItem("debug", n) : e.storage.removeItem("debug");
    } catch {
    }
  }, e.load = function() {
    let n;
    try {
      n = e.storage.getItem("debug") || e.storage.getItem("DEBUG");
    } catch {
    }
    return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
  }, e.useColors = function() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
    let n;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, e.storage = (function() {
    try {
      return localStorage;
    } catch {
    }
  })(), e.destroy = /* @__PURE__ */ (() => {
    let n = !1;
    return () => {
      n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.log = console.debug || console.log || (() => {
  }), r.exports = (Le ? ke : (Le = 1, ke = function(n) {
    function s(o) {
      let c, u, h, p = null;
      function d(...f) {
        if (!d.enabled) return;
        const g = d, l = Number(/* @__PURE__ */ new Date()), y = l - (c || l);
        g.diff = y, g.prev = c, g.curr = l, c = l, f[0] = s.coerce(f[0]), typeof f[0] != "string" && f.unshift("%O");
        let b = 0;
        f[0] = f[0].replace(/%([a-zA-Z%])/g, (v, C) => {
          if (v === "%%") return "%";
          b++;
          const m = s.formatters[C];
          if (typeof m == "function") {
            const $ = f[b];
            v = m.call(g, $), f.splice(b, 1), b--;
          }
          return v;
        }), s.formatArgs.call(g, f), (g.log || s.log).apply(g, f);
      }
      return d.namespace = o, d.useColors = s.useColors(), d.color = s.selectColor(o), d.extend = i, d.destroy = s.destroy, Object.defineProperty(d, "enabled", { enumerable: !0, configurable: !1, get: () => p !== null ? p : (u !== s.namespaces && (u = s.namespaces, h = s.enabled(o)), h), set: (f) => {
        p = f;
      } }), typeof s.init == "function" && s.init(d), d;
    }
    function i(o, c) {
      const u = s(this.namespace + (typeof c > "u" ? ":" : c) + o);
      return u.log = this.log, u;
    }
    function a(o, c) {
      let u = 0, h = 0, p = -1, d = 0;
      for (; u < o.length; ) if (h < c.length && (c[h] === o[u] || c[h] === "*")) c[h] === "*" ? (p = h, d = u, h++) : (u++, h++);
      else {
        if (p === -1) return !1;
        h = p + 1, d++, u = d;
      }
      for (; h < c.length && c[h] === "*"; ) h++;
      return h === c.length;
    }
    return s.debug = s, s.default = s, s.coerce = function(o) {
      return o instanceof Error ? o.stack || o.message : o;
    }, s.disable = function() {
      const o = [...s.names, ...s.skips.map((c) => "-" + c)].join(",");
      return s.enable(""), o;
    }, s.enable = function(o) {
      s.save(o), s.namespaces = o, s.names = [], s.skips = [];
      const c = (typeof o == "string" ? o : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const u of c) u[0] === "-" ? s.skips.push(u.slice(1)) : s.names.push(u);
    }, s.enabled = function(o) {
      for (const c of s.skips) if (a(o, c)) return !1;
      for (const c of s.names) if (a(o, c)) return !0;
      return !1;
    }, s.humanize = (function() {
      if (Me) return De;
      Me = 1;
      var o = 1e3, c = 60 * o, u = 60 * c, h = 24 * u, p = 7 * h;
      function d(f, g, l, y) {
        var b = g >= 1.5 * l;
        return Math.round(f / l) + " " + y + (b ? "s" : "");
      }
      return De = function(f, g) {
        g = g || {};
        var l, y, b = typeof f;
        if (b === "string" && f.length > 0) return (function(v) {
          if (!((v = String(v)).length > 100)) {
            var C = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(v);
            if (C) {
              var m = parseFloat(C[1]);
              switch ((C[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return 315576e5 * m;
                case "weeks":
                case "week":
                case "w":
                  return m * p;
                case "days":
                case "day":
                case "d":
                  return m * h;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return m * u;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return m * c;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return m * o;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return m;
                default:
                  return;
              }
            }
          }
        })(f);
        if (b === "number" && isFinite(f)) return g.long ? (l = f, (y = Math.abs(l)) >= h ? d(l, y, h, "day") : y >= u ? d(l, y, u, "hour") : y >= c ? d(l, y, c, "minute") : y >= o ? d(l, y, o, "second") : l + " ms") : (function(v) {
          var C = Math.abs(v);
          return C >= h ? Math.round(v / h) + "d" : C >= u ? Math.round(v / u) + "h" : C >= c ? Math.round(v / c) + "m" : C >= o ? Math.round(v / o) + "s" : v + "ms";
        })(f);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(f));
      };
    })(), s.destroy = function() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }, Object.keys(n).forEach((o) => {
      s[o] = n[o];
    }), s.names = [], s.skips = [], s.formatters = {}, s.selectColor = function(o) {
      let c = 0;
      for (let u = 0; u < o.length; u++) c = (c << 5) - c + o.charCodeAt(u), c |= 0;
      return s.colors[Math.abs(c) % s.colors.length];
    }, s.enable(s.load()), s;
  }))(e);
  const { formatters: t } = r.exports;
  t.j = function(n) {
    try {
      return JSON.stringify(n);
    } catch (s) {
      return "[UnexpectedJSONParseError]: " + s.message;
    }
  };
})(ge, ge.exports)), ge.exports;
const Ur = typeof Buffer > "u" ? () => !1 : (r) => Buffer.isBuffer(r);
function Ue(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function Nr(r) {
  if (Ue(r) === !1) return !1;
  const e = r.constructor;
  if (e === void 0) return !0;
  const t = e.prototype;
  return !(Ue(t) === !1 || t.hasOwnProperty("isPrototypeOf") === !1);
}
const Hr = ["boolean", "string", "number"];
function Br() {
  return { processOptions: (r) => {
    const e = r.body;
    return !e || typeof e.pipe == "function" || Ur(e) || Hr.indexOf(typeof e) === -1 && !Array.isArray(e) && !Nr(e) ? r : Object.assign({}, r, { body: JSON.stringify(r.body), headers: Object.assign({}, r.headers, { "Content-Type": "application/json" }) });
  } };
}
function zr(r) {
  return { onResponse: (t) => {
    const n = t.headers["content-type"] || "", s = r && r.force || n.indexOf("application/json") !== -1;
    return t.body && n && s ? Object.assign({}, t, { body: e(t.body) }) : t;
  }, processOptions: (t) => Object.assign({}, t, { headers: Object.assign({ Accept: "application/json" }, t.headers) }) };
  function e(t) {
    try {
      return JSON.parse(t);
    } catch (n) {
      throw n.message = `Failed to parsed response body as JSON: ${n.message}`, n;
    }
  }
}
let z = {};
typeof globalThis < "u" ? z = globalThis : typeof window < "u" ? z = window : typeof global < "u" ? z = global : typeof self < "u" && (z = self);
var Wr = z;
function Gr(r = {}) {
  const e = r.implementation || Wr.Observable;
  if (!e) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  return { onReturn: (t, n) => new e((s) => (t.error.subscribe((i) => s.error(i)), t.progress.subscribe((i) => s.next(Object.assign({ type: "progress" }, i))), t.response.subscribe((i) => {
    s.next(Object.assign({ type: "response" }, i)), s.complete();
  }), t.request.publish(n), () => t.abort.publish())) };
}
function Qr() {
  return { onRequest: (r) => {
    if (r.adapter !== "xhr") return;
    const e = r.request, t = r.context;
    function n(s) {
      return (i) => {
        const a = i.lengthComputable ? i.loaded / i.total * 100 : -1;
        t.channels.progress.publish({ stage: s, percent: a, total: i.total, loaded: i.loaded, lengthComputable: i.lengthComputable });
      };
    }
    "upload" in e && "onprogress" in e.upload && (e.upload.onprogress = n("upload")), "onprogress" in e && (e.onprogress = n("download"));
  } };
}
var pt = (r, e, t) => (t.method === "GET" || t.method === "HEAD") && (r.isNetworkError || !1);
function Jr(r) {
  return 100 * Math.pow(2, r) + 100 * Math.random();
}
const je = (r = {}) => ((e) => {
  const t = e.maxRetries || 5, n = e.retryDelay || Jr, s = e.shouldRetry;
  return { onError: (i, a) => {
    const o = a.options, c = o.maxRetries || t, u = o.retryDelay || n, h = o.shouldRetry || s, p = o.attemptNumber || 0;
    if ((d = o.body) !== null && typeof d == "object" && typeof d.pipe == "function" || !h(i, p, o) || p >= c) return i;
    var d;
    const f = Object.assign({}, a, { options: Object.assign({}, o, { attemptNumber: p + 1 }) });
    return setTimeout(() => a.channels.request.publish(f), u(p)), null;
  } };
})({ shouldRetry: pt, ...r });
je.shouldRetry = pt;
function gt(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r);
}
var yt = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, W = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, G = { 0: String.fromCodePoint(W[0]), 1: String.fromCodePoint(W[1]), 2: String.fromCodePoint(W[2]), 3: String.fromCodePoint(W[3]) }, Yr = new Array(4).fill(String.fromCodePoint(W[0])).join("");
function Xr(r) {
  let e = JSON.stringify(r), t = new TextEncoder().encode(e), n = "";
  for (let s = 0; s < t.length; s++) {
    let i = t[s];
    n += G[i >> 6 & 3] + G[i >> 4 & 3] + G[i >> 2 & 3] + G[i & 3];
  }
  return Yr + n;
}
function Kr(r) {
  return !Number.isNaN(Number(r)) || /[a-z]/i.test(r) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(r) ? !1 : !!Date.parse(r);
}
function Zr(r) {
  try {
    new URL(r, r.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return !1;
  }
  return !0;
}
function Ys(r, e, t = "auto") {
  return t === !0 || t === "auto" && (Kr(r) || Zr(r)) ? r : `${r}${Xr(e)}`;
}
Object.fromEntries(Object.entries(G).map((r) => [r[1], +r[0]]));
Object.fromEntries(Object.entries(yt).map((r) => r.reverse()));
var en = `${Object.values(yt).map((r) => `\\u{${r.toString(16)}}`).join("")}`, Ne = new RegExp(`[${en}]{4,}`, "gu");
function tn(r) {
  var e;
  return { cleaned: r.replace(Ne, ""), encoded: ((e = r.match(Ne)) == null ? void 0 : e[0]) || "" };
}
function rn(r) {
  return r && JSON.parse(tn(JSON.stringify(r)).cleaned);
}
function nn(r) {
  return rn(r);
}
let sn = (r) => crypto.getRandomValues(new Uint8Array(r)), an = (r, e, t) => {
  let n = (2 << Math.log(r.length - 1) / Math.LN2) - 1, s = -~(1.6 * n * e / r.length);
  return (i = e) => {
    if (i <= 0) return "";
    let a = "";
    for (; ; ) {
      let o = t(s), c = s | 0;
      for (; c--; )
        if (a += r[o[c] & n] || "", a.length === i) return a;
    }
  };
}, on = (r, e = 21) => an(r, e, sn);
const He = /\r\n|[\n\r\u2028\u2029]/;
function cn(r, e, t) {
  const n = r.split(He), s = {
    start: Be(e.start, n),
    end: e.end ? Be(e.end, n) : void 0
  }, { start: i, end: a, markerLines: o } = un(s, n), c = `${a}`.length;
  return r.split(He, a).slice(i, a).map((u, h) => {
    const p = i + 1 + h, d = ` ${` ${p}`.slice(-c)} |`, f = o[p], g = !o[p + 1];
    if (!f)
      return ` ${d}${u.length > 0 ? ` ${u}` : ""}`;
    let l = "";
    if (Array.isArray(f)) {
      const y = u.slice(0, Math.max(f[0] - 1, 0)).replace(/[^\t]/g, " "), b = f[1] || 1;
      l = [
        `
 `,
        d.replace(/\d/g, " "),
        " ",
        y,
        "^".repeat(b)
      ].join(""), g && t && (l += " " + t);
    }
    return [">", d, u.length > 0 ? ` ${u}` : "", l].join("");
  }).join(`
`);
}
function un(r, e) {
  const t = { ...r.start }, n = { ...t, ...r.end }, s = 2, i = 3, a = t.line ?? -1, o = t.column ?? 0, c = n.line, u = n.column;
  let h = Math.max(a - (s + 1), 0), p = Math.min(e.length, c + i);
  a === -1 && (h = 0), c === -1 && (p = e.length);
  const d = c - a, f = {};
  if (d)
    for (let g = 0; g <= d; g++) {
      const l = g + a;
      if (!o)
        f[l] = !0;
      else if (g === 0) {
        const y = e[l - 1].length;
        f[l] = [o, y - o + 1];
      } else if (g === d)
        f[l] = [0, u];
      else {
        const y = e[l - g].length;
        f[l] = [0, y];
      }
    }
  else
    o === u ? o ? f[a] = [o, 0] : f[a] = !0 : f[a] = [o, u - o];
  return { start: h, end: p, markerLines: f };
}
function Be(r, e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n].length + 1;
    if (t + s > r)
      return {
        line: n + 1,
        // 1-based line
        column: r - t
        // 0-based column
      };
    t += s;
  }
  return {
    line: e.length,
    column: e[e.length - 1]?.length ?? 0
  };
}
const ye = 5;
class ln extends Error {
  response;
  statusCode = 400;
  responseBody;
  traceId;
  details;
  constructor(e, t) {
    const n = mt(e, t);
    super(n.message), Object.assign(this, n);
  }
}
class dn extends Error {
  response;
  statusCode = 500;
  responseBody;
  traceId;
  details;
  constructor(e) {
    const t = mt(e);
    super(t.message), Object.assign(this, t);
  }
}
function mt(r, e) {
  const t = r.body, n = {
    response: r,
    statusCode: r.statusCode,
    responseBody: gn(t, r),
    traceId: pn(r),
    message: "",
    details: void 0
  };
  if (!gt(t))
    return n.message = `${me(r, t)}${O(n.traceId)}`, n;
  const s = t.error;
  if (typeof s == "string" && typeof t.message == "string")
    return n.message = `${s} - ${t.message}${O(n.traceId)}`, n;
  if (typeof s != "object" || s === null)
    return typeof s == "string" ? n.message = `${s}${O(n.traceId)}` : typeof t.message == "string" ? n.message = `${t.message}${O(n.traceId)}` : n.message = `${me(r, t)}${O(n.traceId)}`, n;
  if (hn(s) || fn(s)) {
    const i = s.items || [], a = i.slice(0, ye).map((c) => c.error?.description).filter(Boolean);
    let o = a.length ? `:
- ${a.join(`
- `)}` : "";
    return i.length > ye && (o += `
...and ${i.length - ye} more`), n.message = `${s.description}${O(n.traceId)}${o}`, n.details = t.error, n;
  }
  if (wt(s)) {
    const i = e?.options?.query?.tag;
    return n.message = bt(s, i, n.traceId), n.details = t.error, n;
  }
  return "description" in s && typeof s.description == "string" ? (n.message = `${s.description}${O(n.traceId)}`, n.details = s, n) : (n.message = `${me(r, t)}${O(n.traceId)}`, n);
}
function hn(r) {
  return "type" in r && r.type === "mutationError" && "description" in r && typeof r.description == "string";
}
function fn(r) {
  return "type" in r && r.type === "actionError" && "description" in r && typeof r.description == "string";
}
function wt(r) {
  return gt(r) && r.type === "queryParseError" && typeof r.query == "string" && typeof r.start == "number" && typeof r.end == "number";
}
function bt(r, e, t) {
  const { query: n, start: s, end: i, description: a } = r, o = t ? `
(traceId: ${t})` : "";
  if (!n || typeof s > "u")
    return `GROQ query parse error: ${a}${o}`;
  const c = e ? `

Tag: ${e}` : "";
  return `GROQ query parse error:
${cn(n, { start: s, end: i }, a)}${c}${o}`;
}
function me(r, e) {
  const t = typeof e == "string" ? ` (${yn(e, 100)})` : "", n = r.statusMessage ? ` ${r.statusMessage}` : "";
  return `${r.method}-request to ${r.url} resulted in HTTP ${r.statusCode}${n}${t}`;
}
function pn(r) {
  const e = r?.headers?.traceparent;
  if (e)
    return e.split("-")[1];
}
function gn(r, e) {
  return (e.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(r, null, 2) : r;
}
function O(r) {
  return r ? ` (traceId: ${r})` : "";
}
function yn(r, e) {
  return r.length > e ? `${r.slice(0, e)}…` : r;
}
class Ie extends Error {
  projectId;
  addOriginUrl;
  constructor({ projectId: e, credentials: t } = {}) {
    if (super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = e, e && typeof location < "u") {
      const n = new URL(`https://sanity.io/manage/project/${e}/api`), { origin: s } = location;
      n.searchParams.set("cors", "add"), n.searchParams.set("origin", s), t && n.searchParams.set("credentials", ""), this.addOriginUrl = n, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${n}`;
    } else e ? this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: https://sanity.io/manage/project/${e}/api` : this.message = "The current origin is not allowed to connect to the Live Content API.";
  }
}
const mn = {
  onResponse: (r, e) => {
    if (r.statusCode >= 500)
      throw new dn(r);
    if (r.statusCode >= 400)
      throw new ln(r, e);
    return r;
  }
};
function wn(r = {}) {
  const e = {}, t = (n) => r.ignoreWarnings === void 0 ? !1 : (Array.isArray(r.ignoreWarnings) ? r.ignoreWarnings : [r.ignoreWarnings]).some((s) => typeof s == "string" ? n.includes(s) : s instanceof RegExp ? s.test(n) : !1);
  return {
    onResponse: (n) => {
      const s = n.headers["x-sanity-warning"], i = Array.isArray(s) ? s : [s];
      for (const a of i)
        !a || e[a] || t(a) || (e[a] = !0, console.warn(a));
      return n;
    }
  };
}
function ze(r, e = {}) {
  return Vr([
    je({ shouldRetry: bn }),
    ...r,
    wn(e),
    Br(),
    zr(),
    Qr(),
    mn,
    Gr({ implementation: x })
  ]);
}
function bn(r, e, t) {
  if (t.maxRetries === 0) return !1;
  const n = t.method === "GET" || t.method === "HEAD", s = (t.uri || t.url).startsWith("/data/query"), i = r.response && (r.response.statusCode === 429 || r.response.statusCode === 502 || r.response.statusCode === 503);
  return (n || s) && i ? !0 : je.shouldRetry(r, e, t);
}
const vn = "https://www.sanity.io/help/";
function xe(r) {
  return vn + r;
}
const We = ["image", "file"], Ge = ["before", "after", "replace"], U = (r) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(r))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, Cn = (r) => {
  if (!/^[-a-z0-9]+$/i.test(r))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, En = (r) => {
  if (We.indexOf(r) === -1)
    throw new Error(`Invalid asset type: ${r}. Must be one of ${We.join(", ")}`);
}, J = (r, e) => {
  if (e === null || typeof e != "object" || Array.isArray(e))
    throw new Error(`${r}() takes an object of properties`);
}, ne = (r, e) => {
  if (typeof e != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(e) || e.includes(".."))
    throw new Error(`${r}(): "${e}" is not a valid document ID`);
}, N = (r, e) => {
  if (!e._id)
    throw new Error(`${r}() requires that the document contains an ID ("_id" property)`);
  ne(r, e._id);
}, $n = (r, e) => {
  if (typeof e != "string")
    throw new Error(`\`${r}()\`: \`${e}\` is not a valid document type`);
}, vt = (r, e) => {
  if (!e._type)
    throw new Error(`\`${r}()\` requires that the document contains a type (\`_type\` property)`);
  $n(r, e._type);
}, In = (r, e) => {
  if (e._id && e._id !== r)
    throw new Error(
      `The provided document ID (\`${e._id}\`) does not match the generated version ID (\`${r}\`)`
    );
}, An = (r, e, t) => {
  const n = "insert(at, selector, items)";
  if (Ge.indexOf(r) === -1) {
    const s = Ge.map((i) => `"${i}"`).join(", ");
    throw new Error(`${n} takes an "at"-argument which is one of: ${s}`);
  }
  if (typeof e != "string")
    throw new Error(`${n} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(t))
    throw new Error(`${n} takes an "items"-argument which must be an array`);
}, D = (r) => {
  if (r.dataset)
    return r.dataset;
  const e = r.resource;
  if (e && e.type === "dataset") {
    const t = e.id.split(".");
    if (t.length !== 2)
      throw new Error('Dataset resource ID must be in the format "project.dataset"');
    return t[1];
  }
  throw new Error("`dataset` must be provided to perform queries");
}, Ct = (r) => {
  if (typeof r != "string" || !/^[a-z0-9._-]{1,75}$/i.test(r))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return r;
}, Et = (r) => {
  const e = r.resource;
  if (!e)
    throw new Error("`resource` must be provided to perform resource queries");
  const { type: t, id: n } = e;
  switch (t) {
    case "dataset": {
      if (n.split(".").length !== 2)
        throw new Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    }
    case "dashboard":
    case "media-library":
    case "canvas":
      return;
    default:
      throw new Error(`Unsupported resource type: ${t.toString()}`);
  }
}, j = (r, e) => {
  if (e.resource)
    throw new Error(`\`${r}\` does not support resource-based operations`);
};
function Sn(r) {
  let e = !1, t;
  return (...n) => (e || (t = r(...n), e = !0), t);
}
const R = (r) => (
  // eslint-disable-next-line no-console
  Sn((...e) => console.warn(r.join(" "), ...e))
), Tn = R([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), jn = R([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), xn = R([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), Rn = R([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), On = R([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${xe(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]), qn = R([
  "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
  "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), Pn = R([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${xe("js-client-api-version")}`
]), _n = R([
  "You have called `createVersion()` with a defined `document`. The recommended approach is to provide a `baseId` and `releaseId` instead."
]), Fn = R([
  "The `~experimental_resource` configuration property has been renamed to `resource`.",
  "Please update your client configuration to use `resource` instead. Support for `~experimental_resource` will be removed in a future version."
]), Dn = "apicdn.sanity.io", Y = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: !0,
  stega: { enabled: !1 }
}, Mn = ["localhost", "127.0.0.1", "0.0.0.0"], kn = (r) => Mn.indexOf(r) !== -1;
function Ln(r) {
  if (r === "1" || r === "X")
    return;
  const e = new Date(r);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(r) && e instanceof Date && e.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function $t(r) {
  if (Array.isArray(r) && r.length > 1 && r.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
}
const It = (r, e) => {
  const t = {
    ...e,
    ...r,
    stega: {
      ...typeof e.stega == "boolean" ? { enabled: e.stega } : e.stega || Y.stega,
      ...typeof r.stega == "boolean" ? { enabled: r.stega } : r.stega || {}
    }
  };
  t.apiVersion || Pn();
  const n = {
    ...Y,
    ...t
  };
  n["~experimental_resource"] && !n.resource && (Fn(), n.resource = n["~experimental_resource"]);
  const s = n.resource, i = n.useProjectHostname && !s;
  if (typeof Promise > "u") {
    const f = xe("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${f}`);
  }
  if (i && !n.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (s && Et(n), typeof n.perspective < "u" && $t(n.perspective), "encodeSourceMap" in n)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in n)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof n.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${n.stega.enabled}`);
  if (n.stega.enabled && n.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (n.stega.enabled && typeof n.stega.studioUrl != "string" && typeof n.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${n.stega.studioUrl}`
    );
  const a = typeof window < "u" && window.location && window.location.hostname, o = a && kn(window.location.hostname), c = !!n.token;
  n.withCredentials && c && (qn(), n.withCredentials = !1), a && o && c && n.ignoreBrowserTokenWarning !== !0 ? On() : typeof n.useCdn > "u" && jn(), i && Cn(n.projectId), n.dataset && U(n.dataset), "requestTagPrefix" in n && (n.requestTagPrefix = n.requestTagPrefix ? Ct(n.requestTagPrefix).replace(/\.+$/, "") : void 0), n.apiVersion = `${n.apiVersion}`.replace(/^v/, ""), n.isDefaultApi = n.apiHost === Y.apiHost, n.useCdn === !0 && n.withCredentials && Tn(), n.useCdn = n.useCdn !== !1 && !n.withCredentials, Ln(n.apiVersion);
  const u = n.apiHost.split("://", 2), h = u[0], p = u[1], d = n.isDefaultApi ? Dn : p;
  return i ? (n.url = `${h}://${n.projectId}.${p}/v${n.apiVersion}`, n.cdnUrl = `${h}://${n.projectId}.${d}/v${n.apiVersion}`) : (n.url = `${n.apiHost}/v${n.apiVersion}`, n.cdnUrl = n.url), n;
};
class Ae extends Error {
  name = "ConnectionFailedError";
  /**
   * HTTP status code of the rejected connection attempt, if known.
   * Only set when the EventSource implementation exposes it — the polyfill used in
   * Node.js and when custom headers (eg authorization) are required does, while
   * native EventSource implementations (browser and Node.js) do not.
   */
  status;
  constructor(e, t = {}) {
    const { status: n, ...s } = t;
    super(e, s), this.status = n;
  }
}
class Vn extends Error {
  name = "DisconnectError";
  reason;
  constructor(e, t, n = {}) {
    super(e, n), this.reason = t;
  }
}
class Un extends Error {
  name = "ChannelError";
  data;
  constructor(e, t) {
    super(e), this.data = t;
  }
}
class Nn extends Error {
  name = "MessageError";
  data;
  constructor(e, t, n = {}) {
    super(e, n), this.data = t;
  }
}
class Qe extends Error {
  name = "MessageParseError";
}
const Hn = ["channelError", "disconnect"];
function At(r, e) {
  return it(() => {
    const t = r();
    return Cr(t) ? t : P(t);
  }).pipe(Q((t) => Bn(t, e)));
}
function Bn(r, e) {
  return new x((t) => {
    const n = e.includes("open"), s = e.includes("reconnect");
    function i(u) {
      if ("data" in u) {
        const [d, f] = Je(u);
        t.error(
          d ? new Qe("Unable to parse EventSource error message", { cause: f }) : new Nn((f?.data).message, f)
        );
        return;
      }
      const h = u.status, p = typeof h == "number" ? h : void 0;
      if (p !== void 0) {
        t.error(new Ae("EventSource connection failed", { status: p }));
        return;
      }
      r.readyState === r.CLOSED ? t.error(new Ae("EventSource connection failed")) : s && t.next({ type: "reconnect" });
    }
    function a() {
      t.next({ type: "open" });
    }
    function o(u) {
      const [h, p] = Je(u);
      if (h) {
        t.error(
          new Qe("Unable to parse EventSource message", { cause: h })
        );
        return;
      }
      if (u.type === "channelError") {
        const d = new URL(r.url).searchParams.get("tag");
        t.error(new Un(zn(p?.data, d), p.data));
        return;
      }
      if (u.type === "disconnect") {
        t.error(
          new Vn(
            `Server disconnected client: ${p.data?.reason || "unknown error"}`
          )
        );
        return;
      }
      t.next({
        type: u.type,
        id: u.lastEventId,
        ...p.data ? { data: p.data } : {}
      });
    }
    r.addEventListener("error", i), n && r.addEventListener("open", a);
    const c = [.../* @__PURE__ */ new Set([...Hn, ...e])].filter((u) => u !== "error" && u !== "open" && u !== "reconnect");
    return c.forEach((u) => r.addEventListener(u, o)), () => {
      r.removeEventListener("error", i), n && r.removeEventListener("open", a), c.forEach((u) => r.removeEventListener(u, o)), r.close();
    };
  });
}
function Je(r) {
  try {
    const e = typeof r.data == "string" && JSON.parse(r.data);
    return [
      null,
      {
        type: r.type,
        id: r.lastEventId,
        ...Wn(e) ? {} : { data: e }
      }
    ];
  } catch (e) {
    return [e, null];
  }
}
function zn(r, e) {
  const t = r.error;
  return t ? wt(t) ? bt(t, e) : t.description ? t.description : typeof t == "string" ? t : JSON.stringify(t, null, 2) : r.message || "Unknown listener error";
}
function Wn(r) {
  for (const e in r)
    return !1;
  return !0;
}
function St(r) {
  if (typeof r == "string")
    return { id: r };
  if (Array.isArray(r))
    return { query: "*[_id in $ids]", params: { ids: r } };
  if (typeof r == "object" && r !== null && "query" in r && typeof r.query == "string")
    return "params" in r && typeof r.params == "object" && r.params !== null ? { query: r.query, params: r.params } : { query: r.query };
  const e = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${e}`);
}
class Tt {
  selection;
  operations;
  constructor(e, t = {}) {
    this.selection = e, this.operations = t;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(e) {
    return this._assign("set", e);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(e) {
    return this._assign("setIfMissing", e);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(e) {
    return J("diffMatchPatch", e), this._assign("diffMatchPatch", e);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(e) {
    if (!Array.isArray(e))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: e }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(e) {
    return this._assign("inc", e);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(e) {
    return this._assign("dec", e);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(e, t, n) {
    return An(e, t, n), this._assign("insert", { [e]: t, items: n });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(e, t) {
    return this.insert("after", `${e}[-1]`, t);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(e, t) {
    return this.insert("before", `${e}[0]`, t);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(e, t, n, s) {
    const i = typeof n > "u" || n === -1, a = t < 0 ? t - 1 : t, o = i ? -1 : Math.max(0, t + n), c = a < 0 && o >= 0 ? "" : o, u = `${e}[${a}:${c}]`;
    return this.insert("replace", u, s || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(e) {
    return this.operations.ifRevisionID = e, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...St(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(e, t, n = !0) {
    return J(e, t), this.operations = Object.assign({}, this.operations, {
      [e]: Object.assign({}, n && this.operations[e] || {}, t)
    }), this;
  }
  _set(e, t) {
    return this._assign(e, t, !1);
  }
}
class _ extends Tt {
  #e;
  constructor(e, t, n) {
    super(e, t), this.#e = n;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _(this.selection, { ...this.operations }, this.#e);
  }
  commit(e) {
    if (!this.#e)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const t = typeof this.selection == "string", n = Object.assign({ returnFirst: t, returnDocuments: !0 }, e);
    return this.#e.mutate({ patch: this.serialize() }, n);
  }
}
class q extends Tt {
  #e;
  constructor(e, t, n) {
    super(e, t), this.#e = n;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new q(this.selection, { ...this.operations }, this.#e);
  }
  commit(e) {
    if (!this.#e)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const t = typeof this.selection == "string", n = Object.assign({ returnFirst: t, returnDocuments: !0 }, e);
    return this.#e.mutate({ patch: this.serialize() }, n);
  }
}
const jt = { returnDocuments: !1 };
class xt {
  operations;
  trxId;
  constructor(e = [], t) {
    this.operations = e, this.trxId = t;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(e) {
    return J("create", e), this._add({ create: e });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(e) {
    const t = "createIfNotExists";
    return J(t, e), N(t, e), this._add({ [t]: e });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(e) {
    const t = "createOrReplace";
    return J(t, e), N(t, e), this._add({ [t]: e });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(e) {
    return ne("delete", e), this._add({ delete: { id: e } });
  }
  transactionId(e) {
    return e ? (this.trxId = e, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(e) {
    return this.operations.push(e), this;
  }
}
class ue extends xt {
  #e;
  constructor(e, t, n) {
    super(e, n), this.#e = t;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new ue([...this.operations], this.#e, this.trxId);
  }
  commit(e) {
    if (!this.#e)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#e.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, jt, e || {})
    );
  }
  patch(e, t) {
    const n = typeof t == "function", s = typeof e != "string" && e instanceof q, i = typeof e == "object" && ("query" in e || "id" in e);
    if (s)
      return this._add({ patch: e.serialize() });
    if (n) {
      const a = t(new q(e, {}, this.#e));
      if (!(a instanceof q))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: a.serialize() });
    }
    if (i) {
      const a = new q(e, t || {}, this.#e);
      return this._add({ patch: a.serialize() });
    }
    return this._add({ patch: { id: e, ...t } });
  }
}
class le extends xt {
  #e;
  constructor(e, t, n) {
    super(e, n), this.#e = t;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new le([...this.operations], this.#e, this.trxId);
  }
  commit(e) {
    if (!this.#e)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#e.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, jt, e || {})
    );
  }
  patch(e, t) {
    const n = typeof t == "function";
    if (typeof e != "string" && e instanceof _)
      return this._add({ patch: e.serialize() });
    if (n) {
      const s = t(new _(e, {}, this.#e));
      if (!(s instanceof _))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: s.serialize() });
    }
    return this._add({ patch: { id: e, ...t } });
  }
}
const Gn = "X-Sanity-Project-ID";
function Qn(r, e = {}) {
  const t = {};
  r.headers && Object.assign(t, r.headers);
  const n = e.token || r.token;
  n && (t.Authorization = `Bearer ${n}`), !e.useGlobalApi && !r.useProjectHostname && r.projectId && (t[Gn] = r.projectId);
  const s = !!(typeof e.withCredentials > "u" ? r.withCredentials : e.withCredentials), i = typeof e.timeout > "u" ? r.timeout : e.timeout;
  return Object.assign({}, e, {
    headers: Object.assign({}, t, e.headers || {}),
    timeout: typeof i > "u" ? 300 * 1e3 : i,
    proxy: e.proxy || r.proxy,
    json: !0,
    withCredentials: s,
    fetch: typeof e.fetch == "object" && typeof r.fetch == "object" ? { ...r.fetch, ...e.fetch } : e.fetch || r.fetch
  });
}
const Rt = ({
  query: r,
  params: e = {},
  options: t = {}
}) => {
  const n = new URLSearchParams(), { tag: s, includeMutations: i, returnQuery: a, ...o } = t;
  s && n.append("tag", s), n.append("query", r);
  for (const [c, u] of Object.entries(e))
    u !== void 0 && n.append(`$${c}`, JSON.stringify(u));
  for (const [c, u] of Object.entries(o))
    u && n.append(c, `${u}`);
  return a === !1 && n.append("returnQuery", "false"), i === !1 && n.append("includeMutations", "false"), `?${n}`;
}, Jn = (r, e) => r === !1 ? void 0 : typeof r > "u" ? e : r, Yn = (r = {}) => ({
  dryRun: r.dryRun,
  returnIds: !0,
  returnDocuments: Jn(r.returnDocuments, !0),
  visibility: r.visibility || "sync",
  autoGenerateArrayKeys: r.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: r.skipCrossDatasetReferenceValidation
}), de = (r) => r.type === "response", Xn = (r) => r.body, Kn = (r, e) => r.reduce((t, n) => (t[e(n)] = n, t), /* @__PURE__ */ Object.create(null)), Zn = 11264;
function Ot(r, e, t, n, s = {}, i = {}) {
  const a = "stega" in i ? {
    ...t || {},
    ...typeof i.stega == "boolean" ? { enabled: i.stega } : i.stega || {}
  } : t, o = a.enabled ? nn(s) : s, c = i.filterResponse === !1 ? (g) => g : (g) => g.result, { cache: u, next: h, ...p } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof i.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: a.enabled ? "withKeyArraySelector" : i.resultSourceMap,
    ...i,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: i.filterResponse === !1 && i.returnQuery !== !1
  }, d = typeof u < "u" || typeof h < "u" ? { ...p, fetch: { cache: u, next: h } } : p, f = M(r, e, "query", { query: n, params: o }, d);
  return a.enabled ? f.pipe(
    Or(
      K(
        import("./stegaEncodeSourceMap-Dnc41wyR.js").then(function(g) {
          return g.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap: g }) => g
        )
      )
    ),
    A(
      ([g, l]) => {
        const y = l(g.result, g.resultSourceMap, a);
        return c({ ...g, result: y });
      }
    )
  ) : f.pipe(A(c));
}
function H(r, e, t, n = {}) {
  const s = (() => {
    if (!n.releaseId)
      return t;
    const a = et(t);
    if (!a) {
      if (tt(t))
        throw new Error(
          `The document ID (\`${t}\`) is a draft, but \`options.releaseId\` is set as \`${n.releaseId}\``
        );
      return X(t, n.releaseId);
    }
    if (a !== n.releaseId)
      throw new Error(
        `The document ID (\`${t}\`) is already a version of \`${a}\` release, but this does not match the provided \`options.releaseId\` (\`${n.releaseId}\`)`
      );
    return t;
  })(), i = {
    uri: T(r, "doc", s),
    json: !0,
    tag: n.tag,
    signal: n.signal,
    query: n.includeAllVersions !== void 0 ? { includeAllVersions: n.includeAllVersions } : void 0
  };
  return B(
    r,
    e,
    i
  ).pipe(
    F(de),
    A((a) => {
      const o = a.body.documents;
      return o ? n.includeAllVersions ? o : o[0] : n.includeAllVersions ? [] : void 0;
    })
  );
}
function qt(r, e, t, n = {}) {
  const s = {
    uri: T(r, "doc", t.join(",")),
    json: !0,
    tag: n.tag,
    signal: n.signal
  };
  return B(r, e, s).pipe(
    F(de),
    A((i) => {
      const a = Kn(i.body.documents || [], (o) => o._id);
      return t.map((o) => a[o] || null);
    })
  );
}
const Ye = 100;
function Pt(r, e, t, n = {}) {
  if (t.length === 0)
    return P(/* @__PURE__ */ new Set());
  const s = [];
  for (let a = 0; a < t.length; a += Ye)
    s.push(t.slice(a, a + Ye));
  const i = (a) => B(r, e, {
    uri: T(r, "doc", a.map(encodeURIComponent).join(",")),
    tag: n.tag,
    signal: n.signal,
    query: { excludeContent: !0 }
  }).pipe(
    F(de),
    A((o) => {
      const c = /* @__PURE__ */ new Set();
      for (const u of o.body.omitted || [])
        u.reason === "existence" && c.add(u.id);
      return new Set(a.filter((u) => !c.has(u)));
    })
  );
  return K(s).pipe(
    yr(i),
    Rr((a, o) => {
      for (const c of o) a.add(c);
      return a;
    }, /* @__PURE__ */ new Set())
  );
}
function _t(r, e, t, n = {}) {
  return M(
    r,
    e,
    "query",
    {
      query: "*[sanity::partOfRelease($releaseId)]",
      params: {
        releaseId: t
      }
    },
    n
  );
}
function Ft(r, e, t, n) {
  return N("createIfNotExists", t), he(r, e, t, "createIfNotExists", n);
}
function Dt(r, e, t, n) {
  return N("createOrReplace", t), he(r, e, t, "createOrReplace", n);
}
function Mt(r, e, t, n, s) {
  return N("createVersion", t), vt("createVersion", t), _n(), E(r, e, {
    actionType: "sanity.action.document.version.create",
    publishedId: n,
    document: t
  }, s);
}
function kt(r, e, t, n, s, i, a) {
  if (!n)
    throw new Error("`createVersion()` requires `baseId` when no `document` is provided");
  if (!t)
    throw new Error("`createVersion()` requires `publishedId` when `baseId` is provided");
  ne("createVersion", n), ne("createVersion", t);
  const o = {
    actionType: "sanity.action.document.version.create",
    publishedId: t,
    baseId: n,
    versionId: s ? X(t, s) : rt(t),
    ifBaseRevisionId: i
  };
  return E(r, e, o, a);
}
function Lt(r, e, t, n) {
  return M(
    r,
    e,
    "mutate",
    { mutations: [{ delete: St(t) }] },
    n
  );
}
function Vt(r, e, t, n = !1, s) {
  return E(r, e, {
    actionType: "sanity.action.document.version.discard",
    versionId: t,
    purge: n
  }, s);
}
function Ut(r, e, t, n) {
  return N("replaceVersion", t), vt("replaceVersion", t), E(r, e, {
    actionType: "sanity.action.document.version.replace",
    document: t
  }, n);
}
function Nt(r, e, t, n, s) {
  return E(r, e, {
    actionType: "sanity.action.document.version.unpublish",
    versionId: t,
    publishedId: n
  }, s);
}
function Ht(r, e, t, n) {
  let s;
  t instanceof q || t instanceof _ ? s = { patch: t.serialize() } : t instanceof ue || t instanceof le ? s = t.serialize() : s = t;
  const i = Array.isArray(s) ? s : [s], a = n && n.transactionId || void 0;
  return M(r, e, "mutate", { mutations: i, transactionId: a }, n);
}
function E(r, e, t, n) {
  const s = Array.isArray(t) ? t : [t], i = n && n.transactionId || void 0, a = n && n.skipCrossDatasetReferenceValidation || void 0, o = n && n.dryRun || void 0;
  return M(
    r,
    e,
    "actions",
    { actions: s, transactionId: i, skipCrossDatasetReferenceValidation: a, dryRun: o },
    n
  );
}
function M(r, e, t, n, s = {}) {
  const i = t === "mutate", a = t === "actions", o = t === "query", c = i || a ? "" : Rt(n), u = !i && !a && c.length < Zn, h = u ? c : "", p = s.returnFirst, { timeout: d, token: f, tag: g, headers: l, returnQuery: y, lastLiveEventId: b, cacheMode: v } = s, C = T(r, t, h), m = {
    method: u ? "GET" : "POST",
    uri: C,
    json: !0,
    body: u ? void 0 : n,
    query: i && Yn(s),
    timeout: d,
    headers: l,
    token: f,
    tag: g,
    returnQuery: y,
    perspective: s.perspective,
    variant: s.variant,
    resultSourceMap: s.resultSourceMap,
    lastLiveEventId: Array.isArray(b) ? b[0] : b,
    cacheMode: v,
    canUseCdn: o,
    signal: s.signal,
    fetch: s.fetch,
    useAbortSignal: s.useAbortSignal,
    useCdn: s.useCdn
  };
  return B(r, e, m).pipe(
    F(de),
    A(Xn),
    A(($) => {
      if (!i)
        return $;
      const S = $.results || [];
      if (s.returnDocuments)
        return p ? S[0] && S[0].document : S.map((fe) => fe.document);
      const k = p ? "documentId" : "documentIds", te = p ? S[0] && S[0].id : S.map((fe) => fe.id);
      return {
        transactionId: $.transactionId,
        results: S,
        [k]: te
      };
    })
  );
}
function he(r, e, t, n, s = {}) {
  const i = { [n]: t }, a = Object.assign({ returnFirst: !0, returnDocuments: !0 }, s);
  return M(r, e, "mutate", { mutations: [i] }, a);
}
const ee = (r) => {
  const e = r.config();
  return e.dataset !== void 0 && e.projectId !== void 0 || e.resource !== void 0;
}, Bt = (r, e) => ee(r) && e.startsWith(T(r, "query")), es = (r, e) => ee(r) && e.startsWith(T(r, "mutate")), ts = (r, e) => ee(r) && e.startsWith(T(r, "doc", "")), rs = (r, e) => ee(r) && e.startsWith(T(r, "listen")), ns = (r, e) => ee(r) && e.startsWith(T(r, "history", "")), ss = (r, e) => e.startsWith("/data/") || Bt(r, e) || es(r, e) || ts(r, e) || rs(r, e) || ns(r, e);
function B(r, e, t) {
  const n = new Error(), s = t.url || t.uri, i = r.config(), a = typeof t.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(t.method || "GET") >= 0 && ss(r, s) : t.canUseCdn;
  let o = (t.useCdn ?? i.useCdn) && a;
  const c = t.tag && i.requestTagPrefix ? [i.requestTagPrefix, t.tag].join(".") : t.tag || i.requestTagPrefix;
  if (c && t.tag !== null && (t.query = { tag: Ct(c), ...t.query }), ["GET", "HEAD", "POST"].indexOf(t.method || "GET") >= 0 && Bt(r, s)) {
    const p = t.resultSourceMap ?? i.resultSourceMap;
    p !== void 0 && p !== !1 && (t.query = { resultSourceMap: p, ...t.query });
    const d = t.perspective || i.perspective;
    typeof d < "u" && (d === "previewDrafts" && Rn(), $t(d), t.query = {
      perspective: Array.isArray(d) ? d.join(",") : d,
      ...t.query
    }, (Array.isArray(d) && d.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    d === "previewDrafts" || d === "drafts") && o && (o = !1, xn()));
    const f = t.variant || i.variant;
    typeof f == "string" && (t.query = {
      variant: f,
      ...t.query
    }), typeof f == "object" && (t.query = {
      variantCondition: us(f),
      ...t.query
    }), t.lastLiveEventId && (t.query = { ...t.query, lastLiveEventId: t.lastLiveEventId }), t.returnQuery === !1 && (t.query = { returnQuery: "false", ...t.query }), o && t.cacheMode == "noStale" && (t.query = { cacheMode: "noStale", ...t.query });
  }
  const u = Qn(
    i,
    Object.assign({}, t, {
      url: Re(r, s, o),
      callSiteStack: n
    })
  ), h = new x(
    (p) => e(u, i.requester).subscribe(p)
  );
  return t.signal ? h.pipe(is(t.signal)) : h;
}
function I(r, e, t) {
  return B(r, e, t).pipe(
    F((n) => n.type === "response"),
    A((n) => n.body)
  );
}
function T(r, e, t) {
  const n = r.config();
  if (n.resource) {
    Et(n);
    const a = cs(n), o = t !== void 0 ? `${e}/${t}` : e;
    return `${a}/${o}`.replace(/\/($|\?)/, "$1");
  }
  const s = D(n), i = `/${e}/${s}`;
  return `/data${t !== void 0 ? `${i}/${t}` : i}`.replace(/\/($|\?)/, "$1");
}
function Re(r, e, t = !1) {
  const { url: n, cdnUrl: s } = r.config();
  return `${t ? s : n}/${e.replace(/^\//, "")}`;
}
function is(r) {
  return (e) => new x((t) => {
    const n = () => t.error(os(r));
    if (r && r.aborted) {
      n();
      return;
    }
    const s = e.subscribe(t);
    return r.addEventListener("abort", n), () => {
      r.removeEventListener("abort", n), s.unsubscribe();
    };
  });
}
const as = !!globalThis.DOMException;
function os(r) {
  if (as)
    return new DOMException(r?.reason ?? "The operation was aborted.", "AbortError");
  const e = new Error(r?.reason ?? "The operation was aborted.");
  return e.name = "AbortError", e;
}
const cs = (r) => {
  const e = r.resource;
  if (!e)
    throw new Error("`resource` must be provided to perform resource queries");
  const { type: t, id: n } = e;
  switch (t) {
    case "dataset": {
      const s = n.split(".");
      if (s.length !== 2)
        throw new Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${s[0]}/datasets/${s[1]}`;
    }
    case "canvas":
      return `/canvases/${n}`;
    case "media-library":
      return `/media-libraries/${n}`;
    case "dashboard":
      return `/dashboards/${n}`;
    default:
      throw new Error(`Unsupported resource type: ${t.toString()}`);
  }
};
function us(r) {
  return Object.entries(r).map(([e, t]) => `${e}:${t}`).toSorted();
}
function zt(r, e, t) {
  const n = D(r.config());
  return I(r, e, {
    method: "POST",
    uri: `/agent/action/generate/${n}`,
    body: t
  });
}
function ls(r, e, t) {
  const n = D(r.config());
  return I(r, e, {
    method: "POST",
    uri: `/agent/action/patch/${n}`,
    body: t
  });
}
function ds(r, e, t) {
  const n = D(r.config());
  return I(r, e, {
    method: "POST",
    uri: `/agent/action/prompt/${n}`,
    body: t
  });
}
function Wt(r, e, t) {
  const n = D(r.config());
  return I(r, e, {
    method: "POST",
    uri: `/agent/action/transform/${n}`,
    body: t
  });
}
function Gt(r, e, t) {
  const n = D(r.config());
  return I(r, e, {
    method: "POST",
    uri: `/agent/action/translate/${n}`,
    body: t
  });
}
class hs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(e) {
    return zt(this.#e, this.#t, e);
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(e) {
    return Wt(this.#e, this.#t, e);
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(e) {
    return Gt(this.#e, this.#t, e);
  }
}
class fs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(e) {
    return w(zt(this.#e, this.#t, e));
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(e) {
    return w(Wt(this.#e, this.#t, e));
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(e) {
    return w(Gt(this.#e, this.#t, e));
  }
  /**
   * Run a raw instruction and return the result either as text or json
   * @param request - prompt request
   */
  prompt(e) {
    return w(ds(this.#e, this.#t, e));
  }
  /**
   * Patch a document using a schema aware API.
   * Does not use an LLM, but uses the schema to ensure paths and values matches the schema.
   * @param request - instruction request
   */
  patch(e) {
    return w(ls(this.#e, this.#t, e));
  }
}
class ps {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  upload(e, t, n) {
    return Qt(this.#e, this.#t, e, t, n);
  }
}
class gs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  upload(e, t, n) {
    const s = Qt(this.#e, this.#t, e, t, n);
    return w(
      s.pipe(
        F((i) => i.type === "response"),
        A(
          (i) => i.body.document
        )
      )
    );
  }
}
function Qt(r, e, t, n, s = {}) {
  En(t);
  let i = s.extract || void 0;
  i && !i.length && (i = ["none"]);
  const a = r.config(), o = ms(s, n), { tag: c, label: u, title: h, description: p, creditLine: d, filename: f, source: g } = o, l = a.resource?.type === "media-library", y = l ? {
    // Media Library only supports basic parameters
    title: h,
    filename: f
  } : {
    // Content Lake supports full set of parameters
    label: u,
    title: h,
    description: p,
    filename: f,
    meta: i,
    creditLine: d
  };
  return g && !l && (y.sourceId = g.id, y.sourceName = g.name, y.sourceUrl = g.url), B(r, e, {
    tag: c,
    method: "POST",
    timeout: o.timeout || 0,
    uri: ys(a, t),
    headers: o.contentType ? { "Content-Type": o.contentType } : {},
    query: y,
    body: n
  });
}
function ys(r, e) {
  const t = e === "image" ? "images" : "files", n = r.resource;
  if (n) {
    const { type: i, id: a } = n;
    switch (i) {
      case "dataset":
        throw new Error(
          "Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead."
        );
      case "canvas":
        return `/canvases/${a}/assets/${t}`;
      case "media-library":
        return `/media-libraries/${a}/upload`;
      case "dashboard":
        return `/dashboards/${a}/assets/${t}`;
      default:
        throw new Error(`Unsupported resource type: ${i.toString()}`);
    }
  }
  const s = D(r);
  return `assets/${t}/${s}`;
}
function ms(r, e) {
  return typeof File > "u" || !(e instanceof File) ? r : Object.assign(
    {
      filename: r.preserveFilename === !1 ? void 0 : e.name,
      contentType: e.type
    },
    r
  );
}
var ws = (r, e) => Object.keys(e).concat(Object.keys(r)).reduce((t, n) => (t[n] = typeof r[n] > "u" ? e[n] : r[n], t), {});
const bs = (r, e) => e.reduce((t, n) => (typeof r[n] > "u" || (t[n] = r[n]), t), {}), Jt = it(() => import("./browser-CZsvyxnk.js")).pipe(
  A(({ default: r }) => r),
  gr(1)
), vs = /* @__PURE__ */ new Set([408, 429]);
function Yt() {
  return function(r) {
    return r.pipe(
      Te((e, t) => e instanceof Ae && (typeof e.status != "number" || e.status < 400 || e.status >= 500 || vs.has(e.status)) ? Ar(P({ type: "reconnect" }), Sr(1e3).pipe(Q(() => t))) : Se(() => e))
    );
  };
}
const Cs = 14800, Es = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "enableResume",
  "tag"
], $s = {
  includeResult: !0
};
function Xt(r, e, t = {}) {
  const { url: n, token: s, withCredentials: i, requestTagPrefix: a, headers: o } = this.config(), c = t.tag && a ? [a, t.tag].join(".") : t.tag, u = { ...ws(t, $s), tag: c }, h = bs(u, Es), p = Rt({ query: r, params: e, options: { tag: c, ...h } }), d = `${n}${T(this, "listen", p)}`;
  if (d.length > Cs)
    return Se(() => new Error("Query too large for listener"));
  const f = u.events ? u.events : ["mutation"], g = {};
  return i && (g.withCredentials = !0), (s || o) && (g.headers = {}, s && (g.headers.Authorization = `Bearer ${s}`), o && Object.assign(g.headers, o)), At(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || g.headers ? Jt : P(EventSource)).pipe(A((l) => new l(d, g)))
  ), f).pipe(
    Yt(),
    F((l) => f.includes(l.type)),
    A((l) => ({
      type: l.type,
      ..."data" in l ? l.data : {}
    }))
  );
}
function Is(r, e) {
  return As(
    typeof r == "function" ? { predicate: r, ...e } : r
  );
}
function As(r) {
  return (e) => {
    let t, n = !1;
    const { predicate: s, ...i } = r, a = e.pipe(
      qr((c) => {
        r.predicate(c) && (n = !0, t = c);
      }),
      ct(() => {
        n = !1, t = void 0;
      }),
      mr(i)
    ), o = new x((c) => {
      n && c.next(
        // this cast is safe because of the emitted check which asserts that we got T from the source
        t
      ), c.complete();
    });
    return wr(a, o);
  };
}
const Xe = "2021-03-25";
class Kt {
  #e;
  constructor(e) {
    this.#e = e;
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts: e = !1,
    tag: t,
    waitFor: n
  } = {}) {
    const {
      projectId: s,
      apiVersion: i,
      token: a,
      withCredentials: o,
      requestTagPrefix: c,
      headers: u
    } = this.#e.config(), h = i.replace(/^v/, "");
    if (h !== "X" && h < Xe)
      throw new Error(
        `The live events API requires API version ${Xe} or later. The current API version is ${h}. Please update your API version to use this feature.`
      );
    if (e && !a && !o)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const p = T(this.#e, "live/events"), d = new URL(this.#e.getUrl(p, !1)), f = t && c ? [c, t].join(".") : t;
    f && d.searchParams.set("tag", f), e && d.searchParams.set("includeDrafts", "true"), n && d.searchParams.set("waitFor", n);
    const g = {};
    e && o && (g.withCredentials = !0), (e && a || u) && (g.headers = {}, e && a && (g.headers.Authorization = `Bearer ${a}`), u && Object.assign(g.headers, u));
    const l = `${d.href}::${JSON.stringify(g)}`, y = we.get(l);
    if (y)
      return y;
    const b = At(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || g.headers ? Jt : P(EventSource)).pipe(A((m) => new m(d.href, g)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]), v = Ss(
      new URL(this.#e.getUrl("/check/cors", !1)),
      s,
      g.withCredentials === !0
    ), C = b.pipe(
      Yt(),
      Q((m) => m.type === "reconnect" ? v.pipe(Q(() => P(m))) : P(m)),
      Te((m) => m instanceof Ie ? Se(() => m) : v.pipe(
        Q(() => {
          throw m;
        })
      )),
      A((m) => {
        if (m.type === "message") {
          const { data: $, ...S } = m;
          return { ...S, tags: $.tags };
        }
        return m;
      })
    ).pipe(
      ct(() => we.delete(l)),
      Is({
        predicate: (m) => m.type === "welcome"
      })
    );
    return we.set(l, C), C;
  }
}
function Ss(r, e, t) {
  return new x((n) => {
    const s = new AbortController(), { signal: i } = s;
    return fetch(r, { method: "GET", mode: "cors", credentials: "omit", signal: i }).then((a) => {
      if (!(i.aborted || !a.ok))
        return a.json();
    }).then((a) => {
      if (!i.aborted) {
        if (t && a?.result?.withCredentials === !1) {
          n.error(new Ie({ projectId: e, credentials: !0 }));
          return;
        }
        if (a?.result?.allowed === !1) {
          n.error(new Ie({ projectId: e, credentials: t }));
          return;
        }
        n.next(), n.complete();
      }
    }).catch(() => {
      i.aborted || n.closed || (n.next(), n.complete());
    }), () => s.abort();
  });
}
const we = /* @__PURE__ */ new Map();
class Ts {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset, including optional embeddings configuration
   */
  create(e, t) {
    return L(this.#e, this.#t, "PUT", e, t);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(e, t) {
    return L(this.#e, this.#t, "PATCH", e, t);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(e) {
    return L(this.#e, this.#t, "DELETE", e);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    j("dataset", this.#e.config());
    const e = this.#e.config(), t = e.projectId;
    let n = "/datasets";
    return e.useProjectHostname === !1 && (n = `/projects/${t}/datasets`), I(this.#e, this.#t, {
      uri: n,
      tag: null
    });
  }
  /**
   * Get embeddings settings for a dataset
   *
   * @param name - Name of the dataset
   */
  getEmbeddingsSettings(e) {
    return j("dataset", this.#e.config()), U(e), I(this.#e, this.#t, {
      uri: se(this.#e, e),
      tag: null
    });
  }
  /**
   * Edit embeddings settings for a dataset
   *
   * @param name - Name of the dataset
   * @param settings - Embeddings settings to apply
   */
  editEmbeddingsSettings(e, t) {
    return j("dataset", this.#e.config()), U(e), I(this.#e, this.#t, {
      method: "PUT",
      uri: se(this.#e, e),
      body: t,
      tag: null
    });
  }
}
class js {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset, including optional embeddings configuration
   */
  create(e, t) {
    return j("dataset", this.#e.config()), w(
      L(this.#e, this.#t, "PUT", e, t)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(e, t) {
    return j("dataset", this.#e.config()), w(
      L(this.#e, this.#t, "PATCH", e, t)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(e) {
    return j("dataset", this.#e.config()), w(L(this.#e, this.#t, "DELETE", e));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    j("dataset", this.#e.config());
    const e = this.#e.config(), t = e.projectId;
    let n = "/datasets";
    return e.useProjectHostname === !1 && (n = `/projects/${t}/datasets`), w(
      I(this.#e, this.#t, { uri: n, tag: null })
    );
  }
  /**
   * Get embeddings settings for a dataset
   *
   * @param name - Name of the dataset
   */
  getEmbeddingsSettings(e) {
    return j("dataset", this.#e.config()), U(e), w(
      I(this.#e, this.#t, {
        uri: se(this.#e, e),
        tag: null
      })
    );
  }
  /**
   * Edit embeddings settings for a dataset
   *
   * @param name - Name of the dataset
   * @param settings - Embeddings settings to apply
   */
  editEmbeddingsSettings(e, t) {
    return j("dataset", this.#e.config()), U(e), w(
      I(this.#e, this.#t, {
        method: "PUT",
        uri: se(this.#e, e),
        body: t,
        tag: null
      })
    );
  }
}
function se(r, e) {
  const t = r.config();
  return t.useProjectHostname === !1 ? `/projects/${t.projectId}/datasets/${e}/settings/embeddings` : `/datasets/${e}/settings/embeddings`;
}
function L(r, e, t, n, s) {
  return j("dataset", r.config()), U(n), I(r, e, {
    method: t,
    uri: `/datasets/${n}`,
    body: s,
    tag: null
  });
}
class Zt {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Get video playback information for a media library asset
   *
   * @param assetIdentifier - Asset instance identifier (GDR, video-prefixed ID, or container ID)
   * @param options - Options for transformations and expiration
   */
  getPlaybackInfo(e, t = {}) {
    const n = this.#e.config(), s = (n.resource || n["~experimental_resource"])?.id, { instanceId: i, libraryId: a } = qs(e), o = a || s;
    if (!o)
      throw new Error(
        "Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR"
      );
    const c = Ps(i, o), u = _s(t);
    return I(this.#e, this.#t, {
      method: "GET",
      uri: c,
      query: u
    });
  }
}
class xs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Get video playback information for a media library asset
   *
   * @param assetIdentifier - Asset instance identifier (GDR, video-prefixed ID, or container ID)
   * @param options - Options for transformations and expiration
   */
  getPlaybackInfo(e, t = {}) {
    return w(
      new Zt(
        this.#e.observable,
        this.#t
      ).getPlaybackInfo(e, t)
    );
  }
}
const Rs = /^media-library:(ml[^:]+):([^:]+)$/;
function Os(r) {
  return typeof r == "object" && "_ref" in r;
}
function qs(r) {
  const e = Os(r) ? r._ref : r, t = Rs.exec(e);
  if (t) {
    const [, n, s] = t;
    return { libraryId: n, instanceId: s };
  }
  if (typeof r == "string" && r.startsWith("video-"))
    return { instanceId: r };
  throw new Error(
    `Invalid video asset instance identifier "${e}": must be a valid video instance id or a Global Dataset Reference (GDR) to the video asset in the Media Library`
  );
}
function Ps(r, e) {
  return `/media-libraries/${e}/video/${r}/playback-info`;
}
function _s(r) {
  const e = {};
  if (r.transformations) {
    const { thumbnail: t, animated: n, storyboard: s } = r.transformations;
    t && (t.width && (e.thumbnailWidth = t.width), t.height && (e.thumbnailHeight = t.height), t.time !== void 0 && (e.thumbnailTime = t.time), t.fit && (e.thumbnailFit = t.fit), t.format && (e.thumbnailFormat = t.format)), n && (n.width && (e.animatedWidth = n.width), n.height && (e.animatedHeight = n.height), n.start !== void 0 && (e.animatedStart = n.start), n.end !== void 0 && (e.animatedEnd = n.end), n.fps && (e.animatedFps = n.fps), n.format && (e.animatedFormat = n.format)), s && s.format && (e.storyboardFormat = s.format);
  }
  return r.expiration && (e.expiration = r.expiration), e;
}
class Fs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Fetch a list of projects the authenticated user has access to.
   *
   * @param options - Options for the list request
   *   - `includeMembers` - Whether to include members in the response (default: true)
   *   - `includeFeatures` - Whether to include features in the response (default: true)
   *   - `organizationId` - ID of the organization to fetch projects for
   *   - `onlyExplicitMembership` - Whether to include only projects with explicit membership (default: false)
   */
  list(e) {
    const t = {}, n = "/projects";
    return e?.includeMembers === !1 && (t.includeMembers = "false"), e?.includeFeatures === !1 && (t.includeFeatures = "false"), e?.organizationId && (t.organizationId = e.organizationId), e?.onlyExplicitMembership && (t.onlyExplicitMembership = "true"), I(this.#e, this.#t, { uri: n, query: t });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(e) {
    return I(this.#e, this.#t, { uri: `/projects/${e}` });
  }
}
class Ds {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Fetch a list of projects the authenticated user has access to.
   *
   * @param options - Options for the list request
   *   - `includeMembers` - Whether to include members in the response (default: true)
   *   - `includeFeatures` - Whether to include features in the response (default: true)
   *   - `organizationId` - ID of the organization to fetch projects for
   *   - `onlyExplicitMembership` - Whether to include only projects with explicit membership (default: false)
   */
  list(e) {
    const t = {}, n = "/projects";
    return e?.includeMembers === !1 && (t.includeMembers = "false"), e?.includeFeatures === !1 && (t.includeFeatures = "false"), e?.organizationId && (t.organizationId = e.organizationId), e?.onlyExplicitMembership && (t.onlyExplicitMembership = "true"), w(
      I(this.#e, this.#t, { uri: n, query: t })
    );
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(e) {
    return w(
      I(this.#e, this.#t, { uri: `/projects/${e}` })
    );
  }
}
const Ke = on(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8
), ie = (r, e) => e ? X(r, e) : rt(r);
function ae(r, {
  releaseId: e,
  publishedId: t,
  document: n
}) {
  if (t && n._id) {
    const s = ie(t, e);
    return In(s, n), s;
  }
  if (n._id) {
    const s = tt(n._id), i = rr(n._id);
    if (!s && !i)
      throw new Error(
        `\`${r}()\` requires a document with an \`_id\` that is a version or draft ID`
      );
    if (e) {
      if (s)
        throw new Error(
          `\`${r}()\` was called with a document ID (\`${n._id}\`) that is a draft ID, but a release ID (\`${e}\`) was also provided.`
        );
      const a = et(n._id);
      if (a !== e)
        throw new Error(
          `\`${r}()\` was called with a document ID (\`${n._id}\`) that is a version ID, but the release ID (\`${e}\`) does not match the document's version ID (\`${a}\`).`
        );
    }
    return n._id;
  }
  if (t)
    return ie(t, e);
  throw new Error(`\`${r}()\` requires either a publishedId or a document with an \`_id\``);
}
const Ms = (r, e) => {
  if (typeof r == "object" && r !== null && ("releaseId" in r || "metadata" in r)) {
    const { releaseId: t = Ke(), metadata: n = {} } = r;
    return [t, n, e];
  }
  return [Ke(), {}, r];
}, er = (r, e) => {
  const [t, n, s] = Ms(r, e), i = {
    ...n,
    releaseType: n.releaseType || "undecided"
  };
  return { action: {
    actionType: "sanity.action.release.create",
    releaseId: t,
    metadata: i
  }, options: s };
};
class ks {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns An observable that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * client.observable.releases.get({releaseId: 'my-release'}).pipe(
   *   tap((release) => console.log(release)),
   *   // {
   *   //   _id: '_.releases.my-release',
   *   //   name: 'my-release'
   *   //   _type: 'system.release',
   *   //   metadata: {releaseType: 'asap'},
   *   //   _createdAt: '2021-01-01T00:00:00.000Z',
   *   //   ...
   *   // }
   * ).subscribe()
   * ```
   */
  get({ releaseId: e }, t) {
    return H(
      this.#e,
      this.#t,
      `_.releases.${e}`,
      t
    );
  }
  create(e, t) {
    const { action: n, options: s } = er(e, t), { releaseId: i, metadata: a } = n;
    return E(this.#e, this.#t, n, s).pipe(
      A((o) => ({
        ...o,
        releaseId: i,
        metadata: a
      }))
    );
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  edit({ releaseId: e, patch: t }, n) {
    const s = {
      actionType: "sanity.action.release.edit",
      releaseId: e,
      patch: t
    };
    return E(this.#e, this.#t, s, n);
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  publish({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.publish",
      releaseId: e
    };
    return E(this.#e, this.#t, n, t);
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  archive({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.archive",
      releaseId: e
    };
    return E(this.#e, this.#t, n, t);
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unarchive({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.unarchive",
      releaseId: e
    };
    return E(this.#e, this.#t, n, t);
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  schedule({ releaseId: e, publishAt: t }, n) {
    const s = {
      actionType: "sanity.action.release.schedule",
      releaseId: e,
      publishAt: t
    };
    return E(this.#e, this.#t, s, n);
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unschedule({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.unschedule",
      releaseId: e
    };
    return E(this.#e, this.#t, n, t);
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  delete({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.delete",
      releaseId: e
    };
    return E(this.#e, this.#t, n, t);
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns An observable that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId: e }, t) {
    return _t(this.#e, this.#t, e, t);
  }
}
class Ls {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns A promise that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * const release = await client.releases.get({releaseId: 'my-release'})
   * console.log(release)
   * // {
   * //   _id: '_.releases.my-release',
   * //   name: 'my-release'
   * //   _type: 'system.release',
   * //   metadata: {releaseType: 'asap'},
   * //   _createdAt: '2021-01-01T00:00:00.000Z',
   * //   ...
   * // }
   * ```
   */
  get({ releaseId: e }, t) {
    return w(
      H(
        this.#e,
        this.#t,
        `_.releases.${e}`,
        t
      )
    );
  }
  async create(e, t) {
    const { action: n, options: s } = er(e, t), { releaseId: i, metadata: a } = n;
    return { ...await w(
      E(this.#e, this.#t, n, s)
    ), releaseId: i, metadata: a };
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  edit({ releaseId: e, patch: t }, n) {
    const s = {
      actionType: "sanity.action.release.edit",
      releaseId: e,
      patch: t
    };
    return w(E(this.#e, this.#t, s, n));
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  publish({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.publish",
      releaseId: e
    };
    return w(E(this.#e, this.#t, n, t));
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  archive({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.archive",
      releaseId: e
    };
    return w(E(this.#e, this.#t, n, t));
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unarchive({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.unarchive",
      releaseId: e
    };
    return w(E(this.#e, this.#t, n, t));
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  schedule({ releaseId: e, publishAt: t }, n) {
    const s = {
      actionType: "sanity.action.release.schedule",
      releaseId: e,
      publishAt: t
    };
    return w(E(this.#e, this.#t, s, n));
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unschedule({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.unschedule",
      releaseId: e
    };
    return w(E(this.#e, this.#t, n, t));
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  delete({ releaseId: e }, t) {
    const n = {
      actionType: "sanity.action.release.delete",
      releaseId: e
    };
    return w(E(this.#e, this.#t, n, t));
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns A promise that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId: e }, t) {
    return w(_t(this.#e, this.#t, e, t));
  }
}
class Vs {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(e) {
    return I(
      this.#e,
      this.#t,
      { uri: `/users/${e}` }
    );
  }
}
class Us {
  #e;
  #t;
  constructor(e, t) {
    this.#e = e, this.#t = t;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(e) {
    return w(
      I(this.#e, this.#t, {
        uri: `/users/${e}`
      })
    );
  }
}
class oe {
  assets;
  datasets;
  live;
  mediaLibrary;
  projects;
  users;
  agent;
  releases;
  /**
   * Private properties
   */
  #e;
  #t;
  #r;
  /**
   * Instance properties
   */
  listen = Xt;
  constructor(e, t = Y) {
    this.config(t), this.#t = e;
    const n = t._requestHandler;
    this.#r = n ? /* @__PURE__ */ (() => {
      let s;
      return (i, a) => {
        const o = i;
        return s || (s = new V(e, { ...t, _requestHandler: void 0 })), n(o, (c) => e(c, a), s);
      };
    })() : e, this.assets = new ps(this, this.#r), this.datasets = new Ts(this, this.#r), this.live = new Kt(this), this.mediaLibrary = {
      video: new Zt(this, this.#r)
    }, this.projects = new Fs(this, this.#r), this.users = new Vs(this, this.#r), this.agent = {
      action: new hs(this, this.#r)
    }, this.releases = new ks(this, this.#r);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new oe(this.#t, this.config());
  }
  config(e) {
    if (e === void 0)
      return { ...this.#e };
    if (this.#e && this.#e.allowReconfigure === !1)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.#e = It(e, this.#e || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(e) {
    const t = this.config();
    return new oe(this.#t, {
      ...t,
      ...e,
      stega: {
        ...t.stega || {},
        ...typeof e?.stega == "boolean" ? { enabled: e.stega } : e?.stega || {}
      }
    });
  }
  fetch(e, t, n) {
    return Ot(
      this,
      this.#r,
      this.#e.stega,
      e,
      t,
      n
    );
  }
  getDocument(e, t) {
    if (t?.includeAllVersions === !0)
      return H(this, this.#r, e, {
        ...t,
        includeAllVersions: !0
      });
    const n = {
      signal: t?.signal,
      tag: t?.tag,
      releaseId: t?.releaseId,
      ...t && "includeAllVersions" in t ? { includeAllVersions: !1 } : {}
    };
    return H(this, this.#r, e, n);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(e, t) {
    return qt(this, this.#r, e, t);
  }
  /**
   * Convenient and bandwidth efficient method of checking wether a set of document IDs exists.
   * Returns a set of the IDs that exist.
   *
   * @param ids - Document IDs to check
   * @param options - Request options
   */
  documentsExists(e, t) {
    return Pt(this, this.#r, e, t);
  }
  create(e, t) {
    return he(this, this.#r, e, "create", t);
  }
  createIfNotExists(e, t) {
    return Ft(this, this.#r, e, t);
  }
  createOrReplace(e, t) {
    return Dt(this, this.#r, e, t);
  }
  createVersion({
    document: e,
    publishedId: t,
    releaseId: n,
    baseId: s,
    ifBaseRevisionId: i
  }, a) {
    if (!e)
      return kt(
        this,
        this.#r,
        t,
        s,
        n,
        i,
        a
      );
    const o = ae("createVersion", {
      document: e,
      publishedId: t,
      releaseId: n
    }), c = { ...e, _id: o }, u = t || Ze(e._id);
    return Mt(
      this,
      this.#r,
      c,
      u,
      a
    );
  }
  delete(e, t) {
    return Lt(this, this.#r, e, t);
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId: e, publishedId: t }, n, s) {
    const i = ie(t, e);
    return Vt(this, this.#r, i, n, s);
  }
  replaceVersion({
    document: e,
    publishedId: t,
    releaseId: n
  }, s) {
    const i = ae("replaceVersion", {
      document: e,
      publishedId: t,
      releaseId: n
    }), a = { ...e, _id: i };
    return Ut(this, this.#r, a, s);
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * client.observable.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId: e, publishedId: t }, n) {
    const s = X(t, e);
    return Nt(this, this.#r, s, t, n);
  }
  mutate(e, t) {
    return Ht(this, this.#r, e, t);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(e, t) {
    return new _(e, t, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(e) {
    return new le(e, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(e, t) {
    return E(this, this.#r, e, t);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(e) {
    return I(this, this.#r, e);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(e, t) {
    return Re(this, e, t);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(e, t) {
    return T(this, e, t);
  }
}
class V {
  assets;
  datasets;
  live;
  mediaLibrary;
  projects;
  users;
  agent;
  releases;
  /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */
  observable;
  /**
   * Private properties
   */
  #e;
  #t;
  #r;
  /**
   * Instance properties
   */
  listen = Xt;
  constructor(e, t = Y) {
    this.config(t), this.#t = e;
    const n = t._requestHandler;
    this.#r = n ? /* @__PURE__ */ (() => {
      let s;
      return (i, a) => {
        const o = i;
        return s || (s = new V(e, { ...t, _requestHandler: void 0 })), n(o, (c) => e(c, a), s);
      };
    })() : e, this.assets = new gs(this, this.#r), this.datasets = new js(this, this.#r), this.live = new Kt(this), this.mediaLibrary = {
      video: new xs(this, this.#r)
    }, this.projects = new Ds(this, this.#r), this.users = new Us(this, this.#r), this.agent = {
      action: new fs(this, this.#r)
    }, this.releases = new Ls(this, this.#r), this.observable = new oe(e, t);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new V(this.#t, this.config());
  }
  config(e) {
    if (e === void 0)
      return { ...this.#e };
    if (this.#e && this.#e.allowReconfigure === !1)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(e), this.#e = It(e, this.#e || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(e) {
    const t = this.config();
    return new V(this.#t, {
      ...t,
      ...e,
      stega: {
        ...t.stega || {},
        ...typeof e?.stega == "boolean" ? { enabled: e.stega } : e?.stega || {}
      }
    });
  }
  fetch(e, t, n) {
    return w(
      Ot(
        this,
        this.#r,
        this.#e.stega,
        e,
        t,
        n
      )
    );
  }
  getDocument(e, t) {
    if (t?.includeAllVersions === !0)
      return w(
        H(this, this.#r, e, {
          ...t,
          includeAllVersions: !0
        })
      );
    const n = {
      signal: t?.signal,
      tag: t?.tag,
      releaseId: t?.releaseId,
      ...t && "includeAllVersions" in t ? { includeAllVersions: !1 } : {}
    };
    return w(H(this, this.#r, e, n));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(e, t) {
    return w(qt(this, this.#r, e, t));
  }
  /**
   * Convenient and bandwidth efficient method of checking wether a set of document IDs exists.
   * Returns a set of the IDs that exist.
   *
   * @param ids - Document IDs to check
   * @param options - Request options
   */
  documentsExists(e, t) {
    return w(Pt(this, this.#r, e, t));
  }
  create(e, t) {
    return w(
      he(this, this.#r, e, "create", t)
    );
  }
  createIfNotExists(e, t) {
    return w(
      Ft(this, this.#r, e, t)
    );
  }
  createOrReplace(e, t) {
    return w(
      Dt(this, this.#r, e, t)
    );
  }
  createVersion({
    document: e,
    publishedId: t,
    releaseId: n,
    baseId: s,
    ifBaseRevisionId: i
  }, a) {
    if (!e)
      return pe(
        kt(
          this,
          this.#r,
          t,
          s,
          n,
          i,
          a
        )
      );
    const o = ae("createVersion", {
      document: e,
      publishedId: t,
      releaseId: n
    }), c = { ...e, _id: o }, u = t || Ze(e._id);
    return pe(
      Mt(
        this,
        this.#r,
        c,
        u,
        a
      )
    );
  }
  delete(e, t) {
    return w(Lt(this, this.#r, e, t));
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId: e, publishedId: t }, n, s) {
    const i = ie(t, e);
    return w(
      Vt(this, this.#r, i, n, s)
    );
  }
  replaceVersion({
    document: e,
    publishedId: t,
    releaseId: n
  }, s) {
    const i = ae("replaceVersion", {
      document: e,
      publishedId: t,
      releaseId: n
    }), a = { ...e, _id: i };
    return pe(
      Ut(this, this.#r, a, s)
    );
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * await client.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId: e, publishedId: t }, n) {
    const s = X(t, e);
    return w(
      Nt(this, this.#r, s, t, n)
    );
  }
  mutate(e, t) {
    return w(Ht(this, this.#r, e, t));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(e, t) {
    return new q(e, t, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(e) {
    return new ue(e, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(e, t) {
    return w(E(this, this.#r, e, t));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(e) {
    return w(I(this, this.#r, e));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(e, t, n) {
    return w(M(this, this.#r, e, t, n));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(e, t) {
    return Re(this, e, t);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(e, t) {
    return T(this, e, t);
  }
}
function Ns(r, e) {
  return { requester: ze(r), createClient: (t) => {
    const n = ze(r, {
      ignoreWarnings: t.ignoreWarnings
    });
    return new e(
      (s, i) => (i || n)({
        maxRedirects: 0,
        maxRetries: t.maxRetries,
        retryDelay: t.retryDelay,
        lineage: t.lineage,
        ...s
      }),
      t
    );
  } };
}
var Hs = [];
const Bs = Ns(Hs, V), zs = Bs.createClient, tr = zs({
  ...be,
  useCdn: !1,
  perspective: "published",
  stega: !1
}), Ws = nr({
  projectId: be.projectId,
  dataset: be.dataset
});
function Xs() {
  return "";
}
function Ks(r, { width: e, height: t } = {}) {
  if (!r?.asset) return "";
  let n = Ws.image(r).auto("format").fit("crop");
  return e && (n = n.width(e)), t && (n = n.height(t)), n.url();
}
async function Zs() {
  return tr.fetch(ir, {}, { cache: "no-store" });
}
async function ei(r) {
  return tr.fetch(sr, { slug: r }, { cache: "no-store" });
}
export {
  Zs as a,
  Ks as b,
  ei as f,
  gt as i,
  Xs as s,
  Ys as y
};
//# sourceMappingURL=cms-client-ROue_RW4.js.map
