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
eval("__webpack_require__.r(__webpack_exports__);\nconst Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.7.0',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].create(options);\n    },\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @return {undefined}\n     */\n    registerPlugin(key, plugin) {\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = plugin;\n    },\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM() {\n        let elements = document.querySelectorAll(this.getPluginClasses());\n\n        elements.forEach(element => {\n            let plugin = this.findCompatiblePlugin(element);\n\n            if (plugin.hasOwnProperty('handleDomParsing')) {\n                plugin.handleDomParsing(element);\n            }\n        });\n    },\n\n    /**\n     * Return a string of classes to search the DOM for\n     * @returns {string}\n     */\n    getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            if (!this.plugins[key].getRootClass()) {\n                continue;\n            }\n\n            classes.push('.' + this.plugins[key].getRootClass());\n        }\n\n        return classes.join(',');\n    },\n\n    /**\n     * Search our plugins and find one that matches the element\n     * @returns {Object}\n     */\n    findCompatiblePlugin(element) {\n        for (var key in this.plugins) {\n            if (element.classList.contains(this.plugins[key].getRootClass())) {\n                return this.plugins[key];\n            }\n        }\n    },\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        let elem = document.createElement(name);\n\n        classes.forEach(className => {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    },\n\n    /**\n     * Helper method to normalise a plugin finding an element.\n     * @param {string} query \n     * @param {HTMLElement|null} context \n     * @param {boolean} nullable \n     * @returns {null|HTMLElement}\n     * @throws {TypeError}\n     */\n    findElement(query, context = document, nullable = false) {\n        if (!query && !nullable) {\n            throw new TypeError('First argument to `findElement` required. Null given.');\n        }\n\n        if (!query) {\n            return null;\n        }\n\n        if (query.toString() === '[object HTMLElement]') {\n            return query;\n        }\n\n        return context.querySelector(query);\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    Bulma.traverseDOM();\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bulma);\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/plugins/modal.js":
/*!******************************!*\
  !*** ./src/plugins/modal.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\n\n/**\n * @module Modal\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Modal {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created plugin instance\n     */\n    constructor(options) {\n        if (!options) {\n            options = {};\n        }\n\n        /**\n         * Message body text.\n         * @type {string}\n         */\n        this.root = options.hasOwnProperty('element') ? options.element : '';\n\n        /**\n         * Closable toggle switch.\n         * @type {bool}\n         */\n        this.closable = options.hasOwnProperty('closable') ? options.closable : true;\n\n        /**\n         * The element used to close the message.\n         * @type {HTMLElement}\n         */\n        this.closeButton = this.findCloseButton();\n\n        /**\n         * Create a bound version of our close event handler, this will\n         * allow us to remove the event listener later on.\n         * \n         * @type {Function}\n         */\n        this.boundHandleCloseEvent = this.handleCloseEvent.bind(this);\n\n        if (this.closeButton && this.closable) {\n            this.setupCloseEvent();\n        }\n\n        this.modalBackground = this.root.querySelector('.modal-background');\n        this.modalBackground.addEventListener('click', this.boundHandleCloseEvent);\n\n        /**\n         * Create a bound version of our event escape event handler, this will\n         * allow us to remove the event listener later on.\n         * \n         * @type {Function}\n         */\n        this.boundHandleEscapeClose = this.handleEscapeClose.bind(this);\n\n        document.addEventListener('keyup', this.boundHandleEscapeClose);\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options THe options object for the new instance\n     * @return {Modal} The newly created instance\n     */\n    static create(options) {\n        return new Modal(options);\n    }\n\n    /**\n     * Show the message.\n     * @return {undefined}\n     */\n    open() {\n        this.root.classList.add('is-active');\n        document.body.classList.add('is-clipped');\n    }\n\n    /**\n     * Hide the message.\n     * @return {undefined}\n     */\n    close() {\n        this.root.classList.remove('is-active');\n        document.body.classList.remove('is-clipped');\n    }\n\n    /**\n     * Find the close button.\n     * @return {HTMLElement} The newly created element\n     */\n    findCloseButton() {\n        let element = this.root.querySelector('.modal-close');\n\n        if (!element) {\n            return this.root.querySelector('.delete');\n        }\n\n        return element;\n    }\n\n    /**\n     * Setup the event listener for the close button.\n     * @return {undefined}\n     */\n    setupCloseEvent() {\n        this.closeButton.addEventListener('click', this.boundHandleCloseEvent);\n    }\n\n    /**\n     * Handle the event when our close button is clicked.\n     * @return {undefined}\n     */\n    handleCloseEvent() {\n        this.close();\n    }\n\n    /**\n     * Close the modal if the Escape key is pressed\n     * @return {undefined}\n     */\n    handleEscapeClose(event) {\n        let key = event.key || event.keyCode;\n\n        if (key === 'Escape' || key === 'Esc' || key === 27) {\n            this.close();\n        }\n    }\n\n    /**\n     * Destroy the message, removing the event listener, interval and element.\n     * @return {undefined}\n     */\n    destroy() {\n        if (this.closable && this.closeButton) {\n            this.closeButton.removeEventListener('click', this.boundHandleCloseEvent);\n        }\n\n        document.removeEventListener('keyup', this.boundHandleEscapeClose);\n        this.modalBackground.removeEventListener('click', this.boundHandleCloseEvent);\n\n        this.root = null;\n        this.closeButton = null;\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @return {undefined}\n     */\n    static handleDomParsing() {\n        return;\n    }\n\n    static getRootClass() {\n        return 'modal';\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('modal', Modal);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\n\n//# sourceURL=webpack:///./src/plugins/modal.js?");

/***/ })

/******/ });