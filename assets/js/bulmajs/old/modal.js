/******/ (function(modules) { // webpackBootstrap
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.7.0',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].create(options);\n    },\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @return {undefined}\n     */\n    registerPlugin(key, plugin) {\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = plugin;\n    },\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM() {\n        let elements = document.querySelectorAll(this.getPluginClasses());\n\n        elements.forEach(element => {\n            let plugin = this.findCompatiblePlugin(element);\n\n            if (plugin.hasOwnProperty('handleDomParsing')) {\n                plugin.handleDomParsing(element);\n            }\n        });\n    },\n\n    /**\n     * Return a string of classes to search the DOM for\n     * @returns {string} The string containing the classes\n     */\n    getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            if (!this.plugins[key].getRootClass()) {\n                continue;\n            }\n\n            classes.push('.' + this.plugins[key].getRootClass());\n        }\n\n        return classes.join(',');\n    },\n\n    /**\n     * Search our plugins and find one that matches the element\n     * @param {HTMLElement} element The element we want to match for\n     * @returns {Object} The plugin that matched\n     */\n    findCompatiblePlugin(element) {\n        for (var key in this.plugins) {\n            if (element.classList.contains(this.plugins[key].getRootClass())) {\n                return this.plugins[key];\n            }\n        }\n    },\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        let elem = document.createElement(name);\n\n        classes.forEach(className => {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    },\n\n    /**\n     * Helper method to normalise a plugin finding an element.\n     * @param {string} query The CSS selector to query for\n     * @param {HTMLElement|null} context The element we want to search within\n     * @param {boolean} nullable Do we except a null response?\n     * @returns {null|HTMLElement} The element we found, or null if allowed.\n     * @throws {TypeError}\n     */\n    findElement(query, context = document, nullable = false) {\n        if (!query && !nullable) {\n            throw new TypeError('First argument to `findElement` required. Null given.');\n        }\n\n        if (!query) {\n            return null;\n        }\n\n        if (query.toString() === '[object HTMLElement]') {\n            return query;\n        }\n\n        return context.querySelector(query);\n    },\n\n    /**\n     * Find an element otherwise create a new one.\n     * @param {string} query The CSS selector query to find\n     * @param {HTMLElement|null} parent The parent we want to search/create within\n     * @param {[string]} elemName The name of the element to create\n     * @param {[array]} classes The classes to apply to the element\n     * @returns {HTMLElement} The HTML element we found or created\n     */\n    findOrCreateElement(query, parent = null, elemName = 'div', classes = []) {\n        var elem = this.findElement(query, parent);\n\n        if (!elem) {\n            if (classes.length === 0) {\n                classes = query.split('.').filter(item => {\n                    return item;\n                });\n            }\n\n            var newElem = this.createElement(elemName, classes);\n\n            if (parent) {\n                parent.appendChild(newElem);\n            }\n\n            return newElem;\n        }\n\n        return elem;\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    Bulma.traverseDOM();\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bulma);\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Plugin; });\n/**\n * Base plugin class. Provides basic, common functionality.\n * @class Plugin\n * @since 0.7.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Plugin {\n    /**\n     * Create a plugin.\n     * @param {object} options The options for this plugin\n     */\n    constructor(options) {\n        this.options = options || {};\n    }\n\n    /**\n     * Find an option by key.\n     * @param {string} key The option key to find.\n     * @param {any} defaultValue Default value if an option with key is not found.\n     * @returns {any} The value of the option we found, or defaultValue if none found.\n     */\n    option(key, defaultValue = null) {\n        if (!this.options.hasOwnProperty(key) || this.options[key] === null) {\n            if (typeof defaultValue === 'function') {\n                return defaultValue();\n            }\n\n            return defaultValue;\n        }\n\n        return this.options[key];\n    }\n}\n\n//# sourceURL=webpack:///./src/plugin.js?");

/***/ }),

