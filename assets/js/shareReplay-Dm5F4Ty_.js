var G = function(e, r) {
  return G = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
  }, G(e, r);
};
function S(e, r) {
  if (typeof r != "function" && r !== null)
    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  G(e, r);
  function t() {
    this.constructor = e;
  }
  e.prototype = r === null ? Object.create(r) : (t.prototype = r.prototype, new t());
}
function _e(e, r, t, n) {
  function i(o) {
    return o instanceof t ? o : new t(function(u) {
      u(o);
    });
  }
  return new (t || (t = Promise))(function(o, u) {
    function c(f) {
      try {
        s(n.next(f));
      } catch (v) {
        u(v);
      }
    }
    function a(f) {
      try {
        s(n.throw(f));
      } catch (v) {
        u(v);
      }
    }
    function s(f) {
      f.done ? o(f.value) : i(f.value).then(c, a);
    }
    s((n = n.apply(e, r || [])).next());
  });
}
function ee(e, r) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, u = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return u.next = c(0), u.throw = c(1), u.return = c(2), typeof Symbol == "function" && (u[Symbol.iterator] = function() {
    return this;
  }), u;
  function c(s) {
    return function(f) {
      return a([s, f]);
    };
  }
  function a(s) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; u && (u = 0, s[0] && (t = 0)), t; ) try {
      if (n = 1, i && (o = s[0] & 2 ? i.return : s[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, s[1])).done) return o;
      switch (i = 0, o && (s = [s[0] & 2, o.value]), s[0]) {
        case 0:
        case 1:
          o = s;
          break;
        case 4:
          return t.label++, { value: s[1], done: !1 };
        case 5:
          t.label++, i = s[1], s = [0];
          continue;
        case 7:
          s = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (s[0] === 6 || s[0] === 2)) {
            t = 0;
            continue;
          }
          if (s[0] === 3 && (!o || s[1] > o[0] && s[1] < o[3])) {
            t.label = s[1];
            break;
          }
          if (s[0] === 6 && t.label < o[1]) {
            t.label = o[1], o = s;
            break;
          }
          if (o && t.label < o[2]) {
            t.label = o[2], t.ops.push(s);
            break;
          }
          o[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      s = r.call(e, t);
    } catch (f) {
      s = [6, f], i = 0;
    } finally {
      n = o = 0;
    }
    if (s[0] & 5) throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}
