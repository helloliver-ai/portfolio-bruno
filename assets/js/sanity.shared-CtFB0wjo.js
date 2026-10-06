const E = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
function R(r) {
  const [, t, i, o] = r.split("-");
  if (!t || !i || !o)
    throw new Error(`Malformed asset _ref '${r}'. Expected an id like "${E}".`);
  const [n, e] = i.split("x"), s = +n, h = +e;
  if (!(isFinite(s) && isFinite(h)))
    throw new Error(`Malformed asset _ref '${r}'. Expected an id like "${E}".`);
  return { id: t, width: s, height: h, format: o };
}
const N = (r) => {
  const t = r;
  return t ? typeof t._ref == "string" : !1;
}, T = (r) => {
  const t = r;
  return t ? typeof t._id == "string" : !1;
}, H = (r) => {
  const t = r;
  return t && t.asset ? typeof t.asset.url == "string" : !1;
}, L = (r) => {
  if (typeof r == "object" && r !== null) {
    const t = r;
    return t._upload && (!t.asset || !t.asset._ref);
  }
  return !1;
};
function V(r) {
  if (!r)
    return null;
  let t;
  if (typeof r == "string" && D(r))
    t = {
      asset: { _ref: v(r) }
    };
  else if (typeof r == "string")
    t = {
      asset: { _ref: r }
    };
  else if (N(r))
    t = {
      asset: r
    };
  else if (T(r))
    t = {
      asset: {
        _ref: r._id || ""
      }
    };
  else if (H(r))
    t = {
      asset: {
        _ref: v(r.asset.url)
      }
    };
  else if (typeof r.asset == "object")
    t = { ...r };
  else
    return null;
  const i = r;
  return i.crop && (t.crop = i.crop), i.hotspot && (t.hotspot = i.hotspot), F(t);
}
function D(r) {
  return /^https?:\/\//.test(`${r}`);
}
function v(r) {
  return `image-${r.split("/").slice(-1)[0]}`.replace(/\.([a-z]+)$/, "-$1");
}
function F(r) {
  if (r.crop && r.hotspot)
    return r;
  const t = { ...r };
  return t.crop || (t.crop = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }), t.hotspot || (t.hotspot = {
    x: 0.5,
    y: 0.5,
    height: 1,
    width: 1
  }), t;
}
const S = [
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
function W(r) {
  let t = { ...r || {} };
  const i = t.source;
  delete t.source;
  const o = V(i);
  if (!o) {
    if (i && L(i))
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=";
    throw new Error(`Unable to resolve image URL from source (${JSON.stringify(i)})`);
  }
  const n = o.asset._ref || o.asset._id || "", e = R(n), s = Math.round(o.crop.left * e.width), h = Math.round(o.crop.top * e.height), p = {
    left: s,
    top: h,
    width: Math.round(e.width - o.crop.right * e.width - s),
    height: Math.round(e.height - o.crop.bottom * e.height - h)
  }, a = o.hotspot.height * e.height / 2, f = o.hotspot.width * e.width / 2, d = o.hotspot.x * e.width, u = o.hotspot.y * e.height, l = {
    left: d - f,
    top: u - a,
    right: d + f,
    bottom: u + a
  };
  return t.rect || t.focalPoint || t.ignoreImageParams || t.crop || (t = { ...t, ...q({ crop: p, hotspot: l }, t) }), z({ ...t, asset: e });
}
function z(r) {
  const t = (r.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, ""), i = r.vanityName ? `/${r.vanityName}` : "", o = `${r.asset.id}-${r.asset.width}x${r.asset.height}.${r.asset.format}${i}`;
  let n;
  r.mediaLibraryId ? n = `${t}/media-libraries/${r.mediaLibraryId}/images/${o}` : r.canvasId ? n = `${t}/images/canvases/${r.canvasId}/${o}` : n = `${t}/images/${r.projectId}/${r.dataset}/${o}`;
  const e = [];
  if (r.rect) {
    const { left: h, top: p, width: a, height: f } = r.rect;
    (h !== 0 || p !== 0 || f !== r.asset.height || a !== r.asset.width) && e.push(`rect=${h},${p},${a},${f}`);
  }
  r.bg && e.push(`bg=${r.bg}`), r.focalPoint && (e.push(`fp-x=${r.focalPoint.x}`), e.push(`fp-y=${r.focalPoint.y}`));
  const s = [r.flipHorizontal && "h", r.flipVertical && "v"].filter(Boolean).join("");
  return s && e.push(`flip=${s}`), S.forEach((h) => {
    const [p, a] = h;
    typeof r[p] < "u" ? e.push(`${a}=${encodeURIComponent(r[p])}`) : typeof r[a] < "u" && e.push(`${a}=${encodeURIComponent(r[a])}`);
  }), e.length === 0 ? n : `${n}?${e.join("&")}`;
}
function q(r, t) {
  let i;
  const o = t.width, n = t.height;
  if (!(o && n))
    return { width: o, height: n, rect: r.crop };
  const e = r.crop, s = r.hotspot, h = o / n;
  if (e.width / e.height > h) {
    const p = Math.round(e.height), a = Math.round(p * h), f = Math.max(0, Math.round(e.top)), d = Math.round((s.right - s.left) / 2 + s.left);
    let u = Math.max(0, Math.round(d - a / 2));
    u < e.left ? u = e.left : u + a > e.left + e.width && (u = e.left + e.width - a), i = { left: u, top: f, width: a, height: p };
  } else {
    const p = e.width, a = Math.round(p / h), f = Math.max(0, Math.round(e.left)), d = Math.round((s.bottom - s.top) / 2 + s.top);
    let u = Math.max(0, Math.round(d - a / 2));
    u < e.top ? u = e.top : u + a > e.top + e.height && (u = e.top + e.height - a), i = { left: f, top: u, width: p, height: a };
  }
  return {
    width: o,
    height: n,
    rect: i
  };
}
const K = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"], Q = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"], B = ["format"];
function X(r) {
  return r && "config" in r ? typeof r.config == "function" : !1;
}
function Y(r) {
  return r && "clientConfig" in r ? typeof r.clientConfig == "object" : !1;
}
function x(r) {
  const { apiHost: t, projectId: i, dataset: o } = r, n = {
    baseUrl: (t || "https://api.sanity.io").replace(/^https:\/\/api\./, "https://cdn.")
  }, e = r.resource ?? r["~experimental_resource"];
  if (e?.type === "media-library") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Media library clients must include an id in "resource"');
    return { ...n, mediaLibraryId: e.id };
  }
  if (e?.type === "canvas") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Canvas clients must include an id in "resource"');
    return { ...n, canvasId: e.id };
  }
  if (e?.type === "dataset") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Dataset clients must include an id in "resource"');
    const [s, h] = e.id.split(".");
    if (!s || !h)
      throw new Error(
        'Dataset resource id must be in the format "projectId.dataset", got: ' + e.id
      );
    return { ...n, projectId: s, dataset: h };
  }
  return { ...n, projectId: i, dataset: o };
}
function J(r) {
  const t = S;
  for (const i of t) {
    const [o, n] = i;
    if (r === o || r === n)
      return o;
  }
  return r;
}
function j(r) {
  let t = {};
  return X(r) ? t = x(r.config()) : Y(r) ? t = x(r.clientConfig) : t = r || {}, t;
}
function G(r, t) {
  const i = j(t);
  return new r(null, i);
}
function dt(r) {
  return G(m, r);
}
function Z(r, t) {
  const i = t.baseUrl || r.baseUrl, o = { baseUrl: i };
  for (const n in t)
    if (t.hasOwnProperty(n)) {
      const e = J(n);
      o[e] = t[n];
    }
  return { baseUrl: i, ...o };
}
class m {
  options;
  constructor(t, i) {
    this.options = t ? { ...t.options || {}, ...i || {} } : { ...i || {} };
  }
  withOptions(t) {
    const i = Z(this.options, t);
    return new m(this, i);
  }
  // The image to be represented. Accepts a Sanity 'image'-document, 'asset'-document or
  // _id of asset. To get the benefit of automatic hot-spot/crop integration with the content
  // studio, the 'image'-document must be provided.
  image(t) {
    return this.withOptions({ source: t });
  }
  // Specify the dataset
  dataset(t) {
    return this.withOptions({ dataset: t });
  }
  // Specify the projectId
  projectId(t) {
    return this.withOptions({ projectId: t });
  }
  withClient(t) {
    const i = j(t), o = { ...this.options };
    return delete o.baseUrl, delete o.projectId, delete o.dataset, delete o.mediaLibraryId, delete o.canvasId, new m(null, { ...i, ...o });
  }
  // Specify background color
  bg(t) {
    return this.withOptions({ bg: t });
  }
  // Set DPR scaling factor
  dpr(t) {
    return this.withOptions(t && t !== 1 ? { dpr: t } : {});
  }
  // Specify the width of the image in pixels
  width(t) {
    return this.withOptions({ width: t });
  }
  // Specify the height of the image in pixels
  height(t) {
    return this.withOptions({ height: t });
  }
  // Specify focal point in fraction of image dimensions. Each component 0.0-1.0
  focalPoint(t, i) {
    return this.withOptions({ focalPoint: { x: t, y: i } });
  }
  maxWidth(t) {
    return this.withOptions({ maxWidth: t });
  }
  minWidth(t) {
    return this.withOptions({ minWidth: t });
  }
  maxHeight(t) {
    return this.withOptions({ maxHeight: t });
  }
  minHeight(t) {
    return this.withOptions({ minHeight: t });
  }
  // Specify width and height in pixels
  size(t, i) {
    return this.withOptions({ width: t, height: i });
  }
  // Specify blur between 0 and 100
  blur(t) {
    return this.withOptions({ blur: t });
  }
  sharpen(t) {
    return this.withOptions({ sharpen: t });
  }
  // Specify the desired rectangle of the image
  rect(t, i, o, n) {
    return this.withOptions({ rect: { left: t, top: i, width: o, height: n } });
  }
  // Specify the image format of the image. 'jpg', 'pjpg', 'png', 'webp'
  format(t) {
    return this.withOptions({ format: t });
  }
  invert(t) {
    return this.withOptions({ invert: t });
  }
  // Rotation in degrees 0, 90, 180, 270
  orientation(t) {
    return this.withOptions({ orientation: t });
  }
  // Compression quality 0-100
  quality(t) {
    return this.withOptions({ quality: t });
  }
  // Make it a download link. Parameter is default filename.
  forceDownload(t) {
    return this.withOptions({ download: t });
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
  fit(t) {
    if (K.indexOf(t) === -1)
      throw new Error(`Invalid fit mode "${t}"`);
    return this.withOptions({ fit: t });
  }
  crop(t) {
    if (Q.indexOf(t) === -1)
      throw new Error(`Invalid crop mode "${t}"`);
    return this.withOptions({ crop: t });
  }
  // Saturation
  saturation(t) {
    return this.withOptions({ saturation: t });
  }
  auto(t) {
    if (B.indexOf(t) === -1)
      throw new Error(`Invalid auto mode "${t}"`);
    return this.withOptions({ auto: t });
  }
  // Specify the number of pixels to pad the image
  pad(t) {
    return this.withOptions({ pad: t });
  }
  // Vanity URL for more SEO friendly URLs
  vanityName(t) {
    return this.withOptions({ vanityName: t });
  }
  frame(t) {
    if (t !== 1)
      throw new Error(`Invalid frame value "${t}"`);
    return this.withOptions({ frame: t });
  }
  // Gets the url based on the submitted parameters
  url() {
    return W(this.options);
  }
  // Alias for url()
  toString() {
    return this.url();
  }
}
const tt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, b = /_key\s*==\s*['"](.*)['"]/, rt = /^\d*:\d*$/;
function O(r) {
  return typeof r == "number" || typeof r == "string" && /^\[\d+\]$/.test(r);
}
function g(r) {
  return typeof r == "string" ? b.test(r.trim()) : typeof r == "object" && "_key" in r;
}
function P(r) {
  if (typeof r == "string" && rt.test(r))
    return !0;
  if (!Array.isArray(r) || r.length !== 2)
    return !1;
  const [t, i] = r;
  return (typeof t == "number" || t === "") && (typeof i == "number" || i === "");
}
function et(r, t, i) {
  const o = typeof t == "string" ? U(t) : t;
  if (!Array.isArray(o))
    throw new Error("Path must be an array or a string");
  let n = r;
  for (let e = 0; e < o.length; e++) {
    const s = o[e];
    if (O(s)) {
      if (!Array.isArray(n))
        return i;
      n = n[s];
    }
    if (g(s)) {
      if (!Array.isArray(n))
        return i;
      n = n.find((h) => h._key === s._key);
    }
    if (typeof s == "string" && (n = typeof n == "object" && n !== null ? n[s] : void 0), typeof n > "u")
      return i;
  }
  return n;
}
function k(r) {
  if (!Array.isArray(r))
    throw new Error("Path is not an array");
  return r.reduce((t, i, o) => {
    const n = typeof i;
    if (n === "number")
      return `${t}[${i}]`;
    if (n === "string")
      return `${t}${o === 0 ? "" : "."}${i}`;
    if (g(i) && i._key)
      return `${t}[_key=="${i._key}"]`;
    if (Array.isArray(i)) {
      const [e, s] = i;
      return `${t}[${e}:${s}]`;
    }
    throw new Error(`Unsupported path segment \`${JSON.stringify(i)}\``);
  }, "");
}
function U(r) {
  if (typeof r != "string")
    throw new Error("Path is not a string");
  const t = r.match(tt);
  if (!t)
    throw new Error("Invalid path string");
  return t.map(it);
}
function it(r) {
  return O(r) ? ot(r) : g(r) ? nt(r) : P(r) ? st(r) : r;
}
function ot(r) {
  return Number(r.replace(/[^\d]/g, ""));
}
function nt(r) {
  return { _key: r.match(b)[1] };
}
function st(r) {
  const [t, i] = r.split(":").map((o) => o === "" ? o : Number(o));
  return [t, i];
}
var lt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromString: U,
  get: et,
  isIndexSegment: O,
  isIndexTuple: P,
  isKeySegment: g,
  reKeySegment: b,
  toString: k
});
const at = "drafts", ht = "versions", y = `${at}.`, M = `${ht}.`;
function I(r) {
  return r.startsWith(y);
}
function w(r) {
  return r.startsWith(M);
}
function ut(r) {
  return !I(r) && !w(r);
}
function ct(r) {
  if (w(r)) {
    const t = A(r);
    return y + t;
  }
  return I(r) ? r : y + r;
}
function wt(r, t) {
  if (t === "drafts" || t === "published")
    throw new Error('Version can not be "published" or "drafts"');
  return `${M}${t}.${A(r)}`;
}
function pt(r) {
  if (!w(r)) return;
  const [t, i] = r.split(".");
  return i;
}
function A(r) {
  return w(r) ? r.split(".").slice(2).join(".") : I(r) ? r.slice(y.length) : r;
}
function ft(r) {
  return r.map((t) => {
    if (typeof t == "string" || typeof t == "number")
      return t;
    if (t._key !== "")
      return { _key: t._key };
    if (t._index !== -1)
      return t._index;
    throw new Error(`invalid segment:${JSON.stringify(t)}`);
  });
}
function mt(r) {
  const {
    baseUrl: t,
    workspace: i = "default",
    tool: o = "default",
    id: n,
    type: e,
    path: s,
    projectId: h,
    dataset: p
  } = r;
  if (!t)
    throw new Error("baseUrl is required");
  if (!s)
    throw new Error("path is required");
  if (!n)
    throw new Error("id is required");
  if (t !== "/" && t.endsWith("/"))
    throw new Error("baseUrl must not end with a slash");
  const a = i === "default" ? void 0 : i, f = o === "default" ? void 0 : o, d = A(n), u = Array.isArray(s) ? k(ft(s)) : s, l = new URLSearchParams({
    baseUrl: t,
    id: d,
    type: e,
    path: u
  });
  if (a && l.set("workspace", a), f && l.set("tool", f), h && l.set("projectId", h), p && l.set("dataset", p), ut(n))
    l.set("perspective", "published");
  else if (w(n)) {
    const C = pt(n);
    l.set("perspective", C);
  }
  const $ = [t === "/" ? "" : t];
  a && $.push(a);
  const _ = [
    "mode=presentation",
    `id=${d}`,
    `type=${e}`,
    `path=${encodeURIComponent(u)}`
  ];
  return f && _.push(`tool=${f}`), $.push("intent", "edit", `${_.join(";")}?${l}`), $.join("/");
}
const yt = {
  projectId: "uj669d76",
  dataset: "production",
  apiVersion: "2026-10-01"
}, c = "{..., asset->{_id, url, metadata{dimensions}}}", gt = `*[_type == "project"]|order(workOrder asc){
  _id,
  _type,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  workOrder,
  thumbnail{..., image${c}},
  cover{..., image${c}}
}`, $t = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  _rev,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  heroLayout,
  cover{..., image${c}},
  credits[]{_key, label, value},
  workOrder,
  contentBlocks[]{
    _key,
    _type,
    placement,
    layout,
    size,
    vimeoUrl,
    autoplay,
    loop,
    muted,
    content,
    media{..., image${c}},
    left{
      kind,
      text,
      image{..., image${c}},
      vimeo
    },
    right{
      kind,
      text,
      image{..., image${c}},
      vimeo
    }
  }
}`;
export {
  yt as a,
  wt as b,
  dt as c,
  pt as d,
  ct as e,
  w as f,
  A as g,
  gt as h,
  I as i,
  mt as j,
  $t as p,
  lt as s
};
//# sourceMappingURL=sanity.shared-CtFB0wjo.js.map