/***/ "./src/plugins/modal.js":
/*!******************************!*\
  !*** ./src/plugins/modal.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../plugin */ \"./src/plugin.js\");\n\n\n\n/**\n * @module Modal\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Modal extends _plugin__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @return {undefined}\n     */\n    static handleDomParsing() {\n        return;\n    }\n\n    /**\n     * Get the root class this plugin is responsible for.\n     * This will tell the core to match this plugin to an element with a .modal class.\n     * @returns {string} The class this plugin is responsible for.\n     */\n    static getRootClass() {\n        return 'modal';\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options THe options object for the new instance\n     * @return {Modal} The newly created instance\n     */\n    static create(options) {\n        return new Modal(options);\n    }\n\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created plugin instance\n     */\n    constructor(options) {\n        super(options);\n\n        /** @param {string} */\n        this.type = this.option('type', 'card');\n\n        /** @param {HTMLElement} */\n        this.element = this.option('element');\n\n        if (!this.element) {\n            this.element = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('div', '.modal');\n\n            if (!this.element.classList.contains('modal')) {\n                this.element.classList.add('modal');\n            }\n        }\n\n        /** @param {HTMLElement} */\n        this.parent = this.option('parent');\n\n        if (!this.parent) {\n            if (!this.element.parentNode) {\n                this.parent = document.body;\n\n                this.parent.appendChild(this.element);\n            } else {\n                this.parent = this.element.parentNode;\n            }\n        } else {\n            this.parent.appendChild(this.element);\n        }\n\n        /** @param {HTMLElement} */\n        this.background = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-background', this.element);\n\n        /** @param {HTMLElement} */\n        this.content = this.type === 'card' ? _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-card', this.element) : _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-content', this.element);\n\n        /** @param {boolean} */\n        this.closable = this.option('closable', true);\n\n        /** @param {string|null} */\n        this.body = this.option('body');\n\n        /** @param {string|null} */\n        this.title = this.option('title');\n\n        if (this.type === 'card') {\n            /** @param {HTMLElement} */\n            this.header = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-card-head', this.content, 'header');\n\n            /** @param {HTMLElement} */\n            this.headerTitle = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-card-title', this.header, 'p');\n            if (!this.headerTitle.innerHTML) {\n                this.headerTitle.innerHTML = this.title;\n            }\n\n            /** @param {HTMLElement} */\n            this.cardBody = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-card-body', this.content, 'section');\n            if (!this.cardBody.innerHTML) {\n                this.cardBody.innerHTML = this.body;\n            }\n\n            /** @param {HTMLElement} */\n            this.footer = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-card-foot', this.content, 'footer');\n        } else {\n            if (!this.content.innerHTML) {\n                this.content.innerHTML = this.body;\n            }\n        }\n\n        if (this.closable) {\n            /** @param {HTMLElement} */\n            this.closeButton = this.type === 'card' ? _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.delete', this.header, 'button') : _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOrCreateElement('.modal-close', this.element, 'button');\n        }\n\n        /** @param {function} */\n        this.onOpen = this.option('onOpen');\n\n        /** @param {function} */\n        this.onClose = this.option('onClose');\n\n        if (this.type === 'card') {\n            this.createButtons();\n        }\n\n        this.setupEvents();\n    }\n\n    /**\n     * Setup the events used by this modal.\n     * @returns {void}\n     */\n    setupEvents() {\n        if (this.closable) {\n            this.closeButton.addEventListener('click', this.close.bind(this));\n\n            document.addEventListener('keyup', event => {\n                if (!this.element.classList.contains('is-active')) {\n                    return;\n                }\n\n                let key = event.key || event.keyCode;\n\n                if (key === 'Escape' || key === 'Esc' || key === 27) {\n                    this.close();\n                }\n            });\n\n            this.background.addEventListener('click', this.close.bind(this));\n        }\n    }\n\n    /**\n     * Go through the provided buttons option and create the buttons.\n     * @returns {void}\n     */\n    createButtons() {\n        var buttonsConfig = this.option('buttons', []);\n        var modal = this;\n\n        buttonsConfig.forEach(function (buttonConfig) {\n            var button = _core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('button', buttonConfig.classes);\n            button.innerHTML = buttonConfig.label;\n\n            button.addEventListener('click', function (event) {\n                buttonConfig.onClick(event);\n            });\n\n            modal.footer.appendChild(button);\n        });\n    }\n\n    /**\n     * Open the modal\n     * @returns {void}\n     */\n    open() {\n        this.element.classList.add('is-active');\n        document.body.classList.add('is-clipped');\n\n        if (this.onOpen) {\n            this.onOpen(this);\n        }\n    }\n\n    /**\n     * Close the modal\n     * @returns {void} \n     */\n    close() {\n        this.element.classList.remove('is-active');\n        document.body.classList.remove('is-clipped');\n\n        if (this.onClose) {\n            this.onClose(this);\n        }\n    }\n\n    /**\n     * Destroy this modal, unregistering element references and removing the modal.\n     * @returns {void}\n     */\n    destroy() {\n        this.element.remove();\n\n        this.parent = null;\n        this.element = null;\n        this.background = null;\n        this.content = null;\n\n        if (this.type === 'card') {\n            this.header = null;\n            this.headerTitle = null;\n            this.cardBody = null;\n            this.footer = null;\n        }\n\n        if (this.closable) {\n            this.closeButton = null;\n        }\n\n        this.options = [];\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('modal', Modal);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\n\n//# sourceURL=webpack:///./src/plugins/modal.js?");

/***/ })

/******/ });