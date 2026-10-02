import { j as I, g as Gn } from "./renderVisualEditing-Cg6kXRTo.js";
import { r as un } from "./client-DwnNz60k.js";
class G {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(e, l, t) {
    this.normal = l, this.property = e, t && (this.space = t);
  }
}
G.prototype.normal = {};
G.prototype.property = {};
G.prototype.space = void 0;
function Ln(n, e) {
  const l = {}, t = {};
  for (const r of n)
    Object.assign(l, r.property), Object.assign(t, r.normal);
  return new G(l, t, e);
}
function K(n) {
  return n.toLowerCase();
}
class D {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(e, l) {
    this.attribute = l, this.property = e;
  }
}
D.prototype.attribute = "";
D.prototype.booleanish = !1;
D.prototype.boolean = !1;
D.prototype.commaOrSpaceSeparated = !1;
D.prototype.commaSeparated = !1;
D.prototype.defined = !1;
D.prototype.mustUseProperty = !1;
D.prototype.number = !1;
D.prototype.overloadedBoolean = !1;
D.prototype.property = "";
D.prototype.spaceSeparated = !1;
D.prototype.space = void 0;
let Xn = 0;
const f = F(), P = F(), en = F(), i = F(), v = F(), z = F(), L = F();
function F() {
  return 2 ** ++Xn;
}
const ln = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: f,
  booleanish: P,
  commaOrSpaceSeparated: L,
  commaSeparated: z,
  number: i,
  overloadedBoolean: en,
  spaceSeparated: v
}, Symbol.toStringTag, { value: "Module" })), nn = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(ln)
);
class on extends D {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(e, l, t, r) {
    let o = -1;
    if (super(e, l), sn(this, "space", r), typeof t == "number")
      for (; ++o < nn.length; ) {
        const a = nn[o];
        sn(this, nn[o], (t & ln[a]) === ln[a]);
      }
  }
}
on.prototype.defined = !0;
function sn(n, e, l) {
  l && (n[e] = l);
}
function $(n) {
  const e = {}, l = {};
  for (const [t, r] of Object.entries(n.properties)) {
    const o = new on(
      t,
      n.transform(n.attributes || {}, t),
      r,
      n.space
    );
    n.mustUseProperty && n.mustUseProperty.includes(t) && (o.mustUseProperty = !0), e[t] = o, l[K(t)] = t, l[K(o.attribute)] = t;
  }
  return new G(e, l, n.space);
}
const Rn = $({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: P,
    ariaAutoComplete: null,
    ariaBusy: P,
    ariaChecked: P,
    ariaColCount: i,
    ariaColIndex: i,
    ariaColSpan: i,
    ariaControls: v,
    ariaCurrent: null,
    ariaDescribedBy: v,
    ariaDetails: null,
    ariaDisabled: P,
    ariaDropEffect: v,
    ariaErrorMessage: null,
    ariaExpanded: P,
    ariaFlowTo: v,
    ariaGrabbed: P,
    ariaHasPopup: null,
    ariaHidden: P,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: v,
    ariaLevel: i,
    ariaLive: null,
    ariaModal: P,
    ariaMultiLine: P,
    ariaMultiSelectable: P,
    ariaOrientation: null,
    ariaOwns: v,
    ariaPlaceholder: null,
    ariaPosInSet: i,
    ariaPressed: P,
    ariaReadOnly: P,
    ariaRelevant: null,
    ariaRequired: P,
    ariaRoleDescription: v,
    ariaRowCount: i,
    ariaRowIndex: i,
    ariaRowSpan: i,
    ariaSelected: P,
    ariaSetSize: i,
    ariaSort: null,
    ariaValueMax: i,
    ariaValueMin: i,
    ariaValueNow: i,
    ariaValueText: null,
    role: null
  },
  transform(n, e) {
    return e === "role" ? e : "aria-" + e.slice(4).toLowerCase();
  }
});
function Nn(n, e) {
  return e in n ? n[e] : e;
}
function Tn(n, e) {
  return Nn(n, e.toLowerCase());
}
const Yn = $({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: z,
    acceptCharset: v,
    accessKey: v,
    action: null,
    allow: null,
    allowFullScreen: f,
    allowPaymentRequest: f,
    allowUserMedia: f,
    alpha: f,
    alt: null,
    as: null,
    async: f,
    autoCapitalize: null,
    autoComplete: v,
    autoFocus: f,
    autoPlay: f,
    blocking: v,
    capture: null,
    charSet: null,
    checked: f,
    cite: null,
    className: v,
    closedBy: null,
    colorSpace: null,
    cols: i,
    colSpan: i,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: P,
    controls: f,
    controlsList: v,
    coords: i | z,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: f,
    defer: f,
    dir: null,
    dirName: null,
    disabled: f,
    download: en,
    draggable: P,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: f,
    formTarget: null,
    headers: v,
    height: i,
    hidden: en,
    high: i,
    href: null,
    hrefLang: null,
    htmlFor: v,
    httpEquiv: v,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: f,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: f,
    itemId: null,
    itemProp: v,
    itemRef: v,
    itemScope: f,
    itemType: v,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: f,
    low: i,
    manifest: null,
    max: null,
    maxLength: i,
    media: null,
    method: null,
    min: null,
    minLength: i,
    multiple: f,
    muted: f,
    name: null,
    nonce: null,
    noModule: f,
    noValidate: f,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: f,
    optimum: i,
    pattern: null,
    ping: v,
    placeholder: null,
    playsInline: f,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: f,
    referrerPolicy: null,
    rel: v,
    required: f,
    reversed: f,
    rows: i,
    rowSpan: i,
    sandbox: v,
    scope: null,
    scoped: f,
    seamless: f,
    selected: f,
    shadowRootClonable: f,
    shadowRootCustomElementRegistry: f,
    shadowRootDelegatesFocus: f,
    shadowRootMode: null,
    shadowRootSerializable: f,
    shape: null,
    size: i,
    sizes: null,
    slot: null,
    span: i,
    spellCheck: P,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: i,
    step: null,
    style: null,
    tabIndex: i,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: f,
    useMap: null,
    value: P,
    width: i,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: v,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: i,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: i,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: f,
    // Lists. Use CSS to reduce space between items instead
    declare: f,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: i,
    // `<img>` and `<object>`
    leftMargin: i,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: i,
    // `<body>`
    marginWidth: i,
    // `<body>`
    noResize: f,
    // `<frame>`
    noHref: f,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: f,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: f,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: i,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: P,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: i,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: i,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: f,
    disablePictureInPicture: f,
    disableRemotePlayback: f,
    exportParts: z,
    part: v,
    prefix: null,
    property: null,
    results: i,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Tn
}), Zn = $({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: L,
    accentHeight: i,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: i,
    amplitude: i,
    arabicForm: null,
    ascent: i,
    attributeName: null,
    attributeType: null,
    azimuth: i,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: i,
    by: null,
    calcMode: null,
    capHeight: i,
    className: v,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: i,
    diffuseConstant: i,
    direction: null,
    display: null,
    dur: null,
    divisor: i,
    dominantBaseline: null,
    download: f,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: i,
    enableBackground: null,
    end: null,
    event: null,
    exponent: i,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: i,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: z,
    g2: z,
    glyphName: z,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: i,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: i,
    horizOriginX: i,
    horizOriginY: i,
    id: null,
    ideographic: i,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: i,
    k: i,
    k1: i,
    k2: i,
    k3: i,
    k4: i,
    kernelMatrix: L,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: i,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: i,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: i,
    overlineThickness: i,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: i,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: v,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: i,
    pointsAtY: i,
    pointsAtZ: i,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: L,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: L,
    rev: L,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: L,
    requiredFeatures: L,
    requiredFonts: L,
    requiredFormats: L,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: i,
    specularExponent: i,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: i,
    strikethroughThickness: i,
    string: null,
    stroke: null,
    strokeDashArray: L,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: i,
    strokeOpacity: i,
    strokeWidth: null,
    style: null,
    surfaceScale: i,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: L,
    tabIndex: i,
    tableValues: null,
    target: null,
    targetX: i,
    targetY: i,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: L,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: i,
    underlineThickness: i,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: i,
    values: null,
    vAlphabetic: i,
    vMathematical: i,
    vectorEffect: null,
    vHanging: i,
    vIdeographic: i,
    version: null,
    vertAdvY: i,
    vertOriginX: i,
    vertOriginY: i,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: i,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Nn
}), _n = $({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(n, e) {
    return "xlink:" + e.slice(5).toLowerCase();
  }
}), jn = $({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Tn
}), In = $({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(n, e) {
    return "xml:" + e.slice(3).toLowerCase();
  }
}), Jn = /[A-Z]/g, cn = /-[a-z]/g, Qn = /^data[-\w.:]+$/i;
function ne(n, e) {
  const l = K(e);
  let t = e, r = D;
  if (l in n.normal)
    return n.property[n.normal[l]];
  if (l.length > 4 && l.slice(0, 4) === "data" && Qn.test(e)) {
    if (e.charAt(4) === "-") {
      const o = e.slice(5).replace(cn, le);
      t = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = e.slice(4);
      if (!cn.test(o)) {
        let a = o.replace(Jn, ee);
        a.charAt(0) !== "-" && (a = "-" + a), e = "data" + a;
      }
    }
    r = on;
  }
  return new r(t, e);
}
function ee(n) {
  return "-" + n.toLowerCase();
}
function le(n) {
  return n.charAt(1).toUpperCase();
}
const te = Ln([Rn, Yn, _n, jn, In], "html"), re = Ln([Rn, Zn, _n, jn, In], "svg");
function fn(n) {
  const e = [], l = String(n || "");
  let t = l.indexOf(","), r = 0, o = !1;
  for (; !o; ) {
    t === -1 && (t = l.length, o = !0);
    const a = l.slice(r, t).trim();
    (a || !o) && e.push(a), r = t + 1, t = l.indexOf(",", r);
  }
  return e;
}
const pn = /[#.]/g;
function oe(n, e) {
  const l = n || "", t = {};
  let r = 0, o, a;
  for (; r < l.length; ) {
    pn.lastIndex = r;
    const u = pn.exec(l), s = l.slice(r, u ? u.index : l.length);
    s && (o ? o === "#" ? t.id = s : Array.isArray(t.className) ? t.className.push(s) : t.className = [s] : a = s, r += s.length), u && (o = u[0], r++);
  }
  return {
    type: "element",
    // @ts-expect-error: tag name is parsed.
    tagName: a || e || "div",
    properties: t,
    children: []
  };
}
function dn(n) {
  const e = String(n || "").trim();
  return e ? e.split(/[ \t\n\r\f]+/g) : [];
}
function Un(n, e, l) {
  const t = l ? se(l) : void 0;
  function r(o, a, ...u) {
    let s;
    if (o == null) {
      s = { type: "root", children: [] };
      const c = (
        /** @type {Child} */
        a
      );
      u.unshift(c);
    } else {
      s = oe(o, e);
      const c = s.tagName.toLowerCase(), p = t ? t.get(c) : void 0;
      if (s.tagName = p || c, ie(a))
        u.unshift(a);
      else
        for (const [d, h] of Object.entries(a))
          ae(n, s.properties, d, h);
    }
    for (const c of u)
      tn(s.children, c);
    return s.type === "element" && s.tagName === "template" && (s.content = { type: "root", children: s.children }, s.children = []), s;
  }
  return r;
}
function ie(n) {
  if (n === null || typeof n != "object" || Array.isArray(n))
    return !0;
  if (typeof n.type != "string") return !1;
  const e = (
    /** @type {Record<string, unknown>} */
    n
  ), l = Object.keys(n);
  for (const t of l) {
    const r = e[t];
    if (r && typeof r == "object") {
      if (!Array.isArray(r)) return !0;
      const o = (
        /** @type {ReadonlyArray<unknown>} */
        r
      );
      for (const a of o)
        if (typeof a != "number" && typeof a != "string")
          return !0;
    }
  }
  return !!("children" in n && Array.isArray(n.children));
}
function ae(n, e, l, t) {
  const r = ne(n, l);
  let o;
  if (t != null) {
    if (typeof t == "number") {
      if (Number.isNaN(t)) return;
      o = t;
    } else typeof t == "boolean" ? o = t : typeof t == "string" ? r.spaceSeparated ? o = dn(t) : r.commaSeparated ? o = fn(t) : r.commaOrSpaceSeparated ? o = dn(fn(t).join(" ")) : o = gn(r, r.property, t) : Array.isArray(t) ? o = [...t] : o = r.property === "style" ? ue(t) : String(t);
    if (Array.isArray(o)) {
      const a = [];
      for (const u of o)
        a.push(
          /** @type {number | string} */
          gn(r, r.property, u)
        );
      o = a;
    }
    r.property === "className" && Array.isArray(e.className) && (o = e.className.concat(
      /** @type {Array<number | string> | number | string} */
      o
    )), e[r.property] = o;
  }
}
function tn(n, e) {
  if (e != null) if (typeof e == "number" || typeof e == "string")
    n.push({ type: "text", value: String(e) });
  else if (Array.isArray(e))
    for (const l of e)
      tn(n, l);
  else if (typeof e == "object" && "type" in e)
    e.type === "root" ? tn(n, e.children) : n.push(e);
  else
    throw new Error("Expected node, nodes, or string, got `" + e + "`");
}
function gn(n, e, l) {
  if (typeof l == "string") {
    if (n.number && l && !Number.isNaN(Number(l)))
      return Number(l);
    if ((n.boolean || n.overloadedBoolean) && (l === "" || K(l) === K(e)))
      return !0;
  }
  return l;
}
function ue(n) {
  const e = [];
  for (const [l, t] of Object.entries(n))
    e.push([l, t].join(": "));
  return e.join("; ");
}
function se(n) {
  const e = /* @__PURE__ */ new Map();
  for (const l of n)
    e.set(l.toLowerCase(), l);
  return e;
}
const ce = [
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "solidColor",
  "textArea",
  "textPath"
], fe = Un(te, "div");
Un(re, "g", ce);
const pe = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], hn = {
  0: "�",
  128: "€",
  130: "‚",
  131: "ƒ",
  132: "„",
  133: "…",
  134: "†",
  135: "‡",
  136: "ˆ",
  137: "‰",
  138: "Š",
  139: "‹",
  140: "Œ",
  142: "Ž",
  145: "‘",
  146: "’",
  147: "“",
  148: "”",
  149: "•",
  150: "–",
  151: "—",
  152: "˜",
  153: "™",
  154: "š",
  155: "›",
  156: "œ",
  158: "ž",
  159: "Ÿ"
};
function zn(n) {
  const e = typeof n == "string" ? n.charCodeAt(0) : n;
  return e >= 48 && e <= 57;
}
function de(n) {
  const e = typeof n == "string" ? n.charCodeAt(0) : n;
  return e >= 97 && e <= 102 || e >= 65 && e <= 70 || e >= 48 && e <= 57;
}
function ge(n) {
  const e = typeof n == "string" ? n.charCodeAt(0) : n;
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function mn(n) {
  return ge(n) || zn(n);
}
const yn = document.createElement("i");
function bn(n) {
  const e = "&" + n + ";";
  yn.innerHTML = e;
  const l = yn.textContent;
  return l.charCodeAt(l.length - 1) === 59 && n !== "semi" || l === e ? !1 : l;
}
const he = [
  "",
  /* 1: Non terminated (named) */
  "Named character references must be terminated by a semicolon",
  /* 2: Non terminated (numeric) */
  "Numeric character references must be terminated by a semicolon",
  /* 3: Empty (named) */
  "Named character references cannot be empty",
  /* 4: Empty (numeric) */
  "Numeric character references cannot be empty",
  /* 5: Unknown (named) */
  "Named character references must be known",
  /* 6: Disallowed (numeric) */
  "Numeric character references cannot be disallowed",
  /* 7: Prohibited (numeric) */
  "Numeric character references cannot be outside the permissible Unicode range"
];
function me(n, e) {
  const l = {}, t = typeof l.additional == "string" ? l.additional.charCodeAt(0) : l.additional, r = [];
  let o = 0, a = -1, u = "", s, c;
  l.position && ("start" in l.position || "indent" in l.position ? (c = l.position.indent, s = l.position.start) : s = l.position);
  let p = (s ? s.line : 0) || 1, d = (s ? s.column : 0) || 1, h = m(), x;
  for (o--; ++o <= n.length; )
    if (x === 10 && (d = (c ? c[a] : 0) || 1), x = n.charCodeAt(o), x === 38) {
      const y = n.charCodeAt(o + 1);
      if (y === 9 || y === 10 || y === 12 || y === 32 || y === 38 || y === 60 || Number.isNaN(y) || t && y === t) {
        u += String.fromCharCode(x), d++;
        continue;
      }
      const S = o + 1;
      let E = S, b = S, R;
      if (y === 35) {
        b = ++E;
        const g = n.charCodeAt(b);
        g === 88 || g === 120 ? (R = "hexadecimal", b = ++E) : R = "decimal";
      } else
        R = "named";
      let M = "", N = "", A = "";
      const H = R === "named" ? mn : R === "decimal" ? zn : de;
      for (b--; ++b <= n.length; ) {
        const g = n.charCodeAt(b);
        if (!H(g))
          break;
        A += String.fromCharCode(g), R === "named" && pe.includes(A) && (M = A, N = bn(A));
      }
      let j = n.charCodeAt(b) === 59;
      if (j) {
        b++;
        const g = R === "named" ? bn(A) : !1;
        g && (M = A, N = g);
      }
      let T = 1 + b - S, _ = "";
      if (!(!j && l.nonTerminated === !1)) if (!A)
        R !== "named" && C(4, T);
      else if (R === "named") {
        if (j && !N)
          C(5, 1);
        else if (M !== A && (b = E + M.length, T = 1 + b - E, j = !1), !j) {
          const g = M ? 1 : 3;
          if (l.attribute) {
            const U = n.charCodeAt(b);
            U === 61 ? (C(g, T), N = "") : mn(U) ? N = "" : C(g, T);
          } else
            C(g, T);
        }
        _ = N;
      } else {
        j || C(2, T);
        let g = Number.parseInt(
          A,
          R === "hexadecimal" ? 16 : 10
        );
        if (ye(g))
          C(7, T), _ = "�";
        else if (g in hn)
          C(6, T), _ = hn[g];
        else {
          let U = "";
          be(g) && C(6, T), g > 65535 && (g -= 65536, U += String.fromCharCode(
            g >>> 10 | 55296
          ), g = 56320 | g & 1023), _ = U + String.fromCharCode(g);
        }
      }
      if (_) {
        w(), h = m(), o = b - 1, d += b - S + 1, r.push(_);
        const g = m();
        g.offset++, l.reference && l.reference.call(
          l.referenceContext || void 0,
          _,
          { start: h, end: g },
          n.slice(S - 1, b)
        ), h = g;
      } else
        A = n.slice(S - 1, b), u += A, d += A.length, o = b - 1;
    } else
      x === 10 && (p++, a++, d = 0), Number.isNaN(x) ? w() : (u += String.fromCharCode(x), d++);
  return r.join("");
  function m() {
    return {
      line: p,
      column: d,
      offset: o + ((s ? s.offset : 0) || 0)
    };
  }
  function C(y, S) {
    let E;
    l.warning && (E = m(), E.column += S, E.offset += S, l.warning.call(
      l.warningContext || void 0,
      he[y],
      E,
      y
    ));
  }
  function w() {
    u && (r.push(u), l.text && l.text.call(l.textContext || void 0, u, {
      start: h,
      end: m()
    }), u = "");
  }
}
function ye(n) {
  return n >= 55296 && n <= 57343 || n > 1114111;
}
function be(n) {
  return n >= 1 && n <= 8 || n === 11 || n >= 13 && n <= 31 || n >= 127 && n <= 159 || n >= 64976 && n <= 65007 || (n & 65535) === 65535 || (n & 65535) === 65534;
}
var xe = 0, X = {}, O = {
  /**
   * A namespace for utility methods.
   *
   * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
   * change or disappear at any time.
   *
   * @namespace
   * @memberof Prism
   */
  util: {
    /**
     * Returns the name of the type of the given value.
     *
     * @param {any} o
     * @returns {string}
     * @example
     * type(null)      === 'Null'
     * type(undefined) === 'Undefined'
     * type(123)       === 'Number'
     * type('foo')     === 'String'
     * type(true)      === 'Boolean'
     * type([1, 2])    === 'Array'
     * type({})        === 'Object'
     * type(String)    === 'Function'
     * type(/abc+/)    === 'RegExp'
     */
    type: function(n) {
      return Object.prototype.toString.call(n).slice(8, -1);
    },
    /**
     * Returns a unique number for the given object. Later calls will still return the same number.
     *
     * @param {Object} obj
     * @returns {number}
     */
    objId: function(n) {
      return n.__id || Object.defineProperty(n, "__id", { value: ++xe }), n.__id;
    },
    /**
     * Creates a deep clone of the given object.
     *
     * The main intended use of this function is to clone language definitions.
     *
     * @param {T} o
     * @param {Record<number, any>} [visited]
     * @returns {T}
     * @template T
     */
    clone: function n(e, l) {
      l = l || {};
      var t, r;
      switch (O.util.type(e)) {
        case "Object":
          if (r = O.util.objId(e), l[r])
            return l[r];
          t = /** @type {Record<string, any>} */
          {}, l[r] = t;
          for (var o in e)
            e.hasOwnProperty(o) && (t[o] = n(e[o], l));
          return (
            /** @type {any} */
            t
          );
        case "Array":
          return r = O.util.objId(e), l[r] ? l[r] : (t = [], l[r] = t, /** @type {any} */
          e.forEach(
            function(a, u) {
              t[u] = n(a, l);
            }
          ), /** @type {any} */
          t);
        default:
          return e;
      }
    }
  },
  /**
   * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
   *
   * @namespace
   * @memberof Prism
   * @public
   */
  languages: {
    /**
     * The grammar for plain, unformatted text.
     */
    plain: X,
    plaintext: X,
    text: X,
    txt: X,
    /**
     * Creates a deep copy of the language with the given id and appends the given tokens.
     *
     * If a token in `redef` also appears in the copied language, then the existing token in the copied language
     * will be overwritten at its original position.
     *
     * ## Best practices
     *
     * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
     * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
     * understand the language definition because, normally, the order of tokens matters in Prism grammars.
     *
     * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
     * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
     *
     * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
     * @param {Grammar} redef The new tokens to append.
     * @returns {Grammar} The new language created.
     * @public
     * @example
     * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
     *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
     *     // at its original position
     *     'comment': { ... },
     *     // CSS doesn't have a 'color' token, so this token will be appended
     *     'color': /\b(?:red|green|blue)\b/
     * });
     */
    extend: function(n, e) {
      var l = O.util.clone(O.languages[n]);
      for (var t in e)
        l[t] = e[t];
      return l;
    },
    /**
     * Inserts tokens _before_ another token in a language definition or any other grammar.
     *
     * ## Usage
     *
     * This helper method makes it easy to modify existing languages. For example, the CSS language definition
     * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
     * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
     * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
     * this:
     *
     * ```js
     * Prism.languages.markup.style = {
     *     // token
     * };
     * ```
     *
     * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
     * before existing tokens. For the CSS example above, you would use it like this:
     *
     * ```js
     * Prism.languages.insertBefore('markup', 'cdata', {
     *     'style': {
     *         // token
     *     }
     * });
     * ```
     *
     * ## Special cases
     *
     * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
     * will be ignored.
     *
     * This behavior can be used to insert tokens after `before`:
     *
     * ```js
     * Prism.languages.insertBefore('markup', 'comment', {
     *     'comment': Prism.languages.markup.comment,
     *     // tokens after 'comment'
     * });
     * ```
     *
     * ## Limitations
     *
     * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
     * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
     * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
     * deleting properties which is necessary to insert at arbitrary positions.
     *
     * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
     * Instead, it will create a new object and replace all references to the target object with the new one. This
     * can be done without temporarily deleting properties, so the iteration order is well-defined.
     *
     * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
     * you hold the target object in a variable, then the value of the variable will not change.
     *
     * ```js
     * var oldMarkup = Prism.languages.markup;
     * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
     *
     * assert(oldMarkup !== Prism.languages.markup);
     * assert(newMarkup === Prism.languages.markup);
     * ```
     *
     * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
     * object to be modified.
     * @param {string} before The key to insert before.
     * @param {Grammar} insert An object containing the key-value pairs to be inserted.
     * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
     * object to be modified.
     *
     * Defaults to `Prism.languages`.
     * @returns {Grammar} The new grammar object.
     * @public
     */
    insertBefore: function(n, e, l, t) {
      t = t || /** @type {any} */
      O.languages;
      var r = t[n], o = {};
      for (var a in r)
        if (r.hasOwnProperty(a)) {
          if (a == e)
            for (var u in l)
              l.hasOwnProperty(u) && (o[u] = l[u]);
          l.hasOwnProperty(a) || (o[a] = r[a]);
        }
      var s = t[n];
      return t[n] = o, O.languages.DFS(O.languages, function(c, p) {
        p === s && c != n && (this[c] = o);
      }), o;
    },
    // Traverse a language definition with Depth First Search
    DFS: function n(e, l, t, r) {
      r = r || {};
      var o = O.util.objId;
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          l.call(e, a, e[a], t || a);
          var u = e[a], s = O.util.type(u);
          s === "Object" && !r[o(u)] ? (r[o(u)] = !0, n(u, l, null, r)) : s === "Array" && !r[o(u)] && (r[o(u)] = !0, n(u, l, a, r));
        }
    }
  },
  plugins: {},
  /**
   * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
   * and the language definitions to use, and returns a string with the HTML produced.
   *
   * The following hooks will be run:
   * 1. `before-tokenize`
   * 2. `after-tokenize`
   * 3. `wrap`: On each {@link Token}.
   *
   * @param {string} text A string with the code to be highlighted.
   * @param {Grammar} grammar An object containing the tokens to use.
   *
   * Usually a language definition like `Prism.languages.markup`.
   * @param {string} language The name of the language definition passed to `grammar`.
   * @returns {string} The highlighted HTML.
   * @memberof Prism
   * @public
   * @example
   * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
   */
  highlight: function(n, e, l) {
    var t = {
      code: n,
      grammar: e,
      language: l
    };
    if (O.hooks.run("before-tokenize", t), !t.grammar)
      throw new Error('The language "' + t.language + '" has no grammar.');
    return t.tokens = O.tokenize(t.code, t.grammar), O.hooks.run("after-tokenize", t), q.stringify(O.util.encode(t.tokens), t.language);
  },
  /**
   * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
   * and the language definitions to use, and returns an array with the tokenized code.
   *
   * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
   *
   * This method could be useful in other contexts as well, as a very crude parser.
   *
   * @param {string} text A string with the code to be highlighted.
   * @param {Grammar} grammar An object containing the tokens to use.
   *
   * Usually a language definition like `Prism.languages.markup`.
   * @returns {TokenStream} An array of strings and tokens, a token stream.
   * @memberof Prism
   * @public
   * @example
   * let code = `var foo = 0;`;
   * let tokens = Prism.tokenize(code, Prism.languages.javascript);
   * tokens.forEach(token => {
   *     if (token instanceof Prism.Token && token.type === 'number') {
   *         console.log(`Found numeric literal: ${token.content}`);
   *     }
   * });
   */
  tokenize: function(n, e) {
    var l = e.rest;
    if (l) {
      for (var t in l)
        e[t] = l[t];
      delete e.rest;
    }
    var r = new ve();
    return Y(r, r.head, n), Bn(n, r, e, r.head, 0), Ce(r);
  },
  /**
   * @namespace
   * @memberof Prism
   * @public
   */
  hooks: {
    all: {},
    /**
     * Adds the given callback to the list of callbacks for the given hook.
     *
     * The callback will be invoked when the hook it is registered for is run.
     * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
     *
     * One callback function can be registered to multiple hooks and the same hook multiple times.
     *
     * @param {string} name The name of the hook.
     * @param {HookCallback} callback The callback function which is given environment variables.
     * @public
     */
    add: function(n, e) {
      var l = O.hooks.all;
      l[n] = l[n] || [], l[n].push(e);
    },
    /**
     * Runs a hook invoking all registered callbacks with the given environment variables.
     *
     * Callbacks will be invoked synchronously and in the order in which they were registered.
     *
     * @param {string} name The name of the hook.
     * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
     * @public
     */
    run: function(n, e) {
      var l = O.hooks.all[n];
      if (!(!l || !l.length))
        for (var t = 0, r; r = l[t++]; )
          r(e);
    }
  },
  Token: q
};
function q(n, e, l, t) {
  this.type = n, this.content = e, this.alias = l, this.length = (t || "").length | 0;
}
function xn(n, e, l, t) {
  n.lastIndex = e;
  var r = n.exec(l);
  if (r && t && r[1]) {
    var o = r[1].length;
    r.index += o, r[0] = r[0].slice(o);
  }
  return r;
}
function Bn(n, e, l, t, r, o) {
  for (var a in l)
    if (!(!l.hasOwnProperty(a) || !l[a])) {
      var u = l[a];
      u = Array.isArray(u) ? u : [u];
      for (var s = 0; s < u.length; ++s) {
        if (o && o.cause == a + "," + s)
          return;
        var c = u[s], p = c.inside, d = !!c.lookbehind, h = !!c.greedy, x = c.alias;
        if (h && !c.pattern.global) {
          var m = c.pattern.toString().match(/[imsuy]*$/)[0];
          c.pattern = RegExp(c.pattern.source, m + "g");
        }
        for (var C = c.pattern || c, w = t.next, y = r; w !== e.tail && !(o && y >= o.reach); y += w.value.length, w = w.next) {
          var S = w.value;
          if (e.length > n.length)
            return;
          if (!(S instanceof q)) {
            var E = 1, b;
            if (h) {
              if (b = xn(C, y, n, d), !b || b.index >= n.length)
                break;
              var A = b.index, R = b.index + b[0].length, M = y;
              for (M += w.value.length; A >= M; )
                w = w.next, M += w.value.length;
              if (M -= w.value.length, y = M, w.value instanceof q)
                continue;
              for (var N = w; N !== e.tail && (M < R || typeof N.value == "string"); N = N.next)
                E++, M += N.value.length;
              E--, S = n.slice(y, M), b.index -= y;
            } else if (b = xn(C, 0, S, d), !b)
              continue;
            var A = b.index, H = b[0], j = S.slice(0, A), T = S.slice(A + H.length), _ = y + S.length;
            o && _ > o.reach && (o.reach = _);
            var g = w.prev;
            j && (g = Y(e, g, j), y += j.length), we(e, g, E);
            var U = new q(
              a,
              p ? O.tokenize(H, p) : H,
              x,
              H
            );
            if (w = Y(e, g, U), T && Y(e, w, T), E > 1) {
              var Q = {
                cause: a + "," + s,
                reach: _
              };
              Bn(
                n,
                e,
                l,
                w.prev,
                y,
                Q
              ), o && Q.reach > o.reach && (o.reach = Q.reach);
            }
          }
        }
      }
    }
}
function ve() {
  var n = { value: null, prev: null, next: null }, e = { value: null, prev: n, next: null };
  n.next = e, this.head = n, this.tail = e, this.length = 0;
}
function Y(n, e, l) {
  var t = e.next, r = { value: l, prev: e, next: t };
  return e.next = r, t.prev = r, n.length++, r;
}
function we(n, e, l) {
  for (var t = e.next, r = 0; r < l && t !== n.tail; r++)
    t = t.next;
  e.next = t, t.prev = e, n.length -= r;
}
function Ce(n) {
  for (var e = [], l = n.head.next; l !== n.tail; )
    e.push(l.value), l = l.next;
  return e;
}
const Fn = O;
function Hn() {
}
Hn.prototype = Fn;
const k = new Hn();
k.highlight = Pe;
k.register = Se;
k.alias = Oe;
k.registered = ke;
k.listLanguages = Ae;
k.util.encode = Ee;
k.Token.stringify = rn;
function Pe(n, e) {
  if (typeof n != "string")
    throw new TypeError("Expected `string` for `value`, got `" + n + "`");
  let l, t;
  if (e && typeof e == "object")
    l = e;
  else {
    if (t = e, typeof t != "string")
      throw new TypeError("Expected `string` for `name`, got `" + t + "`");
    if (Object.hasOwn(k.languages, t))
      l = k.languages[t];
    else
      throw new Error("Unknown language: `" + t + "` is not registered");
  }
  return {
    type: "root",
    // @ts-expect-error: we hacked Prism to accept and return the things we want.
    children: Fn.highlight.call(k, n, l, t)
  };
}
function Se(n) {
  if (typeof n != "function" || !n.displayName)
    throw new Error("Expected `function` for `syntax`, got `" + n + "`");
  Object.hasOwn(k.languages, n.displayName) || n(k);
}
function Oe(n, e) {
  const l = k.languages;
  let t = {};
  typeof n == "string" ? e && (t[n] = e) : t = n;
  let r;
  for (r in t)
    if (Object.hasOwn(t, r)) {
      const o = t[r], a = typeof o == "string" ? [o] : o;
      let u = -1;
      for (; ++u < a.length; )
        l[a[u]] = l[r];
    }
}
function ke(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Expected `string` for `aliasOrLanguage`, got `" + n + "`"
    );
  return Object.hasOwn(k.languages, n);
}
function Ae() {
  const n = k.languages, e = [];
  let l;
  for (l in n)
    Object.hasOwn(n, l) && typeof n[l] == "object" && e.push(l);
  return e;
}
function rn(n, e) {
  if (typeof n == "string")
    return { type: "text", value: n };
  if (Array.isArray(n)) {
    const t = [];
    let r = -1;
    for (; ++r < n.length; )
      n[r] !== null && n[r] !== void 0 && n[r] !== "" && t.push(
        /** @type {Element | Text} */
        rn(n[r], e)
      );
    return t;
  }
  const l = {
    attributes: {},
    classes: ["token", n.type],
    content: rn(n.content, e),
    language: e,
    tag: "span",
    type: n.type
  };
  return n.alias && l.classes.push(
    ...typeof n.alias == "string" ? [n.alias] : n.alias
  ), k.hooks.run("wrap", l), fe(
    l.tag + "." + l.classes.join("."),
    Me(l.attributes),
    l.content
  );
}
function Ee(n) {
  return n;
}
function Me(n) {
  let e;
  for (e in n)
    Object.hasOwn(n, e) && (n[e] = me(n[e]));
  return n;
}
const an = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(n) {
    if (n == null)
      return Ne;
    if (typeof n == "function")
      return J(n);
    if (typeof n == "object")
      return Array.isArray(n) ? De(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Le(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return Re(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function De(n) {
  const e = [];
  let l = -1;
  for (; ++l < n.length; )
    e[l] = an(n[l]);
  return J(t);
  function t(...r) {
    let o = -1;
    for (; ++o < e.length; )
      if (e[o].apply(this, r)) return !0;
    return !1;
  }
}
function Le(n) {
  const e = (
    /** @type {Record<string, unknown>} */
    n
  );
  return J(l);
  function l(t) {
    const r = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      t
    );
    let o;
    for (o in n)
      if (r[o] !== e[o]) return !1;
    return !0;
  }
}
function Re(n) {
  return J(e);
  function e(l) {
    return l && l.type === n;
  }
}
function J(n) {
  return e;
  function e(l, t, r) {
    return !!(Te(l) && n.call(
      this,
      l,
      typeof t == "number" ? t : void 0,
      r || void 0
    ));
  }
}
function Ne() {
  return !0;
}
function Te(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const _e = {}.hasOwnProperty;
function je(n, e, l) {
  const t = an(e), r = e && typeof e == "object" && "cascade" in e ? (
    /** @type {boolean | null | undefined} */
    e.cascade
  ) : void 0, o = r ?? !0;
  return a(n);
  function a(u, s, c) {
    const p = [];
    if (!t(u, s, c)) return;
    if (Ie(u)) {
      let x = -1;
      for (; ++x < u.children.length; ) {
        const m = a(u.children[x], x, u);
        m && p.push(m);
      }
      if (o && u.children.length > 0 && p.length === 0)
        return;
    }
    const d = {};
    let h;
    for (h in u)
      _e.call(u, h) && (d[h] = h === "children" ? p : u[h]);
    return d;
  }
}
function Ie(n) {
  return "children" in n && n.children !== void 0;
}
const $n = [], Ue = !0, vn = !1, ze = "skip";
function wn(n, e, l, t) {
  let r;
  typeof e == "function" && typeof l != "function" ? (t = l, l = e) : r = e;
  const o = an(r), a = t ? -1 : 1;
  u(n, void 0, [])();
  function u(s, c, p) {
    const d = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof d.type == "string") {
      const x = (
        // `hast`
        typeof d.tagName == "string" ? d.tagName : (
          // `xast`
          typeof d.name == "string" ? d.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (s.type + (x ? "<" + x + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let x = $n, m, C, w;
      if ((!e || o(s, c, p[p.length - 1] || void 0)) && (x = Be(l(s, p)), x[0] === vn))
        return x;
      if ("children" in s && s.children) {
        const y = (
          /** @type {UnistParent} */
          s
        );
        if (y.children && x[0] !== ze)
          for (C = (t ? y.children.length : -1) + a, w = p.concat(y); C > -1 && C < y.children.length; ) {
            const S = y.children[C];
            if (m = u(S, C, w)(), m[0] === vn)
              return m;
            C = typeof m[1] == "number" ? m[1] : C + a;
          }
      }
      return x;
    }
  }
}
function Be(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [Ue, n] : n == null ? $n : [n];
}
var Fe = Object.defineProperty, He = Object.defineProperties, $e = Object.getOwnPropertyDescriptors, Cn = Object.getOwnPropertySymbols, Ve = Object.prototype.hasOwnProperty, qe = Object.prototype.propertyIsEnumerable, Pn = (n, e, l) => e in n ? Fe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l, Vn = (n, e) => {
  for (var l in e || (e = {}))
    Ve.call(e, l) && Pn(n, l, e[l]);
  if (Cn)
    for (var l of Cn(e))
      qe.call(e, l) && Pn(n, l, e[l]);
  return n;
}, qn = (n, e) => He(n, $e(e));
function We(n, e) {
  const l = e.markers.map((r) => typeof r == "number" ? { line: r } : r).sort((r, o) => r.line - o.line), t = Wn(n.children).nodes;
  return l.length === 0 || t.length === 0 ? qn(Vn({}, n), { children: t }) : Xe(t, l, e);
}
function Wn(n, e = { lineNumber: 1 }) {
  const l = [];
  return n.reduce(
    (t, r) => {
      if (r.type === "doctype")
        return t;
      const o = e.lineNumber;
      if (r.type === "text") {
        if (r.value.indexOf(`
`) === -1)
          return W(r, o, o), t.nodes.push(r), t;
        const a = r.value.split(`
`);
        for (let u = 0; u < a.length; u++) {
          const s = u === 0 ? e.lineNumber : ++e.lineNumber, c = {
            type: "text",
            value: u === a.length - 1 ? a[u] : `${a[u]}
`
          }, p = W(c, s, s);
          t.nodes.push(p);
        }
        return t.lineNumber = e.lineNumber, t;
      }
      if (r.type === "element" && r.children) {
        const a = Wn(r.children, e), u = a.nodes.find(Z), s = a.nodes.findLast(Z);
        return W(
          r,
          u ? V(u, o) : o,
          s ? B(s, o) : o
        ), r.children = a.nodes, t.lineNumber = a.lineNumber, t.nodes.push(r), t;
      }
      return t.nodes.push(r), t;
    },
    { nodes: l, lineNumber: e.lineNumber }
  );
}
function Z(n) {
  return n.type === "element" || n.type === "text";
}
function V(n, e = 1) {
  return n.data && typeof n.data.lineStart == "number" ? n.data.lineStart : e;
}
function B(n, e = 1) {
  return n.data && typeof n.data.lineEnd == "number" ? n.data.lineEnd : e;
}
function W(n, e, l) {
  return n.data || (n.data = {}), n.data.lineStart = e, n.data.lineEnd = l, n;
}
function Ke(n, e) {
  const l = { type: "root", children: e }, t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), a = [];
  function u(p, d, h) {
    a.push(d), h.forEach((m) => {
      p.has(m) || (p.set(m, Object.assign({}, m, { children: [] })), m !== l && a.push(m));
    });
    let x = h.length;
    for (; x--; ) {
      const m = p.get(h[x]);
      if (!m || !("children" in m))
        continue;
      const C = h[x + 1], w = p.get(C) || d;
      m.children.indexOf(w) === -1 && m.children.push(w);
    }
  }
  wn(l, (p, d) => {
    if (!("children" in p || !Z(p))) {
      if (V(p) < n) {
        u(t, p, d);
        return;
      }
      if (V(p) === n) {
        u(r, p, d);
        return;
      }
      B(p) > n && a.some((h) => d.includes(h)) && u(o, p, d);
    }
  });
  const s = je(l, (p) => a.indexOf(p) === -1), c = (p) => {
    const d = p.get(l);
    return d ? (wn(d, (h, x) => {
      if (Z(h) && "children" in h) {
        W(h, 0, 0);
        return;
      }
      x.forEach((m) => {
        W(
          m,
          Math.max(V(m), V(h)),
          Math.max(B(m), B(h))
        );
      });
    }), d.children) : [];
  };
  return [
    ...c(t),
    ...c(r),
    ...c(o),
    ...s ? s.children : []
  ];
}
function Ge(n, e, l) {
  const t = e.className || "refractor-marker", r = {
    lineStart: e.line,
    lineEnd: B(n[n.length - 1]),
    isMarker: !0
  };
  return {
    type: "element",
    tagName: "div",
    data: e.component ? qn(Vn({}, r), { component: e.component, markerProperties: l }) : r,
    properties: { className: t },
    children: n
  };
}
function Xe(n, e, l) {
  const t = e.reduce(
    (a, u) => Ke(u.line, a),
    n
  ), r = [];
  let o = 0;
  for (let a = 0; a < e.length; a++) {
    const u = e[a];
    for (let c = t[o]; c && B(c) < u.line; c = t[++o])
      r.push(c);
    const s = [];
    for (let c = t[o]; c && B(c) === u.line; c = t[++o])
      c.type !== "doctype" && s.push(c);
    s.length > 0 && r.push(Ge(s, u, l));
  }
  for (; o < t.length; )
    r.push(t[o++]);
  return { type: "root", children: r };
}
var Ye = Object.defineProperty, Ze = Object.defineProperties, Je = Object.getOwnPropertyDescriptors, Sn = Object.getOwnPropertySymbols, Qe = Object.prototype.hasOwnProperty, nl = Object.prototype.propertyIsEnumerable, On = (n, e, l) => e in n ? Ye(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l, kn = (n, e) => {
  for (var l in e || (e = {}))
    Qe.call(e, l) && On(n, l, e[l]);
  if (Sn)
    for (var l of Sn(e))
      nl.call(e, l) && On(n, l, e[l]);
  return n;
}, el = (n, e) => Ze(n, Je(e));
function Kn(n) {
  return function(e, l) {
    return ll(e, l, n);
  };
}
function ll(n, e, l) {
  if (n.type === "doctype")
    return null;
  if (!("tagName" in n))
    return n.value;
  let t = "";
  typeof n.properties < "u" && (t = Array.isArray(n.properties.className) ? n.properties.className.join(" ") : `${n.properties.className}`);
  const r = `fract-${l}-${e}`, o = n.children && n.children.map(Kn(l + 1));
  return tl(n.data) ? un.createElement(
    n.data.component,
    el(kn(kn({ key: r }, n.properties), n.data.markerProperties), { className: t }),
    o
  ) : un.createElement(n.tagName, { key: r, className: t }, o);
}
function tl(n) {
  return typeof n == "object" && n !== null && "component" in n && "markerProperties" in n;
}
var rl = Object.defineProperty, ol = Object.defineProperties, il = Object.getOwnPropertyDescriptors, An = Object.getOwnPropertySymbols, al = Object.prototype.hasOwnProperty, ul = Object.prototype.propertyIsEnumerable, En = (n, e, l) => e in n ? rl(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l, Mn = (n, e) => {
  for (var l in e || (e = {}))
    al.call(e, l) && En(n, l, e[l]);
  if (An)
    for (var l of An(e))
      ul.call(e, l) && En(n, l, e[l]);
  return n;
}, Dn = (n, e) => ol(n, il(e));
const sl = "refractor";
function cl(n) {
  const e = n.className || sl, l = `language-${n.language}`, t = { className: l }, r = [e, l].filter(Boolean).join(" ");
  if (n.inline && (t.style = { display: "inline" }, t.className = e), n.plainText) {
    const s = /* @__PURE__ */ I.jsx("code", Dn(Mn({}, t), { children: n.value }));
    return n.inline ? s : /* @__PURE__ */ I.jsx("pre", { className: r, children: s });
  }
  let o = k.highlight(n.value, n.language);
  n.markers && n.markers.length > 0 && (o = We(o, { markers: n.markers }));
  const a = o.children.length === 0 ? n.value : o.children.map(Kn(0)), u = /* @__PURE__ */ I.jsx("code", Dn(Mn({}, t), { children: a }));
  return n.inline ? u : /* @__PURE__ */ I.jsx("pre", { className: r, children: u });
}
const fl = (n) => k.registered(n);
function gl(n) {
  let e = Gn.c(13), { language: l, value: t } = n, r = typeof l == "string" ? l : void 0, o;
  e[0] === r ? o = e[1] : (o = r ? fl(r) : !1, e[0] = r, e[1] = o);
  let a = o, u;
  e[2] !== r || e[3] !== a || e[4] !== t ? (u = !(r && a) && /* @__PURE__ */ I.jsx("code", { children: t }), e[2] = r, e[3] = a, e[4] = t, e[5] = u) : u = e[5];
  let s;
  e[6] !== r || e[7] !== a || e[8] !== t ? (s = r && a && /* @__PURE__ */ I.jsx(cl, {
    inline: !0,
    language: r,
    value: String(t)
  }), e[6] = r, e[7] = a, e[8] = t, e[9] = s) : s = e[9];
  let c;
  return e[10] !== u || e[11] !== s ? (c = /* @__PURE__ */ I.jsxs(I.Fragment, { children: [u, s] }), e[10] = u, e[11] = s, e[12] = c) : c = e[12], c;
}
export {
  gl as default
};
//# sourceMappingURL=refractor-B_4Mr502.js.map
