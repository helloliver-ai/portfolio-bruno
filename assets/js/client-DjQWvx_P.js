import { s as O, g as je, c as Ae, a as Ie } from "./sanity.shared-BjhqLsb8.js";
import { g as Oe } from "./_commonjsHelpers-DaMA6jEr.js";
var L = { exports: {} }, M = {}, Y = { exports: {} }, f = {};
var se;
function Ne() {
  if (se) return f;
  se = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), a = /* @__PURE__ */ Symbol.for("react.consumer"), p = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), d = /* @__PURE__ */ Symbol.for("react.suspense"), m = /* @__PURE__ */ Symbol.for("react.memo"), h = /* @__PURE__ */ Symbol.for("react.lazy"), R = /* @__PURE__ */ Symbol.for("react.activity"), ge = /* @__PURE__ */ Symbol.for("react.view_transition"), X = Symbol.iterator;
  function be(e) {
    return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Q = Object.assign, Z = {};
  function S(e, u, i) {
    this.props = e, this.context = u, this.refs = Z, this.updater = i || J;
  }
  S.prototype.isReactComponent = {}, S.prototype.setState = function(e, u) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, e, u, "setState");
  }, S.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function F() {
  }
  F.prototype = S.prototype;
  function P(e, u, i) {
    this.props = e, this.context = u, this.refs = Z, this.updater = i || J;
  }
  var x = P.prototype = new F();
  x.constructor = P, Q(x, S.prototype), x.isPureReactComponent = !0;
  var ee = Array.isArray;
  function U() {
  }
  var v = { H: null, A: null, T: null, S: null }, te = Object.prototype.hasOwnProperty;
  function H(e, u, i) {
    var c = i.ref;
    return {
      $$typeof: t,
      type: e,
      key: u,
      ref: c !== void 0 ? c : null,
      props: i
    };
  }
  function Re(e, u) {
    return H(e.type, u, e.props);
  }
  function $(e) {
    return typeof e == "object" && e !== null && e.$$typeof === t;
  }
  function Te(e) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + e.replace(/[=:]/g, function(i) {
      return u[i];
    });
  }
  var re = /\/+/g;
  function D(e, u) {
    return typeof e == "object" && e !== null && e.key != null ? Te("" + e.key) : u.toString(36);
  }
  function Se(e) {
    switch (e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw e.reason;
      default:
        switch (typeof e.status == "string" ? e.then(U, U) : (e.status = "pending", e.then(
          function(u) {
            e.status === "pending" && (e.status = "fulfilled", e.value = u);
          },
          function(u) {
            e.status === "pending" && (e.status = "rejected", e.reason = u);
          }
        )), e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw e.reason;
        }
    }
    throw e;
  }
  function k(e, u, i, c, l) {
    var y = typeof e;
    (y === "undefined" || y === "boolean") && (e = null);
    var _ = !1;
    if (e === null) _ = !0;
    else
      switch (y) {
        case "bigint":
        case "string":
        case "number":
          _ = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case t:
            case n:
              _ = !0;
              break;
            case h:
              return _ = e._init, k(
                _(e._payload),
                u,
                i,
                c,
                l
              );
          }
      }
    if (_)
      return l = l(e), _ = c === "" ? "." + D(e, 0) : c, ee(l) ? (i = "", _ != null && (i = _.replace(re, "$&/") + "/"), k(l, u, i, "", function(we) {
        return we;
      })) : l != null && ($(l) && (l = Re(
        l,
        i + (l.key == null || e && e.key === l.key ? "" : ("" + l.key).replace(
          re,
          "$&/"
        ) + "/") + _
      )), u.push(l)), 1;
    _ = 0;
    var b = c === "" ? "." : c + ":";
    if (ee(e))
      for (var g = 0; g < e.length; g++)
        c = e[g], y = b + D(c, g), _ += k(
          c,
          u,
          i,
          y,
          l
        );
    else if (g = be(e), typeof g == "function")
      for (e = g.call(e), g = 0; !(c = e.next()).done; )
        c = c.value, y = b + D(c, g++), _ += k(
          c,
          u,
          i,
          y,
          l
        );
    else if (y === "object") {
      if (typeof e.then == "function")
        return k(
          Se(e),
          u,
          i,
          c,
          l
        );
      throw u = String(e), Error(
        "Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return _;
  }
  function A(e, u, i) {
    if (e == null) return e;
    var c = [], l = 0;
    return k(e, c, "", "", function(y) {
      return u.call(i, y, l++);
    }), c;
  }
  function ke(e) {
    if (e._status === -1) {
      var u = e._result, i = u();
      i.then(
        function(c) {
          (e._status === 0 || e._status === -1) && (e._status = 1, e._result = c, i.status === void 0 && (i.status = "fulfilled", i.value = c));
        },
        function(c) {
          (e._status === 0 || e._status === -1) && (e._status = 2, e._result = c, i.status === void 0 && (i.status = "rejected", i.reason = c));
        }
      ), e._status === -1 && (e._status = 0, e._result = i);
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var ne = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var u = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(u)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function ue(e) {
    var u = v.T, i = {};
    i.types = u !== null ? u.types : null, v.T = i;
    try {
      var c = e(), l = v.S;
      l !== null && l(i, c), typeof c == "object" && c !== null && typeof c.then == "function" && c.then(U, ne);
    } catch (y) {
      ne(y);
    } finally {
      u !== null && i.types !== null && (u.types = i.types), v.T = u;
    }
  }
  function oe(e) {
    var u = v.T;
    if (u !== null) {
      var i = u.types;
      i === null ? u.types = [e] : i.indexOf(e) === -1 && i.push(e);
    } else ue(oe.bind(null, e));
  }
  var Ce = {
    map: A,
    forEach: function(e, u, i) {
      A(
        e,
        function() {
          u.apply(this, arguments);
        },
        i
      );
    },
    count: function(e) {
      var u = 0;
      return A(e, function() {
        u++;
      }), u;
    },
    toArray: function(e) {
      return A(e, function(u) {
        return u;
      }) || [];
    },
    only: function(e) {
      if (!$(e))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return e;
    }
  };
  return f.Activity = R, f.Children = Ce, f.Component = S, f.Fragment = r, f.Profiler = s, f.PureComponent = P, f.StrictMode = o, f.Suspense = d, f.ViewTransition = ge, f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v, f.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(e) {
      return v.H.useMemoCache(e);
    }
  }, f.addTransitionType = oe, f.cache = function(e) {
    return function() {
      return e.apply(null, arguments);
    };
  }, f.cacheSignal = function() {
    return null;
  }, f.cloneElement = function(e, u, i) {
    if (e == null)
      throw Error(
        "The argument must be a React element, but you passed " + e + "."
      );
    var c = Q({}, e.props), l = e.key;
    if (u != null)
      for (y in u.key !== void 0 && (l = "" + u.key), u)
        !te.call(u, y) || y === "key" || y === "__self" || y === "__source" || y === "ref" && u.ref === void 0 || (c[y] = u[y]);
    var y = arguments.length - 2;
    if (y === 1) c.children = i;
    else if (1 < y) {
      for (var _ = Array(y), b = 0; b < y; b++)
        _[b] = arguments[b + 2];
      c.children = _;
    }
    return H(e.type, l, c);
  }, f.createContext = function(e) {
    return e = {
      $$typeof: p,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, e.Provider = e, e.Consumer = {
      $$typeof: a,
      _context: e
    }, e;
  }, f.createElement = function(e, u, i) {
    var c, l = {}, y = null;
    if (u != null)
      for (c in u.key !== void 0 && (y = "" + u.key), u)
        te.call(u, c) && c !== "key" && c !== "__self" && c !== "__source" && (l[c] = u[c]);
    var _ = arguments.length - 2;
    if (_ === 1) l.children = i;
    else if (1 < _) {
      for (var b = Array(_), g = 0; g < _; g++)
        b[g] = arguments[g + 2];
      l.children = b;
    }
    if (e && e.defaultProps)
      for (c in _ = e.defaultProps, _)
        l[c] === void 0 && (l[c] = _[c]);
    return H(e, y, l);
  }, f.createRef = function() {
    return { current: null };
  }, f.forwardRef = function(e) {
    return { $$typeof: E, render: e };
  }, f.isValidElement = $, f.lazy = function(e) {
    return {
      $$typeof: h,
      _payload: { _status: -1, _result: e },
      _init: ke
    };
  }, f.memo = function(e, u) {
    return {
      $$typeof: m,
      type: e,
      compare: u === void 0 ? null : u
    };
  }, f.startTransition = ue, f.unstable_useCacheRefresh = function() {
    return v.H.useCacheRefresh();
  }, f.use = function(e) {
    return v.H.use(e);
  }, f.useActionState = function(e, u, i) {
    return v.H.useActionState(e, u, i);
  }, f.useCallback = function(e, u) {
    return v.H.useCallback(e, u);
  }, f.useContext = function(e) {
    return v.H.useContext(e);
  }, f.useDebugValue = function() {
  }, f.useDeferredValue = function(e, u) {
    return v.H.useDeferredValue(e, u);
  }, f.useEffect = function(e, u) {
    return v.H.useEffect(e, u);
  }, f.useEffectEvent = function(e) {
    return v.H.useEffectEvent(e);
  }, f.useId = function() {
    return v.H.useId();
  }, f.useImperativeHandle = function(e, u, i) {
    return v.H.useImperativeHandle(e, u, i);
  }, f.useInsertionEffect = function(e, u) {
    return v.H.useInsertionEffect(e, u);
  }, f.useLayoutEffect = function(e, u) {
    return v.H.useLayoutEffect(e, u);
  }, f.useMemo = function(e, u) {
    return v.H.useMemo(e, u);
  }, f.useOptimistic = function(e, u) {
    return v.H.useOptimistic(e, u);
  }, f.useReducer = function(e, u, i) {
    return v.H.useReducer(e, u, i);
  }, f.useRef = function(e) {
    return v.H.useRef(e);
  }, f.useState = function(e) {
    return v.H.useState(e);
  }, f.useSyncExternalStore = function(e, u, i) {
    return v.H.useSyncExternalStore(
      e,
      u,
      i
    );
  }, f.useTransition = function() {
    return v.H.useTransition();
  }, f.version = "19.3.0", f;
}
var ie;
function ye() {
  return ie || (ie = 1, Y.exports = Ne()), Y.exports;
}
var ce;
function Pe() {
  if (ce) return M;
  ce = 1;
  var t = ye().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return M.c = function(n) {
    return t.H.useMemoCache(n);
  }, M;
}
var fe;
function xe() {
  return fe || (fe = 1, L.exports = Pe()), L.exports;
}
var ft = xe(), Ue = ye();
const at = /* @__PURE__ */ Oe(Ue), He = {
  lang: void 0,
  message: void 0,
  abortEarly: void 0,
  abortPipeEarly: void 0
};
// @__NO_SIDE_EFFECTS__
function W(t) {
  return He;
}
let $e;
// @__NO_SIDE_EFFECTS__
function De(t) {
  return $e?.get(t);
}
let Le;
// @__NO_SIDE_EFFECTS__
function Me(t) {
  return Le?.get(t);
}
let Ye;
// @__NO_SIDE_EFFECTS__
function qe(t, n) {
  return Ye?.get(t)?.get(n);
}
// @__NO_SIDE_EFFECTS__
function Ge(t) {
  const n = typeof t;
  return n === "string" ? `"${t}"` : n === "number" || n === "bigint" || n === "boolean" ? `${t}` : n === "object" || n === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : n;
}
function w(t, n, r, o, s) {
  const a = s && "input" in s ? s.input : r.value, p = s?.expected ?? t.expects ?? null, E = s?.received ?? /* @__PURE__ */ Ge(a), d = {
    kind: t.kind,
    type: t.type,
    input: a,
    expected: p,
    received: E,
    message: `Invalid ${n}: ${p ? `Expected ${p} but r` : "R"}eceived ${E}`,
    requirement: t.requirement,
    path: s?.path,
    issues: s?.issues,
    lang: o.lang,
    abortEarly: o.abortEarly,
    abortPipeEarly: o.abortPipeEarly
  }, m = t.kind === "schema", h = s?.message ?? t.message ?? /* @__PURE__ */ qe(t.reference, d.lang) ?? (m ? /* @__PURE__ */ Me(d.lang) : null) ?? o.message ?? /* @__PURE__ */ De(d.lang);
  h !== void 0 && (d.message = typeof h == "function" ? h(d) : h), m && (r.typed = !1), r.issues ? r.issues.push(d) : r.issues = [d];
}
// @__NO_SIDE_EFFECTS__
function Ke(t, n) {
  return Object.prototype.hasOwnProperty.call(t, n) && n !== "__proto__" && n !== "prototype" && n !== "constructor";
}
function T(t) {
  return t["~standard"] = {
    version: 1,
    vendor: "valibot",
    validate: (n) => t["~run"]({ value: n }, /* @__PURE__ */ W())
  }, t;
}
var We = class extends Error {
  /**
  * Creates a Valibot error with useful information.
  *
  * @param issues The error issues.
  */
  constructor(t) {
    super(t[0].message), this.name = "ValiError", this.issues = t;
  }
};
// @__NO_SIDE_EFFECTS__
function z(t, n) {
  return {
    kind: "validation",
    type: "min_length",
    reference: z,
    async: !1,
    expects: `>=${t}`,
    requirement: t,
    message: n,
    "~run"(r, o) {
      return r.typed && r.value.length < this.requirement && w(this, "length", r, o, { received: `${r.value.length}` }), r;
    }
  };
}
const ze = { abortEarly: !0 };
// @__NO_SIDE_EFFECTS__
function de(t, n, r) {
  return typeof t.fallback == "function" ? t.fallback(n, r) : t.fallback;
}
// @__NO_SIDE_EFFECTS__
function Ve(t, n) {
  return T({
    ...t,
    fallback: n,
    "~run"(r, o) {
      const s = t["~run"](r, o);
      return s.issues ? {
        typed: !0,
        value: /* @__PURE__ */ de(this, s, o)
      } : s;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function ve(t, n, r) {
  return typeof t.default == "function" ? t.default(n, r) : t.default;
}
// @__NO_SIDE_EFFECTS__
function Be(t, n) {
  return !t["~run"]({ value: n }, ze).issues;
}
// @__NO_SIDE_EFFECTS__
function V(t, n) {
  return T({
    kind: "schema",
    type: "object",
    reference: V,
    expects: "Object",
    async: !1,
    entries: t,
    message: n,
    "~run"(r, o) {
      const s = r.value;
      if (s && typeof s == "object") {
        r.typed = !0, r.value = {};
        for (const a in this.entries) {
          const p = this.entries[a];
          if (a in s || (p.type === "exact_optional" || p.type === "optional" || p.type === "nullish") && p.default !== void 0) {
            const E = a in s ? s[a] : /* @__PURE__ */ ve(p), d = p["~run"]({ value: E }, o);
            if (d.issues) {
              const m = {
                type: "object",
                origin: "value",
                input: s,
                key: a,
                value: E
              };
              for (const h of d.issues)
                h.path ? h.path.unshift(m) : h.path = [m], r.issues?.push(h);
              if (r.issues || (r.issues = d.issues), o.abortEarly) {
                r.typed = !1;
                break;
              }
            }
            d.typed || (r.typed = !1), r.value[a] = d.value;
          } else if (p.fallback !== void 0) r.value[a] = /* @__PURE__ */ de(p);
          else if (p.type !== "exact_optional" && p.type !== "optional" && p.type !== "nullish" && (w(this, "key", r, o, {
            input: void 0,
            expected: `"${a}"`,
            path: [{
              type: "object",
              origin: "key",
              input: s,
              key: a,
              value: s[a]
            }]
          }), o.abortEarly))
            break;
        }
      } else w(this, "type", r, o);
      return r;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function B(t, n) {
  return T({
    kind: "schema",
    type: "optional",
    reference: B,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: n,
    "~run"(r, o) {
      return r.value === void 0 && (this.default !== void 0 && (r.value = /* @__PURE__ */ ve(this, r, o)), r.value === void 0) ? (r.typed = !0, r) : this.wrapped["~run"](r, o);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _e(t, n, r) {
  return T({
    kind: "schema",
    type: "record",
    reference: _e,
    expects: "Object",
    async: !1,
    key: t,
    value: n,
    message: r,
    "~run"(o, s) {
      const a = o.value;
      if (a && typeof a == "object") {
        o.typed = !0, o.value = {};
        for (const p in a) if (/* @__PURE__ */ Ke(a, p)) {
          const E = a[p], d = this.key["~run"]({ value: p }, s);
          if (d.issues) {
            const h = {
              type: "object",
              origin: "key",
              input: a,
              key: p,
              value: E
            };
            for (const R of d.issues)
              R.path = [h], o.issues?.push(R);
            if (o.issues || (o.issues = d.issues), s.abortEarly) {
              o.typed = !1;
              break;
            }
          }
          const m = this.value["~run"]({ value: E }, s);
          if (m.issues) {
            const h = {
              type: "object",
              origin: "value",
              input: a,
              key: p,
              value: E
            };
            for (const R of m.issues)
              R.path ? R.path.unshift(h) : R.path = [h], o.issues?.push(R);
            if (o.issues || (o.issues = m.issues), s.abortEarly) {
              o.typed = !1;
              break;
            }
          }
          (!d.typed || !m.typed) && (o.typed = !1), d.typed && (o.value[d.value] = m.value);
        }
      } else w(this, "type", o, s);
      return o;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function j(t) {
  return T({
    kind: "schema",
    type: "string",
    reference: j,
    expects: "string",
    async: !1,
    message: t,
    "~run"(n, r) {
      return typeof n.value == "string" ? n.typed = !0 : w(this, "type", n, r), n;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function Ee() {
  return T({
    kind: "schema",
    type: "unknown",
    reference: Ee,
    expects: "unknown",
    async: !1,
    "~run"(t) {
      return t.typed = !0, t;
    }
  });
}
function Xe(t, n, r) {
  const o = t["~run"]({ value: n }, /* @__PURE__ */ W());
  if (o.issues) throw new We(o.issues);
  return o.value;
}
// @__NO_SIDE_EFFECTS__
function me(...t) {
  return T({
    ...t[0],
    pipe: t,
    "~run"(n, r) {
      for (const o of t) if (o.kind !== "metadata") {
        if (n.issues && (o.kind === "schema" || o.kind === "transformation")) {
          n.typed = !1;
          break;
        }
        (!n.issues || !r.abortEarly && !r.abortPipeEarly) && (n = o["~run"](n, r));
      }
      return n;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function q(t, n, r) {
  const o = t["~run"]({ value: n }, /* @__PURE__ */ W());
  return {
    typed: o.typed,
    success: !o.issues,
    output: o.value,
    issues: o.issues
  };
}
const I = /* @__PURE__ */ me(/* @__PURE__ */ j(), /* @__PURE__ */ z(1)), C = /* @__PURE__ */ B(I), N = /* @__PURE__ */ V({
  baseUrl: I,
  dataset: C,
  id: I,
  path: I,
  projectId: C,
  tool: C,
  type: C,
  workspace: C,
  perspective: /* @__PURE__ */ Ve(/* @__PURE__ */ j(), "drafts")
});
function he(t) {
  return /* @__PURE__ */ Be(N, t);
}
function Je(t) {
  return t !== null && Array.isArray(t);
}
function Qe(t) {
  let n = "";
  for (let r of t) {
    if (typeof r == "string") {
      n && (n += "."), n += r;
      continue;
    }
    if (typeof r == "number") {
      n && (n += ":"), n += `${r}`;
      continue;
    }
    if (Je(r)) {
      n && (n += ":"), n += `${r.join(",")}}`;
      continue;
    }
    if (r._key) {
      n && (n += ":"), n += `${r._key}`;
      continue;
    }
  }
  return n;
}
function Ze(t) {
  let { id: n, path: r, baseUrl: o, tool: s, workspace: a, type: p } = t;
  if (he(t)) return [
    ["id", je(n)],
    ["type", p],
    ["path", Qe(O.fromString(r))],
    ["base", encodeURIComponent(o)],
    ["workspace", a],
    ["tool", s]
  ].filter(([, E]) => !!E).map((E) => E.join("=")).join(";");
}
function G(t) {
  function n(s) {
    return s ? typeof s == "string" ? O.fromString(s) : s : [];
  }
  function r(s) {
    if (!s.id) throw Error("`id` is required to create a data attribute");
    if (!s.type) throw Error("`type` is required to create a data attribute");
    if (!s.path || !s.path.length) throw Error("`path` is required to create a data attribute");
    return Ze({
      baseUrl: s.baseUrl || "/",
      workspace: s.workspace,
      tool: s.tool,
      type: s.type,
      id: s.id,
      path: typeof s.path == "string" ? s.path : O.toString(s.path),
      perspective: s.perspective
    });
  }
  let o = (s) => r({
    ...t,
    path: [...n(t.path), ...n(s)]
  });
  return o.toString = function() {
    return r(t);
  }, o.combine = function(s) {
    return G({
      ...t,
      ...s
    });
  }, o.scope = function(s) {
    return G({
      ...t,
      path: [...n(t.path), ...n(s)]
    });
  }, o;
}
const Fe = /^([\w-]+):(0|[1-9][0-9]{0,8})$/, et = /^([\w-]+):([0-9]+),([0-9]+)$/, tt = /^([\w-]+):([\w-]+)$/;
function rt(t) {
  let n = [];
  for (let r of t.split(".")) {
    let o = Fe.exec(r);
    if (o) {
      n.push(o[1], Number(o[2]));
      continue;
    }
    let s = et.exec(r);
    if (s) {
      n.push(s[1], [Number(s[2]), Number(s[3])]);
      continue;
    }
    let a = tt.exec(r);
    if (a) {
      n.push(a[1], { _key: a[2] });
      continue;
    }
    n.push(r);
  }
  return n;
}
const ae = /* @__PURE__ */ me(/* @__PURE__ */ j(), /* @__PURE__ */ z(1)), nt = /* @__PURE__ */ V({
  origin: ae,
  href: ae,
  data: /* @__PURE__ */ B(/* @__PURE__ */ _e(/* @__PURE__ */ j(), /* @__PURE__ */ Ee()))
});
function ut(t) {
  let n = t.split(";").reduce((r, o) => {
    let [s, a] = o.split("=");
    if (!s || o.includes("=") && !a) return r;
    switch (s) {
      case "id":
        r.id = a;
        break;
      case "type":
        r.type = a;
        break;
      case "path":
        r.path = O.toString(rt(a));
        break;
      case "base":
        r.baseUrl = decodeURIComponent(a);
        break;
      case "perspective":
        r.perspective = a;
        break;
      case "tool":
        r.tool = a;
        break;
      case "workspace":
        r.workspace = a;
        break;
      case "projectId":
        r.projectId = a;
        break;
      case "dataset":
        r.dataset = a;
    }
    return r;
  }, {});
  if (he(n)) return n;
}
function le(t) {
  let n = t.indexOf("/intent/edit/");
  if (n !== -1) try {
    let r = t.slice(n + 13), o = r.indexOf("?"), s = o === -1 ? r : r.slice(0, o), a = {};
    for (let E of s.split(";")) {
      let d = E.indexOf("=");
      if (d === -1) continue;
      let m = E.slice(0, d);
      (m === "id" || m === "type" || m === "path" || m === "tool") && (a[m] = decodeURIComponent(E.slice(d + 1)));
    }
    o !== -1 && Object.assign(a, Object.fromEntries(new URLSearchParams(r.slice(o + 1)))), a.baseUrl ??= t.slice(0, n) || "/";
    let p = /* @__PURE__ */ q(N, a);
    return p.success ? p.output : void 0;
  } catch {
    return;
  }
}
function pe(t) {
  let n = /* @__PURE__ */ q(N, t);
  if (n.success) return n.output;
  let r = /* @__PURE__ */ q(nt, t);
  if (r.success) {
    let { href: o } = r.output;
    try {
      let s = new URL(o, typeof document > "u" ? "https://example.com" : location.origin);
      return s.searchParams.size > 0 ? Xe(N, Object.fromEntries(s.searchParams.entries())) : le(o) ?? r.output;
    } catch (s) {
      return le(o) || (console.error("Failed to parse sanity node", s), r.output);
    }
  }
}
function lt(t) {
  if (typeof t == "object" && t) return pe(t);
  try {
    return pe(JSON.parse(t));
  } catch {
    return ut(t);
  }
}
function ot(t = {}) {
  const n = new AbortController();
  return import("./renderVisualEditing-DPDkmYUi.js").then((r) => r.r).then(({
    renderVisualEditing: r
  }) => {
    const {
      signal: o
    } = n;
    o.aborted || r(o, t);
  }), () => {
    n.abort();
  };
}
const K = {
  ...Ie,
  baseUrl: "http://127.0.0.1:3333"
}, st = Ae({
  projectId: K.projectId,
  dataset: K.dataset
});
function pt({ id: t, type: n = "project", path: r }) {
  return G({ ...K, id: t, type: n, path: r }).toString();
}
function yt(t, { width: n, height: r } = {}) {
  if (!t?.asset) return "";
  let o = st.image(t).auto("format").fit("crop");
  return n && (o = o.width(n)), r && (o = o.height(r)), o.url();
}
function dt() {
  return ot();
}
export {
  at as R,
  ye as a,
  yt as b,
  ft as c,
  lt as d,
  dt as e,
  Qe as p,
  Ue as r,
  pt as s
};
//# sourceMappingURL=client-DjQWvx_P.js.map
