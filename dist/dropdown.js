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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/dropdown.js");
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

/***/ "./src/plugins/dropdown.js":
/*!*********************************!*\
  !*** ./src/plugins/dropdown.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\n\n/**\n * @module Dropdown\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Dropdown {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created instance\n     */\n    constructor(options) {\n        if (!options.element || !options.trigger) {\n            throw new Error('[BulmaJS] The dropdown component requires an element and trigger to function.');\n        }\n\n        /**\n         * The root dropdown element.\n         * @type {HTMLElement}\n         */\n        this.root = options.element;\n\n        /**\n         * The element to trigger when clicked.\n         * @type {HTMLElement}\n         */\n        this.trigger = options.trigger;\n\n        this.registerEvents();\n    }\n\n    /**\n     * Register all the events this module needs.\n     * @return {undefined}\n     */\n    registerEvents() {\n        this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));\n    }\n\n    /**\n     * Handle the click event on the trigger.\n     * @return {undefined}\n     */\n    handleTriggerClick() {\n        if (this.root.classList.contains('is-active')) {\n            this.root.classList.remove('is-active');\n        } else {\n            this.root.classList.add('is-active');\n        }\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @param {HtmlElement} element The root element for this instance\n     * @return {undefined}\n     */\n    static handleDomParsing(element) {\n        let trigger = element.querySelector('.dropdown-trigger');\n\n        new Dropdown({\n            element: element,\n            trigger: trigger\n        });\n    }\n\n    static getRootClass() {\n        return 'dropdown';\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('dropdown', Dropdown);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dropdown);\n\n//# sourceURL=webpack:///./src/plugins/dropdown.js?");

/***/ })

/******/ });