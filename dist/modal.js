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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/modal.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.10.0',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create: function create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].handler.create(options);\n    },\n\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @param  {number?} priority The priority this plugin has over other plugins. Higher means the plugin is registered before lower.\n     * @return {undefined}\n     */\n    registerPlugin: function registerPlugin(key, plugin) {\n        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = {\n            priority: priority,\n            handler: plugin\n        };\n    },\n\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM: function traverseDOM() {\n        var _this = this;\n\n        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;\n\n        var elements = root.querySelectorAll(this.getPluginClasses());\n\n        this.each(elements, function (element) {\n            if (element.hasAttribute('data-bulma-attached')) {\n                return;\n            }\n\n            var plugins = _this.findCompatiblePlugins(element);\n\n            _this.each(plugins, function (plugin) {\n                plugin.handler.parse(element);\n            });\n        });\n    },\n\n\n    /**\n     * Return a string of classes to search the DOM for\n     * @returns {string} The string containing the classes\n     */\n    getPluginClasses: function getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            if (!this.plugins[key].handler.getRootClass()) {\n                continue;\n            }\n\n            classes.push('.' + this.plugins[key].handler.getRootClass());\n        }\n\n        return classes.join(',');\n    },\n\n\n    /**\n     * Search our plugins and find one that matches the element\n     * @param {HTMLElement} element The element we want to match for\n     * @returns {Object} The plugin that matched\n     */\n    findCompatiblePlugins: function findCompatiblePlugins(element) {\n        var _this2 = this;\n\n        var compatiblePlugins = [];\n\n        var sortedPlugins = Object.keys(this.plugins).sort(function (a, b) {\n            return _this2.plugins[a].priority < _this2.plugins[b].priority;\n        });\n\n        this.each(sortedPlugins, function (key) {\n            if (element.classList.contains(_this2.plugins[key].handler.getRootClass())) {\n                compatiblePlugins.push(_this2.plugins[key]);\n            }\n        });\n\n        return compatiblePlugins;\n    },\n\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement: function createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        var elem = document.createElement(name);\n\n        this.each(classes, function (className) {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    },\n\n\n    /**\n     * Helper method to normalise a plugin finding an element.\n     * @param {string} query The CSS selector to query for\n     * @param {HTMLElement|null} context The element we want to search within\n     * @param {boolean} nullable Do we except a null response?\n     * @returns {null|HTMLElement} The element we found, or null if allowed.\n     * @throws {TypeError}\n     */\n    findElement: function findElement(query) {\n        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n        var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n        if (!query && !nullable) {\n            throw new TypeError('First argument to `findElement` required. Null given.');\n        }\n\n        if (!query) {\n            return null;\n        }\n\n        if (query.toString() === '[object HTMLElement]') {\n            return query;\n        }\n\n        return context.querySelector(query);\n    },\n\n\n    /**\n     * Find an element otherwise create a new one.\n     * @param {string} query The CSS selector query to find\n     * @param {HTMLElement|null} parent The parent we want to search/create within\n     * @param {[string]} elemName The name of the element to create\n     * @param {[array]} classes The classes to apply to the element\n     * @returns {HTMLElement} The HTML element we found or created\n     */\n    findOrCreateElement: function findOrCreateElement(query) {\n        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n        var elemName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';\n        var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n\n        var elem = this.findElement(query, parent);\n\n        if (!elem) {\n            if (classes.length === 0) {\n                classes = query.split('.').filter(function (item) {\n                    return item;\n                });\n            }\n\n            var newElem = this.createElement(elemName, classes);\n\n            if (parent) {\n                parent.appendChild(newElem);\n            }\n\n            return newElem;\n        }\n\n        return elem;\n    },\n\n\n    /**\n     * For loop helper\n     * @param {*} objects The array/object to loop through\n     * @param {*} callback The callback used for each item\n     */\n    each: function each(objects, callback) {\n        var i = void 0;\n\n        for (i = 0; i < objects.length; i++) {\n            callback(objects[i], i);\n        }\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    if (window.hasOwnProperty('bulmaOptions') && window.bulmaOptions.autoParseDocument === false) {\n        return;\n    }\n\n    Bulma.traverseDOM();\n});\n\nexports.default = Bulma;\n\n//# sourceURL=webpack://Bulma/./src/core.js?");

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base plugin class. Provides basic, common functionality.\n * @class Plugin\n * @since 0.7.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nvar Plugin = function () {\n    _createClass(Plugin, null, [{\n        key: 'create',\n\n        /**\n         * Helper method used by the Bulma core to create a new instance.\n         * @param  {Object?} options The options object for this instance\n         * @return {Plugin|boolean} The newly created instance or false if method is not used\n         */\n        value: function create() {\n            return false;\n        }\n\n        /**\n         * Handle parsing the DOM elements.\n         * @param {HTMLElement?} element The root element for this instance\n         * @return {Plugin|boolean} The new plugin instance, or false if method is not used\n         */\n\n    }, {\n        key: 'parse',\n        value: function parse() {\n            return false;\n        }\n\n        /**\n         * Returns a string containing the element class this plugin supports.\n         * @returns {string} The class name.\n         * @throws {Error} Thrown if this method has not been replaced.\n         */\n\n    }, {\n        key: 'getRootClass',\n        value: function getRootClass() {\n            throw new Error('The getRootClass method should have been replaced by the plugin being created.');\n        }\n\n        /**\n         * Returns an object containing the default options for this plugin.\n         * @returns {object} The default options object.\n         */\n\n    }, {\n        key: 'defaultOptions',\n        value: function defaultOptions() {\n            return {};\n        }\n\n        /**\n         * Create a plugin.\n         * @param {object} options The options for this plugin\n         */\n\n    }]);\n\n    function Plugin() {\n        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n        _classCallCheck(this, Plugin);\n\n        this.options = _extends({}, this.constructor.defaultOptions(), options);\n\n        this.parent = this.option('parent', document.body);\n    }\n\n    /**\n     * Find an option by key.\n     * @param {string} key The option key to find.\n     * @param {any} defaultValue Default value if an option with key is not found.\n     * @returns {any} The value of the option we found, or defaultValue if none found.\n     */\n\n\n    _createClass(Plugin, [{\n        key: 'option',\n        value: function option(key) {\n            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n            if (!this.options.hasOwnProperty(key) || this.options[key] === null) {\n                if (typeof defaultValue === 'function') {\n                    return defaultValue();\n                }\n\n                return defaultValue;\n            }\n\n            return this.options[key];\n        }\n    }]);\n\n    return Plugin;\n}();\n\nexports.default = Plugin;\n\n//# sourceURL=webpack://Bulma/./src/plugin.js?");

