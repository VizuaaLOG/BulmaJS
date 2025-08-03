var T = Object.defineProperty, B = (i, t, e) => t in i ? T(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, D = (i, t, e) => B(i, typeof t != "symbol" ? t + "" : t, e);
class O {
  constructor() {
    D(this, "_data", {});
  }
  set(t, e, s) {
    this._data.hasOwnProperty(t) || (this._data[t] = {}), this._data[t][e] = s;
  }
  get(t, e) {
    if (this._data.hasOwnProperty(t))
      return this._data[t][e];
  }
  destroy(t) {
    this._data.hasOwnProperty(t) && delete this._data[t];
  }
}
D(O, "UID", 1);
var H = Object.defineProperty, M = (i, t, e) => t in i ? H(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, g = (i, t, e) => M(i, typeof t != "symbol" ? t + "" : t, e);
const m = class o {
  constructor(t) {
    g(this, "_elem"), t instanceof HTMLElement ? this._elem = t : this._elem = document.querySelector(t), t || (this._elem = document.createElement("div")), this._elem.hasOwnProperty(o.ID) || (this._elem[o.ID] = O.UID++);
  }
  static registerPlugin(t, e, s = 0) {
    if (!t)
      throw new Error("[BulmaJS] Key attribute is required.");
    o.PLUGINS[t] = {
      priority: s,
      handler: e
    }, o.prototype[t] = function(r) {
      return new o.PLUGINS[t].handler(r, this);
    };
  }
  static parseDocument(t = document) {
    let e = Object.keys(o.PLUGINS).sort((s, r) => o.PLUGINS[s].priority < o.PLUGINS[r].priority ? -1 : o.PLUGINS[s].priority > o.PLUGINS[r].priority ? 1 : 0);
    o.each(e, (s) => {
      o.PLUGINS[s].handler.hasOwnProperty("parseDocument") && o.PLUGINS[s].handler.parseDocument(t);
    });
  }
  static createElement(t, e) {
    e || (e = []), typeof e == "string" && (e = [e]);
    let s = document.createElement(t);
    return o.each(e, (r) => {
      s.classList.add(r);
    }), s;
  }
  static findOrCreateElement(t, e = document, s = "div", r = []) {
    var a = e.querySelector(t);
    if (!a) {
      r.length === 0 && (r = t.split(".").filter((u) => u));
      var h = o.createElement(s, r);
      return e.appendChild(h), h;
    }
    return a;
  }
  static each(t, e) {
    let s;
    for (s = 0; s < t.length; s++)
      e(t[s], s);
  }
  static ajax(t) {
    return new Promise((e, s) => {
      var r = new XMLHttpRequest();
      r.open("GET", t, !0), r.onload = () => {
        r.status >= 200 && r.status < 400 ? e(o._stripScripts(r.responseText)) : s();
      }, r.onerror = () => s(), r.send();
    });
  }
  static _stripScripts(t) {
    var e, s = document.createElement("div");
    s.innerHTML = t;
    for (var r = s.getElementsByTagName("script"), a = r.length; a--; )
      (e = r[a].parentNode) == null || e.removeChild(r[a]);
    return s.innerHTML.replace(/  +/g, " ");
  }
  data(t, e = void 0) {
    return e ? (o.CACHE.set(this._elem[o.ID], t, e), this) : o.CACHE.get(this._elem[o.ID], t);
  }
  destroyData() {
    return o.CACHE.destroy(this._elem[o.ID]), this;
  }
  getElement() {
    return this._elem;
  }
};
g(m, "AUTO_PARSE_DOCUMENT", !0);
g(m, "ON_LOADED", null);
g(m, "ID", "bulma-" + (/* @__PURE__ */ new Date()).getTime());
g(m, "VERSION", "1.0.0");
g(m, "CACHE", new O());
g(m, "PLUGINS", {});
let n = m;
document.addEventListener("DOMContentLoaded", () => {
  n.AUTO_PARSE_DOCUMENT && n.parseDocument(), n.ON_LOADED && n.ON_LOADED();
});
function l(i = null) {
  return i instanceof n ? i : new n(i);
}
var q = Object.defineProperty, F = (i, t, e) => t in i ? q(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, U = (i, t, e) => F(i, t + "", e);
class G {
  constructor(t) {
    if (U(this, "_items"), typeof t != "object")
      throw new TypeError("initialConfig must be of type object.");
    this._items = t;
  }
  set(t, e) {
    if (!t || !e)
      throw new Error("A key and value must be provided when setting a new option.");
    this._items[t] = e;
  }
  has(t) {
    if (!t)
      throw new Error("A key must be provided.");
    return !!(this._items.hasOwnProperty(t) && this._items[t]);
  }
  get(t, e = null) {
    return e && !this.has(t) ? typeof e == "function" ? e() : e : this._items[t];
  }
}
var k = Object.defineProperty, w = Object.getOwnPropertySymbols, z = Object.prototype.hasOwnProperty, R = Object.prototype.propertyIsEnumerable, $ = (i, t, e) => t in i ? k(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, C = (i, t) => {
  for (var e in t || (t = {}))
    z.call(t, e) && $(i, e, t[e]);
  if (w)
    for (var e of w(t))
      R.call(t, e) && $(i, e, t[e]);
  return i;
}, y = (i, t, e) => $(i, typeof t != "symbol" ? t + "" : t, e);
class p {
  constructor(t = {}, e) {
    if (y(this, "$root"), y(this, "$parent"), y(this, "config"), y(this, "_events"), e === null ? this.$root = l() : this.$root = l(e), this.config = new G(C(C({}, this.constructor.defaultConfig()), t)), !e && !this.config.has("parent"))
      throw new Error("A plugin requires a root and/or a parent.");
    this.$parent = this.config.get("parent", t.root ? t.root.parentNode : null), this._events = {};
  }
  static parseDocument(t) {
  }
  static defaultConfig() {
    return {};
  }
  on(t, e) {
    this._events.hasOwnProperty(t) || (this._events[t] = []), this._events[t].push(e);
  }
  trigger(t, e = {}) {
    if (this._events.hasOwnProperty(t))
      for (let s = 0; s < this._events[t].length; s++)
        this._events[t][s](e);
  }
  destroy() {
    var t;
    this.$root.destroyData(), (t = this.$root.getElement()) == null || t.remove(), this.trigger("destroyed");
  }
}
var J = Object.defineProperty, K = (i, t, e) => t in i ? J(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, f = (i, t, e) => K(i, typeof t != "symbol" ? t + "" : t, e);
class N extends p {
  constructor(t, e, s) {
    s?.getElement().classList.contains(t) || (e.parent = s, s = null), super(e, s), f(this, "name"), f(this, "body"), f(this, "color"), f(this, "dismissInterval"), f(this, "isDismissable"), f(this, "destroyOnDismiss"), f(this, "parent"), f(this, "closeButton"), this.name = t, this.body = this.config.get("body"), this.color = this.config.get("color"), this.dismissInterval = this.config.get("dismissInterval") ? this.createDismissInterval(this.config.get("dismissInterval")) : null, this.isDismissable = this.config.get("isDismissable"), this.destroyOnDismiss = this.config.get("destroyOnDismiss"), this.$root.getElement().classList.add(this.name, "is-hidden"), this.$parent && this.$parent.getElement().appendChild(this.$root.getElement()), this.closeButton = this.config.get("closeButton", this.createCloseButton()), this.body && this.insertBody(), this.color && this.setColor();
  }
  static defaultConfig() {
    return {
      isDismissable: !1,
      destroyOnDismiss: !0,
      element: null
    };
  }
  show() {
    this.$root.getElement().classList.remove("is-hidden");
  }
  hide() {
    this.$root.getElement().classList.add("is-hidden");
  }
  insertBody() {
    this.$root.getElement().innerHTML = this.body;
  }
  createCloseButton() {
    var t = document.createElement("button");
    return t.setAttribute("type", "button"), t.classList.add("delete"), t;
  }
  createDismissInterval(t) {
    return setInterval(() => {
      this.handleCloseEvent();
    }, t);
  }
  prependCloseButton() {
    this.$root.getElement().insertBefore(this.closeButton, this.$root.getElement().firstChild);
  }
  setupCloseEvent() {
    this.closeButton.addEventListener("click", this.handleCloseEvent.bind(this));
  }
  handleCloseEvent() {
    this.trigger("dismissed"), this.destroyOnDismiss ? this.destroy() : this.hide(), this.trigger("close");
  }
  setColor() {
    this.$root.getElement().classList.add("is-" + this.color);
  }
  destroy() {
    super.destroy(), this.closeButton && this.closeButton.removeEventListener("click", this.handleCloseEvent.bind(this)), clearInterval(this.dismissInterval), this.trigger("destroyed");
  }
}
class V extends N {
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".notification"), n.each(e, (s) => {
      var r;
      let a = l(s);
      if (a.data("notification"))
        return;
      let h = s.querySelector(".delete");
      a.notification({
        body: null,
        closeButton: h,
        isDismissable: !!h,
        destroyOnDismiss: !0,
        dismissInterval: s.hasAttribute("data-dismiss-interval") ? parseInt((r = s.getAttribute("data-dismiss-interval")) != null ? r : "") : null
      });
    });
  }
  constructor(t, e) {
    super("notification", t, l(e)), this.isDismissable && (this.config.has("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), l(this.$root).data("notification", this), this.trigger("init");
  }
}
n.registerPlugin("notification", V);
var X = Object.defineProperty, Q = (i, t, e) => t in i ? X(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, c = (i, t, e) => Q(i, typeof t != "symbol" ? t + "" : t, e);
class W extends p {
  constructor(t, e) {
    super(t, e), c(this, "triggerElement"), c(this, "target"), c(this, "sticky"), c(this, "stickyOffset"), c(this, "hideOnScroll"), c(this, "tolerance"), c(this, "hideOffset"), c(this, "shadow"), c(this, "dropdowns"), c(this, "lastScrollY"), this.$parent === null && (this.$parent = this.config.get("root").parentNode), this.triggerElement = this.$root.getElement().querySelector(".navbar-burger"), this.target = this.$root.getElement().querySelector(".navbar-menu"), this.sticky = typeof window == "object" && !!this.config.get("sticky"), this.stickyOffset = parseInt(this.config.get("stickyOffset")), this.hideOnScroll = !!this.config.get("hideOnScroll"), this.tolerance = parseInt(this.config.get("tolerance")), this.shadow = !!this.config.get("shadow"), this.hideOffset = parseInt(this.config.get("hideOffset", Math.max(this.$root.getElement().scrollHeight, this.stickyOffset))), this.dropdowns = this.$root.getElement().querySelectorAll(".navbar-item.has-dropdown:not(.is-hoverable)"), this.handleScroll = this.handleScroll.bind(this), l(this.$root.getElement()).data("navbar", this), this.registerEvents();
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".navbar"), n.each(e, (s) => {
      var r, a;
      l(s).navbar({
        sticky: s.hasAttribute("data-sticky"),
        stickyOffset: s.hasAttribute("data-sticky-offset") ? parseInt((r = s.getAttribute("data-sticky-offset")) != null ? r : "") : 0,
        hideOnScroll: s.hasAttribute("data-hide-on-scroll"),
        tolerance: s.hasAttribute("data-tolerance") ? parseInt((a = s.getAttribute("data-tolerance")) != null ? a : "") : 0,
        hideOffset: s.hasAttribute("data-hide-offset"),
        shadow: s.hasAttribute("data-sticky-shadow")
      });
    });
  }
  static defaultConfig() {
    return {
      sticky: !1,
      stickyOffset: 0,
      hideOnScroll: !1,
      tolerance: 0,
      hideOffset: null,
      shadow: !1
    };
  }
  registerEvents() {
    this.triggerElement && this.triggerElement.addEventListener("click", this.handleTriggerClick.bind(this)), this.sticky && this.enableSticky();
  }
  handleTriggerClick() {
    this.target.classList.contains("is-active") ? (this.target.classList.remove("is-active"), this.triggerElement.classList.remove("is-active")) : (this.target.classList.add("is-active"), this.triggerElement.classList.add("is-active"));
  }
  handleScroll() {
    this.toggleSticky(window.pageYOffset);
  }
  enableSticky() {
    window.addEventListener("scroll", this.handleScroll), this.$root.getElement().setAttribute("data-sticky", ""), this.sticky = !0;
  }
  // noinspection JSUnusedGlobalSymbols
  disableSticky() {
    window.removeEventListener("scroll", this.handleScroll), this.$root.getElement().removeAttribute("data-sticky"), this.sticky = !1;
  }
  // noinspection JSUnusedGlobalSymbols
  enableHideOnScroll() {
    this.sticky || this.enableSticky(), this.$root.getElement().setAttribute("data-hide-on-scroll", ""), this.hideOnScroll = !0;
  }
  // noinspection JSUnusedGlobalSymbols
  disableHideOnScroll() {
    this.$root.getElement().removeAttribute("data-hide-on-scroll"), this.hideOnScroll = !1, this.$root.getElement().classList.remove("is-hidden-scroll");
  }
  toggleSticky(t) {
    var e, s;
    if (t > this.stickyOffset ? (this.$root.getElement().classList.add("is-fixed-top"), document.body.classList.add("has-navbar-fixed-top"), this.shadow && this.$root.getElement().classList.add("has-shadow")) : (this.$root.getElement().classList.remove("is-fixed-top"), document.body.classList.remove("has-navbar-fixed-top"), this.shadow && this.$root.getElement().classList.remove("has-shadow")), this.hideOnScroll) {
      let r = this.calculateScrollDirection(t, (e = this.lastScrollY) != null ? e : 0), a = this.difference(t, (s = this.lastScrollY) != null ? s : 0) >= this.tolerance;
      if (r === "down") {
        let h = t > this.hideOffset;
        a && h && this.$root.getElement().classList.add("is-hidden-scroll");
      } else {
        let h = t < this.hideOffset;
        (a || h) && this.$root.getElement().classList.remove("is-hidden-scroll");
      }
      this.lastScrollY = t;
    }
  }
  difference(t, e) {
    return t > e ? t - e : e - t;
  }
  calculateScrollDirection(t, e) {
    return t >= e ? "down" : "up";
  }
}
n.registerPlugin("navbar", W);
var Y = Object.defineProperty, Z = (i, t, e) => t in i ? Y(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, P = (i, t, e) => Z(i, typeof t != "symbol" ? t + "" : t, e);
class j extends N {
  constructor(t, e) {
    super("message", t, l(e)), P(this, "size"), P(this, "title"), this.size = this.config.get("size"), this.config.has("title") && this.createMessageHeader(), this.isDismissable && (this.config.get("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), this.size && this.setSize(), l(this.$root).data("message", this), this.trigger("init");
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = Array.from(t.querySelectorAll(".message")), n.each(e, (s) => {
      var r;
      let a = s.querySelector(".delete");
      l(s).message({
        body: null,
        closeButton: a,
        isDismissable: !!a,
        destroyOnDismiss: !0,
        dismissInterval: s.hasAttribute("data-dismiss-interval") ? parseInt((r = s.getAttribute("data-dismiss-interval")) != null ? r : "") : null
      }).show();
    });
  }
  createMessageHeader() {
    this.title = n.createElement("div", ["message-header"]), this.title.innerHTML = `<p>${this.config.get("title")}</p>`, this.$root.getElement().insertBefore(this.title, this.$root.getElement().firstChild);
  }
  setSize() {
    this.$root.getElement().classList.add("is-" + this.size);
  }
  insertBody() {
    let t = document.createElement("div");
    t.classList.add("message-body"), t.innerHTML = this.body, this.$root.getElement().appendChild(t);
  }
  prependCloseButton() {
    var t;
    (t = this.title) == null || t.appendChild(this.closeButton);
  }
}
n.registerPlugin("message", j);
var x = Object.defineProperty, tt = (i, t, e) => t in i ? x(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, et = (i, t, e) => tt(i, t + "", e);
class it extends p {
  constructor(t, e) {
    super(t, e), et(this, "$triggerElement"), this.$root.getElement().setAttribute("data-bulma-attached", "attached"), this.$triggerElement = this.$root.getElement().querySelector(".dropdown-trigger"), this.registerEvents(), l(this.$root).data("dropdown", this), this.trigger("init");
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".dropdown"), n.each(e, (s) => {
      l(s).dropdown();
    });
  }
  registerEvents() {
    this.$triggerElement.addEventListener("click", this.handleTriggerClick.bind(this));
  }
  handleTriggerClick() {
    this.$root.getElement().classList.contains("is-active") ? (this.$root.getElement().classList.remove("is-active"), this.trigger("close")) : (this.$root.getElement().classList.add("is-active"), this.trigger("open"));
  }
}
n.registerPlugin("dropdown", it);
var st = Object.defineProperty, rt = (i, t, e) => t in i ? st(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, d = (i, t, e) => rt(i, typeof t != "symbol" ? t + "" : t, e);
class L extends p {
  constructor(t, e) {
    super(t, e), d(this, "style"), d(this, "parent"), d(this, "background"), d(this, "content"), d(this, "header"), d(this, "headerTitle"), d(this, "cardBody"), d(this, "footer"), d(this, "closeButton"), d(this, "closable"), d(this, "body"), d(this, "title"), this.style = this.config.get("style"), this.$root.getElement().classList.contains("modal") || this.$root.getElement().classList.add("modal"), this.$parent ? l(this.$parent).getElement().appendChild(this.$root.getElement()) : this.$root.getElement().parentNode ? this.$parent = l(this.$root.getElement().parentNode) : (this.$parent = l(document.body), this.$parent.getElement().appendChild(this.$root.getElement())), this.background = n.findOrCreateElement(".modal-background", this.$root.getElement()), this.content = this.style === "card" ? n.findOrCreateElement(".modal-card", this.$root.getElement()) : n.findOrCreateElement(".modal-content", this.$root.getElement()), this.closable = this.config.get("closable"), this.body = this.config.get("body"), this.title = this.config.get("title"), this.config.get("bodyUrl") ? n.ajax(this.config.get("bodyUrl")).then((s) => {
      this.body = s, this.buildModal();
    }) : this.buildModal(), l(this.$root).data("modal", this), this.trigger("init");
  }
  static defaultConfig() {
    return {
      style: "card",
      closable: !0
    };
  }
  buildModal() {
    this.content && (this.style === "card" ? this.createCardStructure() : this.content.innerHTML || (this.content.innerHTML = this.body), this.header && this.$root && this.closable && (this.closeButton = this.style === "card" ? n.findOrCreateElement(".delete", this.header, "button") : n.findOrCreateElement(".modal-close", this.$root.getElement(), "button")), this.style === "card" && this.config.has("buttons") && this.createButtons(), this.setupEvents());
  }
  createCardStructure() {
    this.content && (this.header = n.findOrCreateElement(".modal-card-head", this.content, "header"), this.header && (this.headerTitle = n.findOrCreateElement(".modal-card-title", this.header, "p"), this.headerTitle && !this.headerTitle.innerHTML && (this.headerTitle.innerHTML = this.title), this.cardBody = n.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody && !this.cardBody.innerHTML && (this.cardBody.innerHTML = this.body), this.footer = n.findOrCreateElement(".modal-card-foot", this.content, "footer")));
  }
  setupEvents() {
    this.closable && (this.closeButton && this.closeButton.addEventListener("click", this.close.bind(this)), document.addEventListener("keyup", (t) => this.keyupListener(t)), this.background && this.background.addEventListener("click", this.close.bind(this)));
  }
  createButtons() {
    var t, e = this.config.get("buttons", []);
    let s = n.createElement("div", ["buttons"]);
    n.each(e, (r) => {
      var a, h, u = n.createElement("button", (a = r.classes) != null ? a : []);
      u.innerHTML = (h = r.label) != null ? h : "", typeof r.onClick == "function" && u.addEventListener("click", function(v) {
        r.onClick(v);
      }), s.appendChild(u);
    }), (t = this.footer) == null || t.appendChild(s);
  }
  open() {
    var t;
    (t = this.$root.getElement()) == null || t.classList.add("is-active"), document.documentElement.classList.add("is-clipped"), this.trigger("open");
  }
  close() {
    var t;
    (t = this.$root.getElement()) == null || t.classList.remove("is-active"), document.documentElement.classList.remove("is-clipped"), this.trigger("close");
  }
  keyupListener(t) {
    var e;
    if (!((e = this.$root.getElement()) != null && e.classList.contains("is-active")))
      return;
    let s = t.key || t.keyCode;
    (s === "Escape" || s === "Esc" || s === 27) && this.close();
  }
}
n.registerPlugin("modal", L);
var nt = Object.defineProperty, at = Object.defineProperties, ot = Object.getOwnPropertyDescriptors, S = Object.getOwnPropertySymbols, lt = Object.prototype.hasOwnProperty, ht = Object.prototype.propertyIsEnumerable, A = (i, t, e) => t in i ? nt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, b = (i, t) => {
  for (var e in t || (t = {}))
    lt.call(t, e) && A(i, e, t[e]);
  if (S)
    for (var e of S(t))
      ht.call(t, e) && A(i, e, t[e]);
  return i;
}, dt = (i, t) => at(i, ot(t));
class ct extends L {
  static defaultConfig() {
    return dt(b({}, L.defaultConfig()), {
      type: "info",
      title: "",
      body: "",
      confirm: "Okay",
      cancel: null,
      parent: document.body,
      showHeader: !0,
      destroyOnClose: !0
    });
  }
  constructor(t, e) {
    super(t, e), this.$root && (this.$root.getElement().classList.add("alert"), l(this.$root).data("alert", this), this.trigger("init"), this.config.get("destroyOnClose") && this.on("close", () => this.destroy()), this.open());
  }
  createCardStructure() {
    var t;
    this.config.get("showHeader") ? (this.header = n.findOrCreateElement(".modal-card-head", this.content, "header", ["modal-card-head", "has-background-" + this.config.get("type")]), this.headerTitle = n.createElement("p", ["modal-card-title", `has-text-${this.config.get("type")}-00`]), this.headerTitle.innerHTML = this.title, this.header.appendChild(this.headerTitle)) : (t = this.$root.getElement()) == null || t.classList.add("has-no-header"), this.cardBody = n.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody.innerHTML || (this.cardBody.innerHTML = this.body), this.footer = n.findOrCreateElement(".modal-card-foot", this.content, "footer");
  }
  // FIXME: Can this generate config instead so the Modal still handles it?
  createButtons() {
    var t, e = { close: !0, destroy: !0, onClick: function() {
    } };
    let s = n.createElement("div", ["buttons"]);
    var r = this.config.get("confirm");
    typeof r == "string" && (r = {
      label: r,
      classes: []
    }), r = b(b({}, e), r);
    var a = n.createElement("button", ["button", "is-" + this.config.get("type")].concat(r.classes));
    if (a.innerHTML = r.label, a.addEventListener("click", (v) => {
      r.onClick(v), r.close && this.close();
    }), s.appendChild(a), this.config.get("cancel")) {
      var h = this.config.get("cancel");
      typeof h == "string" && (h = {
        label: h,
        classes: []
      }), h = b(b({}, e), h);
      var u = n.createElement("button", ["button"].concat(h.classes));
      u.innerHTML = h.label, u.addEventListener("click", (v) => {
        h.onClick(v), h.close && this.close();
      }), s.appendChild(u), (t = this.footer) == null || t.appendChild(s);
    }
  }
}
n.registerPlugin("alert", ct);
var ut = Object.defineProperty, ft = (i, t, e) => t in i ? ut(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, I = (i, t, e) => ft(i, typeof t != "symbol" ? t + "" : t, e);
class gt extends p {
  constructor(t, e) {
    super(t, e), I(this, "input"), I(this, "filename"), this.$root.getElement().setAttribute("data-bulma-attached", "attached"), this.input = this.$root.getElement().querySelector("input"), this.filename = this.$root.getElement().querySelector(".file-name"), this.registerEvents(), l(this.$root).data("file", this), this.trigger("init");
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".file"), n.each(e, (s) => {
      l(s).file();
    });
  }
  /**
   * Register all the events this module needs.
   * @return {undefined}
   */
  registerEvents() {
    this.filename && this.input.addEventListener("change", this.handleTriggerChange.bind(this)), this.$root.getElement().addEventListener("dragover", (t) => {
      t.preventDefault(), this.addHoverClass();
    }), this.$root.getElement().addEventListener("dragleave", (t) => {
      t.preventDefault(), this.addHoverClass();
    }), this.$root.getElement().addEventListener("drop", (t) => {
      var e, s;
      t.preventDefault(), this.removeHoverClass(), this.input.files = (s = (e = t.dataTransfer) == null ? void 0 : e.files) != null ? s : new FileList();
    });
  }
  handleTriggerChange(t) {
    if (!t.target) return;
    const e = t.target;
    e.files && (e.files.length === 0 && this.clearFileName(), e.files.length === 1 && this.setFileName(e.files[0].name), e.files.length > 1 && this.setFileName(e.files.length + " files"), this.trigger("changed", t));
  }
  clearFileName() {
    this.filename.innerHTML = "";
  }
  getFilename() {
    return this.filename.innerHTML;
  }
  setFileName(t) {
    this.filename.innerHTML = t;
  }
  addHoverClass() {
    this.$root.getElement().classList.add("is-hovered");
  }
  removeHoverClass() {
    this.$root.getElement().classList.remove("is-hovered");
  }
}
n.registerPlugin("file", gt);
var mt = Object.defineProperty, pt = (i, t, e) => t in i ? mt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, E = (i, t, e) => pt(i, typeof t != "symbol" ? t + "" : t, e);
class vt extends p {
  constructor(t, e) {
    super(t, e), E(this, "hover"), E(this, "nav"), E(this, "navItems"), E(this, "content"), E(this, "contentItems"), this.hover = this.config.get("hover"), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.content = this.findContent(), this.contentItems = this.findContentItems(), this.setupNavEvents(), l(this.$root).data("tabs", this), this.trigger("init");
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".tabs-wrapper"), n.each(e, (s) => {
      l(s).tabs({
        hover: s.hasAttribute("data-hover")
      });
    });
  }
  static defaultConfig() {
    return {
      hover: !1
    };
  }
  findNav() {
    return this.$root.getElement().querySelector(".tabs");
  }
  findNavItems() {
    return Array.from(this.nav.querySelectorAll("li"));
  }
  findContent() {
    return this.$root.getElement().querySelector(".tabs-content");
  }
  findContentItems() {
    return Array.from(this.$root.getElement().querySelectorAll(".tabs-content > ul > li"));
  }
  setupNavEvents() {
    n.each(Array.from(this.navItems), (t, e) => {
      t.addEventListener("click", () => {
        this.setActive(e);
      }), this.hover && t.addEventListener("mouseover", () => {
        this.setActive(e);
      });
    });
  }
  setActive(t) {
    n.each(Array.from(this.navItems), (e) => {
      e.classList.remove("is-active");
    }), n.each(Array.from(this.contentItems), (e) => {
      e.classList.remove("is-active");
    }), this.navItems[t].classList.add("is-active"), this.contentItems[t].classList.add("is-active");
  }
}
n.registerPlugin("tabs", vt);
var bt = Object.defineProperty, Et = (i, t, e) => t in i ? bt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e, _ = (i, t, e) => Et(i, typeof t != "symbol" ? t + "" : t, e);
class yt extends p {
  constructor(t, e) {
    super(t, e), _(this, "nav"), _(this, "navItems"), _(this, "contentItems"), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.contentItems = this.findContentItems(), this.setupNavEvents(), this.on("init", this.showActiveTab.bind(this)), l(this.$root).data("panelTabs", this), this.trigger("init");
  }
  static parseDocument(t) {
    let e;
    t.hasOwnProperty("classList") && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".panel"), n.each(e, (s) => {
      s.querySelector(".panel-tabs") !== null && l(s).panelTabs();
    });
  }
  static defaultConfig() {
    return {};
  }
  findNav() {
    return this.$root.getElement().querySelector(".panel-tabs");
  }
  findNavItems() {
    return Array.from(this.nav.querySelectorAll("a"));
  }
  findContentItems() {
    return Array.from(this.$root.getElement().querySelectorAll(".panel-block[data-category]"));
  }
  setupNavEvents() {
    n.each(this.navItems, (t) => {
      t.addEventListener("click", () => {
        this.setActive(t.getAttribute("data-target"));
      });
    });
  }
  setActive(t) {
    this.navItems.forEach((e) => {
      e.getAttribute("data-target") === t ? e.classList.add("is-active") : e.classList.remove("is-active");
    }), this.contentItems.forEach((e) => {
      e.getAttribute("data-category") === t || t === null ? e.classList.remove("is-hidden") : e.classList.add("is-hidden");
    });
  }
  showActiveTab() {
    let t = !1;
    n.each(this.navItems, (e) => {
      e.classList.contains("is-active") && (this.setActive(e.getAttribute("data-target")), t = !0);
    }), t || this.setActive(this.navItems[0].getAttribute("data-target"));
  }
}
n.registerPlugin("panelTabs", yt);
export {
  ct as Alert,
  n as Core,
  it as Dropdown,
  gt as File,
  j as Message,
  L as Modal,
  W as Navbar,
  V as Notification,
  yt as PanelTabs,
  vt as Tabs,
  l as default
};
