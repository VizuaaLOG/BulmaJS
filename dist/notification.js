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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Notification = function () {
    function Notification(body, options) {
        _classCallCheck(this, Notification);

        if (!options) options = {};

        /**
         * Notifications body text.
         * @type {string}
         */
        this.body = body;

        /**
         * The parent element to inject notification
         */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;

        /**
         * Notifications color modifier.
         * @type {string} Possible values are null, primary, info, success, warning, danger
         */
        this.color = options.hasOwnProperty('color') ? options.color : '';

        /**
         * How long to wait before auto dismissing the notification.
         * @type {int|null} If null notification must be dismissed manually.
         */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;

        /**
         * Does this notification had a dismiss button?
         * @type {Boolean}
         */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;

        /**
         * Should this notification be destroyed when it is dismissed.
         * @type {Boolean}
         */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;

        /**
         * The root notification element.
         * @type {HTMLElement|null} If this is not provided a new notification element will be created.
         */
        this.root = options.hasOwnProperty('element') ? options.element : null;

        /**
         * The element used to close the notification.
         * @type {HTMLElement}
         */
        this.closeButton = options.hasOwnProperty('closeButton') ? options.closeButton : this.createCloseButton();

        if (!this.root) {
            this.createRootElement();
            this.parent.appendChild(this.root);
        }

        if (this.body) {
            this.insertBody();
        }

        if (this.isDismissable) {
            if (!options.hasOwnProperty('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        if (this.color) {
            this.setColor();
        }
    }

    /**
     * Create the main notification element.
     */


    _createClass(Notification, [{
        key: 'createRootElement',
        value: function createRootElement() {
            this.root = document.createElement('div');

            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].addClass(this.root, 'notification');
            this.hide();
        }

        /**
         * Show the notification.
         */

    }, {
        key: 'show',
        value: function show() {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].removeClass(this.root, 'is-hidden');
        }

        /**
         * Hide the notification.
         */

    }, {
        key: 'hide',
        value: function hide() {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].addClass(this.root, 'is-hidden');
        }

        /**
         * Insert the body text into the notification.
         */

    }, {
        key: 'insertBody',
        value: function insertBody() {
            this.root.innerHTML = this.body;
        }

        /**
         * Set the colour of the notification.
         */

    }, {
        key: 'setColor',
        value: function setColor() {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].addClass(this.root, 'is-' + this.color);
        }

        /**
         * Create the element that will be used to close the notification.
         * @return {HTMLElement}
         */

    }, {
        key: 'createCloseButton',
        value: function createCloseButton() {
            var closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].addClass(closeButton, 'delete');

            return closeButton;
        }

        /**
         * Create an interval to dismiss the notification after the set number of ms.
         * @param  {int}
         */

    }, {
        key: 'createDismissInterval',
        value: function createDismissInterval(interval) {
            var _this = this;

            return setInterval(function () {
                _this.handleCloseEvent();
            }, interval);
        }

        /**
         * Insert the close button before our content.
         */

    }, {
        key: 'prependCloseButton',
        value: function prependCloseButton() {
            this.root.insertBefore(this.closeButton, this.root.firstChild);
        }

        /**
         * Setup the event listener for the close button.
         */

    }, {
        key: 'setupCloseEvent',
        value: function setupCloseEvent() {
            this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));
        }

        /**
         * Handle the event when our close button is clicked.
         */

    }, {
        key: 'handleCloseEvent',
        value: function handleCloseEvent() {
            if (this.destroyOnDismiss) {
                this.destroy();
            } else {
                this.hide();
            }
        }

        /**
         * Destroy the notification, removing the event listener, interval and element.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));

            clearInterval(this.dismissInterval);

            this.parent.removeChild(this.root);
            this.parent = null;
            this.root = null;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'handleDomParsing',
        value: function handleDomParsing() {
            var elements = document.querySelectorAll('[data-bulma="notification"]');

            elements.forEach(function (element) {
                var closeBtn = element.querySelector('.delete');
                var dismissInterval = element.getAttribute('data-hide');

                new Notification(null, {
                    parent: element.parentNode,
                    element: element,
                    closeButton: closeBtn,
                    dismissInterval: dismissInterval,
                    isDismissable: !!closeBtn,
                    destroyOnDismiss: true
                });
            });
        }
    }]);

    return Notification;
}();

/**
 * Check for DOMContentLoad and then parse the dom finding any notifications that
 * have been setup via the data- attributes.
 */


document.addEventListener('DOMContentLoaded', Notification.handleDomParsing);

/**
 * Add the notification API to the global Bulma object.
 * @type {Object}
 */
window.Bulma = window.Bulma || {};
window.Bulma['Notification'] = Notification;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    addClass: function addClass(element, newClass) {
        element.className += ' ' + newClass;
    },
    removeClass: function removeClass(element, oldClass) {
        element.className = element.className.replace(oldClass, '').trim(' ');
    }
});

/***/ })
/******/ ]);