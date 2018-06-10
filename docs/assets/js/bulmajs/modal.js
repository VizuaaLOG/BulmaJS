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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
eval("__webpack_require__.r(__webpack_exports__);\nconst Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.5.0',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].create(options);\n    },\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @return {undefined}\n     */\n    registerPlugin(key, plugin) {\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = plugin;\n    },\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM() {\n        let elements = document.querySelectorAll(this.getPluginClasses());\n\n        elements.forEach(element => {\n            let plugin = this.findCompatiblePlugin(element);\n\n            if (plugin.hasOwnProperty('handleDomParsing')) {\n                plugin.handleDomParsing(element);\n            }\n        });\n    },\n\n    getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            // FIXME: This is temporary, this check should not be required!\n            if (this.plugins[key].hasOwnProperty('getRootClass')) {\n                classes.push('.' + this.plugins[key].getRootClass());\n            }\n        }\n\n        return classes.join(',');\n    },\n\n    findCompatiblePlugin(element) {\n        for (var key in this.plugins) {\n            // FIXME: This is temporary, this check should not be required!\n            if (this.plugins[key].hasOwnProperty('getRootClass')) {\n                if (element.classList.contains(this.plugins[key].getRootClass())) {\n                    return this.plugins[key];\n                }\n            }\n        }\n    },\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        let elem = document.createElement(name);\n\n        classes.forEach(className => {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    Bulma.traverseDOM();\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bulma);\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/plugins/modal.js":
/*!******************************!*\
  !*** ./src/plugins/modal.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\n\n/**\n * @module Modal\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Modal {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created plugin instance\n     */\n    constructor(options) {\n        if (!options) {\n            options = {};\n        }\n\n        /**\n         * Message body text.\n         * @type {string}\n         */\n        this.root = options.hasOwnProperty('element') ? options.element : '';\n\n        /**\n         * Closable toggle switch.\n         * @type {bool}\n         */\n        this.closable = options.hasOwnProperty('closable') ? options.closable : true;\n\n        /**\n         * The element used to close the message.\n         * @type {HTMLElement}\n         */\n        this.closeButton = this.findCloseButton();\n\n        if (this.closeButton && this.closable) {\n            this.setupCloseEvent();\n        }\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options THe options object for the new instance\n     * @return {Modal} The newly created instance\n     */\n    static create(options) {\n        return new Modal(options);\n    }\n\n    /**\n     * Show the message.\n     * @return {undefined}\n     */\n    open() {\n        this.root.classList.add('is-active');\n    }\n\n    /**\n     * Hide the message.\n     * @return {undefined}\n     */\n    close() {\n        this.root.classList.remove('is-active');\n    }\n\n    /**\n     * Find the close button.\n     * @return {HTMLElement} The newly created element\n     */\n    findCloseButton() {\n        let element = this.root.querySelector('.modal-close');\n\n        if (!element) {\n            return this.root.querySelector('.delete');\n        }\n\n        return element;\n    }\n\n    /**\n     * Setup the event listener for the close button.\n     * @return {undefined}\n     */\n    setupCloseEvent() {\n        this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));\n    }\n\n    /**\n     * Handle the event when our close button is clicked.\n     * @return {undefined}\n     */\n    handleCloseEvent() {\n        this.close();\n    }\n\n    /**\n     * Destroy the message, removing the event listener, interval and element.\n     * @return {undefined}\n     */\n    destroy() {\n        if (this.closable && this.closeButton) {\n            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));\n        }\n\n        this.root = null;\n        this.closeButton = null;\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @return {undefined}\n     */\n    static handleDomParsing() {\n        return;\n    }\n\n    static getRootClass() {\n        return 'modal';\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('modal', Modal);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\n\n//# sourceURL=webpack:///./src/plugins/modal.js?");

/***/ })

/******/ });