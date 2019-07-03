(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Bulma", [], factory);
	else if(typeof exports === 'object')
		exports["Bulma"] = factory();
	else
		root["Bulma"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/accordion.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ConfigBag.js":
/*!**************************!*\
  !*** ./src/ConfigBag.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Object to hold a plugin's configuration\n * @class ConfigBag\n * @since 0.11.0\n * @author Thomas Erbe <vizuaalog@gmail.com>\n */\nvar ConfigBag = function () {\n    function ConfigBag() {\n        var initialConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n        _classCallCheck(this, ConfigBag);\n\n        if ((typeof initialConfig === 'undefined' ? 'undefined' : _typeof(initialConfig)) !== 'object') {\n            throw new TypeError('initialConfig must be of type object.');\n        }\n\n        this._items = initialConfig;\n    }\n\n    /**\n     * Set a new config property\n     * @param {string} key The config property's key\n     * @param {mixed} value The config property's value\n     */\n\n\n    _createClass(ConfigBag, [{\n        key: 'set',\n        value: function set(key, value) {\n            if (!key || !value) {\n                throw new Error('A key and value must be provided when setting a new option.');\n            }\n\n            this._items[key] = value;\n        }\n\n        /**\n         * Check if a key exists\n         * @param {string} key\n         * @returns {boolean}\n         */\n\n    }, {\n        key: 'has',\n        value: function has(key) {\n            if (!key) {\n                throw new Error('A key must be provided.');\n            }\n\n            return this._items.hasOwnProperty(key) && this._items[key];\n        }\n\n        /**\n         * Get a property by it's key. Returns the defaultValue if it doesn't exists\n         * @param {string} key \n         * @param {mixed} defaultValue \n         * @returns {mixed}\n         */\n\n    }, {\n        key: 'get',\n        value: function get(key) {\n            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n            if (defaultValue && !this.has(key)) {\n                if (typeof defaultValue === 'function') {\n                    return defaultValue();\n                }\n\n                return defaultValue;\n            }\n\n            return this._items[key];\n        }\n    }]);\n\n    return ConfigBag;\n}();\n\nexports.default = ConfigBag;\n\n//# sourceURL=webpack://Bulma/./src/ConfigBag.js?");

/***/ }),

