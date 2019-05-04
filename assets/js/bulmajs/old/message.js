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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/message.js");
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

/***/ "./src/dismissableComponent.js":
/*!*************************************!*\
  !*** ./src/dismissableComponent.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DismissableComponent; });\n/**\n * @module DismissableComponent\n * @since  0.2.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass DismissableComponent {\n    /**\n     * Plugin constructor\n     * @param  {string} name Plugin's name\n     * @param  {Object} options Plugin's options\n     * @return {this} The new plugin instance\n     */\n    constructor(name, options) {\n        /**\n         * The name of this component, this will be used as the root class\n         * @type {string}\n         */\n        this.name = name;\n\n        /**\n        * Body text.\n        * @type {string}\n        */\n        this.body = options.hasOwnProperty('body') ? options.body : '';\n\n        /**\n        * The parent element to inject HTML\n        */\n        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;\n\n        /**\n        * Color modifier.\n        * @type {string} Possible values are null, primary, info, success, warning, danger\n        */\n        this.color = options.hasOwnProperty('color') ? options.color : '';\n\n        /**\n        * How long to wait before auto dismissing the component.\n        * @type {int|null} If null component must be dismissed manually.\n        */\n        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;\n\n        /**\n        * Does this component have a dismiss button?\n        * @type {Boolean}\n        */\n        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;\n\n        /**\n        * Should this component be destroyed when it is dismissed.\n        * @type {Boolean}\n        */\n        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;\n\n        /**\n        * The root element.\n        * @type {HTMLElement|null} If this is not provided a new element will be created.\n        */\n        this.root = options.hasOwnProperty('element') ? options.element : null;\n\n        /**\n        * The element used to close the component.\n        * @type {HTMLElement}\n        */\n        this.closeButton = options.hasOwnProperty('closeButton') ? options.closeButton : this.createCloseButton();\n\n        if (!this.root) {\n            this.createRootElement();\n            this.parent.appendChild(this.root);\n        }\n\n        if (this.body) {\n            this.insertBody();\n        }\n\n        if (this.color) {\n            this.setColor();\n        }\n    }\n\n    /**\n     * Create the main element.\n     * @return {undefined}\n     */\n    createRootElement() {\n        this.root = document.createElement('div');\n\n        this.root.classList.add(this.name);\n        this.hide();\n    }\n\n    /**\n     * Show the component.\n     * @return {undefined}\n     */\n    show() {\n        this.root.classList.remove('is-hidden');\n    }\n\n    /**\n     * Hide the component.\n     * @return {undefined}\n     */\n    hide() {\n        this.root.classList.add('is-hidden');\n    }\n\n    /**\n     * Insert the body text into the component.\n     * @return {undefined}\n     */\n    insertBody() {\n        this.root.innerHTML = this.body;\n    }\n\n    /**\n     * Create the element that will be used to close the component.\n     * @return {HTMLElement} The newly created close button\n     */\n    createCloseButton() {\n        var closeButton = document.createElement('button');\n        closeButton.setAttribute('type', 'button');\n        closeButton.classList.add('delete');\n\n        return closeButton;\n    }\n\n    /**\n     * Create an interval to dismiss the component after the set number of ms.\n     * @param  {int} interval The time to wait before dismissing the component\n     * @return {undefined}\n     */\n    createDismissInterval(interval) {\n        return setInterval(() => {\n            this.handleCloseEvent();\n        }, interval);\n    }\n\n    /**\n     * Insert the close button before our content.\n     * @return {undefined}\n     */\n    prependCloseButton() {\n        this.root.insertBefore(this.closeButton, this.root.firstChild);\n    }\n\n    /**\n     * Setup the event listener for the close button.\n     * @return {undefined}\n     */\n    setupCloseEvent() {\n        this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));\n    }\n\n    /**\n     * Handle the event when our close button is clicked.\n     * @return {undefined}\n     */\n    handleCloseEvent() {\n        if (this.destroyOnDismiss) {\n            this.destroy();\n        } else {\n            this.hide();\n        }\n    }\n\n    /**\n     * Set the colour of the component.\n     * @return {undefined}\n     */\n    setColor() {\n        this.root.classList.add('is-' + this.color);\n    }\n\n    /**\n     * Destroy the component, removing the event listener, interval and element.\n     * @return {undefined}\n     */\n    destroy() {\n        if (this.closeButton) {\n            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));\n        }\n\n        clearInterval(this.dismissInterval);\n\n        this.parent.removeChild(this.root);\n        this.parent = null;\n        this.root = null;\n    }\n}\n\n//# sourceURL=webpack:///./src/dismissableComponent.js?");