/***/ }),

/***/ "./src/plugins/modal.js":
/*!******************************!*\
  !*** ./src/plugins/modal.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\nvar _core2 = _interopRequireDefault(_core);\n\nvar _plugin = __webpack_require__(/*! ../plugin */ \"./src/plugin.js\");\n\nvar _plugin2 = _interopRequireDefault(_plugin);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @module Modal\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nvar Modal = function (_Plugin) {\n    _inherits(Modal, _Plugin);\n\n    _createClass(Modal, null, [{\n        key: 'create',\n\n        /**\n         * Helper method used by the Bulma core to create a new instance.\n         * @param  {Object} options THe options object for the new instance\n         * @return {Modal} The newly created instance\n         */\n        value: function create(options) {\n            return new Modal(options);\n        }\n\n        /**\n         * Get the root class this plugin is responsible for.\n         * This will tell the core to match this plugin to an element with a .modal class.\n         * @returns {string} The class this plugin is responsible for.\n         */\n\n    }, {\n        key: 'getRootClass',\n        value: function getRootClass() {\n            return 'modal';\n        }\n\n        /**\n         * Returns an object containing the default options for this plugin.\n         * @returns {object} The default options object.\n         */\n\n    }, {\n        key: 'defaultOptions',\n        value: function defaultOptions() {\n            return {\n                style: 'card',\n                closable: true\n            };\n        }\n\n        /**\n         * Plugin constructor\n         * @param  {Object} options The options object for this plugin\n         * @return {this} The newly created plugin instance\n         */\n\n    }]);\n\n    function Modal(options) {\n        _classCallCheck(this, Modal);\n\n        /** @param {string} */\n        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, options));\n\n        _this.style = _this.option('style');\n\n        /** @param {HTMLElement} */\n        _this.element = _this.option('element');\n\n        if (!_this.element) {\n            _this.element = _core2.default.createElement('div', 'modal');\n        }\n\n        /** @param {HTMLElement} */\n        _this.parent = _this.option('parent');\n\n        if (!_this.parent) {\n            if (!_this.element.parentNode) {\n                _this.parent = document.body;\n\n                _this.parent.appendChild(_this.element);\n            } else {\n                _this.parent = _this.element.parentNode;\n            }\n        } else {\n            _this.parent.appendChild(_this.element);\n        }\n\n        /** @param {HTMLElement} */\n        _this.background = _core2.default.findOrCreateElement('.modal-background', _this.element);\n\n        /** @param {HTMLElement} */\n        _this.content = _this.style === 'card' ? _core2.default.findOrCreateElement('.modal-card', _this.element) : _core2.default.findOrCreateElement('.modal-content', _this.element);\n\n        /** @param {boolean} */\n        _this.closable = _this.option('closable');\n\n        /** @param {string|null} */\n        _this.body = _this.option('body');\n\n        /** @param {string|null} */\n        _this.title = _this.option('title');\n\n        if (_this.style === 'card') {\n            _this.createCardStructure();\n        } else {\n            if (!_this.content.innerHTML) {\n                _this.content.innerHTML = _this.body;\n            }\n        }\n\n        if (_this.closable) {\n            /** @param {HTMLElement} */\n            _this.closeButton = _this.style === 'card' ? _core2.default.findOrCreateElement('.delete', _this.header, 'button') : _core2.default.findOrCreateElement('.modal-close', _this.element, 'button');\n        }\n\n        /** @param {function} */\n        _this.onOpen = _this.option('onOpen');\n\n        /** @param {function} */\n        _this.onClose = _this.option('onClose');\n\n        if (_this.style === 'card') {\n            _this.createButtons();\n        }\n\n        _this.setupEvents();\n        return _this;\n    }\n\n    /**\n     * Create the card style structure\n     * @returns {void}\n     */\n\n\n    _createClass(Modal, [{\n        key: 'createCardStructure',\n        value: function createCardStructure() {\n            /** @param {HTMLElement} */\n            this.header = _core2.default.findOrCreateElement('.modal-card-head', this.content, 'header');\n\n            /** @param {HTMLElement} */\n            this.headerTitle = _core2.default.findOrCreateElement('.modal-card-title', this.header, 'p');\n            if (!this.headerTitle.innerHTML) {\n                this.headerTitle.innerHTML = this.title;\n            }\n\n            /** @param {HTMLElement} */\n            this.cardBody = _core2.default.findOrCreateElement('.modal-card-body', this.content, 'section');\n            if (!this.cardBody.innerHTML) {\n                this.cardBody.innerHTML = this.body;\n            }\n\n            /** @param {HTMLElement} */\n            this.footer = _core2.default.findOrCreateElement('.modal-card-foot', this.content, 'footer');\n        }\n\n        /**\n         * Setup the events used by this modal.\n         * @returns {void}\n         */\n\n    }, {\n        key: 'setupEvents',\n        value: function setupEvents() {\n            var _this2 = this;\n\n            if (this.closable) {\n                this.closeButton.addEventListener('click', this.close.bind(this));\n\n                document.addEventListener('keyup', function (event) {\n                    if (!_this2.element.classList.contains('is-active')) {\n                        return;\n                    }\n\n                    var key = event.key || event.keyCode;\n\n                    if (key === 'Escape' || key === 'Esc' || key === 27) {\n                        _this2.close();\n                    }\n                });\n\n                this.background.addEventListener('click', this.close.bind(this));\n            }\n        }\n\n        /**\n         * Go through the provided buttons option and create the buttons.\n         * @returns {void}\n         */\n\n    }, {\n        key: 'createButtons',\n        value: function createButtons() {\n            var buttonsConfig = this.option('buttons', []);\n            var modal = this;\n\n            _core2.default.each(buttonsConfig, function (buttonConfig) {\n                var button = _core2.default.createElement('button', buttonConfig.classes);\n                button.innerHTML = buttonConfig.label;\n\n                button.addEventListener('click', function (event) {\n                    buttonConfig.onClick(event);\n                });\n\n                modal.footer.appendChild(button);\n            });\n        }\n\n        /**\n         * Open the modal\n         * @returns {void}\n         */\n\n    }, {\n        key: 'open',\n        value: function open() {\n            this.element.classList.add('is-active');\n            document.documentElement.classList.add('is-clipped');\n\n            if (this.onOpen) {\n                this.onOpen(this);\n            }\n        }\n\n        /**\n         * Close the modal\n         * @returns {void} \n         */\n\n    }, {\n        key: 'close',\n        value: function close() {\n            this.element.classList.remove('is-active');\n            document.documentElement.classList.remove('is-clipped');\n\n            if (this.onClose) {\n                this.onClose(this);\n            }\n        }\n\n        /**\n         * Destroy this modal, unregistering element references and removing the modal.\n         * @returns {void}\n         */\n\n    }, {\n        key: 'destroy',\n        value: function destroy() {\n            this.element.remove();\n\n            this.parent = null;\n            this.element = null;\n            this.background = null;\n            this.content = null;\n\n            if (this.style === 'card') {\n                this.header = null;\n                this.headerTitle = null;\n                this.cardBody = null;\n                this.footer = null;\n            }\n\n            if (this.closable) {\n                this.closeButton = null;\n            }\n\n            this.options = [];\n        }\n    }]);\n\n    return Modal;\n}(_plugin2.default);\n\n_core2.default.registerPlugin('modal', Modal);\n\nexports.default = Modal;\n\n//# sourceURL=webpack://Bulma/./src/plugins/modal.js?");

/***/ })

/******/ })["default"];
});