/***/ "./src/Data.js":
/*!*********************!*\
  !*** ./src/Data.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Data = function () {\n    function Data() {\n        _classCallCheck(this, Data);\n\n        this._data = {};\n    }\n\n    _createClass(Data, [{\n        key: \"set\",\n        value: function set(uid, key, value) {\n            if (!this._data.hasOwnProperty(uid)) {\n                this._data[uid] = {};\n            }\n\n            this._data[uid][key] = value;\n        }\n    }, {\n        key: \"get\",\n        value: function get(uid, key) {\n            if (!this._data.hasOwnProperty(uid)) {\n                return undefined;\n            }\n\n            return this._data[uid][key];\n        }\n    }]);\n\n    return Data;\n}();\n\nData.uid = 1;\n\nexports.default = Data;\n\n//# sourceURL=webpack://Bulma/./src/Data.js?");

/***/ }),

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _Data = __webpack_require__(/*! ./Data */ \"./src/Data.js\");\n\nvar _Data2 = _interopRequireDefault(_Data);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Wrap an element around Bulma.\n * @param {String|HTMLElement} selector The selector or HTMLElement to wrap.\n */\nfunction Bulma(selector) {\n    if (!(this instanceof Bulma)) {\n        return new Bulma(selector);\n    }\n\n    if (selector instanceof HTMLElement) {\n        this._elem = selector;\n    } else {\n        this._elem = document.querySelector(selector);\n    }\n\n    if (!this._elem.hasOwnProperty(Bulma.id)) {\n        this._elem[Bulma.id] = _Data2.default.uid++;\n    }\n\n    return this;\n}\n\n/**\n * Current BulmaJS version.\n * @type {String}\n */\nBulma.VERSION = '0.11.0';\n\n/**\n * Unique ID of Bulma\n * @type {String}\n */\nBulma.id = 'bulma-' + new Date().getTime();\n\n/**\n * Global data cache for HTML elements\n * @type {Data}\n */\nBulma.cache = new _Data2.default();\n\n/**\n * An index of the registered plugins\n * @type {Object}\n */\nBulma.plugins = {};\n\n/**\n * Helper method to create a new plugin.\n * @param  {String} key The plugin's key\n * @param  {Object} config The config to be passed to the plugin\n * @return {Object} The newly created plugin instance\n */\nBulma.create = function (key, config) {\n    if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n        throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n    }\n\n    return new Bulma.plugins[key].handler(config);\n};\n\n/**\n * Register a new plugin\n * @param  {String} key The key to register the plugin under\n * @param  {Object} plugin The plugin's main constructor\n * @param  {number?} priority The priority this plugin has over other plugins. Higher means the plugin is registered before lower.\n * @return {undefined}\n */\nBulma.registerPlugin = function (key, plugin) {\n    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n    if (!key) {\n        throw new Error('[BulmaJS] Key attribute is required.');\n    }\n\n    Bulma.plugins[key] = {\n        priority: priority,\n        handler: plugin\n    };\n\n    Bulma.prototype[key] = function (config) {\n        return Bulma.plugins[key].handler.create(this, config);\n    };\n};\n\n/**\n * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n * each element to the appropriate plugin to handle the required processing.\n * @param  {HTMLElement} root The root of the document we're going to parse.\n * @return {undefined}\n */\nBulma.parseDocument = function () {\n    var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;\n\n    var sortedPlugins = Object.keys(Bulma.plugins).sort(function (a, b) {\n        return Bulma.plugins[a].priority < Bulma.plugins[b].priority;\n    });\n\n    Bulma.each(sortedPlugins, function (key) {\n        if (!Bulma.plugins[key].handler.hasOwnProperty('parseDocument')) {\n            // eslint-disable-next-line no-console\n            console.error('[BulmaJS] Plugin ' + key + ' does not have a parseDocument method. Automatic document parsing is not possible for this plugin.');\n            return;\n        }\n\n        Bulma.plugins[key].handler.parseDocument(root);\n    });\n};\n\n/**\n * Create an element and assign classes\n * @param {string} name The name of the element to create\n * @param {array} classes An array of classes to add to the element\n * @return {HTMLElement} The newly created element\n */\nBulma.createElement = function (name, classes) {\n    if (!classes) {\n        classes = [];\n    }\n\n    if (typeof classes === 'string') {\n        classes = [classes];\n    }\n\n    var elem = document.createElement(name);\n\n    Bulma.each(classes, function (className) {\n        elem.classList.add(className);\n    });\n\n    return elem;\n};\n\n/**\n * Find an element otherwise create a new one.\n * @param {string} query The CSS selector query to find\n * @param {HTMLElement|null} parent The parent we want to search/create within\n * @param {[string]} elemName The name of the element to create\n * @param {[array]} classes The classes to apply to the element\n * @returns {HTMLElement} The HTML element we found or created\n */\nBulma.findOrCreateElement = function (query) {\n    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n    var elemName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';\n    var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n\n    var elem = parent.querySelector(query);\n\n    if (!elem) {\n        if (classes.length === 0) {\n            classes = query.split('.').filter(function (item) {\n                return item;\n            });\n        }\n\n        var newElem = Bulma.createElement(elemName, classes);\n\n        parent.appendChild(newElem);\n\n        return newElem;\n    }\n\n    return elem;\n};\n\n/**\n * For loop helper\n * @param {*} objects The array/object to loop through\n * @param {*} callback The callback used for each item\n */\nBulma.each = function (objects, callback) {\n    var i = void 0;\n\n    for (i = 0; i < objects.length; i++) {\n        callback(objects[i], i);\n    }\n};\n\n/**\n * Make an AJAX GET request to the specified URL. Stripping any script tags from the response.\n * @param {*} url The url to send the request to\n * @returns {Promise} Returns a promise containing the response HTML or error\n */\nBulma.ajax = function (url) {\n    return new Promise(function (resolve, reject) {\n        var request = new XMLHttpRequest();\n        request.open('GET', url, true);\n\n        request.onload = function () {\n            if (request.status >= 200 && request.status < 400) {\n                resolve(Bulma._stripScripts(request.responseText));\n            } else {\n                reject();\n            }\n        };\n\n        request.onerror = function () {\n            return reject();\n        };\n\n        request.send();\n    });\n};\n\n/**\n * Strip any script tags from a HTML string.\n * @param {string} htmlString \n * @returns {string} The cleaned HTML string\n * \n * @private\n */\nBulma._stripScripts = function (htmlString) {\n    var div = document.createElement('div');\n    div.innerHTML = htmlString;\n\n    var scripts = div.getElementsByTagName('script');\n\n    var i = scripts.length;\n\n    while (i--) {\n        scripts[i].parentNode.removeChild(scripts[i]);\n    }\n\n    return div.innerHTML;\n};\n\n/**\n * Get or set custom data on a Bulma element.\n * @type {String} key\n * @type {any} value\n * @returns {Bulma}\n */\nBulma.prototype.data = function (key, value) {\n    if (!value) {\n        return Bulma.cache.get(this._elem[Bulma.id], key);\n    }\n\n    Bulma.cache.set(this._elem[Bulma.id], key, value);\n\n    return this;\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    if (window.hasOwnProperty('bulmaOptions') && window.bulmaOptions.autoParseDocument === false) {\n        return;\n    }\n\n    Bulma.parseDocument();\n});\n\nexports.default = Bulma;\n\n//# sourceURL=webpack://Bulma/./src/core.js?");

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _ConfigBag = __webpack_require__(/*! ./ConfigBag */ \"./src/ConfigBag.js\");\n\nvar _ConfigBag2 = _interopRequireDefault(_ConfigBag);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base plugin class. Provides basic, common functionality.\n * @class Plugin\n * @since 0.7.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nvar Plugin = function () {\n    _createClass(Plugin, null, [{\n        key: 'defaultConfig',\n\n        /**\n         * Returns an object containing the default config for this plugin.\n         * @returns {object} The default config object.\n         */\n        value: function defaultConfig() {\n            return {};\n        }\n\n        /**\n         * Create a plugin.\n         * @param {object} config The config for this plugin\n         */\n\n    }]);\n\n    function Plugin() {\n        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n        _classCallCheck(this, Plugin);\n\n        this.config = new _ConfigBag2.default(_extends({}, this.constructor.defaultConfig(), config));\n\n        this.parent = this.config.get('parent', document.body);\n\n        this._events = {};\n    }\n\n    _createClass(Plugin, [{\n        key: 'on',\n        value: function on(event, callback) {\n            if (!this._events.hasOwnProperty(event)) {\n                this._events[event] = [];\n            }\n\n            this._events[event].push(callback);\n        }\n    }, {\n        key: 'trigger',\n        value: function trigger(event) {\n            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n            if (!this._events.hasOwnProperty(event)) {\n                return;\n            }\n\n            for (var i = 0; i < this._events[event].length; i++) {\n                this._events[event][i](data);\n            }\n        }\n    }]);\n\n    return Plugin;\n}();\n\nexports.default = Plugin;\n\n//# sourceURL=webpack://Bulma/./src/plugin.js?");

