//#region src/Data.ts
var e = class {
	static UID = 1;
	_data = {};
	set(e, t, n) {
		this._data.hasOwnProperty(e) || (this._data[e] = {}), this._data[e][t] = n;
	}
	get(e, t) {
		if (this._data.hasOwnProperty(e)) return this._data[e][t];
	}
	destroy(e) {
		this._data.hasOwnProperty(e) && delete this._data[e];
	}
}, t = class t {
	_elem;
	static AUTO_PARSE_DOCUMENT = !0;
	static ON_LOADED = null;
	static ID = "bulma-" + (/* @__PURE__ */ new Date()).getTime();
	static VERSION = "1.0.0";
	static CACHE = new e();
	static PLUGINS = {} = {};
	static registerPlugin(e, n, r = 0) {
		if (!e) throw Error("[BulmaJS] Key attribute is required.");
		t.PLUGINS[e] = {
			priority: r,
			handler: n
		}, t.prototype[e] = function(n) {
			return new t.PLUGINS[e].handler(n, this);
		};
	}
	static parseDocument(e = document) {
		let n = Object.keys(t.PLUGINS).sort((e, n) => t.PLUGINS[e].priority < t.PLUGINS[n].priority ? -1 : +(t.PLUGINS[e].priority > t.PLUGINS[n].priority));
		t.each(n, (n) => {
			t.PLUGINS[n].handler.hasOwnProperty("parseDocument") && t.PLUGINS[n].handler.parseDocument(e);
		});
	}
	static createElement(e, n) {
		n ||= [], typeof n == "string" && (n = [n]);
		let r = document.createElement(e);
		return t.each(n, (e) => {
			r.classList.add(e);
		}), r;
	}
	static findOrCreateElement(e, n = document, r = "div", i = []) {
		var a = n.querySelector(e);
		if (!a) {
			i.length === 0 && (i = e.split(".").filter((e) => e));
			var o = t.createElement(r, i);
			return n.appendChild(o), o;
		}
		return a;
	}
	static each(e, t) {
		let n;
		for (n = 0; n < e.length; n++) t(e[n], n);
	}
	static ajax(e) {
		return new Promise((n, r) => {
			var i = new XMLHttpRequest();
			i.open("GET", e, !0), i.onload = () => {
				i.status >= 200 && i.status < 400 ? n(t._stripScripts(i.responseText)) : r();
			}, i.onerror = () => r(), i.send();
		});
	}
	static _stripScripts(e) {
		var t = document.createElement("div");
		t.innerHTML = e;
		for (var n = t.getElementsByTagName("script"), r = n.length; r--;) n[r].parentNode?.removeChild(n[r]);
		return t.innerHTML.replace(/  +/g, " ");
	}
	constructor(n) {
		n instanceof HTMLElement ? this._elem = n : this._elem = document.querySelector(n), n || (this._elem = document.createElement("div")), this._elem.hasOwnProperty(t.ID) || (this._elem[t.ID] = e.UID++);
	}
	data(e, n = void 0) {
		return n ? (t.CACHE.set(this._elem[t.ID], e, n), this) : t.CACHE.get(this._elem[t.ID], e);
	}
	destroyData() {
		return t.CACHE.destroy(this._elem[t.ID]), this;
	}
	getElement() {
		return this._elem;
	}
};
document.addEventListener("DOMContentLoaded", () => {
	t.AUTO_PARSE_DOCUMENT && t.parseDocument(), t.ON_LOADED && t.ON_LOADED();
});
function n(e = null) {
	return e instanceof t ? e : new t(e);
}
//#endregion
//#region src/ConfigBag.ts
var r = class {
	_items;
	constructor(e) {
		if (typeof e != "object") throw TypeError("initialConfig must be of type object.");
		this._items = e;
	}
	set(e, t) {
		if (!e || !t) throw Error("A key and value must be provided when setting a new option.");
		this._items[e] = t;
	}
	has(e) {
		if (!e) throw Error("A key must be provided.");
		return !!(this._items.hasOwnProperty(e) && this._items[e]);
	}
	get(e, t = null) {
		return t && !this.has(e) ? typeof t == "function" ? t() : t : this._items[e];
	}
}, i = class {
	$root;
	$parent;
	config;
	_events;
	static parseDocument(e) {}
	static defaultConfig() {
		return {};
	}
	constructor(e = {}, t) {
		if (t === null ? this.$root = n() : this.$root = n(t), this.config = new r({
			...this.constructor.defaultConfig(),
			...e
		}), !t && !this.config.has("parent")) throw Error("A plugin requires a root and/or a parent.");
		this.$parent = this.config.get("parent", e.root ? e.root.parentNode : null), this._events = {};
	}
	on(e, t) {
		this._events.hasOwnProperty(e) || (this._events[e] = []), this._events[e].push(t);
	}
	trigger(e, t = {}) {
		if (this._events.hasOwnProperty(e)) for (let n = 0; n < this._events[e].length; n++) this._events[e][n](t);
	}
	destroy() {
		this.$root.destroyData(), this.$root.getElement()?.remove(), this.trigger("destroyed");
	}
}, a = class extends i {
	name;
	body;
	color;
	dismissInterval;
	isDismissable;
	destroyOnDismiss;
	parent;
	closeButton;
	static defaultConfig() {
		return {
			isDismissable: !1,
			destroyOnDismiss: !0,
			element: null
		};
	}
	constructor(e, t, n) {
		n?.getElement().classList.contains(e) || (t.parent = n, n = null), super(t, n), this.name = e, this.body = this.config.get("body"), this.color = this.config.get("color"), this.dismissInterval = this.config.get("dismissInterval") ? this.createDismissInterval(this.config.get("dismissInterval")) : null, this.isDismissable = this.config.get("isDismissable"), this.destroyOnDismiss = this.config.get("destroyOnDismiss"), this.$root.getElement().classList.add(this.name, "is-hidden"), this.$parent && this.$parent.getElement().appendChild(this.$root.getElement()), this.closeButton = this.config.get("closeButton", this.createCloseButton()), this.body && this.insertBody(), this.color && this.setColor();
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
		var e = document.createElement("button");
		return e.setAttribute("type", "button"), e.classList.add("delete"), e;
	}
	createDismissInterval(e) {
		return setInterval(() => {
			this.handleCloseEvent();
		}, e);
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
}, o = class extends a {
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".notification"), t.each(r, (e) => {
			let t = n(e);
			if (t.data("notification")) return;
			let r = e.querySelector(".delete");
			t.notification({
				body: null,
				closeButton: r,
				isDismissable: !!r,
				destroyOnDismiss: !0,
				dismissInterval: e.hasAttribute("data-dismiss-interval") ? parseInt(e.getAttribute("data-dismiss-interval") ?? "") : null
			});
		});
	}
	constructor(e, t) {
		super("notification", e, n(t)), this.isDismissable && (this.config.has("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), n(this.$root).data("notification", this), this.trigger("init");
	}
};
t.registerPlugin("notification", o);
//#endregion
//#region src/plugins/navbar/Navbar.ts
var s = class extends i {
	triggerElement;
	target;
	sticky;
	stickyOffset;
	hideOnScroll;
	tolerance;
	hideOffset;
	shadow;
	dropdowns;
	lastScrollY;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".navbar"), t.each(r, (e) => {
			n(e).navbar({
				sticky: e.hasAttribute("data-sticky"),
				stickyOffset: e.hasAttribute("data-sticky-offset") ? parseInt(e.getAttribute("data-sticky-offset") ?? "") : 0,
				hideOnScroll: e.hasAttribute("data-hide-on-scroll"),
				tolerance: e.hasAttribute("data-tolerance") ? parseInt(e.getAttribute("data-tolerance") ?? "") : 0,
				hideOffset: e.hasAttribute("data-hide-offset"),
				shadow: e.hasAttribute("data-sticky-shadow")
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
	constructor(e, t) {
		super(e, t), this.$parent === null && (this.$parent = this.config.get("root").parentNode), this.triggerElement = this.$root.getElement().querySelector(".navbar-burger"), this.target = this.$root.getElement().querySelector(".navbar-menu"), this.sticky = typeof window == "object" && !!this.config.get("sticky"), this.stickyOffset = parseInt(this.config.get("stickyOffset")), this.hideOnScroll = !!this.config.get("hideOnScroll"), this.tolerance = parseInt(this.config.get("tolerance")), this.shadow = !!this.config.get("shadow"), this.hideOffset = parseInt(this.config.get("hideOffset", Math.max(this.$root.getElement().scrollHeight, this.stickyOffset))), this.dropdowns = this.$root.getElement().querySelectorAll(".navbar-item.has-dropdown:not(.is-hoverable)"), this.handleScroll = this.handleScroll.bind(this), n(this.$root.getElement()).data("navbar", this), this.registerEvents();
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
	disableSticky() {
		window.removeEventListener("scroll", this.handleScroll), this.$root.getElement().removeAttribute("data-sticky"), this.sticky = !1;
	}
	enableHideOnScroll() {
		this.sticky || this.enableSticky(), this.$root.getElement().setAttribute("data-hide-on-scroll", ""), this.hideOnScroll = !0;
	}
	disableHideOnScroll() {
		this.$root.getElement().removeAttribute("data-hide-on-scroll"), this.hideOnScroll = !1, this.$root.getElement().classList.remove("is-hidden-scroll");
	}
	toggleSticky(e) {
		if (e > this.stickyOffset ? (this.$root.getElement().classList.add("is-fixed-top"), document.body.classList.add("has-navbar-fixed-top"), this.shadow && this.$root.getElement().classList.add("has-shadow")) : (this.$root.getElement().classList.remove("is-fixed-top"), document.body.classList.remove("has-navbar-fixed-top"), this.shadow && this.$root.getElement().classList.remove("has-shadow")), this.hideOnScroll) {
			let t = this.calculateScrollDirection(e, this.lastScrollY ?? 0), n = this.difference(e, this.lastScrollY ?? 0) >= this.tolerance;
			if (t === "down") {
				let t = e > this.hideOffset;
				n && t && this.$root.getElement().classList.add("is-hidden-scroll");
			} else {
				let t = e < this.hideOffset;
				(n || t) && this.$root.getElement().classList.remove("is-hidden-scroll");
			}
			this.lastScrollY = e;
		}
	}
	difference(e, t) {
		return e > t ? e - t : t - e;
	}
	calculateScrollDirection(e, t) {
		return e >= t ? "down" : "up";
	}
};
t.registerPlugin("navbar", s);
//#endregion
//#region src/plugins/message/Message.ts
var c = class extends a {
	size;
	title;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : Array.from(e.querySelectorAll(".message")), t.each(r, (e) => {
			let t = e.querySelector(".delete");
			n(e).message({
				body: null,
				closeButton: t,
				isDismissable: !!t,
				destroyOnDismiss: !0,
				dismissInterval: e.hasAttribute("data-dismiss-interval") ? parseInt(e.getAttribute("data-dismiss-interval") ?? "") : null
			}).show();
		});
	}
	constructor(e, t) {
		super("message", e, n(t)), this.size = this.config.get("size"), this.config.has("title") && this.createMessageHeader(), this.isDismissable && (this.config.get("closeButton") || this.prependCloseButton(), this.setupCloseEvent()), this.size && this.setSize(), n(this.$root).data("message", this), this.trigger("init");
	}
	createMessageHeader() {
		this.title = t.createElement("div", ["message-header"]), this.title.innerHTML = `<p>${this.config.get("title")}</p>`, this.$root.getElement().insertBefore(this.title, this.$root.getElement().firstChild);
	}
	setSize() {
		this.$root.getElement().classList.add("is-" + this.size);
	}
	insertBody() {
		let e = document.createElement("div");
		e.classList.add("message-body"), e.innerHTML = this.body, this.$root.getElement().appendChild(e);
	}
	prependCloseButton() {
		this.title?.appendChild(this.closeButton);
	}
};
t.registerPlugin("message", c);
//#endregion
//#region src/plugins/dropdown/Dropdown.ts
var l = class extends i {
	$triggerElement;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".dropdown"), t.each(r, (e) => {
			n(e).dropdown();
		});
	}
	constructor(e, t) {
		super(e, t), this.$root.getElement().setAttribute("data-bulma-attached", "attached"), this.$triggerElement = this.$root.getElement().querySelector(".dropdown-trigger"), this.registerEvents(), n(this.$root).data("dropdown", this), this.trigger("init");
	}
	registerEvents() {
		this.$triggerElement.addEventListener("click", this.handleTriggerClick.bind(this));
	}
	handleTriggerClick() {
		this.$root.getElement().classList.contains("is-active") ? (this.$root.getElement().classList.remove("is-active"), this.trigger("close")) : (this.$root.getElement().classList.add("is-active"), this.trigger("open"));
	}
};
t.registerPlugin("dropdown", l);
//#endregion
//#region src/plugins/modal/Modal.ts
var u = class extends i {
	style;
	parent;
	background;
	content;
	header;
	headerTitle;
	cardBody;
	footer;
	closeButton;
	closable;
	body;
	title;
	static defaultConfig() {
		return {
			style: "card",
			closable: !0
		};
	}
	constructor(e, r) {
		super(e, r), this.style = this.config.get("style"), this.$root.getElement().classList.contains("modal") || this.$root.getElement().classList.add("modal"), this.$parent ? n(this.$parent).getElement().appendChild(this.$root.getElement()) : this.$root.getElement().parentNode ? this.$parent = n(this.$root.getElement().parentNode) : (this.$parent = n(document.body), this.$parent.getElement().appendChild(this.$root.getElement())), this.background = t.findOrCreateElement(".modal-background", this.$root.getElement()), this.content = this.style === "card" ? t.findOrCreateElement(".modal-card", this.$root.getElement()) : t.findOrCreateElement(".modal-content", this.$root.getElement()), this.closable = this.config.get("closable"), this.body = this.config.get("body"), this.title = this.config.get("title"), this.config.get("bodyUrl") ? t.ajax(this.config.get("bodyUrl")).then((e) => {
			this.body = e, this.buildModal();
		}) : this.buildModal(), n(this.$root).data("modal", this), this.trigger("init");
	}
	buildModal() {
		this.content && (this.style === "card" ? this.createCardStructure() : this.content.innerHTML || (this.content.innerHTML = this.body), this.header && this.$root && this.closable && (this.closeButton = this.style === "card" ? t.findOrCreateElement(".delete", this.header, "button") : t.findOrCreateElement(".modal-close", this.$root.getElement(), "button")), this.style === "card" && this.config.has("buttons") && this.createButtons(), this.setupEvents());
	}
	createCardStructure() {
		this.content && (this.header = t.findOrCreateElement(".modal-card-head", this.content, "header"), this.header && (this.headerTitle = t.findOrCreateElement(".modal-card-title", this.header, "p"), this.headerTitle && !this.headerTitle.innerHTML && (this.headerTitle.innerHTML = this.title), this.cardBody = t.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody && !this.cardBody.innerHTML && (this.cardBody.innerHTML = this.body), this.footer = t.findOrCreateElement(".modal-card-foot", this.content, "footer")));
	}
	setupEvents() {
		this.closable && (this.closeButton && this.closeButton.addEventListener("click", this.close.bind(this)), document.addEventListener("keyup", (e) => this.keyupListener(e)), this.background && this.background.addEventListener("click", this.close.bind(this)));
	}
	createButtons() {
		var e = this.config.get("buttons", []);
		let n = t.createElement("div", ["buttons"]);
		t.each(e, (e) => {
			var r = t.createElement("button", e.classes ?? []);
			r.innerHTML = e.label ?? "", typeof e.onClick == "function" && r.addEventListener("click", function(t) {
				e.onClick(t);
			}), n.appendChild(r);
		}), this.footer?.appendChild(n);
	}
	open() {
		this.$root.getElement()?.classList.add("is-active"), document.documentElement.classList.add("is-clipped"), this.trigger("open");
	}
	close() {
		this.$root.getElement()?.classList.remove("is-active"), document.documentElement.classList.remove("is-clipped"), this.trigger("close");
	}
	keyupListener(e) {
		if (!this.$root.getElement()?.classList.contains("is-active")) return;
		let t = e.key || e.keyCode;
		(t === "Escape" || t === "Esc" || t === 27) && this.close();
	}
};
t.registerPlugin("modal", u);
//#endregion
//#region src/plugins/alert/Alert.ts
var d = class extends u {
	static defaultConfig() {
		return {
			...u.defaultConfig(),
			type: "info",
			title: "",
			body: "",
			confirm: "Okay",
			cancel: null,
			parent: document.body,
			showHeader: !0,
			destroyOnClose: !0
		};
	}
	constructor(e, t) {
		super(e, t), this.$root && (this.$root.getElement().classList.add("alert"), n(this.$root).data("alert", this), this.trigger("init"), this.config.get("destroyOnClose") && this.on("close", () => this.destroy()), this.open());
	}
	createCardStructure() {
		this.config.get("showHeader") ? (this.header = t.findOrCreateElement(".modal-card-head", this.content, "header", ["modal-card-head", "has-background-" + this.config.get("type")]), this.headerTitle = t.createElement("p", ["modal-card-title", `has-text-${this.config.get("type")}-00`]), this.headerTitle.innerHTML = this.title, this.header.appendChild(this.headerTitle)) : this.$root.getElement()?.classList.add("has-no-header"), this.cardBody = t.findOrCreateElement(".modal-card-body", this.content, "section"), this.cardBody.innerHTML || (this.cardBody.innerHTML = this.body), this.footer = t.findOrCreateElement(".modal-card-foot", this.content, "footer");
	}
	createButtons() {
		var e = {
			close: !0,
			destroy: !0,
			onClick: function() {}
		};
		let n = t.createElement("div", ["buttons"]);
		var r = this.config.get("confirm");
		typeof r == "string" && (r = {
			label: r,
			classes: []
		}), r = {
			...e,
			...r
		};
		var i = t.createElement("button", ["button", "is-" + this.config.get("type")].concat(r.classes));
		if (i.innerHTML = r.label, i.addEventListener("click", (e) => {
			r.onClick(e), r.close && this.close();
		}), n.appendChild(i), this.config.get("cancel")) {
			var a = this.config.get("cancel");
			typeof a == "string" && (a = {
				label: a,
				classes: []
			}), a = {
				...e,
				...a
			};
			var o = t.createElement("button", ["button"].concat(a.classes));
			o.innerHTML = a.label, o.addEventListener("click", (e) => {
				a.onClick(e), a.close && this.close();
			}), n.appendChild(o), this.footer?.appendChild(n);
		}
	}
};
t.registerPlugin("alert", d);
//#endregion
//#region src/plugins/file/File.ts
var f = class extends i {
	input;
	filename;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".file"), t.each(r, (e) => {
			n(e).file();
		});
	}
	constructor(e, t) {
		super(e, t), this.$root.getElement().setAttribute("data-bulma-attached", "attached"), this.input = this.$root.getElement().querySelector("input"), this.filename = this.$root.getElement().querySelector(".file-name"), this.registerEvents(), n(this.$root).data("file", this), this.trigger("init");
	}
	registerEvents() {
		this.filename && this.input.addEventListener("change", this.handleTriggerChange.bind(this)), this.$root.getElement().addEventListener("dragover", (e) => {
			e.preventDefault(), this.addHoverClass();
		}), this.$root.getElement().addEventListener("dragleave", (e) => {
			e.preventDefault(), this.addHoverClass();
		}), this.$root.getElement().addEventListener("drop", (e) => {
			e.preventDefault(), this.removeHoverClass(), this.input.files = e.dataTransfer?.files ?? new FileList();
		});
	}
	handleTriggerChange(e) {
		if (!e.target) return;
		let t = e.target;
		t.files && (t.files.length === 0 && this.clearFileName(), t.files.length === 1 && this.setFileName(t.files[0].name), t.files.length > 1 && this.setFileName(t.files.length + " files"), this.trigger("changed", e));
	}
	clearFileName() {
		this.filename.innerHTML = "";
	}
	getFilename() {
		return this.filename.innerHTML;
	}
	setFileName(e) {
		this.filename.innerHTML = e;
	}
	addHoverClass() {
		this.$root.getElement().classList.add("is-hovered");
	}
	removeHoverClass() {
		this.$root.getElement().classList.remove("is-hovered");
	}
};
t.registerPlugin("file", f);
//#endregion
//#region src/plugins/tabs/Tabs.ts
var p = class extends i {
	hover;
	nav;
	navItems;
	content;
	contentItems;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".tabs-wrapper"), t.each(r, (e) => {
			n(e).tabs({ hover: e.hasAttribute("data-hover") });
		});
	}
	static defaultConfig() {
		return { hover: !1 };
	}
	constructor(e, t) {
		super(e, t), this.hover = this.config.get("hover"), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.content = this.findContent(), this.contentItems = this.findContentItems(), this.setupNavEvents(), n(this.$root).data("tabs", this), this.trigger("init");
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
		t.each(Array.from(this.navItems), (e, t) => {
			e.addEventListener("click", () => {
				this.setActive(t);
			}), this.hover && e.addEventListener("mouseover", () => {
				this.setActive(t);
			});
		});
	}
	setActive(e) {
		t.each(Array.from(this.navItems), (e) => {
			e.classList.remove("is-active");
		}), t.each(Array.from(this.contentItems), (e) => {
			e.classList.remove("is-active");
		}), this.navItems[e].classList.add("is-active"), this.contentItems[e].classList.add("is-active");
	}
};
t.registerPlugin("tabs", p);
//#endregion
//#region src/plugins/panelTabs/PanelTabs.ts
var m = class extends i {
	nav;
	navItems;
	contentItems;
	static parseDocument(e) {
		let r;
		r = e.hasOwnProperty("classList") && e.classList.contains("dropdown") ? [e] : e.querySelectorAll(".panel"), t.each(r, (e) => {
			e.querySelector(".panel-tabs") !== null && n(e).panelTabs();
		});
	}
	static defaultConfig() {
		return {};
	}
	constructor(e, t) {
		super(e, t), this.nav = this.findNav(), this.navItems = this.findNavItems(), this.contentItems = this.findContentItems(), this.setupNavEvents(), this.on("init", this.showActiveTab.bind(this)), n(this.$root).data("panelTabs", this), this.trigger("init");
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
		t.each(this.navItems, (e) => {
			e.addEventListener("click", () => {
				this.setActive(e.getAttribute("data-target"));
			});
		});
	}
	setActive(e) {
		this.navItems.forEach((t) => {
			t.getAttribute("data-target") === e ? t.classList.add("is-active") : t.classList.remove("is-active");
		}), this.contentItems.forEach((t) => {
			t.getAttribute("data-category") === e || e === null ? t.classList.remove("is-hidden") : t.classList.add("is-hidden");
		});
	}
	showActiveTab() {
		let e = !1;
		t.each(this.navItems, (t) => {
			t.classList.contains("is-active") && (this.setActive(t.getAttribute("data-target")), e = !0);
		}), e || this.setActive(this.navItems[0].getAttribute("data-target"));
	}
};
t.registerPlugin("panelTabs", m);
//#endregion
export { d as Alert, n as Bulma, t as Core, l as Dropdown, f as File, c as Message, u as Modal, s as Navbar, o as Notification, m as PanelTabs, p as Tabs };