function I(e) {
  var r = typeof Symbol == "function" && Symbol.iterator, t = r && e[r], n = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
    }
  };
  throw new TypeError(r ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function A(e, r) {
  var t = typeof Symbol == "function" && e[Symbol.iterator];
  if (!t) return e;
  var n = t.call(e), i, o = [], u;
  try {
    for (; (r === void 0 || r-- > 0) && !(i = n.next()).done; ) o.push(i.value);
  } catch (c) {
    u = { error: c };
  } finally {
    try {
      i && !i.done && (t = n.return) && t.call(n);
    } finally {
      if (u) throw u.error;
    }
  }
  return o;
}
function E(e, r, t) {
  if (t || arguments.length === 2) for (var n = 0, i = r.length, o; n < i; n++)
    (o || !(n in r)) && (o || (o = Array.prototype.slice.call(r, 0, n)), o[n] = r[n]);
  return e.concat(o || Array.prototype.slice.call(r));
}
function x(e) {
  return this instanceof x ? (this.v = e, this) : new x(e);
}
function ge(e, r, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = t.apply(e, r || []), i, o = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), c("next"), c("throw"), c("return", u), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function u(l) {
    return function(p) {
      return Promise.resolve(p).then(l, v);
    };
  }
  function c(l, p) {
    n[l] && (i[l] = function(h) {
      return new Promise(function(m, w) {
        o.push([l, h, m, w]) > 1 || a(l, h);
      });
    }, p && (i[l] = p(i[l])));
  }
  function a(l, p) {
    try {
      s(n[l](p));
    } catch (h) {
      y(o[0][3], h);
    }
  }
  function s(l) {
    l.value instanceof x ? Promise.resolve(l.value.v).then(f, v) : y(o[0][2], l);
  }
  function f(l) {
    a("next", l);
  }
  function v(l) {
    a("throw", l);
  }
  function y(l, p) {
    l(p), o.shift(), o.length && a(o[0][0], o[0][1]);
  }
}
function xe(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = e[Symbol.asyncIterator], t;
  return r ? r.call(e) : (e = typeof I == "function" ? I(e) : e[Symbol.iterator](), t = {}, n("next"), n("throw"), n("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function n(o) {
    t[o] = e[o] && function(u) {
      return new Promise(function(c, a) {
        u = e[o](u), i(c, a, u.done, u.value);
      });
    };
  }
  function i(o, u, c, a) {
    Promise.resolve(a).then(function(s) {
      o({ value: s, done: c });
    }, u);
  }
}
function d(e) {
  return typeof e == "function";
}
function te(e) {
  var r = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, t = e(r);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var Y = te(function(e) {
  return function(t) {
    e(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(n, i) {
      return i + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function L(e, r) {
  if (e) {
    var t = e.indexOf(r);
    0 <= t && e.splice(t, 1);
  }
}
var k = (function() {
  function e(r) {
    this.initialTeardown = r, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var r, t, n, i, o;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var c = I(u), a = c.next(); !a.done; a = c.next()) {
              var s = a.value;
              s.remove(this);
            }
          } catch (h) {
            r = { error: h };
          } finally {
            try {
              a && !a.done && (t = c.return) && t.call(c);
            } finally {
              if (r) throw r.error;
            }
          }
        else
          u.remove(this);
      var f = this.initialTeardown;
      if (d(f))
        try {
          f();
        } catch (h) {
          o = h instanceof Y ? h.errors : [h];
        }
      var v = this._finalizers;
      if (v) {
        this._finalizers = null;
        try {
          for (var y = I(v), l = y.next(); !l.done; l = y.next()) {
            var p = l.value;
            try {
              B(p);
            } catch (h) {
              o = o ?? [], h instanceof Y ? o = E(E([], A(o)), A(h.errors)) : o.push(h);
            }
          }
        } catch (h) {
          n = { error: h };
        } finally {
          try {
            l && !l.done && (i = y.return) && i.call(y);
          } finally {
            if (n) throw n.error;
          }
        }
      }
      if (o)
        throw new Y(o);
    }
  }, e.prototype.add = function(r) {
    var t;
    if (r && r !== this)
      if (this.closed)
        B(r);
      else {
        if (r instanceof e) {
          if (r.closed || r._hasParent(this))
            return;
          r._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(r);
      }
  }, e.prototype._hasParent = function(r) {
    var t = this._parentage;
    return t === r || Array.isArray(t) && t.includes(r);
  }, e.prototype._addParent = function(r) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(r), t) : t ? [t, r] : r;
  }, e.prototype._removeParent = function(r) {
    var t = this._parentage;
    t === r ? this._parentage = null : Array.isArray(t) && L(t, r);
  }, e.prototype.remove = function(r) {
    var t = this._finalizers;
    t && L(t, r), r instanceof e && r._removeParent(this);
  }, e.EMPTY = (function() {
    var r = new e();
    return r.closed = !0, r;
  })(), e;
})(), re = k.EMPTY;
function ne(e) {
  return e instanceof k || e && "closed" in e && d(e.remove) && d(e.add) && d(e.unsubscribe);
}
function B(e) {
  d(e) ? e() : e.unsubscribe();
}
var Ie = {
  Promise: void 0
}, Ae = {
  setTimeout: function(e, r) {
    for (var t = [], n = 2; n < arguments.length; n++)
      t[n - 2] = arguments[n];
    return setTimeout.apply(void 0, E([e, r], A(t)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function ie(e) {
  Ae.setTimeout(function() {
    throw e;
  });
}
function J() {
}
function M(e) {
  e();
}
var V = (function(e) {
  S(r, e);
  function r(t) {
    var n = e.call(this) || this;
    return n.isStopped = !1, t ? (n.destination = t, ne(t) && t.add(n)) : n.destination = Pe, n;
  }
  return r.create = function(t, n, i) {
    return new C(t, n, i);
  }, r.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, r.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, r.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, r.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, r.prototype._next = function(t) {
    this.destination.next(t);
  }, r.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, r.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r;
})(k), Ee = (function() {
  function e(r) {
    this.partialObserver = r;
  }
  return e.prototype.next = function(r) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(r);
      } catch (n) {
        F(n);
      }
  }, e.prototype.error = function(r) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(r);
      } catch (n) {
        F(n);
      }
    else
      F(r);
  }, e.prototype.complete = function() {
    var r = this.partialObserver;
    if (r.complete)
      try {
        r.complete();
      } catch (t) {
        F(t);
      }
  }, e;
})(), C = (function(e) {
  S(r, e);
  function r(t, n, i) {
    var o = e.call(this) || this, u;
    return d(t) || !t ? u = {
      next: t ?? void 0,
      error: n ?? void 0,
      complete: i ?? void 0
    } : u = t, o.destination = new Ee(u), o;
  }
  return r;
})(V);
function F(e) {
  ie(e);
}
function Oe(e) {
  throw e;
}
var Pe = {
  closed: !0,
  next: J,
  error: Oe,
  complete: J
}, Z = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function oe(e) {
  return e;
}
function ot() {
  for (var e = [], r = 0; r < arguments.length; r++)
    e[r] = arguments[r];
  return ue(e);
}
function ue(e) {
  return e.length === 0 ? oe : e.length === 1 ? e[0] : function(t) {
    return e.reduce(function(n, i) {
      return i(n);
    }, t);
  };
}
var b = (function() {
  function e(r) {
    r && (this._subscribe = r);
  }
  return e.prototype.lift = function(r) {
    var t = new e();
    return t.source = this, t.operator = r, t;
  }, e.prototype.subscribe = function(r, t, n) {
    var i = this, o = Ce(r) ? r : new C(r, t, n);
    return M(function() {
      var u = i, c = u.operator, a = u.source;
      o.add(c ? c.call(o, a) : a ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, e.prototype._trySubscribe = function(r) {
    try {
      return this._subscribe(r);
    } catch (t) {
      r.error(t);
    }
  }, e.prototype.forEach = function(r, t) {
    var n = this;
    return t = K(t), new t(function(i, o) {
      var u = new C({
        next: function(c) {
          try {
            r(c);
          } catch (a) {
            o(a), u.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      n.subscribe(u);
    });
  }, e.prototype._subscribe = function(r) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(r);
  }, e.prototype[Z] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var r = [], t = 0; t < arguments.length; t++)
      r[t] = arguments[t];
    return ue(r)(this);
  }, e.prototype.toPromise = function(r) {
    var t = this;
    return r = K(r), new r(function(n, i) {
      var o;
      t.subscribe(function(u) {
        return o = u;
      }, function(u) {
        return i(u);
      }, function() {
        return n(o);
      });
    });
  }, e.create = function(r) {
    return new e(r);
  }, e;
})();
function K(e) {
  var r;
  return (r = e ?? Ie.Promise) !== null && r !== void 0 ? r : Promise;
}
function Te(e) {
  return e && d(e.next) && d(e.error) && d(e.complete);
}
function Ce(e) {
  return e && e instanceof V || Te(e) && ne(e);
}
function je(e) {
  return d(e?.lift);
}
function O(e) {
  return function(r) {
    if (je(r))
      return r.lift(function(t) {
        try {
          return e(t, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function j(e, r, t, n, i) {
  return new ke(e, r, t, n, i);
}
var ke = (function(e) {
  S(r, e);
  function r(t, n, i, o, u, c) {
    var a = e.call(this, t) || this;
    return a.onFinalize = u, a.shouldUnsubscribe = c, a._next = n ? function(s) {
      try {
        n(s);
      } catch (f) {
        t.error(f);
      }
    } : e.prototype._next, a._error = o ? function(s) {
      try {
        o(s);
      } catch (f) {
        t.error(f);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, a._complete = i ? function() {
      try {
        i();
      } catch (s) {
        t.error(s);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, a;
  }
  return r.prototype.unsubscribe = function() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var n = this.closed;
      e.prototype.unsubscribe.call(this), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }, r;
})(V), Re = te(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), D = (function(e) {
  S(r, e);
  function r() {
    var t = e.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return r.prototype.lift = function(t) {
    var n = new Q(this, this);
    return n.operator = t, n;
  }, r.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Re();
  }, r.prototype.next = function(t) {
    var n = this;
    M(function() {
      var i, o;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var u = I(n.currentObservers), c = u.next(); !c.done; c = u.next()) {
            var a = c.value;
            a.next(t);
          }
        } catch (s) {
          i = { error: s };
        } finally {
          try {
            c && !c.done && (o = u.return) && o.call(u);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, r.prototype.error = function(t) {
    var n = this;
    M(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = t;
        for (var i = n.observers; i.length; )
          i.shift().error(t);
      }
    });
  }, r.prototype.complete = function() {
    var t = this;
    M(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var n = t.observers; n.length; )
          n.shift().complete();
      }
    });
  }, r.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(r.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
  }, r.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, r.prototype._innerSubscribe = function(t) {
    var n = this, i = this, o = i.hasError, u = i.isStopped, c = i.observers;
    return o || u ? re : (this.currentObservers = null, c.push(t), new k(function() {
      n.currentObservers = null, L(c, t);
    }));
  }, r.prototype._checkFinalizedStatuses = function(t) {
    var n = this, i = n.hasError, o = n.thrownError, u = n.isStopped;
    i ? t.error(o) : u && t.complete();
  }, r.prototype.asObservable = function() {
    var t = new b();
    return t.source = this, t;
  }, r.create = function(t, n) {
    return new Q(t, n);
  }, r;
})(b), Q = (function(e) {
  S(r, e);
  function r(t, n) {
    var i = e.call(this) || this;
    return i.destination = t, i.source = n, i;
  }
  return r.prototype.next = function(t) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || i === void 0 || i.call(n, t);
  }, r.prototype.error = function(t) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || i === void 0 || i.call(n, t);
  }, r.prototype.complete = function() {
    var t, n;
    (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t);
  }, r.prototype._subscribe = function(t) {
    var n, i;
    return (i = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && i !== void 0 ? i : re;
  }, r;
})(D), H = {
  now: function() {
    return (H.delegate || Date).now();
  },
  delegate: void 0
}, Ue = (function(e) {
  S(r, e);
  function r(t, n, i) {
    t === void 0 && (t = 1 / 0), n === void 0 && (n = 1 / 0), i === void 0 && (i = H);
    var o = e.call(this) || this;
    return o._bufferSize = t, o._windowTime = n, o._timestampProvider = i, o._buffer = [], o._infiniteTimeWindow = !0, o._infiniteTimeWindow = n === 1 / 0, o._bufferSize = Math.max(1, t), o._windowTime = Math.max(1, n), o;
  }
  return r.prototype.next = function(t) {
    var n = this, i = n.isStopped, o = n._buffer, u = n._infiniteTimeWindow, c = n._timestampProvider, a = n._windowTime;
    i || (o.push(t), !u && o.push(c.now() + a)), this._trimBuffer(), e.prototype.next.call(this, t);
  }, r.prototype._subscribe = function(t) {
    this._throwIfClosed(), this._trimBuffer();
    for (var n = this._innerSubscribe(t), i = this, o = i._infiniteTimeWindow, u = i._buffer, c = u.slice(), a = 0; a < c.length && !t.closed; a += o ? 1 : 2)
      t.next(c[a]);
    return this._checkFinalizedStatuses(t), n;
  }, r.prototype._trimBuffer = function() {
    var t = this, n = t._bufferSize, i = t._timestampProvider, o = t._buffer, u = t._infiniteTimeWindow, c = (u ? 1 : 2) * n;
    if (n < 1 / 0 && c < o.length && o.splice(0, o.length - c), !u) {
      for (var a = i.now(), s = 0, f = 1; f < o.length && o[f] <= a; f += 2)
        s = f;
      s && o.splice(0, s + 1);
    }
  }, r;
})(D), Fe = (function(e) {
  S(r, e);
  function r(t, n) {
    return e.call(this) || this;
  }
  return r.prototype.schedule = function(t, n) {
    return this;
  }, r;
})(k), X = {
  setInterval: function(e, r) {
    for (var t = [], n = 2; n < arguments.length; n++)
      t[n - 2] = arguments[n];
    return setInterval.apply(void 0, E([e, r], A(t)));
  },
  clearInterval: function(e) {
    return clearInterval(e);
  },
  delegate: void 0
}, ut = (function(e) {
  S(r, e);
  function r(t, n) {
    var i = e.call(this, t, n) || this;
    return i.scheduler = t, i.work = n, i.pending = !1, i;
  }
  return r.prototype.schedule = function(t, n) {
    var i;
    if (n === void 0 && (n = 0), this.closed)
      return this;
    this.state = t;
    var o = this.id, u = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(u, o, n)), this.pending = !0, this.delay = n, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(u, this.id, n), this;
  }, r.prototype.requestAsyncId = function(t, n, i) {
    return i === void 0 && (i = 0), X.setInterval(t.flush.bind(t, this), i);
  }, r.prototype.recycleAsyncId = function(t, n, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return n;
    n != null && X.clearInterval(n);
  }, r.prototype.execute = function(t, n) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(t, n);
    if (i)
      return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, r.prototype._execute = function(t, n) {
    var i = !1, o;
    try {
      this.work(t);
    } catch (u) {
      i = !0, o = u || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, r.prototype.unsubscribe = function() {
    if (!this.closed) {
      var t = this, n = t.id, i = t.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, L(o, this), n != null && (this.id = this.recycleAsyncId(i, n, null)), this.delay = null, e.prototype.unsubscribe.call(this);
    }
  }, r;
})(Fe), N = (function() {
  function e(r, t) {
    t === void 0 && (t = e.now), this.schedulerActionCtor = r, this.now = t;
  }
  return e.prototype.schedule = function(r, t, n) {
    return t === void 0 && (t = 0), new this.schedulerActionCtor(this, r).schedule(n, t);
  }, e.now = H.now, e;
})(), st = (function(e) {
  S(r, e);
  function r(t, n) {
    n === void 0 && (n = N.now);
    var i = e.call(this, t, n) || this;
    return i.actions = [], i._active = !1, i;
  }
  return r.prototype.flush = function(t) {
    var n = this.actions;
    if (this._active) {
      n.push(t);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = t.execute(t.state, t.delay))
        break;
    while (t = n.shift());
    if (this._active = !1, i) {
      for (; t = n.shift(); )
        t.unsubscribe();
      throw i;
    }
  }, r;
})(N), Me = new b(function(e) {
  return e.complete();
});
function Le(e) {
  return e && d(e.schedule);
}
function $(e) {
  return e[e.length - 1];
}
function ct(e) {
  return d($(e)) ? e.pop() : void 0;
}
function We(e) {
  return Le($(e)) ? e.pop() : void 0;
}
function Ye(e, r) {
  return typeof $(e) == "number" ? e.pop() : r;
}
var se = (function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
});
function ce(e) {
  return d(e?.then);
}
function ae(e) {
  return d(e[Z]);
}
function fe(e) {
  return Symbol.asyncIterator && d(e?.[Symbol.asyncIterator]);
}
function le(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function qe() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var he = qe();
function de(e) {
  return d(e?.[he]);
}
function ve(e) {
  return ge(this, arguments, function() {
    var t, n, i, o;
    return ee(this, function(u) {
      switch (u.label) {
        case 0:
          t = e.getReader(), u.label = 1;
        case 1:
          u.trys.push([1, , 9, 10]), u.label = 2;
        case 2:
          return [4, x(t.read())];
        case 3:
          return n = u.sent(), i = n.value, o = n.done, o ? [4, x(void 0)] : [3, 5];
        case 4:
          return [2, u.sent()];
        case 5:
          return [4, x(i)];
        case 6:
          return [4, u.sent()];
        case 7:
          return u.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function pe(e) {
  return d(e?.getReader);
}
function _(e) {
  if (e instanceof b)
    return e;
  if (e != null) {
    if (ae(e))
      return Ge(e);
    if (se(e))
      return Ve(e);
    if (ce(e))
      return Ze(e);
    if (fe(e))
      return ye(e);
    if (de(e))
      return De(e);
    if (pe(e))
      return He(e);
  }
  throw le(e);
}
function Ge(e) {
  return new b(function(r) {
    var t = e[Z]();
    if (d(t.subscribe))
      return t.subscribe(r);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function Ve(e) {
  return new b(function(r) {
    for (var t = 0; t < e.length && !r.closed; t++)
      r.next(e[t]);
    r.complete();
  });
}
function Ze(e) {
  return new b(function(r) {
    e.then(function(t) {
      r.closed || (r.next(t), r.complete());
    }, function(t) {
      return r.error(t);
    }).then(null, ie);
  });
}
function De(e) {
  return new b(function(r) {
    var t, n;
    try {
      for (var i = I(e), o = i.next(); !o.done; o = i.next()) {
        var u = o.value;
        if (r.next(u), r.closed)
          return;
      }
    } catch (c) {
      t = { error: c };
    } finally {
      try {
        o && !o.done && (n = i.return) && n.call(i);
      } finally {
        if (t) throw t.error;
      }
    }
    r.complete();
  });
}
function ye(e) {
  return new b(function(r) {
    $e(e, r).catch(function(t) {
      return r.error(t);
    });
  });
}
function He(e) {
  return ye(ve(e));
}
function $e(e, r) {
  var t, n, i, o;
  return _e(this, void 0, void 0, function() {
    var u, c;
    return ee(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), t = xe(e), a.label = 1;
        case 1:
          return [4, t.next()];
        case 2:
          if (n = a.sent(), !!n.done) return [3, 4];
          if (u = n.value, r.next(u), r.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return c = a.sent(), i = { error: c }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), n && !n.done && (o = t.return) ? [4, o.call(t)] : [3, 8];
        case 7:
          a.sent(), a.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return r.complete(), [2];
      }
    });
  });
}
function g(e, r, t, n, i) {
  n === void 0 && (n = 0), i === void 0 && (i = !1);
  var o = r.schedule(function() {
    t(), i ? e.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if (e.add(o), !i)
    return o;
}
function be(e, r) {
  return r === void 0 && (r = 0), O(function(t, n) {
    t.subscribe(j(n, function(i) {
      return g(n, e, function() {
        return n.next(i);
      }, r);
    }, function() {
      return g(n, e, function() {
        return n.complete();
      }, r);
    }, function(i) {
      return g(n, e, function() {
        return n.error(i);
      }, r);
    }));
  });
}
function me(e, r) {
  return r === void 0 && (r = 0), O(function(t, n) {
    n.add(e.schedule(function() {
      return t.subscribe(n);
    }, r));
  });
}
function ze(e, r) {
  return _(e).pipe(me(r), be(r));
}
function Be(e, r) {
  return _(e).pipe(me(r), be(r));
}
function Je(e, r) {
  return new b(function(t) {
    var n = 0;
    return r.schedule(function() {
      n === e.length ? t.complete() : (t.next(e[n++]), t.closed || this.schedule());
    });
  });
}
function Ke(e, r) {
  return new b(function(t) {
    var n;
    return g(t, r, function() {
      n = e[he](), g(t, r, function() {
        var i, o, u;
        try {
          i = n.next(), o = i.value, u = i.done;
        } catch (c) {
          t.error(c);
          return;
        }
        u ? t.complete() : t.next(o);
      }, 0, !0);
    }), function() {
      return d(n?.return) && n.return();
    };
  });
}
function we(e, r) {
  if (!e)
    throw new Error("Iterable cannot be null");
  return new b(function(t) {
    g(t, r, function() {
      var n = e[Symbol.asyncIterator]();
      g(t, r, function() {
        n.next().then(function(i) {
          i.done ? t.complete() : t.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function Qe(e, r) {
  return we(ve(e), r);
}
function Xe(e, r) {
  if (e != null) {
    if (ae(e))
      return ze(e, r);
    if (se(e))
      return Je(e, r);
    if (ce(e))
      return Be(e, r);
    if (fe(e))
      return we(e, r);
    if (de(e))
      return Ke(e, r);
    if (pe(e))
      return Qe(e, r);
  }
  throw le(e);
}
function Ne(e, r) {
  return r ? Xe(e, r) : _(e);
}
function Se(e, r) {
  return O(function(t, n) {
    var i = 0;
    t.subscribe(j(n, function(o) {
      n.next(e.call(r, o, i++));
    }));
  });
}
var et = Array.isArray;
function tt(e, r) {
  return et(r) ? e.apply(void 0, E([], A(r))) : e(r);
}
function at(e) {
  return Se(function(r) {
    return tt(e, r);
  });
}
function rt(e, r, t, n, i, o, u, c) {
  var a = [], s = 0, f = 0, v = !1, y = function() {
    v && !a.length && !s && r.complete();
  }, l = function(h) {
    return s < n ? p(h) : a.push(h);
  }, p = function(h) {
    s++;
    var m = !1;
    _(t(h, f++)).subscribe(j(r, function(w) {
      r.next(w);
    }, function() {
      m = !0;
    }, void 0, function() {
      if (m)
        try {
          s--;
          for (var w = function() {
            var P = a.shift();
            u || p(P);
          }; a.length && s < n; )
            w();
          y();
        } catch (P) {
          r.error(P);
        }
    }));
  };
  return e.subscribe(j(r, l, function() {
    v = !0, y();
  })), function() {
  };
}
function W(e, r, t) {
  return t === void 0 && (t = 1 / 0), d(r) ? W(function(n, i) {
    return Se(function(o, u) {
      return r(n, o, i, u);
    })(_(e(n, i)));
  }, t) : (typeof r == "number" && (t = r), O(function(n, i) {
    return rt(n, i, e, t);
  }));
}
function nt(e) {
  return e === void 0 && (e = 1 / 0), W(oe, e);
}
function ft(e) {
  return new b(function(r) {
    _(e()).subscribe(r);
  });
}
function lt() {
  for (var e = [], r = 0; r < arguments.length; r++)
    e[r] = arguments[r];
  var t = We(e), n = Ye(e, 1 / 0), i = e;
  return i.length ? i.length === 1 ? _(i[0]) : nt(n)(Ne(i, t)) : Me;
}
function ht(e, r) {
  return O(function(t, n) {
    var i = 0;
    t.subscribe(j(n, function(o) {
      return e.call(r, o, i++) && n.next(o);
    }));
  });
}
function dt(e, r) {
  return d(r) ? W(e, r, 1) : W(e, 1);
}
function it(e) {
  e === void 0 && (e = {});
  var r = e.connector, t = r === void 0 ? function() {
    return new D();
  } : r, n = e.resetOnError, i = n === void 0 ? !0 : n, o = e.resetOnComplete, u = o === void 0 ? !0 : o, c = e.resetOnRefCountZero, a = c === void 0 ? !0 : c;
  return function(s) {
    var f, v, y, l = 0, p = !1, h = !1, m = function() {
      v?.unsubscribe(), v = void 0;
    }, w = function() {
      m(), f = y = void 0, p = h = !1;
    }, P = function() {
      var T = f;
      w(), T?.unsubscribe();
    };
    return O(function(T, z) {
      l++, !h && !p && m();
      var R = y = y ?? t();
      z.add(function() {
        l--, l === 0 && !h && !p && (v = q(P, a));
      }), R.subscribe(z), !f && l > 0 && (f = new C({
        next: function(U) {
          return R.next(U);
        },
        error: function(U) {
          h = !0, m(), v = q(w, i, U), R.error(U);
        },
        complete: function() {
          p = !0, m(), v = q(w, u), R.complete();
        }
      }), _(T).subscribe(f));
    })(s);
  };
}
function q(e, r) {
  for (var t = [], n = 2; n < arguments.length; n++)
    t[n - 2] = arguments[n];
  if (r === !0) {
    e();
    return;
  }
  if (r !== !1) {
    var i = new C({
      next: function() {
        i.unsubscribe(), e();
      }
    });
    return _(r.apply(void 0, E([], A(t)))).subscribe(i);
  }
}
function vt(e, r, t) {
  var n, i, o, u, c = !1;
  return e && typeof e == "object" ? (n = e.bufferSize, u = n === void 0 ? 1 / 0 : n, i = e.windowTime, r = i === void 0 ? 1 / 0 : i, o = e.refCount, c = o === void 0 ? !1 : o, t = e.scheduler) : u = e ?? 1 / 0, it({
    connector: function() {
      return new Ue(u, r, t);
    },
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: c
  });
}
export {
  st as A,
  J as B,
  be as C,
  D,
  Me as E,
  b as O,
  Ue as R,
  C as S,
  E as _,
  ut as a,
  j as b,
  te as c,
  oe as d,
  _ as e,
  Ne as f,
  ct as g,
  ot as h,
  d as i,
  A as j,
  at as k,
  ft as l,
  nt as m,
  Se as n,
  O as o,
  We as p,
  ht as q,
  W as r,
  vt as s,
  dt as t,
  it as u,
  lt as v,
  S as w,
  se as x,
  I as y,
  L as z
};
//# sourceMappingURL=shareReplay-Dm5F4Ty_.js.map