/***/ }),

/***/ "./src/plugins/accordion.js":
/*!**********************************!*\
  !*** ./src/plugins/accordion.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\nvar _core2 = _interopRequireDefault(_core);\n\nvar _plugin = __webpack_require__(/*! ../plugin */ \"./src/plugin.js\");\n\nvar _plugin2 = _interopRequireDefault(_plugin);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @module Accordion\n * @since  0.3.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n * @deprecated\n */\nvar Accordion = function (_Plugin) {\n    _inherits(Accordion, _Plugin);\n\n    _createClass(Accordion, null, [{\n        key: 'create',\n\n        /**\n         * Helper method used by the Bulma core to create a new instance.\n         * @param  {Object} config The plugin's config\n         * @return {Accordion} The newly created instance\n         */\n        value: function create(config) {\n            // This checks if this method is being called directly, rather\n            // than through the Bulma core. If so make sure we grab the config\n            // as we do not need the key.\n            if (arguments.length > 1) config = arguments[1];\n\n            return new Accordion(config);\n        }\n\n        /**\n         * Handle parsing the DOM.\n         * @param {HTMLElement} element The root element for this accordion\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'parseDocument',\n        value: function parseDocument(context) {\n            var elements = context.querySelectorAll('.accordions');\n\n            _core2.default.each(elements, function (element) {\n                (0, _core2.default)(element).data('accordion', new Accordion({\n                    element: element\n                }));\n            });\n        }\n\n        /**\n         * Plugin constructor\n         * @param  {Object} config The plugin's config\n         * @return {this} The new plugin instance\n         */\n\n    }]);\n\n    function Accordion(config) {\n        _classCallCheck(this, Accordion);\n\n        // eslint-disable-next-line no-console\n        var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, config));\n\n        console.warn('[BulmaJS] The accordion plugin has been deprecated and will be removed in the 1.0 release. It is recommended to use the Wikiki\\'s accordion plugin');\n\n        // Work out the parent if it hasn't been supplied as an option.\n        if (_this.parent === null) {\n            _this.parent = _this.config.get('element').parentNode;\n        }\n\n        /**\n         * Accordion element.\n         * @type {string}\n         */\n        _this.element = _this.config.get('element');\n        _this.element.setAttribute('data-bulma-attached', 'attached');\n\n        /**\n         * Accordion items\n         * @type {Array}\n         */\n        _this.accordions = _this.findAccordions();\n\n        /**\n         * Toggle buttons for each accordion item\n         * @type {Array}\n         */\n        _this.toggleButtons = _this.findToggleButtons();\n\n        _this.addToggleButtonEvents();\n\n        _this.trigger('init');\n        return _this;\n    }\n\n    /**\n     * Find the accordion items within this accordions element\n     * @returns {Array} The accordion elements found\n     */\n\n\n    _createClass(Accordion, [{\n        key: 'findAccordions',\n        value: function findAccordions() {\n            return this.element.querySelectorAll('.accordion');\n        }\n\n        /**\n         * Find the toggle buttons within this accordions element\n         * @returns {Array} The toggle buttons found\n         */\n\n    }, {\n        key: 'findToggleButtons',\n        value: function findToggleButtons() {\n            var buttons = [];\n\n            _core2.default.each(this.accordions, function (accordion) {\n                buttons.push(accordion.querySelector('button.toggle'));\n            });\n\n            return buttons;\n        }\n\n        /**\n         * Add click events to toggle buttons\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'addToggleButtonEvents',\n        value: function addToggleButtonEvents() {\n            var _this2 = this;\n\n            _core2.default.each(this.toggleButtons, function (toggleButton, index) {\n                // If the button is null, the accordion item has no toggle button\n                if (toggleButton !== null) {\n                    toggleButton.addEventListener('click', function (event) {\n                        _this2.handleToggleClick(event, index);\n                    });\n                }\n            });\n        }\n\n        /**\n         * Handle the click\n         * @param {Object} event The event object\n         * @param {number} index Index of the accordion to toggle\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'handleToggleClick',\n        value: function handleToggleClick(event, index) {\n            this.toggleAccordionVisibility(this.accordions[index]);\n        }\n\n        /**\n         * Show or hide the accordion\n         * @param {HTMLElement} accordion The accordion element\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'toggleAccordionVisibility',\n        value: function toggleAccordionVisibility(accordion) {\n            _core2.default.each(this.accordions, function (a) {\n                a.classList.remove('is-active');\n            });\n\n            if (accordion.classList.contains('is-active')) {\n                accordion.classList.remove('is-active');\n            } else {\n                accordion.classList.add('is-active');\n            }\n        }\n\n        /**\n         * Destroy the accordion\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'destroy',\n        value: function destroy() {\n            this.element = null;\n\n            this.trigger('destroyed');\n        }\n    }]);\n\n    return Accordion;\n}(_plugin2.default);\n\n_core2.default.registerPlugin('accordion', Accordion);\n\nexports.default = Accordion;\n\n//# sourceURL=webpack://Bulma/./src/plugins/accordion.js?");

/***/ })

/******/ })["default"];
});