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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/tabs.js");
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
eval("__webpack_require__.r(__webpack_exports__);\nconst Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.4.0',\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create(key, options) {\n        if (!key || !Bulma.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma[key].create(options);\n    },\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @return {undefined}\n     */\n    registerPlugin(key, plugin) {\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this[key] = plugin;\n    },\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM() {\n        let elements = document.querySelectorAll('[data-bulma]');\n\n        elements.forEach(function (element) {\n            let plugin = element.getAttribute('data-bulma');\n\n            if (!Bulma.hasOwnProperty(plugin)) {\n                throw new Error('[BulmaJS] Plugin with the key \\'' + plugin + '\\' has not been registered.');\n            }\n\n            if (Bulma[plugin].hasOwnProperty('handleDomParsing')) {\n                Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);\n            }\n        });\n    },\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        let elem = document.createElement(name);\n\n        classes.forEach(className => {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    Bulma.traverseDOM();\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bulma);\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/plugins/tabs.js":
/*!*****************************!*\
  !*** ./src/plugins/tabs.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\n\n/**\n * @module Tabs\n * @since  0.4.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Tabs {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created instance\n     */\n    constructor(options) {\n        if (!options) {\n            options = {};\n        }\n\n        this.root = options.hasOwnProperty('root') ? options.root : null;\n\n        this.nav = this.findNav();\n        this.navItems = this.findNavItems();\n\n        this.content = this.findContent();\n        this.contentItems = this.findContentItems();\n\n        this.setupNavEvents();\n    }\n\n    findNav() {\n        return this.root.querySelector('[data-links]');\n    }\n\n    findNavItems() {\n        return this.nav.querySelectorAll('li');\n    }\n\n    findContent() {\n        return this.root.querySelector('[data-content]');\n    }\n\n    findContentItems() {\n        return this.content.querySelectorAll('li');\n    }\n\n    setupNavEvents() {\n        this.navItems.forEach((navItem, index) => {\n            navItem.addEventListener('click', () => {\n                this.handleNavClick(navItem, index);\n            });\n        });\n    }\n\n    handleNavClick(navItem, index) {\n        this.navItems.forEach(navItem => {\n            navItem.classList.remove('is-active');\n        });\n\n        this.contentItems.forEach(contentItem => {\n            contentItem.classList.remove('is-active');\n        });\n\n        navItem.classList.add('is-active');\n        this.contentItems[index].classList.add('is-active');\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options The options object for this instance\n     * @return {Tabs} The newly created instance\n     */\n    static create(options) {\n        return new Tabs(options);\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @param {HTMLElement} element The root element for this instance\n     * @return {undefined}\n     */\n    static handleDomParsing(element) {\n        let options = {\n            root: element\n        };\n\n        new Tabs(options);\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('tabs', Tabs);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tabs);\n\n//# sourceURL=webpack:///./src/plugins/tabs.js?");

/***/ })

/******/ });