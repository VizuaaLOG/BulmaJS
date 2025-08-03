class h {
  constructor() {
    this._data = {};
  }
  set(t, e, i) {
    this._data.hasOwnProperty(t) || (this._data[t] = {}), this._data[t][e] = i;
  }
  get(t, e) {
    if (this._data.hasOwnProperty(t))
      return this._data[t][e];
  }
  destroy(t) {
    this._data.hasOwnProperty(t) && delete this._data[t];
  }
}
h.uid = 1;
function s(r) {
  return this instanceof s ? r instanceof s ? r : (r instanceof HTMLElement ? this._elem = r : this._elem = document.querySelector(r), r || (this._elem = document.createElement("div")), this._elem.hasOwnProperty(s.id) || (this._elem[s.id] = h.uid++), this) : new s(r);
}
s.VERSION = "0.12.1";
s.id = "bulma-" + (/* @__PURE__ */ new Date()).getTime();
s.cache = new h();
s.plugins = {};
s.create = (r, t) => {
  if (!r || !s.plugins.hasOwnProperty(r))
    throw new Error("[BulmaJS] A plugin with the key '" + r + "' has not been registered.");
  return new s.plugins[r].handler(t);
};
s.registerPlugin = (r, t, e = 0) => {
  if (!r)
    throw new Error("[BulmaJS] Key attribute is required.");
  s.plugins[r] = {
    priority: e,
    handler: t
  }, s.prototype[r] = function(i) {
    return new s.plugins[r].handler(i, this);
  };
};
s.parseDocument = (r = document) => {
  let t = Object.keys(s.plugins).sort((e, i) => s.plugins[e].priority < s.plugins[i].priority);
  s.each(t, (e) => {
    if (!s.plugins[e].handler.hasOwnProperty("parseDocument")) {
      console.error("[BulmaJS] Plugin " + e + " does not have a parseDocument method. Automatic document parsing is not possible for this plugin.");
      return;
    }
    s.plugins[e].handler.parseDocument(r);
  });
};
s.createElement = (r, t) => {
  t || (t = []), typeof t == "string" && (t = [t]);
  let e = document.createElement(r);
  return s.each(t, (i) => {
    e.classList.add(i);
  }), e;
};
s.findOrCreateElement = (r, t = document, e = "div", i = []) => {
  var a = t.querySelector(r);
  if (!a) {
    i.length === 0 && (i = r.split(".").filter((l) => l));
    var o = s.createElement(e, i);
    return t.appendChild(o), o;
  }
  return a;
};
s.each = (r, t) => {
  let e;
  for (e = 0; e < r.length; e++)
    t(r[e], e);
};
s.ajax = (r) => new Promise((t, e) => {
  var i = new XMLHttpRequest();
  i.open("GET", r, !0), i.onload = () => {
    i.status >= 200 && i.status < 400 ? t(s._stripScripts(i.responseText)) : e();
  }, i.onerror = () => e(), i.send();
});
s._stripScripts = (r) => {
  var t = document.createElement("div");
  t.innerHTML = r;
  for (var e = t.getElementsByTagName("script"), i = e.length; i--; )
    e[i].parentNode.removeChild(e[i]);
  return t.innerHTML.replace(/  +/g, " ");
};
s.getGlobalConfig = function(r, t = null) {
  return !window.hasOwnProperty("bulmaOptions") || !window.bulmaOptions.hasOwnProperty(r) ? t : window.bulmaOptions[r];
};
s.prototype.data = function(r, t) {
  return t ? (s.cache.set(this._elem[s.id], r, t), this) : s.cache.get(this._elem[s.id], r);
};
s.prototype.destroyData = function() {
  return s.cache.destroy(this._elem[s.id]), this;
};
s.prototype.getElement = function() {
  return this._elem;
};
document.addEventListener("DOMContentLoaded", () => {
  s.getGlobalConfig("autoParseDocument", !0) && s.parseDocument(), s.getGlobalConfig("onLoaded") && s.getGlobalConfig("onLoaded")();
});
class u {
  constructor(t = []) {
    if (typeof t != "object")
      throw new TypeError("initialConfig must be of type object.");
    this._items = t;
  }
  /**
   * Set a new config property
   * @param {string} key The config property's key
   * @param {mixed} value The config property's value
   */
  set(t, e) {
    if (!t || !e)
      throw new Error("A key and value must be provided when setting a new option.");
    this._items[t] = e;
  }
  /**
   * Check if a key exists
   * @param {string} key
   * @returns {boolean}
   */
  has(t) {
    if (!t)
      throw new Error("A key must be provided.");
    return this._items.hasOwnProperty(t) && this._items[t];
  }
  /**
   * Get a property by it's key. Returns the defaultValue if it doesn't exists
   * @param {string} key 
   * @param {mixed} defaultValue
   * @returns {mixed}
   */
  get(t, e = null) {
    return e && !this.has(t) ? typeof e == "function" ? e() : e : this._items[t];
  }
}
class n {
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {};
  }
  /**
   * Create a plugin.
   * @param {object} config The config for this plugin
   */
  constructor(t = {}, e) {
    if (t.root = e instanceof s ? e._elem : e, this.config = new u({ ...this.constructor.defaultConfig(), ...t }), !e && !this.config.has("parent"))
      throw new Error("A plugin requires a root and/or a parent.");
    this.parent = this.config.get("parent", t.root ? t.root.parentNode : null), this._events = {};
  }
  on(t, e) {
    this._events.hasOwnProperty(t) || (this._events[t] = []), this._events[t].push(e);
  }
  trigger(t, e = {}) {
    if (this._events.hasOwnProperty(t))
      for (let i = 0; i < this._events[t].length; i++)
        this._events[t][i](e);
  }
  destroy() {
    s(this.root).destroyData();
  }
}
class d extends n {
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {
      isDismissable: !1,
      destroyOnDismiss: !0,
      element: null
    };
  }
  /**
   * Plugin constructor
   * @param  {string} name Plugin's name
   * @param  {Object} config Plugin's config
   * @return {this} The new plugin instance
   */
  constructor(t, e, i) {
    i._elem.classList.contains(t) || (e.parent = i, i = null), super(e, i), this.name = t, this.body = this.config.get("body"), this.color = this.config.get("color"), this.dismissInterval = this.config.get("dismissInterval") ? this.createDismissInterval(this.config.get("dismissInterval")) : null, this.isDismissable = this.config.get("isDismissable"), this.destroyOnDismiss = this.config.get("destroyOnDismiss"), this.parent instanceof s || (this.parent = s(this.parent)), this.root = this.config.get("root", this.createRootElement.bind(this)), this.closeButton = this.config.get("closeButton", this.createCloseButton()), this.body && this.insertBody(), this.color && this.setColor();
  }
  /**
   * Create the main element.
   * @return {HTMLElement}
   */
  createRootElement() {
    let t = document.createElement("div");
    return t.classList.add(this.name, "is-hidden"), t.setAttribute("data-bulma-attached", "attached"), this.parent.getElement().appendChild(t), t;
  }
  /**
   * Show the component.
   * @return {undefined}
   */
  show() {
    this.root.classList.remove("is-hidden");
  }
  /**
   * Hide the component.
   * @return {undefined}
   */
  hide() {
    this.root.classList.add("is-hidden");
  }
  /**
   * Insert the body text into the component.
   * @return {undefined}
   */
  insertBody() {
    this.root.innerHTML = this.body;
  }
  /**
   * Create the element that will be used to close the component.
   * @return {HTMLElement} The newly created close button
   */
  createCloseButton() {
    var t = document.createElement("button");
    return t.setAttribute("type", "button"), t.classList.add("delete"), t;
  }
  /**
   * Create an interval to dismiss the component after the set number of ms.
   * @param  {int} interval The time to wait before dismissing the component
   * @return {undefined}
   */
  createDismissInterval(t) {
    return setInterval(() => {
      this.handleCloseEvent();
    }, t);
  }
  /**
   * Insert the close button before our content.
   * @return {undefined}
   */
  prependCloseButton() {
    this.root.insertBefore(this.closeButton, this.root.firstChild);
  }
  /**
   * Setup the event listener for the close button.
   * @return {undefined}
   */
  setupCloseEvent() {
    this.closeButton.addEventListener("click", this.handleCloseEvent.bind(this));
  }
  /**
   * Handle the event when our close button is clicked.
   * @return {undefined}
   */
  handleCloseEvent() {
    this.trigger("dismissed"), this.destroyOnDismiss ? this.destroy() : this.hide(), this.trigger("close");
  }
  /**
   * Set the colour of the component.
   * @return {undefined}
   */
  setColor() {
    this.root.classList.add("is-" + this.color);
  }
  /**
   * Destroy the component, removing the event listener, interval and element.
   * @return {undefined}
   */
  destroy() {
    super.destroy(), this.closeButton && this.closeButton.removeEventListener("click", this.handleCloseEvent.bind(this)), clearInterval(this.dismissInterval), this.parent.getElement().removeChild(this.root), this.parent = null, this.root = null, this.trigger("destroyed");
  }
}
class f extends d {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} element The root element for this instance
   * @return {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.contains("notification") ? e = [t] : e = t.querySelectorAll(".notification"), s.each(e, (i) => {
      let a = s(i);
      if (a.data("notification"))
        return;
      let o = i.querySelector(".delete");
      a.notification({
        body: null,
        closeButton: o,
        isDismissable: !!o,
        destroyOnDismiss: !0,
        dismissInterval: i.hasAttribute("data-dismiss-interval") ? i.getAttribute("data-dismiss-interval") : null
      });
    });
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created instance
   */
  constructor(t, e) {
    super("notification", t, e), this.isDismissable && (this.config.has("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), s(this.root).data("notification", this), this.trigger("init");
  }
}
s.registerPlugin("notification", f);
class g extends n {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} element The root element for this instance
   * @return {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.contains("navbar") ? e = [t] : e = t.querySelectorAll(".navbar"), s.each(e, (i) => {
      s(i).navbar({
        sticky: !!i.hasAttribute("data-sticky"),
        stickyOffset: i.hasAttribute("data-sticky-offset") ? i.getAttribute("data-sticky-offset") : 0,
        hideOnScroll: !!i.hasAttribute("data-hide-on-scroll"),
        tolerance: i.hasAttribute("data-tolerance") ? i.getAttribute("data-tolerance") : 0,
        hideOffset: i.hasAttribute("data-hide-offset") ? i.getAttribute("data-hide-offset") : null,
        shadow: !!i.hasAttribute("data-sticky-shadow")
      });
    });
  }
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultconfig() {
    return {
      sticky: !1,
      stickyOffset: 0,
      hideOnScroll: !1,
      tolerance: 0,
      hideOffset: null,
      shadow: !1
    };
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created plugin instance
   */
  constructor(t, e) {
    super(t, e), this.parent === null && (this.parent = this.config.get("root").parentNode), this.root = this.config.get("root"), this.root.setAttribute("data-bulma-attached", "attached"), this.triggerElement = this.root.querySelector(".navbar-burger"), this.target = this.root.querySelector(".navbar-menu"), this.sticky = typeof window == "object" && !!this.config.get("sticky"), this.stickyOffset = parseInt(this.config.get("stickyOffset")), this.hideOnScroll = !!this.config.get("hideOnScroll"), this.tolerance = parseInt(this.config.get("tolerance")), this.shadow = !!this.config.get("shadow"), this.hideOffset = parseInt(this.config.get("hideOffset", Math.max(this.root.scrollHeight, this.stickyOffset))), this.lastScrollY = 0, this.dropdowns = this.root.querySelectorAll(".navbar-item.has-dropdown:not(.is-hoverable)"), this.handleScroll = this.handleScroll.bind(this), s(this.root).data("navbar", this), this.registerEvents();
  }
  /**
   * Register all the events this module needs.
   * @return {undefined}
   */
  registerEvents() {
    this.triggerElement && this.triggerElement.addEventListener("click", this.handleTriggerClick.bind(this)), this.sticky && this.enableSticky(), s.each(this.dropdowns, (t) => {
      t.addEventListener("click", this.handleDropdownTrigger);
    });
  }
  /**
   * Handle the click event on the trigger.
   * @return {undefined}
   */
  handleTriggerClick() {
    this.target.classList.contains("is-active") ? (this.target.classList.remove("is-active"), this.triggerElement.classList.remove("is-active")) : (this.target.classList.add("is-active"), this.triggerElement.classList.add("is-active"));
  }
  /**
   * Handle the scroll event
   * @return {undefined}
   */
  handleScroll() {
    this.toggleSticky(window.pageYOffset);
  }
  /**
   * Handle the click handler for any dropdowns found within the navbar
   */
  handleDropdownTrigger() {
    this.classList.contains("is-active") ? this.classList.remove("is-active") : this.classList.add("is-active");
  }
  /**
   * Enable the sticky feature by attaching the scroll event.
   */
  enableSticky() {
    window.addEventListener("scroll", this.handleScroll), this.root.setAttribute("data-sticky", ""), this.sticky = !0;
  }
  /**
   * Disable the sticky feature by removing the scroll event.
   */
  disableSticky() {
    window.removeEventListener("scroll", this.handleScroll), this.root.removeAttribute("data-sticky"), this.sticky = !1;
  }
  /**
   * Enable hide on scroll. Also enable sticky if it's not already.
   */
  enableHideOnScroll() {
    this.sticky || this.enableSticky(), this.root.setAttribute("data-hide-on-scroll", ""), this.hideOnScroll = !0;
  }
  /**
   * Disable hide on scroll, and show the navbar again if it's hidden.
   */
  disableHideOnScroll() {
    this.root.removeAttribute("data-hide-on-scroll"), this.hideOnScroll = !1, this.root.classList.remove("is-hidden-scroll");
  }
  /**
   * Toggle the navbar's sticky state
   * @param {number} scrollY The amount of pixels that has been scrolled
   * @return {undefined}
   */
  toggleSticky(t) {
    if (t > this.stickyOffset ? (this.root.classList.add("is-fixed-top"), document.body.classList.add("has-navbar-fixed-top"), this.shadow && this.root.classList.add("has-shadow")) : (this.root.classList.remove("is-fixed-top"), document.body.classList.remove("has-navbar-fixed-top"), this.shadow && this.root.classList.remove("has-shadow")), this.hideOnScroll) {
      let e = this.calculateScrollDirection(t, this.lastScrollY), i = this.difference(t, this.lastScrollY) >= this.tolerance;
      if (e === "down") {
        let a = t > this.hideOffset;
        i && a && this.root.classList.add("is-hidden-scroll");
      } else {
        let a = t < this.hideOffset;
        (i || a) && this.root.classList.remove("is-hidden-scroll");
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
s.registerPlugin("navbar", g);
class m extends d {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} element The root element for this plugin
   * @return {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.container(".message") ? e = [t] : e = t.querySelectorAll(".message"), s.each(e, (i) => {
      let a = i.querySelector(".delete");
      s(i).message({
        body: null,
        closeButton: a,
        isDismissable: !!a,
        destroyOnDismiss: !0,
        dismissInterval: i.hasAttribute("data-dismiss-interval") ? i.getAttribute("data-dismiss-interval") : null
      });
    });
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created instance
   */
  constructor(t, e) {
    super("message", t, e), this.size = this.config.get("size"), this.title = this.config.get("title"), this.title && this.createMessageHeader(), this.isDismissable && (this.config.get("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), this.size && this.setSize(), s(this.root).data("message", this), this.trigger("init");
  }
  /**
   * Create the message header
   * @return {undefined}
   */
  createMessageHeader() {
    let t = document.createElement("div");
    t.classList.add("message-header"), t.innerHTML = "<p>" + this.title + "</p>", this.title = t, this.root.insertBefore(this.title, this.root.firstChild);
  }
  /**
   * Set the size of the message.
   * @return {undefined}
   */
  setSize() {
    this.root.classList.add("is-" + this.size);
  }
  /**
   * Insert the body text into the component.
   * @return {undefined}
   */
  insertBody() {
    let t = document.createElement("div");
    t.classList.add("message-body"), t.innerHTML = this.body, this.root.appendChild(t);
  }
  /**
   * Insert the close button before our content.
   * @return {undefined}
   */
  prependCloseButton() {
    this.title.appendChild(this.closeButton);
  }
}
s.registerPlugin("message", m);
class p extends n {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HtmlElement} element The root element for this instance
   * @return {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.contains("dropdown") ? e = [t] : e = t.querySelectorAll(".dropdown"), s.each(e, (i) => {
      s(i).dropdown();
    });
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created instance
   */
  constructor(t, e) {
    super(t, e), this.root = this.config.get("root"), this.root.setAttribute("data-bulma-attached", "attached"), this.triggerElement = this.root.querySelector(".dropdown-trigger"), this.registerEvents(), s(this.root).data("dropdown", this), this.trigger("init");
  }
  /**
   * Register all the events this module needs.
   * @return {undefined}
   */
  registerEvents() {
    this.triggerElement.addEventListener("click", this.handleTriggerClick.bind(this));
  }
  /**
   * Handle the click event on the trigger.
   * @return {undefined}
   */
  handleTriggerClick() {
    this.root.classList.contains("is-active") ? (this.root.classList.remove("is-active"), this.trigger("close")) : (this.root.classList.add("is-active"), this.trigger("open"));
  }
}
s.registerPlugin("dropdown", p);
class c extends n {
  /**
   * Handle parsing the DOM.
   * @param {HTMLElement} element The root element for this accordion
   * @return {undefined}
   */
  static parseDocument() {
  }
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {
      style: "card",
      closable: !0
    };
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created plugin instance
   */
  constructor(t, e) {
    super(t, e), this.style = this.config.get("style"), this.root = this.config.get("root"), this.root.classList.contains("modal") || this.root.classList.add("modal"), this.parent ? this.parent.appendChild(this.root) : this.root.parentNode ? this.parent = this.root.parentNode : (this.parent = document.body, this.parent.appendChild(this.root)), this.background = s.findOrCreateElement(".modal-background", this.root), this.content = this.style === "card" ? s.findOrCreateElement(".modal-card", this.root) : s.findOrCreateElement(".modal-content", this.root), this.closable = this.config.get("closable"), this.body = this.config.get("body"), this.title = this.config.get("title"), this.config.get("bodyUrl") ? s.ajax(this.config.get("bodyUrl")).then((i) => {
      this.body = i, this.buildModal();
    }) : this.buildModal(), s(this.root).data("modal", this), this.trigger("init");
  }
  // Build the modal's HTML
  buildModal() {
    this.style === "card" ? this.createCardStructure() : this.content.innerHTML || (this.content.innerHTML = this.body), this.closable && (this.closeButton = this.style === "card" ? s.findOrCreateElement(".delete", this.header, "button") : s.findOrCreateElement(".modal-close", this.root, "button")), this.style === "card" && this.createButtons(), this.setupEvents();
  }
  /**
   * Create the card style structure
   * @returns {void}
   */
  createCardStructure() {
    this.header = s.findOrCreateElement(".modal-card-head", this.content, "header"), this.headerTitle = s.findOrCreateElement(".modal-card-title", this.header, "p"), this.headerTitle.innerHTML || (this.headerTitle.innerHTML = this.title), this.cardBody = s.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody.innerHTML || (this.cardBody.innerHTML = this.body), this.footer = s.findOrCreateElement(".modal-card-foot", this.content, "footer");
  }
  /**
   * Setup the events used by this modal.
   * @returns {void}
   */
  setupEvents() {
    this.closable && (this.closeButton.addEventListener("click", this.close.bind(this)), this.keyupListenerBound = (t) => this.keyupListener(t), document.addEventListener("keyup", this.keyupListenerBound), this.background.addEventListener("click", this.close.bind(this)));
  }
  /**
   * Go through the provided buttons option and create the buttons.
   * @returns {void}
   */
  createButtons() {
    var t = this.config.get("buttons", []), e = this;
    s.each(t, function(i) {
      var a = s.createElement("button", i.classes);
      a.innerHTML = i.label, a.addEventListener("click", function(o) {
        i.onClick(o);
      }), e.footer.appendChild(a);
    });
  }
  /**
   * Open the modal
   * @returns {void}
   */
  open() {
    this.root.classList.add("is-active"), document.documentElement.classList.add("is-clipped"), this.trigger("open");
  }
  /**
   * Close the modal
   * @returns {void} 
   */
  close() {
    this.root.classList.remove("is-active"), document.documentElement.classList.remove("is-clipped"), this.trigger("close");
  }
  keyupListener(t) {
    if (!this.root.classList.contains("is-active"))
      return;
    let e = t.key || t.keyCode;
    (e === "Escape" || e === "Esc" || e === 27) && this.close();
  }
  /**
   * Destroy this modal, unregistering element references and removing the modal.
   * @returns {void}
   */
  destroy() {
    super.destroy(), this.root.remove(), this.parent = null, this.root = null, this.background = null, this.content = null, this.style === "card" && (this.header = null, this.headerTitle = null, this.cardBody = null, this.footer = null), this.closable && (this.closeButton = null, document.removeEventListener("keyup", this.keyupListenerBound)), this.config.gets = [], this.trigger("destroyed");
  }
}
s.registerPlugin("modal", c);
class v extends c {
  /**
   * Handle parsing the DOM.
   * @param {HTMLElement} element The root element for this accordion
   * @return {undefined}
   */
  static parseDocument() {
  }
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {
      type: "info",
      title: "",
      body: "",
      confirm: "Okay",
      cancel: null,
      style: "card",
      parent: document.body,
      showHeader: !0
    };
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created plugin instance
   */
  constructor(t, e) {
    super(t, e), this.root.classList.add("alert"), s(this.root).data("alert", this), this.trigger("init"), this.open();
  }
  /**
   * Create the alerts structure
   * @returns {void}
   */
  createCardStructure() {
    if (this.config.get("showHeader")) {
      this.header = s.findOrCreateElement(".modal-card-head", this.content, "header", ["modal-card-head", "has-background-" + this.config.get("type")]);
      var t = this.config.get("type") == "warning" ? "black" : "white";
      this.headerTitle = s.createElement("p", ["modal-card-title", "has-text-" + t]), this.headerTitle.innerHTML = this.title, this.header.appendChild(this.headerTitle);
    }
    this.cardBody = s.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody.innerHTML || (this.cardBody.innerHTML = this.body), this.footer = s.findOrCreateElement(".modal-card-foot", this.content, "footer");
  }
  /**
   * Go through the provided buttons option and create the buttons.
   * @returns {void}
   */
  createButtons() {
    var t = { close: !0, destroy: !0, onClick: function() {
    } }, e = this.config.get("confirm");
    typeof e == "string" && (e = {
      label: e,
      classes: []
    }), e = { ...t, ...e };
    var i = s.createElement("button", ["button", "is-" + this.config.get("type")].concat(e.classes));
    if (i.innerHTML = e.label, i.addEventListener("click", (l) => {
      e.onClick(l), e.close && this.close(), e.destroy && this.destroy();
    }), this.footer.appendChild(i), this.config.get("cancel")) {
      var a = this.config.get("cancel");
      typeof a == "string" && (a = {
        label: a,
        classes: []
      }), a = { ...t, ...a };
      var o = s.createElement("button", ["button"].concat(a.classes));
      o.innerHTML = a.label, o.addEventListener("click", (l) => {
        a.onClick(l), a.close && this.close(), a.destroy && this.destroy();
      }), this.footer.appendChild(o);
    }
  }
}
s.registerPlugin("alert", v);
class b extends n {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} element The root element for this plugin
   * @return {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.contains("file") ? e = [t] : e = t.querySelectorAll(".file"), s.each(e, (i) => {
      s(i).file();
    });
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created plugin instance
   */
  constructor(t, e) {
    super(t, e), this.root = this.config.get("root"), this.root.setAttribute("data-bulma-attached", "attached"), this.input = this.root.querySelector("input"), this.filename = this.root.querySelector(".file-name"), this.registerEvents(), s(this.root).data("file", this), this.trigger("init");
  }
  /**
   * Register all the events this module needs.
   * @return {undefined}
   */
  registerEvents() {
    this.filename && this.input.addEventListener("change", this.handleTriggerChange.bind(this)), this.root.addEventListener("dragover", (t) => {
      t.preventDefault(), this.addHoverClass();
    }), this.root.addEventListener("dragleave", (t) => {
      t.preventDefault(), this.addHoverClass();
    }), this.root.addEventListener("drop", (t) => {
      t.preventDefault(), this.removeHoverClass(), this.input.files = t.dataTransfer.files;
    });
  }
  /**
   * Handle the click event on the trigger.
   * @param  {Object} event The event object
   * @return {undefined}
   */
  handleTriggerChange(t) {
    t.target.files.length === 0 && this.clearFileName(), t.target.files.length === 1 && this.setFileName(t.target.files[0].name), t.target.files.length > 1 && this.setFileName(t.target.files.length + " files"), this.trigger("changed", t);
  }
  /**
   * Clear the file name element.
   * @return {undefined}
   */
  clearFileName() {
    this.filename.innerHTML = "";
  }
  /**
   * Get the selected file's name
   * 
   * @returns {string}
   */
  getFilename() {
    return this.filename.innerHTML;
  }
  /**
   * Set the text for the file name element.
   * @param {string} value The name of the file to update the label with
   * @return {undefined}
   */
  setFileName(t) {
    this.filename.innerHTML = t;
  }
  /**
   * Add hover class to root element.
   * @return {undefined}
   */
  addHoverClass() {
    this.root.classList.add("is-hovered");
  }
  /**
   * Remove hover class from root element.
   * @return {undefined}
   */
  removeHoverClass() {
    this.root.classList.remove("is-hovered");
  }
}
s.registerPlugin("file", b);
class y extends n {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} element The root element for this instance
   * @returns {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.has("tabs-wrapper") ? e = [t] : e = t.querySelectorAll(".tabs-wrapper"), s.each(e, (i) => {
      s(i).tabs({
        hover: !!i.hasAttribute("data-hover")
      });
    });
  }
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {
      hover: !1
    };
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created instance
   */
  constructor(t, e) {
    super(t, e), this.root = this.config.get("root"), this.root.setAttribute("data-bulma-attached", "attached"), this.hover = this.config.get("hover"), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.content = this.findContent(), this.contentItems = this.findContentItems(), this.setupNavEvents(), s(this.root).data("tabs", this), this.trigger("init");
  }
  /**
   * Find the tab navigation container.
   * @returns {HTMLElement} The navigation container
   */
  findNav() {
    return this.root.querySelector(".tabs");
  }
  /**
   * Find each individual tab item
   * @returns {HTMLElement[]} An array of the found items
   */
  findNavItems() {
    return this.nav.querySelectorAll("li");
  }
  /**
   * Find the tab content container.
   * @returns {HTMLElement} The content container
   */
  findContent() {
    return this.root.querySelector(".tabs-content");
  }
  /**
   * Find each individual content item
   * @returns {HTMLElement[]} An array of the found items
   */
  findContentItems() {
    return this.root.querySelectorAll(".tabs-content > ul > li");
  }
  /**
   * Setup the events to handle tab changing
   * @returns {void}
   */
  setupNavEvents() {
    s.each(this.navItems, (t, e) => {
      t.addEventListener("click", () => {
        this.setActive(e);
      }), this.hover && t.addEventListener("mouseover", () => {
        this.setActive(e);
      });
    });
  }
  /**
   * Set the provided tab's index as the active tab.
   * 
   * @param {integer} index The new index to set
   */
  setActive(t) {
    s.each(this.navItems, (e) => {
      e.classList.remove("is-active");
    }), s.each(this.contentItems, (e) => {
      e.classList.remove("is-active");
    }), this.navItems[t].classList.add("is-active"), this.contentItems[t].classList.add("is-active");
  }
}
s.registerPlugin("tabs", y);
class L extends n {
  /**
   * Handle parsing the DOMs data attribute API.
   * @param {HTMLElement} context The root element for this instance
   * @returns {undefined}
   */
  static parseDocument(t) {
    let e;
    typeof t.classList == "object" && t.classList.contains("panel") ? e = [t] : e = t.querySelectorAll(".panel"), s.each(e, (i) => {
      i.querySelector(".panel-tabs") !== null && s(i).panelTabs();
    });
  }
  /**
   * Returns an object containing the default config for this plugin.
   * @returns {object} The default config object.
   */
  static defaultConfig() {
    return {};
  }
  /**
   * Plugin constructor
   * @param  {Object} config The config object for this plugin
   * @return {this} The newly created instance
   */
  constructor(t, e) {
    super(t, e), this.root = this.config.get("root"), this.root.setAttribute("data-bulma-attached", "attached"), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.contentItems = this.findContentItems(), this.setupNavEvents(), this.on("init", this.showActiveTab.bind(this)), s(this.root).data("panelTabs", this), this.trigger("init");
  }
  /**
   * Find the tab navigation container.
   * @returns {HTMLElement} The navigation container
   */
  findNav() {
    return this.root.querySelector(".panel-tabs");
  }
  /**
   * Find each individual tab item
   * @returns {NodeListOf<Element>} An array of the found items
   */
  findNavItems() {
    return this.nav.querySelectorAll("a");
  }
  /**
   * Find each individual content item
   * @returns {NodeListOf<Element>} An array of the found items
   */
  findContentItems() {
    return this.root.querySelectorAll(".panel-block[data-category]");
  }
  /**
   * Setup the events to handle tab changing
   * @returns {void}
   */
  setupNavEvents() {
    s.each(this.navItems, (t) => {
      t.addEventListener("click", () => {
        this.setActive(t.getAttribute("data-target"));
      });
    });
  }
  /**
   * Show the correct category and mark the tab as active.
   * 
   * @param {string|null} category The new category to set
   */
  setActive(t) {
    this.navItems.forEach((e) => {
      e.getAttribute("data-target") === t ? e.classList.add("is-active") : e.classList.remove("is-active");
    }), this.contentItems.forEach((e) => {
      e.getAttribute("data-category") === t || t === null ? e.classList.remove("is-hidden") : e.classList.add("is-hidden");
    });
  }
  /**
   * This is called on init and will setup the panel tabs for the current active tab, if any
   */
  showActiveTab() {
    let t = !1;
    s.each(this.navItems, (e) => {
      e.classList.contains("is-active") && (this.setActive(e.getAttribute("data-target")), t = !0);
    }), t || this.setActive(this.navItems[0].getAttribute("data-target"));
  }
}
s.registerPlugin("panelTabs", L);
export {
  v as Alert,
  s as Bulma,
  p as Dropdown,
  b as File,
  m as Message,
  c as Modal,
  g as Navbar,
  f as Notification,
  L as PanelTabs,
  y as Tabs
};
