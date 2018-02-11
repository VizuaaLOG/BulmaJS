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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.3.1',

    /**
     * Helper method to create a new plugin.
     * @param  {String} key
     * @param  {Object} options
     * @return {Object}
     */
    create: function create(key, options) {
        if (!key || !Bulma.hasOwnProperty(key)) {
            throw new Error('[BulmaJS] A plugin with the key \'' + key + '\' has not been registered.');
        }

        return Bulma[key].create(options);
    },


    /**
     * Register a new plugin
     * @param  {String} key
     * @param  {Object} plugin
     */
    registerPlugin: function registerPlugin(key, plugin) {
        if (!key) {
            throw new Error('[BulmaJS] Key attribute is required.');
        }

        this[key] = plugin;
    },


    /**
     * Parse the HTML DOM searching for data-bulma attributes. We will then pass
     * each element to the appropriate plugin to handle the required processing.
     */
    traverseDOM: function traverseDOM() {
        var elements = document.querySelectorAll('[data-bulma]');

        elements.forEach(function (element) {
            var plugin = element.getAttribute('data-bulma');

            if (!Bulma.hasOwnProperty(plugin)) {
                throw new Error('[BulmaJS] Plugin with the key \'' + plugin + '\' has not been registered.');
            }

            if (Bulma[plugin].hasOwnProperty('handleDomParsing')) {
                Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);
            }
        });
    },


    /**
     * Create an element and assign classes
     * @param {string} name The name of the element to create
     * @param {array} classes An array of classes to add to the element
     */
    createElement: function createElement(name, classes) {
        if (!classes) classes = [];
        if (typeof classes === 'string') classes = [classes];

        var elem = document.createElement(name);

        classes.forEach(function (className) {
            elem.classList.add(className);
        });

        return elem;
    }
};

document.addEventListener('DOMContentLoaded', function () {
    Bulma.traverseDOM();
});

/* harmony default export */ __webpack_exports__["a"] = (Bulma);

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var Accordion = function () {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Accordion(options) {
        _classCallCheck(this, Accordion);

        if (!options) options = {};

        /**
         * Message body text.
         * @type {string}
         */
        this.root = options.hasOwnProperty('element') ? options.element : '';

        /**
         * Accordion items
         * @type {Array}
         */
        this.accordions = this.findAccordions();

        /**
         * Toggle buttons for each accordion item
         * @type {Array}
         */
        this.toggleButtons = this.findToggleButtons();

        this.addToggleButtonEvents();
    }

    /**
     * Find the accordion items within this accordions element
     * @returns {Array}
     */


    _createClass(Accordion, [{
        key: 'findAccordions',
        value: function findAccordions() {
            return this.root.querySelectorAll('.accordion');
        }

        /**
         * Find the toggle buttons within this accordions element
         * @returns {Array}
         */

    }, {
        key: 'findToggleButtons',
        value: function findToggleButtons() {
            var buttons = [];

            this.accordions.forEach(function (accordion) {
                buttons.push(accordion.querySelector('button.toggle'));
            });

            return buttons;
        }

        /**
         * Add click events to toggle buttons
         */

    }, {
        key: 'addToggleButtonEvents',
        value: function addToggleButtonEvents() {
            var _this = this;

            this.toggleButtons.forEach(function (toggleButton, index) {
                // If the button is null, the accordion item has no toggle button
                if (toggleButton !== null) {
                    toggleButton.addEventListener('click', function (event) {
                        _this.handleToggleClick(event, index);
                    });
                }
            });
        }

        /**
         * Handle the click
         * @param {Object} event 
         * @param {number} index 
         */

    }, {
        key: 'handleToggleClick',
        value: function handleToggleClick(event, index) {
            this.toggleAccordionVisibility(this.accordions[index]);
        }

        /**
         * Show or hide the accordion
         * @param {HTMLElement} accordion The accordion element
         */

    }, {
        key: 'toggleAccordionVisibility',
        value: function toggleAccordionVisibility(accordion) {
            this.accordions.forEach(function (a) {
                a.classList.remove('is-active');
            });

            if (accordion.classList.contains('is-active')) {
                accordion.classList.remove('is-active');
            } else {
                accordion.classList.add('is-active');
            }
        }

        /**
         * Helper method used by the Bulma core to create a new instance.
         * @param  {Object} options
         * @return {Accordion}
         */

    }, {
        key: 'destroy',


        /**
         * Destroy the message, removing the event listener, interval and element.
         */
        value: function destroy() {
            this.root = null;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'create',
        value: function create(options) {
            return new Accordion(options);
        }
    }, {
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            new Accordion({
                element: element
            });
        }
    }]);

    return Accordion;
}();

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('accordion', Accordion);

/* harmony default export */ __webpack_exports__["default"] = (Accordion);

/***/ })

/******/ });