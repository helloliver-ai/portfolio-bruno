const v = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
function R(r) {
  const [, t, i, n] = r.split("-");
  if (!t || !i || !n)
    throw new Error(`Malformed asset _ref '${r}'. Expected an id like "${v}".`);
  const [o, e] = i.split("x"), s = +o, h = +e;
  if (!(isFinite(s) && isFinite(h)))
    throw new Error(`Malformed asset _ref '${r}'. Expected an id like "${v}".`);
  return { id: t, width: s, height: h, format: n };
}
const N = (r) => {
  const t = r;
  return t ? typeof t._ref == "string" : !1;
}, H = (r) => {
  const t = r;
  return t ? typeof t._id == "string" : !1;
}, T = (r) => {
  const t = r;
  return t && t.asset ? typeof t.asset.url == "string" : !1;
}, D = (r) => {
  if (typeof r == "object" && r !== null) {
    const t = r;
    return t._upload && (!t.asset || !t.asset._ref);
  }
  return !1;
};
function L(r) {
  if (!r)
    return null;
  let t;
  if (typeof r == "string" && V(r))
    t = {
      asset: { _ref: E(r) }
    };
  else if (typeof r == "string")
    t = {
      asset: { _ref: r }
    };
  else if (N(r))
    t = {
      asset: r
    };
  else if (H(r))
    t = {
      asset: {
        _ref: r._id || ""
      }
    };
  else if (T(r))
    t = {
      asset: {
        _ref: E(r.asset.url)
      }
    };
  else if (typeof r.asset == "object")
    t = { ...r };
  else
    return null;
  const i = r;
  return i.crop && (t.crop = i.crop), i.hotspot && (t.hotspot = i.hotspot), F(t);
}
function V(r) {
  return /^https?:\/\//.test(`${r}`);
}
function E(r) {
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
const P = [
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
  const n = L(i);
  if (!n) {
    if (i && D(i))
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=";
    throw new Error(`Unable to resolve image URL from source (${JSON.stringify(i)})`);
  }
  const o = n.asset._ref || n.asset._id || "", e = R(o), s = Math.round(n.crop.left * e.width), h = Math.round(n.crop.top * e.height), p = {
    left: s,
    top: h,
    width: Math.round(e.width - n.crop.right * e.width - s),
    height: Math.round(e.height - n.crop.bottom * e.height - h)
  }, a = n.hotspot.height * e.height / 2, f = n.hotspot.width * e.width / 2, d = n.hotspot.x * e.width, u = n.hotspot.y * e.height, c = {
    left: d - f,
    top: u - a,
    right: d + f,
    bottom: u + a
  };
  return t.rect || t.focalPoint || t.ignoreImageParams || t.crop || (t = { ...t, ...Q({ crop: p, hotspot: c }, t) }), z({ ...t, asset: e });
}
function z(r) {
  const t = (r.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, ""), i = r.vanityName ? `/${r.vanityName}` : "", n = `${r.asset.id}-${r.asset.width}x${r.asset.height}.${r.asset.format}${i}`;
  let o;
  r.mediaLibraryId ? o = `${t}/media-libraries/${r.mediaLibraryId}/images/${n}` : r.canvasId ? o = `${t}/images/canvases/${r.canvasId}/${n}` : o = `${t}/images/${r.projectId}/${r.dataset}/${n}`;
  const e = [];
  if (r.rect) {
    const { left: h, top: p, width: a, height: f } = r.rect;
    (h !== 0 || p !== 0 || f !== r.asset.height || a !== r.asset.width) && e.push(`rect=${h},${p},${a},${f}`);
  }
  r.bg && e.push(`bg=${r.bg}`), r.focalPoint && (e.push(`fp-x=${r.focalPoint.x}`), e.push(`fp-y=${r.focalPoint.y}`));
  const s = [r.flipHorizontal && "h", r.flipVertical && "v"].filter(Boolean).join("");
  return s && e.push(`flip=${s}`), P.forEach((h) => {
    const [p, a] = h;
    typeof r[p] < "u" ? e.push(`${a}=${encodeURIComponent(r[p])}`) : typeof r[a] < "u" && e.push(`${a}=${encodeURIComponent(r[a])}`);
  }), e.length === 0 ? o : `${o}?${e.join("&")}`;
}
function Q(r, t) {
  let i;
  const n = t.width, o = t.height;
  if (!(n && o))
    return { width: n, height: o, rect: r.crop };
  const e = r.crop, s = r.hotspot, h = n / o;
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
    width: n,
    height: o,
    rect: i
  };
}
const q = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"], K = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"], B = ["format"];
function X(r) {
  return r && "config" in r ? typeof r.config == "function" : !1;
}
function Y(r) {
  return r && "clientConfig" in r ? typeof r.clientConfig == "object" : !1;
}
function x(r) {
  const { apiHost: t, projectId: i, dataset: n } = r, o = {
    baseUrl: (t || "https://api.sanity.io").replace(/^https:\/\/api\./, "https://cdn.")
  }, e = r.resource ?? r["~experimental_resource"];
  if (e?.type === "media-library") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Media library clients must include an id in "resource"');
    return { ...o, mediaLibraryId: e.id };
  }
  if (e?.type === "canvas") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Canvas clients must include an id in "resource"');
    return { ...o, canvasId: e.id };
  }
  if (e?.type === "dataset") {
    if (typeof e.id != "string" || e.id.length === 0)
      throw new Error('Dataset clients must include an id in "resource"');
    const [s, h] = e.id.split(".");
    if (!s || !h)
      throw new Error(
        'Dataset resource id must be in the format "projectId.dataset", got: ' + e.id
      );
    return { ...o, projectId: s, dataset: h };
  }
  return { ...o, projectId: i, dataset: n };
}
function J(r) {
  const t = P;
  for (const i of t) {
    const [n, o] = i;
    if (r === n || r === o)
      return n;
  }
  return r;
}
function S(r) {
  let t = {};
  return X(r) ? t = x(r.config()) : Y(r) ? t = x(r.clientConfig) : t = r || {}, t;
}
function G(r, t) {
  const i = S(t);
  return new r(null, i);
}
function dt(r) {
  return G(y, r);
}
function Z(r, t) {
  const i = t.baseUrl || r.baseUrl, n = { baseUrl: i };
  for (const o in t)
    if (t.hasOwnProperty(o)) {
      const e = J(o);
      n[e] = t[o];
    }
  return { baseUrl: i, ...n };
}
class y {
  options;
  constructor(t, i) {
    this.options = t ? { ...t.options || {}, ...i || {} } : { ...i || {} };
  }
  withOptions(t) {
    const i = Z(this.options, t);
    return new y(this, i);
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
    const i = S(t), n = { ...this.options };
    return delete n.baseUrl, delete n.projectId, delete n.dataset, delete n.mediaLibraryId, delete n.canvasId, new y(null, { ...i, ...n });
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
  rect(t, i, n, o) {
    return this.withOptions({ rect: { left: t, top: i, width: n, height: o } });
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
    if (q.indexOf(t) === -1)
      throw new Error(`Invalid fit mode "${t}"`);
    return this.withOptions({ fit: t });
  }
  crop(t) {
    if (K.indexOf(t) === -1)
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
function I(r) {
  return typeof r == "number" || typeof r == "string" && /^\[\d+\]$/.test(r);
}
function g(r) {
  return typeof r == "string" ? b.test(r.trim()) : typeof r == "object" && "_key" in r;
}
function j(r) {
  if (typeof r == "string" && rt.test(r))
    return !0;
  if (!Array.isArray(r) || r.length !== 2)
    return !1;
  const [t, i] = r;
  return (typeof t == "number" || t === "") && (typeof i == "number" || i === "");
}
function et(r, t, i) {
  const n = typeof t == "string" ? U(t) : t;
  if (!Array.isArray(n))
    throw new Error("Path must be an array or a string");
  let o = r;
  for (let e = 0; e < n.length; e++) {
    const s = n[e];
    if (I(s)) {
      if (!Array.isArray(o))
        return i;
      o = o[s];
    }
    if (g(s)) {
      if (!Array.isArray(o))
        return i;
      o = o.find((h) => h._key === s._key);
    }
    if (typeof s == "string" && (o = typeof o == "object" && o !== null ? o[s] : void 0), typeof o > "u")
      return i;
  }
  return o;
}
function k(r) {
  if (!Array.isArray(r))
    throw new Error("Path is not an array");
  return r.reduce((t, i, n) => {
    const o = typeof i;
    if (o === "number")
      return `${t}[${i}]`;
    if (o === "string")
      return `${t}${n === 0 ? "" : "."}${i}`;
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
  return I(r) ? nt(r) : g(r) ? ot(r) : j(r) ? st(r) : r;
}
function nt(r) {
  return Number(r.replace(/[^\d]/g, ""));
}
function ot(r) {
  return { _key: r.match(b)[1] };
}
function st(r) {
  const [t, i] = r.split(":").map((n) => n === "" ? n : Number(n));
  return [t, i];
}
var ct = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromString: U,
  get: et,
  isIndexSegment: I,
  isIndexTuple: j,
  isKeySegment: g,
  reKeySegment: b,
  toString: k
});
const at = "drafts", ht = "versions", m = `${at}.`, M = `${ht}.`;
function O(r) {
  return r.startsWith(m);
}
function w(r) {
  return r.startsWith(M);
}
function ut(r) {
  return !O(r) && !w(r);
}
function lt(r) {
  if (w(r)) {
    const t = _(r);
    return m + t;
  }
  return O(r) ? r : m + r;
}
function wt(r, t) {
  if (t === "drafts" || t === "published")
    throw new Error('Version can not be "published" or "drafts"');
  return `${M}${t}.${_(r)}`;
}
function pt(r) {
  if (!w(r)) return;
  const [t, i] = r.split(".");
  return i;
}
function _(r) {
  return w(r) ? r.split(".").slice(2).join(".") : O(r) ? r.slice(m.length) : r;
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
function yt(r) {
  const {
    baseUrl: t,
    workspace: i = "default",
    tool: n = "default",
    id: o,
    type: e,
    path: s,
    projectId: h,
    dataset: p
  } = r;
  if (!t)
    throw new Error("baseUrl is required");
  if (!s)
    throw new Error("path is required");
  if (!o)
    throw new Error("id is required");
  if (t !== "/" && t.endsWith("/"))
    throw new Error("baseUrl must not end with a slash");
  const a = i === "default" ? void 0 : i, f = n === "default" ? void 0 : n, d = _(o), u = Array.isArray(s) ? k(ft(s)) : s, c = new URLSearchParams({
    baseUrl: t,
    id: d,
    type: e,
    path: u
  });
  if (a && c.set("workspace", a), f && c.set("tool", f), h && c.set("projectId", h), p && c.set("dataset", p), ut(o))
    c.set("perspective", "published");
  else if (w(o)) {
    const C = pt(o);
    c.set("perspective", C);
  }
  const $ = [t === "/" ? "" : t];
  a && $.push(a);
  const A = [
    "mode=presentation",
    `id=${d}`,
    `type=${e}`,
    `path=${encodeURIComponent(u)}`
  ];
  return f && A.push(`tool=${f}`), $.push("intent", "edit", `${A.join(";")}?${c}`), $.join("/");
}
const mt = {
  projectId: "uj669d76",
  dataset: "production",
  apiVersion: "2026-10-01"
}, l = "{..., asset->{_id, url, metadata{dimensions}}}", gt = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  contacts, experienceHeading, educationHeading, experience, education
}`, $t = `*[_type == "project"]|order(workOrder asc){
  _id,
  _type,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  workOrder,
  thumbnail{..., image${l}},
  cover{..., image${l}}
}`, bt = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  _rev,
  title,
  client,
  "slug": slug.current,
  projectType,
  year,
  heroLayout,
  cover{..., image${l}},
  credits[]{_key, label, value, style},
  creditsPt[]{_key, label, value, style},
  creditsEn[]{_key, label, value, style},
  seo{metaDescription, shareImage${l}},
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
    caption,
    content,
    media{..., image${l}},
    left{
      kind,
      text,
      image{..., image${l}},
      vimeo
    },
    right{
      kind,
      text,
      image{..., image${l}},
      vimeo
    }
  }
}`;
export {
  mt as a,
  wt as b,
  dt as c,
  pt as d,
  lt as e,
  w as f,
  _ as g,
  gt as h,
  O as i,
  $t as j,
  yt as k,
  bt as p,
  ct as s
};
//# sourceMappingURL=sanity.shared-CNPBVeer.js.map