/***/ }),

/***/ "./src/plugins/message.js":
/*!********************************!*\
  !*** ./src/plugins/message.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n/* harmony import */ var _dismissableComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dismissableComponent */ \"./src/dismissableComponent.js\");\n\n\n\n/**\n * @module Message\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n * @extends DismissableComponent\n */\nclass Message extends _dismissableComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created instance\n     */\n    constructor(options) {\n        if (!options) {\n            options = {};\n        }\n\n        super('message', options);\n\n        /**\n         * The size of the message\n         * @type {String} Possible values are small, normal, medium or large\n         */\n        this.size = options.hasOwnProperty('size') ? options.size : '';\n\n        /**\n         * The title of the message\n         * @type {String}\n         */\n        this.title = options.hasOwnProperty('title') ? options.title : '';\n\n        if (this.title) {\n            this.createMessageHeader();\n        }\n\n        // TODO: Move this into the DismissableComponent class. Due to the required\n        // changes between different components, we may need a way to trigger this\n        // when the component is ready.\n        if (this.isDismissable) {\n            if (!options.hasOwnProperty('closeButton')) {\n                this.prependCloseButton();\n            }\n\n            this.setupCloseEvent();\n        }\n\n        if (this.size) {\n            this.setSize();\n        }\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options THe options object for this instance\n     * @return {Message} The newly created message instance\n     */\n    static create(options) {\n        return new Message(options);\n    }\n\n    /**\n     * Create the message header\n     * @return {undefined}\n     */\n    createMessageHeader() {\n        let header = document.createElement('div');\n        header.classList.add('message-header');\n\n        header.innerHTML = '<p>' + this.title + '</p>';\n\n        this.title = header;\n\n        this.root.insertBefore(this.title, this.root.firstChild);\n    }\n\n    /**\n     * Set the size of the message.\n     * @return {undefined}\n     */\n    setSize() {\n        this.root.classList.add('is-' + this.size);\n    }\n\n    /**\n     * Insert the body text into the component.\n     * @return {undefined}\n     */\n    insertBody() {\n        let body = document.createElement('div');\n        body.classList.add('message-body');\n        body.innerHTML = this.body;\n\n        this.root.appendChild(body);\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @param {HTMLElement} element The root element for this plugin\n     * @return {undefined}\n     */\n    static handleDomParsing(element) {\n        let closeBtn = element.querySelector('.delete');\n        let dismissInterval = element.getAttribute('data-dismiss-interval');\n\n        let options = {\n            body: null,\n            parent: element.parentNode,\n            element: element,\n            closeButton: closeBtn,\n            isDismissable: !!closeBtn,\n            destroyOnDismiss: true\n        };\n\n        if (dismissInterval) {\n            options['dismissInterval'] = parseInt(dismissInterval);\n        }\n\n        new Message(options);\n    }\n\n    /**\n     * Insert the close button before our content.\n     * @return {undefined}\n     */\n    prependCloseButton() {\n        this.title.appendChild(this.closeButton);\n    }\n\n    static getRootClass() {\n        return 'message';\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('message', Message);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Message);\n\n//# sourceURL=webpack:///./src/plugins/message.js?");

/***/ })

/******/ });