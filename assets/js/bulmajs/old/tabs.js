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
eval("__webpack_require__.r(__webpack_exports__);\nconst Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.7.0',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].create(options);\n    },\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @return {undefined}\n     */\n    registerPlugin(key, plugin) {\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = plugin;\n    },\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM() {\n        let elements = document.querySelectorAll(this.getPluginClasses());\n\n        elements.forEach(element => {\n            let plugin = this.findCompatiblePlugin(element);\n\n            if (plugin.hasOwnProperty('handleDomParsing')) {\n                plugin.handleDomParsing(element);\n            }\n        });\n    },\n\n    /**\n     * Return a string of classes to search the DOM for\n     * @returns {string} The string containing the classes\n     */\n    getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            if (!this.plugins[key].getRootClass()) {\n                continue;\n            }\n\n            classes.push('.' + this.plugins[key].getRootClass());\n        }\n\n        return classes.join(',');\n    },\n\n    /**\n     * Search our plugins and find one that matches the element\n     * @param {HTMLElement} element The element we want to match for\n     * @returns {Object} The plugin that matched\n     */\n    findCompatiblePlugin(element) {\n        for (var key in this.plugins) {\n            if (element.classList.contains(this.plugins[key].getRootClass())) {\n                return this.plugins[key];\n            }\n        }\n    },\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        let elem = document.createElement(name);\n\n        classes.forEach(className => {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    },\n\n    /**\n     * Helper method to normalise a plugin finding an element.\n     * @param {string} query The CSS selector to query for\n     * @param {HTMLElement|null} context The element we want to search within\n     * @param {boolean} nullable Do we except a null response?\n     * @returns {null|HTMLElement} The element we found, or null if allowed.\n     * @throws {TypeError}\n     */\n    findElement(query, context = document, nullable = false) {\n        if (!query && !nullable) {\n            throw new TypeError('First argument to `findElement` required. Null given.');\n        }\n\n        if (!query) {\n            return null;\n        }\n\n        if (query.toString() === '[object HTMLElement]') {\n            return query;\n        }\n\n        return context.querySelector(query);\n    },\n\n    /**\n     * Find an element otherwise create a new one.\n     * @param {string} query The CSS selector query to find\n     * @param {HTMLElement|null} parent The parent we want to search/create within\n     * @param {[string]} elemName The name of the element to create\n     * @param {[array]} classes The classes to apply to the element\n     * @returns {HTMLElement} The HTML element we found or created\n     */\n    findOrCreateElement(query, parent = null, elemName = 'div', classes = []) {\n        var elem = this.findElement(query, parent);\n\n        if (!elem) {\n            if (classes.length === 0) {\n                classes = query.split('.').filter(item => {\n                    return item;\n                });\n            }\n\n            var newElem = this.createElement(elemName, classes);\n\n            if (parent) {\n                parent.appendChild(newElem);\n            }\n\n            return newElem;\n        }\n\n        return elem;\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    Bulma.traverseDOM();\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bulma);\n\n//# sourceURL=webpack:///./src/core.js?");

/***/ }),

/***/ "./src/plugins/tabs.js":
/*!*****************************!*\
  !*** ./src/plugins/tabs.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\n\n/**\n * @module Tabs\n * @since  0.4.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nclass Tabs {\n    /**\n     * Plugin constructor\n     * @param  {Object} options The options object for this plugin\n     * @return {this} The newly created instance\n     */\n    constructor(options) {\n        if (!options) {\n            options = {};\n        }\n\n        /**\n         * The root tab element\n         * @param {HTMLElement}\n         */\n        this.root = options.hasOwnProperty('root') ? options.root : null;\n\n        /**\n         * Whether the tabs should be changed when the nav item is hovered over\n         * @param {boolean}\n         */\n        this.hover = options.hasOwnProperty('hover') ? options.hover : false;\n\n        /**\n         * The tab nav container\n         * @param {HTMLElement}\n         */\n        this.nav = this.findNav();\n\n        /**\n         * The tab's nav items\n         * @param {HTMLElement[]}\n         */\n        this.navItems = this.findNavItems();\n\n        /**\n         * The tab content container\n         * @param {HTMLElement}\n         */\n        this.content = this.findContent();\n\n        /**\n         * The tab's content items\n         * @param {HTMLElement[]}\n         */\n        this.contentItems = this.findContentItems();\n\n        this.setupNavEvents();\n    }\n\n    /**\n     * Find the tab navigation container.\n     * @returns {HTMLElement} The navigation container\n     */\n    findNav() {\n        return this.root.querySelector('.tabs');\n    }\n\n    /**\n     * Find each individual tab item\n     * @returns {HTMLElement[]} An array of the found items\n     */\n    findNavItems() {\n        return this.nav.querySelectorAll('li');\n    }\n\n    /**\n     * Find the tab content container.\n     * @returns {HTMLElement} The content container\n     */\n    findContent() {\n        return this.root.querySelector('.tabs-content');\n    }\n\n    /**\n     * Find each individual content item\n     * @returns {HTMLElement[]} An array of the found items\n     */\n    findContentItems() {\n        return this.content.querySelectorAll('li');\n    }\n\n    /**\n     * Setup the events to handle tab changing\n     * @returns {void}\n     */\n    setupNavEvents() {\n        this.navItems.forEach((navItem, index) => {\n            navItem.addEventListener('click', () => {\n                this.handleNavClick(navItem, index);\n            });\n\n            if (this.hover) {\n                navItem.addEventListener('mouseover', () => {\n                    this.handleNavClick(navItem, index);\n                });\n            }\n        });\n    }\n\n    /**\n     * Handle the changing of the visible tab\n     * @param {HTMLelement} navItem The nav item we are changing to\n     * @param {number} index The internal index of the nav item we're changing to\n     * @returns {void}\n     */\n    handleNavClick(navItem, index) {\n        this.navItems.forEach(navItem => {\n            navItem.classList.remove('is-active');\n        });\n\n        this.contentItems.forEach(contentItem => {\n            contentItem.classList.remove('is-active');\n        });\n\n        navItem.classList.add('is-active');\n        this.contentItems[index].classList.add('is-active');\n    }\n\n    /**\n     * Helper method used by the Bulma core to create a new instance.\n     * @param  {Object} options The options object for this instance\n     * @returns {Tabs} The newly created instance\n     */\n    static create(options) {\n        return new Tabs(options);\n    }\n\n    /**\n     * Handle parsing the DOMs data attribute API.\n     * @param {HTMLElement} element The root element for this instance\n     * @returns {undefined}\n     */\n    static handleDomParsing(element) {\n        let hover = element.hasAttribute('data-hover') ? true : false;\n\n        let options = {\n            root: element,\n            hover: hover\n        };\n\n        new Tabs(options);\n    }\n\n    /**\n     * The root class used for initialisation\n     * @returns {string} The class this plugin is responsible for\n     */\n    static getRootClass() {\n        return 'tabs-wrapper';\n    }\n}\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerPlugin('tabs', Tabs);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tabs);\n\n//# sourceURL=webpack:///./src/plugins/tabs.js?");

/***/ })

/******/ });