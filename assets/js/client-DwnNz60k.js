const mt = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
function Wt(t) {
  const [, e, n, i] = t.split("-");
  if (!e || !n || !i)
    throw new Error(`Malformed asset _ref '${t}'. Expected an id like "${mt}".`);
  const [o, s] = n.split("x"), a = +o, d = +s;
  if (!(isFinite(a) && isFinite(d)))
    throw new Error(`Malformed asset _ref '${t}'. Expected an id like "${mt}".`);
  return { id: e, width: a, height: d, format: i };
}
const Gt = (t) => {
  const e = t;
  return e ? typeof e._ref == "string" : !1;
}, zt = (t) => {
  const e = t;
  return e ? typeof e._id == "string" : !1;
}, Kt = (t) => {
  const e = t;
  return e && e.asset ? typeof e.asset.url == "string" : !1;
}, Ft = (t) => {
  if (typeof t == "object" && t !== null) {
    const e = t;
    return e._upload && (!e.asset || !e.asset._ref);
  }
  return !1;
};
function Bt(t) {
  if (!t)
    return null;
  let e;
  if (typeof t == "string" && Xt(t))
    e = {
      asset: { _ref: gt(t) }
    };
  else if (typeof t == "string")
    e = {
      asset: { _ref: t }
    };
  else if (Gt(t))
    e = {
      asset: t
    };
  else if (zt(t))
    e = {
      asset: {
        _ref: t._id || ""
      }
    };
  else if (Kt(t))
    e = {
      asset: {
        _ref: gt(t.asset.url)
      }
    };
  else if (typeof t.asset == "object")
    e = { ...t };
  else
    return null;
  const n = t;
  return n.crop && (e.crop = n.crop), n.hotspot && (e.hotspot = n.hotspot), Qt(e);
}
function Xt(t) {
  return /^https?:\/\//.test(`${t}`);
}
function gt(t) {
  return `image-${t.split("/").slice(-1)[0]}`.replace(/\.([a-z]+)$/, "-$1");
}
function Qt(t) {
  if (t.crop && t.hotspot)
    return t;
  const e = { ...t };
  return e.crop || (e.crop = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }), e.hotspot || (e.hotspot = {
    x: 0.5,
    y: 0.5,
    height: 1,
    width: 1
  }), e;
}
const Ot = [
  ["width", "w"],
  ["height", "h"],
  ["format", "fm"],
  ["download", "dl"],
  ["blur", "blur"],
  ["sharpen", "sharp"],
  ["invert", "invert"],
  ["orientation", "or"],
  ["minHeight", "min-h"],
  ["maxHeight", "max-h"],
  ["minWidth", "min-w"],
  ["maxWidth", "max-w"],
  ["quality", "q"],
  ["fit", "fit"],
  ["crop", "crop"],
  ["saturation", "sat"],
  ["auto", "auto"],
  ["dpr", "dpr"],
  ["pad", "pad"],
  ["frame", "frame"]
];
function Jt(t) {
  let e = { ...t || {} };
  const n = e.source;
  delete e.source;
  const i = Bt(n);
  if (!i) {
    if (n && Ft(n))
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=";
    throw new Error(`Unable to resolve image URL from source (${JSON.stringify(n)})`);
  }
  const o = i.asset._ref || i.asset._id || "", s = Wt(o), a = Math.round(i.crop.left * s.width), d = Math.round(i.crop.top * s.height), h = {
    left: a,
    top: d,
    width: Math.round(s.width - i.crop.right * s.width - a),
    height: Math.round(s.height - i.crop.bottom * s.height - d)
  }, p = i.hotspot.height * s.height / 2, y = i.hotspot.width * s.width / 2, _ = i.hotspot.x * s.width, E = i.hotspot.y * s.height, R = {
    left: _ - y,
    top: E - p,
    right: _ + y,
    bottom: E + p
  };
  return e.rect || e.focalPoint || e.ignoreImageParams || e.crop || (e = { ...e, ...te({ crop: h, hotspot: R }, e) }), Zt({ ...e, asset: s });
}
function Zt(t) {
  const e = (t.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, ""), n = t.vanityName ? `/${t.vanityName}` : "", i = `${t.asset.id}-${t.asset.width}x${t.asset.height}.${t.asset.format}${n}`;
  let o;
  t.mediaLibraryId ? o = `${e}/media-libraries/${t.mediaLibraryId}/images/${i}` : t.canvasId ? o = `${e}/images/canvases/${t.canvasId}/${i}` : o = `${e}/images/${t.projectId}/${t.dataset}/${i}`;
  const s = [];
  if (t.rect) {
    const { left: d, top: h, width: p, height: y } = t.rect;
    (d !== 0 || h !== 0 || y !== t.asset.height || p !== t.asset.width) && s.push(`rect=${d},${h},${p},${y}`);
  }
  t.bg && s.push(`bg=${t.bg}`), t.focalPoint && (s.push(`fp-x=${t.focalPoint.x}`), s.push(`fp-y=${t.focalPoint.y}`));
  const a = [t.flipHorizontal && "h", t.flipVertical && "v"].filter(Boolean).join("");
  return a && s.push(`flip=${a}`), Ot.forEach((d) => {
    const [h, p] = d;
    typeof t[h] < "u" ? s.push(`${p}=${encodeURIComponent(t[h])}`) : typeof t[p] < "u" && s.push(`${p}=${encodeURIComponent(t[p])}`);
  }), s.length === 0 ? o : `${o}?${s.join("&")}`;
}
function te(t, e) {
  let n;
  const i = e.width, o = e.height;
  if (!(i && o))
    return { width: i, height: o, rect: t.crop };
  const s = t.crop, a = t.hotspot, d = i / o;
  if (s.width / s.height > d) {
    const h = Math.round(s.height), p = Math.round(h * d), y = Math.max(0, Math.round(s.top)), _ = Math.round((a.right - a.left) / 2 + a.left);
    let E = Math.max(0, Math.round(_ - p / 2));
    E < s.left ? E = s.left : E + p > s.left + s.width && (E = s.left + s.width - p), n = { left: E, top: y, width: p, height: h };
  } else {
    const h = s.width, p = Math.round(h / d), y = Math.max(0, Math.round(s.left)), _ = Math.round((a.bottom - a.top) / 2 + a.top);
    let E = Math.max(0, Math.round(_ - p / 2));
    E < s.top ? E = s.top : E + p > s.top + s.height && (E = s.top + s.height - p), n = { left: y, top: E, width: h, height: p };
  }
  return {
    width: i,
    height: o,
    rect: n
  };
}
const ee = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"], re = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"], ne = ["format"];
function ie(t) {
  return t && "config" in t ? typeof t.config == "function" : !1;
}
function oe(t) {
  return t && "clientConfig" in t ? typeof t.clientConfig == "object" : !1;
}
function wt(t) {
  const { apiHost: e, projectId: n, dataset: i } = t, o = {
    baseUrl: (e || "https://api.sanity.io").replace(/^https:\/\/api\./, "https://cdn.")
  }, s = t.resource ?? t["~experimental_resource"];
  if (s?.type === "media-library") {
    if (typeof s.id != "string" || s.id.length === 0)
      throw new Error('Media library clients must include an id in "resource"');
    return { ...o, mediaLibraryId: s.id };
  }
  if (s?.type === "canvas") {
    if (typeof s.id != "string" || s.id.length === 0)
      throw new Error('Canvas clients must include an id in "resource"');
    return { ...o, canvasId: s.id };
  }
  if (s?.type === "dataset") {
    if (typeof s.id != "string" || s.id.length === 0)
      throw new Error('Dataset clients must include an id in "resource"');
    const [a, d] = s.id.split(".");
    if (!a || !d)
      throw new Error(
        'Dataset resource id must be in the format "projectId.dataset", got: ' + s.id
      );
    return { ...o, projectId: a, dataset: d };
  }
  return { ...o, projectId: n, dataset: i };
}
function se(t) {
  const e = Ot;
  for (const n of e) {
    const [i, o] = n;
    if (t === i || t === o)
      return i;
  }
  return t;
}
function At(t) {
  let e = {};
  return ie(t) ? e = wt(t.config()) : oe(t) ? e = wt(t.clientConfig) : e = t || {}, e;
}
function ue(t, e) {
  const n = At(e);
  return new t(null, n);
}
function ae(t) {
  return ue(M, t);
}
function fe(t, e) {
  const n = e.baseUrl || t.baseUrl, i = { baseUrl: n };
  for (const o in e)
    if (e.hasOwnProperty(o)) {
      const s = se(o);
      i[s] = e[o];
    }
  return { baseUrl: n, ...i };
}
class M {
  options;
  constructor(e, n) {
    this.options = e ? { ...e.options || {}, ...n || {} } : { ...n || {} };
  }
  withOptions(e) {
    const n = fe(this.options, e);
    return new M(this, n);
  }
  // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
  // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
  // studio, the 'image'-document must be provided.
  image(e) {
    return this.withOptions({ source: e });
  }
  // Specify the dataset
  dataset(e) {
    return this.withOptions({ dataset: e });
  }
  // Specify the projectId
  projectId(e) {
    return this.withOptions({ projectId: e });
  }
  withClient(e) {
    const n = At(e), i = { ...this.options };
    return delete i.baseUrl, delete i.projectId, delete i.dataset, delete i.mediaLibraryId, delete i.canvasId, new M(null, { ...n, ...i });
  }
  // Specify background color
  bg(e) {
    return this.withOptions({ bg: e });
  }
  // Set DPR scaling factor
  dpr(e) {
    return this.withOptions(e && e !== 1 ? { dpr: e } : {});
  }
  // Specify the width of the image in pixels
  width(e) {
    return this.withOptions({ width: e });
  }
  // Specify the height of the image in pixels
  height(e) {
    return this.withOptions({ height: e });
  }
  // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
  focalPoint(e, n) {
    return this.withOptions({ focalPoint: { x: e, y: n } });
  }
  maxWidth(e) {
    return this.withOptions({ maxWidth: e });
  }
  minWidth(e) {
    return this.withOptions({ minWidth: e });
  }
  maxHeight(e) {
    return this.withOptions({ maxHeight: e });
  }
  minHeight(e) {
    return this.withOptions({ minHeight: e });
  }
  // Specify width and height in pixels
  size(e, n) {
    return this.withOptions({ width: e, height: n });
  }
  // Specify blur between 0 and 100
  blur(e) {
    return this.withOptions({ blur: e });
  }
  sharpen(e) {
    return this.withOptions({ sharpen: e });
  }
  // Specify the desired rectangle of the image
  rect(e, n, i, o) {
    return this.withOptions({ rect: { left: e, top: n, width: i, height: o } });
  }
  // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
  format(e) {
    return this.withOptions({ format: e });
  }
  invert(e) {
    return this.withOptions({ invert: e });
  }
  // Rotation in degrees 0, 90, 180, 270
  orientation(e) {
    return this.withOptions({ orientation: e });
  }
  // Compression quality 0-100
  quality(e) {
    return this.withOptions({ quality: e });
  }
  // Make it a download link. Parameter is default filename.
  forceDownload(e) {
    return this.withOptions({ download: e });
  }
  // Flip image horizontally
  flipHorizontal() {
    return this.withOptions({ flipHorizontal: !0 });
  }
  // Flip image vertically
  flipVertical() {
    return this.withOptions({ flipVertical: !0 });
  }
  // Ignore crop/hotspot from image record, even when present
  ignoreImageParams() {
    return this.withOptions({ ignoreImageParams: !0 });
  }
  fit(e) {
    if (ee.indexOf(e) === -1)
      throw new Error(`Invalid fit mode "${e}"`);
    return this.withOptions({ fit: e });
  }
  crop(e) {
    if (re.indexOf(e) === -1)
      throw new Error(`Invalid crop mode "${e}"`);
    return this.withOptions({ crop: e });
  }
  // Saturation
  saturation(e) {
    return this.withOptions({ saturation: e });
  }
  auto(e) {
    if (ne.indexOf(e) === -1)
      throw new Error(`Invalid auto mode "${e}"`);
    return this.withOptions({ auto: e });
  }
  // Specify the number of pixels to pad the image
  pad(e) {
    return this.withOptions({ pad: e });
  }
  // Vanity URL for more SEO friendly URLs
  vanityName(e) {
    return this.withOptions({ vanityName: e });
  }
  frame(e) {
    if (e !== 1)
      throw new Error(`Invalid frame value "${e}"`);
    return this.withOptions({ frame: e });
  }
  // Gets the url based on the submitted parameters
  url() {
    return Jt(this.options);
  }
  // Alias for url()
  toString() {
    return this.url();
  }
}
function ce(t) {
  let e = !1, n;
  return (...i) => (e || (n = t(...i), e = !0), n);
}
const le = (t) => ce((...e) => {
  console.warn(t.join(" "), ...e);
}), pe = le([
  "The default export of @sanity/image-url has been deprecated. Use the named export `createImageUrlBuilder` instead."
]);
function he(t) {
  return function(e) {
    return pe(), t(e);
  };
}
const de = he(ae);
var ir = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ye(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var F = { exports: {} }, B = {}, X = { exports: {} }, l = {};
var vt;
function me() {
  if (vt) return l;
  vt = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), e = /* @__PURE__ */ Symbol.for("react.portal"), n = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), s = /* @__PURE__ */ Symbol.for("react.consumer"), a = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), h = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), E = /* @__PURE__ */ Symbol.for("react.view_transition"), R = Symbol.iterator;
  function $(r) {
    return r === null || typeof r != "object" ? null : (r = R && r[R] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var T = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, x = Object.assign, at = {};
  function O(r, u, f) {
    this.props = r, this.context = u, this.refs = at, this.updater = f || T;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(r, u) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, u, "setState");
  }, O.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function ft() {
  }
  ft.prototype = O.prototype;
  function q(r, u, f) {
    this.props = r, this.context = u, this.refs = at, this.updater = f || T;
  }
  var V = q.prototype = new ft();
  V.constructor = q, x(V, O.prototype), V.isPureReactComponent = !0;
  var ct = Array.isArray;
  function W() {
  }
  var w = { H: null, A: null, T: null, S: null }, lt = Object.prototype.hasOwnProperty;
  function G(r, u, f) {
    var c = f.ref;
    return {
      $$typeof: t,
      type: r,
      key: u,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  function Ht(r, u) {
    return G(r.type, u, r.props);
  }
  function z(r) {
    return typeof r == "object" && r !== null && r.$$typeof === t;
  }
  function Dt(r) {
    var u = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(f) {
      return u[f];
    });
  }
  var pt = /\/+/g;
  function K(r, u) {
    return typeof r == "object" && r !== null && r.key != null ? Dt("" + r.key) : u.toString(36);
  }
  function Lt(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(W, W) : (r.status = "pending", r.then(
          function(u) {
            r.status === "pending" && (r.status = "fulfilled", r.value = u);
          },
          function(u) {
            r.status === "pending" && (r.status = "rejected", r.reason = u);
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function A(r, u, f, c, m) {
    var g = typeof r;
    (g === "undefined" || g === "boolean") && (r = null);
    var v = !1;
    if (r === null) v = !0;
    else
      switch (g) {
        case "bigint":
        case "string":
        case "number":
          v = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case t:
            case e:
              v = !0;
              break;
            case y:
              return v = r._init, A(
                v(r._payload),
                u,
                f,
                c,
                m
              );
          }
      }
    if (v)
      return m = m(r), v = c === "" ? "." + K(r, 0) : c, ct(m) ? (f = "", v != null && (f = v.replace(pt, "$&/") + "/"), A(m, u, f, "", function(Vt) {
        return Vt;
      })) : m != null && (z(m) && (m = Ht(
        m,
        f + (m.key == null || r && r.key === m.key ? "" : ("" + m.key).replace(
          pt,
          "$&/"
        ) + "/") + v
      )), u.push(m)), 1;
    v = 0;
    var S = c === "" ? "." : c + ":";
    if (ct(r))
      for (var b = 0; b < r.length; b++)
        c = r[b], g = S + K(c, b), v += A(
          c,
          u,
          f,
          g,
          m
        );
    else if (b = $(r), typeof b == "function")
      for (r = b.call(r), b = 0; !(c = r.next()).done; )
        c = c.value, g = S + K(c, b++), v += A(
          c,
          u,
          f,
          g,
          m
        );
    else if (g === "object") {
      if (typeof r.then == "function")
        return A(
          Lt(r),
          u,
          f,
          c,
          m
        );
      throw u = String(r), Error(
        "Objects are not valid as a React child (found: " + (u === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : u) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return v;
  }
  function N(r, u, f) {
    if (r == null) return r;
    var c = [], m = 0;
    return A(r, c, "", "", function(g) {
      return u.call(f, g, m++);
    }), c;
  }
  function Yt(r) {
    if (r._status === -1) {
      var u = r._result, f = u();
      f.then(
        function(c) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = c, f.status === void 0 && (f.status = "fulfilled", f.value = c));
        },
        function(c) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = c, f.status === void 0 && (f.status = "rejected", f.reason = c));
        }
      ), r._status === -1 && (r._status = 0, r._result = f);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var u = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(u)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  };
  function dt(r) {
    var u = w.T, f = {};
    f.types = u !== null ? u.types : null, w.T = f;
    try {
      var c = r(), m = w.S;
      m !== null && m(f, c), typeof c == "object" && c !== null && typeof c.then == "function" && c.then(W, ht);
    } catch (g) {
      ht(g);
    } finally {
      u !== null && f.types !== null && (u.types = f.types), w.T = u;
    }
  }
  function yt(r) {
    var u = w.T;
    if (u !== null) {
      var f = u.types;
      f === null ? u.types = [r] : f.indexOf(r) === -1 && f.push(r);
    } else dt(yt.bind(null, r));
  }
  var qt = {
    map: N,
    forEach: function(r, u, f) {
      N(
        r,
        function() {
          u.apply(this, arguments);
        },
        f
      );
    },
    count: function(r) {
      var u = 0;
      return N(r, function() {
        u++;
      }), u;
    },
    toArray: function(r) {
      return N(r, function(u) {
        return u;
      }) || [];
    },
    only: function(r) {
      if (!z(r))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return r;
    }
  };
  return l.Activity = _, l.Children = qt, l.Component = O, l.Fragment = n, l.Profiler = o, l.PureComponent = q, l.StrictMode = i, l.Suspense = h, l.ViewTransition = E, l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, l.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(r) {
      return w.H.useMemoCache(r);
    }
  }, l.addTransitionType = yt, l.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, l.cacheSignal = function() {
    return null;
  }, l.cloneElement = function(r, u, f) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var c = x({}, r.props), m = r.key;
    if (u != null)
      for (g in u.key !== void 0 && (m = "" + u.key), u)
        !lt.call(u, g) || g === "key" || g === "__self" || g === "__source" || g === "ref" && u.ref === void 0 || (c[g] = u[g]);
    var g = arguments.length - 2;
    if (g === 1) c.children = f;
    else if (1 < g) {
      for (var v = Array(g), S = 0; S < g; S++)
        v[S] = arguments[S + 2];
      c.children = v;
    }
    return G(r.type, m, c);
  }, l.createContext = function(r) {
    return r = {
      $$typeof: a,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: s,
      _context: r
    }, r;
  }, l.createElement = function(r, u, f) {
    var c, m = {}, g = null;
    if (u != null)
      for (c in u.key !== void 0 && (g = "" + u.key), u)
        lt.call(u, c) && c !== "key" && c !== "__self" && c !== "__source" && (m[c] = u[c]);
    var v = arguments.length - 2;
    if (v === 1) m.children = f;
    else if (1 < v) {
      for (var S = Array(v), b = 0; b < v; b++)
        S[b] = arguments[b + 2];
      m.children = S;
    }
    if (r && r.defaultProps)
      for (c in v = r.defaultProps, v)
        m[c] === void 0 && (m[c] = v[c]);
    return G(r, g, m);
  }, l.createRef = function() {
    return { current: null };
  }, l.forwardRef = function(r) {
    return { $$typeof: d, render: r };
  }, l.isValidElement = z, l.lazy = function(r) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: r },
      _init: Yt
    };
  }, l.memo = function(r, u) {
    return {
      $$typeof: p,
      type: r,
      compare: u === void 0 ? null : u
    };
  }, l.startTransition = dt, l.unstable_useCacheRefresh = function() {
    return w.H.useCacheRefresh();
  }, l.use = function(r) {
    return w.H.use(r);
  }, l.useActionState = function(r, u, f) {
    return w.H.useActionState(r, u, f);
  }, l.useCallback = function(r, u) {
    return w.H.useCallback(r, u);
  }, l.useContext = function(r) {
    return w.H.useContext(r);
  }, l.useDebugValue = function() {
  }, l.useDeferredValue = function(r, u) {
    return w.H.useDeferredValue(r, u);
  }, l.useEffect = function(r, u) {
    return w.H.useEffect(r, u);
  }, l.useEffectEvent = function(r) {
    return w.H.useEffectEvent(r);
  }, l.useId = function() {
    return w.H.useId();
  }, l.useImperativeHandle = function(r, u, f) {
    return w.H.useImperativeHandle(r, u, f);
  }, l.useInsertionEffect = function(r, u) {
    return w.H.useInsertionEffect(r, u);
  }, l.useLayoutEffect = function(r, u) {
    return w.H.useLayoutEffect(r, u);
  }, l.useMemo = function(r, u) {
    return w.H.useMemo(r, u);
  }, l.useOptimistic = function(r, u) {
    return w.H.useOptimistic(r, u);
  }, l.useReducer = function(r, u, f) {
    return w.H.useReducer(r, u, f);
  }, l.useRef = function(r) {
    return w.H.useRef(r);
  }, l.useState = function(r) {
    return w.H.useState(r);
  }, l.useSyncExternalStore = function(r, u, f) {
    return w.H.useSyncExternalStore(
      r,
      u,
      f
    );
  }, l.useTransition = function() {
    return w.H.useTransition();
  }, l.version = "19.3.0", l;
}
var _t;
function $t() {
  return _t || (_t = 1, X.exports = me()), X.exports;
}
var Et;
function ge() {
  if (Et) return B;
  Et = 1;
  var t = $t().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return B.c = function(e) {
    return t.H.useMemoCache(e);
  }, B;
}
var bt;
function we() {
  return bt || (bt = 1, F.exports = ge()), F.exports;
}
var or = we();
const ve = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, tt = /_key\s*==\s*['"](.*)['"]/, _e = /^\d*:\d*$/;
function et(t) {
  return typeof t == "number" || typeof t == "string" && /^\[\d+\]$/.test(t);
}
function Y(t) {
  return typeof t == "string" ? tt.test(t.trim()) : typeof t == "object" && "_key" in t;
}
function Tt(t) {
  if (typeof t == "string" && _e.test(t))
    return !0;
  if (!Array.isArray(t) || t.length !== 2)
    return !1;
  const [e, n] = t;
  return (typeof e == "number" || e === "") && (typeof n == "number" || n === "");
}
function Ee(t, e, n) {
  const i = typeof e == "string" ? Ct(e) : e;
  if (!Array.isArray(i))
    throw new Error("Path must be an array or a string");
  let o = t;
  for (let s = 0; s < i.length; s++) {
    const a = i[s];
    if (et(a)) {
      if (!Array.isArray(o))
        return n;
      o = o[a];
    }
    if (Y(a)) {
      if (!Array.isArray(o))
        return n;
      o = o.find((d) => d._key === a._key);
    }
    if (typeof a == "string" && (o = typeof o == "object" && o !== null ? o[a] : void 0), typeof o > "u")
      return n;
  }
  return o;
}
function kt(t) {
  if (!Array.isArray(t))
    throw new Error("Path is not an array");
  return t.reduce((e, n, i) => {
    const o = typeof n;
    if (o === "number")
      return `${e}[${n}]`;
    if (o === "string")
      return `${e}${i === 0 ? "" : "."}${n}`;
    if (Y(n) && n._key)
      return `${e}[_key=="${n._key}"]`;
    if (Array.isArray(n)) {
      const [s, a] = n;
      return `${e}[${s}:${a}]`;
    }
    throw new Error(`Unsupported path segment \`${JSON.stringify(n)}\``);
  }, "");
}
function Ct(t) {
  if (typeof t != "string")
    throw new Error("Path is not a string");
  const e = t.match(ve);
  if (!e)
    throw new Error("Invalid path string");
  return e.map(be);
}
function be(t) {
  return et(t) ? Re(t) : Y(t) ? Se(t) : Tt(t) ? Ie(t) : t;
}
function Re(t) {
  return Number(t.replace(/[^\d]/g, ""));
}
function Se(t) {
  return { _key: t.match(tt)[1] };
}
function Ie(t) {
  const [e, n] = t.split(":").map((i) => i === "" ? i : Number(i));
  return [e, n];
}
var H = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromString: Ct,
  get: Ee,
  isIndexSegment: et,
  isIndexTuple: Tt,
  isKeySegment: Y,
  reKeySegment: tt,
  toString: kt
});
const Oe = "drafts", Ae = "versions", D = `${Oe}.`, $e = `${Ae}.`;
function rt(t) {
  return t.startsWith(D);
}
function j(t) {
  return t.startsWith($e);
}
function Te(t) {
  return !rt(t) && !j(t);
}
function sr(t) {
  if (j(t)) {
    const e = nt(t);
    return D + e;
  }
  return rt(t) ? t : D + t;
}
function ke(t) {
  if (!j(t)) return;
  const [e, n] = t.split(".");
  return n;
}
function nt(t) {
  return j(t) ? t.split(".").slice(2).join(".") : rt(t) ? t.slice(D.length) : t;
}
function Ce(t) {
  return t.map((e) => {
    if (typeof e == "string" || typeof e == "number")
      return e;
    if (e._key !== "")
      return { _key: e._key };
    if (e._index !== -1)
      return e._index;
    throw new Error(`invalid segment:${JSON.stringify(e)}`);
  });
}
function ur(t) {
  const {
    baseUrl: e,
    workspace: n = "default",
    tool: i = "default",
    id: o,
    type: s,
    path: a,
    projectId: d,
    dataset: h
  } = t;
  if (!e)
    throw new Error("baseUrl is required");
  if (!a)
    throw new Error("path is required");
  if (!o)
    throw new Error("id is required");
  if (e !== "/" && e.endsWith("/"))
    throw new Error("baseUrl must not end with a slash");
  const p = n === "default" ? void 0 : n, y = i === "default" ? void 0 : i, _ = nt(o), E = Array.isArray(a) ? kt(Ce(a)) : a, R = new URLSearchParams({
    baseUrl: e,
    id: _,
    type: s,
    path: E
  });
  if (p && R.set("workspace", p), y && R.set("tool", y), d && R.set("projectId", d), h && R.set("dataset", h), Te(o))
    R.set("perspective", "published");
  else if (j(o)) {
    const x = ke(o);
    R.set("perspective", x);
  }
  const $ = [e === "/" ? "" : e];
  p && $.push(p);
  const T = [
    "mode=presentation",
    `id=${_}`,
    `type=${s}`,
    `path=${encodeURIComponent(E)}`
  ];
  return y && T.push(`tool=${y}`), $.push("intent", "edit", `${T.join(";")}?${R}`), $.join("/");
}
var je = $t();
const ar = /* @__PURE__ */ ye(je), Pe = {
  lang: void 0,
  message: void 0,
  abortEarly: void 0,
  abortPipeEarly: void 0
};
// @__NO_SIDE_EFFECTS__
function it(t) {
  return Pe;
}
let xe;
// @__NO_SIDE_EFFECTS__
function Ne(t) {
  return xe?.get(t);
}
let Ue;
// @__NO_SIDE_EFFECTS__
function Me(t) {
  return Ue?.get(t);
}
let He;
// @__NO_SIDE_EFFECTS__
function De(t, e) {
  return He?.get(t)?.get(e);
}
// @__NO_SIDE_EFFECTS__
function Le(t) {
  const e = typeof t;
  return e === "string" ? `"${t}"` : e === "number" || e === "bigint" || e === "boolean" ? `${t}` : e === "object" || e === "function" ? (t && Object.getPrototypeOf(t)?.constructor?.name) ?? "null" : e;
}
function C(t, e, n, i, o) {
  const s = o && "input" in o ? o.input : n.value, a = o?.expected ?? t.expects ?? null, d = o?.received ?? /* @__PURE__ */ Le(s), h = {
    kind: t.kind,
    type: t.type,
    input: s,
    expected: a,
    received: d,
    message: `Invalid ${e}: ${a ? `Expected ${a} but r` : "R"}eceived ${d}`,
    requirement: t.requirement,
    path: o?.path,
    issues: o?.issues,
    lang: i.lang,
    abortEarly: i.abortEarly,
    abortPipeEarly: i.abortPipeEarly
  }, p = t.kind === "schema", y = o?.message ?? t.message ?? /* @__PURE__ */ De(t.reference, h.lang) ?? (p ? /* @__PURE__ */ Me(h.lang) : null) ?? i.message ?? /* @__PURE__ */ Ne(h.lang);
  y !== void 0 && (h.message = typeof y == "function" ? y(h) : y), p && (n.typed = !1), n.issues ? n.issues.push(h) : n.issues = [h];
}
// @__NO_SIDE_EFFECTS__
function Ye(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e) && e !== "__proto__" && e !== "prototype" && e !== "constructor";
}
function I(t) {
  return t["~standard"] = {
    version: 1,
    vendor: "valibot",
    validate: (e) => t["~run"]({ value: e }, /* @__PURE__ */ it())
  }, t;
}
var qe = class extends Error {
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
function ot(t, e) {
  return {
    kind: "validation",
    type: "min_length",
    reference: ot,
    async: !1,
    expects: `>=${t}`,
    requirement: t,
    message: e,
    "~run"(n, i) {
      return n.typed && n.value.length < this.requirement && C(this, "length", n, i, { received: `${n.value.length}` }), n;
    }
  };
}
const Ve = { abortEarly: !0 };
// @__NO_SIDE_EFFECTS__
function jt(t, e, n) {
  return typeof t.fallback == "function" ? t.fallback(e, n) : t.fallback;
}
// @__NO_SIDE_EFFECTS__
function We(t, e) {
  return I({
    ...t,
    fallback: e,
    "~run"(n, i) {
      const o = t["~run"](n, i);
      return o.issues ? {
        typed: !0,
        value: /* @__PURE__ */ jt(this, o, i)
      } : o;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(t, e, n) {
  return typeof t.default == "function" ? t.default(e, n) : t.default;
}
// @__NO_SIDE_EFFECTS__
function Ge(t, e) {
  return !t["~run"]({ value: e }, Ve).issues;
}
// @__NO_SIDE_EFFECTS__
function st(t, e) {
  return I({
    kind: "schema",
    type: "object",
    reference: st,
    expects: "Object",
    async: !1,
    entries: t,
    message: e,
    "~run"(n, i) {
      const o = n.value;
      if (o && typeof o == "object") {
        n.typed = !0, n.value = {};
        for (const s in this.entries) {
          const a = this.entries[s];
          if (s in o || (a.type === "exact_optional" || a.type === "optional" || a.type === "nullish") && a.default !== void 0) {
            const d = s in o ? o[s] : /* @__PURE__ */ Pt(a), h = a["~run"]({ value: d }, i);
            if (h.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: o,
                key: s,
                value: d
              };
              for (const y of h.issues)
                y.path ? y.path.unshift(p) : y.path = [p], n.issues?.push(y);
              if (n.issues || (n.issues = h.issues), i.abortEarly) {
                n.typed = !1;
                break;
              }
            }
            h.typed || (n.typed = !1), n.value[s] = h.value;
          } else if (a.fallback !== void 0) n.value[s] = /* @__PURE__ */ jt(a);
          else if (a.type !== "exact_optional" && a.type !== "optional" && a.type !== "nullish" && (C(this, "key", n, i, {
            input: void 0,
            expected: `"${s}"`,
            path: [{
              type: "object",
              origin: "key",
              input: o,
              key: s,
              value: o[s]
            }]
          }), i.abortEarly))
            break;
        }
      } else C(this, "type", n, i);
      return n;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function ut(t, e) {
  return I({
    kind: "schema",
    type: "optional",
    reference: ut,
    expects: `(${t.expects} | undefined)`,
    async: !1,
    wrapped: t,
    default: e,
    "~run"(n, i) {
      return n.value === void 0 && (this.default !== void 0 && (n.value = /* @__PURE__ */ Pt(this, n, i)), n.value === void 0) ? (n.typed = !0, n) : this.wrapped["~run"](n, i);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function xt(t, e, n) {
  return I({
    kind: "schema",
    type: "record",
    reference: xt,
    expects: "Object",
    async: !1,
    key: t,
    value: e,
    message: n,
    "~run"(i, o) {
      const s = i.value;
      if (s && typeof s == "object") {
        i.typed = !0, i.value = {};
        for (const a in s) if (/* @__PURE__ */ Ye(s, a)) {
          const d = s[a], h = this.key["~run"]({ value: a }, o);
          if (h.issues) {
            const y = {
              type: "object",
              origin: "key",
              input: s,
              key: a,
              value: d
            };
            for (const _ of h.issues)
              _.path = [y], i.issues?.push(_);
            if (i.issues || (i.issues = h.issues), o.abortEarly) {
              i.typed = !1;
              break;
            }
          }
          const p = this.value["~run"]({ value: d }, o);
          if (p.issues) {
            const y = {
              type: "object",
              origin: "value",
              input: s,
              key: a,
              value: d
            };
            for (const _ of p.issues)
              _.path ? _.path.unshift(y) : _.path = [y], i.issues?.push(_);
            if (i.issues || (i.issues = p.issues), o.abortEarly) {
              i.typed = !1;
              break;
            }
          }
          (!h.typed || !p.typed) && (i.typed = !1), h.typed && (i.value[h.value] = p.value);
        }
      } else C(this, "type", i, o);
      return i;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function P(t) {
  return I({
    kind: "schema",
    type: "string",
    reference: P,
    expects: "string",
    async: !1,
    message: t,
    "~run"(e, n) {
      return typeof e.value == "string" ? e.typed = !0 : C(this, "type", e, n), e;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function Nt() {
  return I({
    kind: "schema",
    type: "unknown",
    reference: Nt,
    expects: "unknown",
    async: !1,
    "~run"(t) {
      return t.typed = !0, t;
    }
  });
}
function ze(t, e, n) {
  const i = t["~run"]({ value: e }, /* @__PURE__ */ it());
  if (i.issues) throw new qe(i.issues);
  return i.value;
}
// @__NO_SIDE_EFFECTS__
function Ut(...t) {
  return I({
    ...t[0],
    pipe: t,
    "~run"(e, n) {
      for (const i of t) if (i.kind !== "metadata") {
        if (e.issues && (i.kind === "schema" || i.kind === "transformation")) {
          e.typed = !1;
          break;
        }
        (!e.issues || !n.abortEarly && !n.abortPipeEarly) && (e = i["~run"](e, n));
      }
      return e;
    }
  });
}
// @__NO_SIDE_EFFECTS__
function Q(t, e, n) {
  const i = t["~run"]({ value: e }, /* @__PURE__ */ it());
  return {
    typed: i.typed,
    success: !i.issues,
    output: i.value,
    issues: i.issues
  };
}
const U = /* @__PURE__ */ Ut(/* @__PURE__ */ P(), /* @__PURE__ */ ot(1)), k = /* @__PURE__ */ ut(U), L = /* @__PURE__ */ st({
  baseUrl: U,
  dataset: k,
  id: U,
  path: U,
  projectId: k,
  tool: k,
  type: k,
  workspace: k,
  perspective: /* @__PURE__ */ We(/* @__PURE__ */ P(), "drafts")
});
function Mt(t) {
  return /* @__PURE__ */ Ge(L, t);
}
function Ke(t) {
  return t !== null && Array.isArray(t);
}
function Fe(t) {
  let e = "";
  for (let n of t) {
    if (typeof n == "string") {
      e && (e += "."), e += n;
      continue;
    }
    if (typeof n == "number") {
      e && (e += ":"), e += `${n}`;
      continue;
    }
    if (Ke(n)) {
      e && (e += ":"), e += `${n.join(",")}}`;
      continue;
    }
    if (n._key) {
      e && (e += ":"), e += `${n._key}`;
      continue;
    }
  }
  return e;
}
function Be(t) {
  let { id: e, path: n, baseUrl: i, tool: o, workspace: s, type: a } = t;
  if (Mt(t)) return [
    ["id", nt(e)],
    ["type", a],
    ["path", Fe(H.fromString(n))],
    ["base", encodeURIComponent(i)],
    ["workspace", s],
    ["tool", o]
  ].filter(([, d]) => !!d).map((d) => d.join("=")).join(";");
}
function J(t) {
  function e(o) {
    return o ? typeof o == "string" ? H.fromString(o) : o : [];
  }
  function n(o) {
    if (!o.id) throw Error("`id` is required to create a data attribute");
    if (!o.type) throw Error("`type` is required to create a data attribute");
    if (!o.path || !o.path.length) throw Error("`path` is required to create a data attribute");
    return Be({
      baseUrl: o.baseUrl || "/",
      workspace: o.workspace,
      tool: o.tool,
      type: o.type,
      id: o.id,
      path: typeof o.path == "string" ? o.path : H.toString(o.path),
      perspective: o.perspective
    });
  }
  let i = (o) => n({
    ...t,
    path: [...e(t.path), ...e(o)]
  });
  return i.toString = function() {
    return n(t);
  }, i.combine = function(o) {
    return J({
      ...t,
      ...o
    });
  }, i.scope = function(o) {
    return J({
      ...t,
      path: [...e(t.path), ...e(o)]
    });
  }, i;
}
const Xe = /^([\w-]+):(0|[1-9][0-9]{0,8})$/, Qe = /^([\w-]+):([0-9]+),([0-9]+)$/, Je = /^([\w-]+):([\w-]+)$/;
function Ze(t) {
  let e = [];
  for (let n of t.split(".")) {
    let i = Xe.exec(n);
    if (i) {
      e.push(i[1], Number(i[2]));
      continue;
    }
    let o = Qe.exec(n);
    if (o) {
      e.push(o[1], [Number(o[2]), Number(o[3])]);
      continue;
    }
    let s = Je.exec(n);
    if (s) {
      e.push(s[1], { _key: s[2] });
      continue;
    }
    e.push(n);
  }
  return e;
}
const Rt = /* @__PURE__ */ Ut(/* @__PURE__ */ P(), /* @__PURE__ */ ot(1)), tr = /* @__PURE__ */ st({
  origin: Rt,
  href: Rt,
  data: /* @__PURE__ */ ut(/* @__PURE__ */ xt(/* @__PURE__ */ P(), /* @__PURE__ */ Nt()))
});
function er(t) {
  let e = t.split(";").reduce((n, i) => {
    let [o, s] = i.split("=");
    if (!o || i.includes("=") && !s) return n;
    switch (o) {
      case "id":
        n.id = s;
        break;
      case "type":
        n.type = s;
        break;
      case "path":
        n.path = H.toString(Ze(s));
        break;
      case "base":
        n.baseUrl = decodeURIComponent(s);
        break;
      case "perspective":
        n.perspective = s;
        break;
      case "tool":
        n.tool = s;
        break;
      case "workspace":
        n.workspace = s;
        break;
      case "projectId":
        n.projectId = s;
        break;
      case "dataset":
        n.dataset = s;
    }
    return n;
  }, {});
  if (Mt(e)) return e;
}
function St(t) {
  let e = t.indexOf("/intent/edit/");
  if (e !== -1) try {
    let n = t.slice(e + 13), i = n.indexOf("?"), o = i === -1 ? n : n.slice(0, i), s = {};
    for (let d of o.split(";")) {
      let h = d.indexOf("=");
      if (h === -1) continue;
      let p = d.slice(0, h);
      (p === "id" || p === "type" || p === "path" || p === "tool") && (s[p] = decodeURIComponent(d.slice(h + 1)));
    }
    i !== -1 && Object.assign(s, Object.fromEntries(new URLSearchParams(n.slice(i + 1)))), s.baseUrl ??= t.slice(0, e) || "/";
    let a = /* @__PURE__ */ Q(L, s);
    return a.success ? a.output : void 0;
  } catch {
    return;
  }
}
function It(t) {
  let e = /* @__PURE__ */ Q(L, t);
  if (e.success) return e.output;
  let n = /* @__PURE__ */ Q(tr, t);
  if (n.success) {
    let { href: i } = n.output;
    try {
      let o = new URL(i, typeof document > "u" ? "https://example.com" : location.origin);
      return o.searchParams.size > 0 ? ze(L, Object.fromEntries(o.searchParams.entries())) : St(i) ?? n.output;
    } catch (o) {
      return St(i) || (console.error("Failed to parse sanity node", o), n.output);
    }
  }
}
function fr(t) {
  if (typeof t == "object" && t) return It(t);
  try {
    return It(JSON.parse(t));
  } catch {
    return er(t);
  }
}
function rr(t = {}) {
  const e = new AbortController();
  return import("./renderVisualEditing-Cg6kXRTo.js").then((n) => n.r).then(({
    renderVisualEditing: n
  }) => {
    const {
      signal: i
    } = e;
    i.aborted || n(i, t);
  }), () => {
    e.abort();
  };
}
const Z = {
  projectId: "uj669d76",
  dataset: "production",
  baseUrl: "http://127.0.0.1:3333"
}, nr = de({
  projectId: Z.projectId,
  dataset: Z.dataset
});
function cr({ id: t, type: e = "project", path: n }) {
  return J({ ...Z, id: t, type: e, path: n }).toString();
}
function lr(t, { width: e, height: n } = {}) {
  if (!t?.asset) return "";
  let i = nr.image(t).auto("format").fit("crop");
  return e && (i = i.width(e)), n && (i = i.height(n)), i.url();
}
function pr() {
  return rr();
}
export {
  ar as R,
  nt as a,
  $t as b,
  or as c,
  fr as d,
  ye as e,
  ir as f,
  sr as g,
  ur as h,
  cr as i,
  lr as j,
  pr as k,
  Fe as p,
  je as r,
  H as s
};
//# sourceMappingURL=client-DwnNz60k.js.map
