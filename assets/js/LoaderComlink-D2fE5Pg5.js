import { c as n, r as c } from "./client-DjQWvx_P.js";
import { c as i, a as l, b as p, s as o, d as r, e as a, f as s } from "./renderVisualEditing-DPDkmYUi.js";
function m() {
  const e = n.c(1);
  let t;
  return e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (t = [], e[0] = t) : t = e[0], c.useEffect(d, t), null;
}
function d() {
  const e = i({
    name: "loaders",
    connectTo: "presentation"
  }, l().provide({
    actors: p()
  }));
  e.on("loader/perspective", f);
  const t = e.start();
  return o(), () => {
    t(), o(), r(), a(), s();
  };
}
function f(e) {
  r(e.projectId, e.dataset), a(e.perspective), s(e.variant ?? null);
}
m.displayName = "LoaderComlink";
export {
  m as default
};
//# sourceMappingURL=LoaderComlink-D2fE5Pg5.js.map
