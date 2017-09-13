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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.1.0',

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
    traverseDOM: function traverseDOM() {
        var elements = document.querySelectorAll('[data-bulma]');

        elements.forEach(function (element) {
            var plugin = element.getAttribute('data-bulma');

            if (!Bulma.hasOwnProperty(plugin)) {
                return console.warn('[BulmaJS] Plugin with the key \'' + plugin + '\' has not been registered.');
            }

            if (Bulma[plugin].hasOwnProperty('handleDomParsing')) {
                Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Bulma);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Notification module
 * @module Notification
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Notification = function () {
    /**
     * Module constructor
     * @param  {Object} options
     * @return {this}
     */
    function Notification(options) {
        _classCallCheck(this, Notification);

        if (!options) options = {};

        /**
         * Notifications body text.
         * @type {string}
         */
        this.body = options.hasOwnProperty('body') ? options.body : '';

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
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Notification}
     */


    _createClass(Notification, [{
        key: 'createRootElement',


        /**
         * Create the main notification element.
         */
        value: function createRootElement() {
            this.root = document.createElement('div');

            this.root.classList.add('notification');
            this.hide();
        }

        /**
         * Show the notification.
         */

    }, {
        key: 'show',
        value: function show() {
            this.root.classList.remove('is-hidden');
        }

        /**
         * Hide the notification.
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.root.classList.add('is-hidden');
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
            this.root.classList.add('is-' + this.color);
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
            closeButton.classList.add('delete');

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
            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
            }

            clearInterval(this.dismissInterval);

            this.parent.removeChild(this.root);
            this.parent = null;
            this.root = null;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'create',
        value: function create(options) {
            return new Notification(options);
        }
    }, {
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            var closeBtn = element.querySelector('.delete');
            var dismissInterval = element.getAttribute('data-dismiss-interval');

            var options = {
                body: null,
                parent: element.parentNode,
                element: element,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true
            };

            if (dismissInterval) {
                options['dismissInterval'] = parseInt(dismissInterval);
            }

            new Notification(options);
        }
    }]);

    return Notification;
}();

/* harmony default export */ __webpack_exports__["a"] = (Notification);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Navbar module
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Navbar = function () {
    /**
     * Module constructor
     */
    function Navbar(options) {
        _classCallCheck(this, Navbar);

        if (!options.element || !options.trigger || !options.target) {
            throw new Error('[BulmaJS] The navbar component requires an element, trigger and target to function.');
        }

        this.element = options.element;
        this.trigger = options.trigger;
        this.target = options.target;

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     */


    _createClass(Navbar, [{
        key: 'registerEvents',
        value: function registerEvents() {
            this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
        }

        /**
         * Handle the click event on the trigger.
         * @param  {Object} event
         */

    }, {
        key: 'handleTriggerClick',
        value: function handleTriggerClick(event) {
            if (this.target.classList.contains('is-active')) {
                this.target.classList.remove('is-active');
            } else {
                this.target.classList.add('is-active');
            }
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            var trigger = element.querySelector('[data-trigger]'),
                target = trigger.getAttribute('data-target');

            new Navbar({
                element: element,
                trigger: trigger,
                target: element.querySelector('#' + target)
            });
        }
    }]);

    return Navbar;
}();

/* harmony default export */ __webpack_exports__["a"] = (Navbar);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_notification__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_navbar__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_message__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_dropdown__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_modal__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_file__ = __webpack_require__(8);



__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('notification', __WEBPACK_IMPORTED_MODULE_1__plugins_notification__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('navbar', __WEBPACK_IMPORTED_MODULE_2__plugins_navbar__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('message', __WEBPACK_IMPORTED_MODULE_3__plugins_message__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('dropdown', __WEBPACK_IMPORTED_MODULE_4__plugins_dropdown__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('modal', __WEBPACK_IMPORTED_MODULE_5__plugins_modal__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('file', __WEBPACK_IMPORTED_MODULE_6__plugins_file__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].traverseDOM();
window.Bulma = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */];

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Message module
 * @module Message
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Message = function () {
    /**
     * Module constructor
     * @param  {Object} options
     * @return {this}
     */
    function Message(options) {
        _classCallCheck(this, Message);

        if (!options) options = {};

        /**
         * Message body text.
         * @type {string}
         */
        this.body = options.hasOwnProperty('body') ? options.body : '';

        /**
         * The parent element to inject message
         */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;

        /**
         * Message color modifier.
         * @type {string} Possible values are null, primary, info, success, warning, danger
         */
        this.color = options.hasOwnProperty('color') ? options.color : '';

        /**
         * How long to wait before auto dismissing the message.
         * @type {int|null} If null message must be dismissed manually.
         */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;

        /**
         * Does this message had a dismiss button?
         * @type {Boolean}
         */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;

        /**
         * Should this message be destroyed when it is dismissed.
         * @type {Boolean}
         */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;

        /**
         * The root message element.
         * @type {HTMLElement|null} If this is not provided a new message element will be created.
         */
        this.root = options.hasOwnProperty('element') ? options.element : null;

        /**
         * The element used to close the message.
         * @type {HTMLElement}
         */
        this.closeButton = options.hasOwnProperty('closeButton') ? options.closeButton : this.createCloseButton();

        /**
         * The size of the message
         * @type {String} Possible values are small, normal, medium or large
         */
        this.size = options.hasOwnProperty('size') ? options.size : '';

        /**
         * The title of the message
         * @type {String}
         */
        this.title = options.hasOwnProperty('title') ? options.title : '';

        if (!this.root) {
            this.createRootElement();
            this.parent.appendChild(this.root);
        }

        if (this.title) {
            this.createMessageHeader();
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

        if (this.size) {
            this.setSize();
        }
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Message}
     */


    _createClass(Message, [{
        key: 'createRootElement',


        /**
         * Create the main message element.
         */
        value: function createRootElement() {
            this.root = document.createElement('div');
            this.root.classList.add('message');

            this.hide();
        }

        /**
         * Create the message header
         */

    }, {
        key: 'createMessageHeader',
        value: function createMessageHeader() {
            var header = document.createElement('div');
            header.classList.add('message-header');

            header.innerHTML = '<p>' + this.title + '</p>';

            this.title = header;

            this.root.insertBefore(this.title, this.root.firstChild);
        }

        /**
         * Show the message.
         */

    }, {
        key: 'show',
        value: function show() {
            this.root.classList.remove('is-hidden');
        }

        /**
         * Hide the message.
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.root.classList.add('is-hidden');
        }

        /**
         * Insert the body text into the message.
         */

    }, {
        key: 'insertBody',
        value: function insertBody() {
            var body = document.createElement('div');
            body.classList.add('message-body');
            body.innerHTML = this.body;

            this.root.appendChild(body);
        }

        /**
         * Set the colour of the message.
         */

    }, {
        key: 'setColor',
        value: function setColor() {
            this.root.classList.add('is-' + this.color);
        }

        /**
         * Set the size of the message.
         */

    }, {
        key: 'setSize',
        value: function setSize() {
            this.root.classList.add('is-' + this.size);
        }

        /**
         * Create the element that will be used to close the message.
         * @return {HTMLElement}
         */

    }, {
        key: 'createCloseButton',
        value: function createCloseButton() {
            var closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.classList.add('delete');

            return closeButton;
        }

        /**
         * Create an interval to dismiss the message after the set number of ms.
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
            if (!this.title) {
                this.createMessageHeader();
            }

            this.title.appendChild(this.closeButton);
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
         * Destroy the message, removing the event listener, interval and element.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
            }

            clearInterval(this.dismissInterval);

            this.parent.removeChild(this.root);
            this.parent = null;
            this.root = null;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'create',
        value: function create(options) {
            return new Message(options);
        }
    }, {
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            var closeBtn = element.querySelector('.delete');
            var dismissInterval = element.getAttribute('data-dismiss-interval');

            var options = {
                body: null,
                parent: element.parentNode,
                element: element,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true
            };

            if (dismissInterval) {
                options['dismissInterval'] = parseInt(dismissInterval);
            }

            new Message(options);
        }
    }]);

    return Message;
}();

/* harmony default export */ __webpack_exports__["a"] = (Message);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dropdown module
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Dropdown = function () {
    /**
     * Module constructor
     */
    function Dropdown(options) {
        _classCallCheck(this, Dropdown);

        if (!options.element || !options.trigger) {
            throw new Error('[BulmaJS] The dropdown component requires an element and trigger to function.');
        }

        this.element = options.element;
        this.trigger = options.trigger;

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     */


    _createClass(Dropdown, [{
        key: 'registerEvents',
        value: function registerEvents() {
            this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
        }

        /**
         * Handle the click event on the trigger.
         * @param  {Object} event
         */

    }, {
        key: 'handleTriggerClick',
        value: function handleTriggerClick(event) {
            if (this.element.classList.contains('is-active')) {
                this.element.classList.remove('is-active');
            } else {
                this.element.classList.add('is-active');
            }
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            var trigger = element.querySelector('[data-trigger]');

            new Dropdown({
                element: element,
                trigger: trigger
            });
        }
    }]);

    return Dropdown;
}();

/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Modal module
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Modal = function () {
    /**
     * Module constructor
     * @param  {Object} options
     * @return {this}
     */
    function Modal(options) {
        _classCallCheck(this, Modal);

        if (!options) options = {};

        /**
         * Message body text.
         * @type {string}
         */
        this.root = options.hasOwnProperty('element') ? options.element : '';

        this.card = options.card ? options.card : false;

        /**
         * The element used to close the message.
         * @type {HTMLElement}
         */
        this.closeButton = this.findCloseButton();

        this.setupCloseEvent();
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Modal}
     */


    _createClass(Modal, [{
        key: 'open',


        /**
         * Show the message.
         */
        value: function open() {
            this.root.classList.add('is-active');
        }

        /**
         * Hide the message.
         */

    }, {
        key: 'close',
        value: function close() {
            this.root.classList.remove('is-active');
        }
    }, {
        key: 'findCloseButton',
        value: function findCloseButton() {
            var element = this.root.querySelector('.modal-close');

            if (!element) {
                return this.root.querySelector('.delete');
            }

            return element;
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
            this.close();
        }

        /**
         * Destroy the message, removing the event listener, interval and element.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.closeButton) {
                this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
            }

            this.root = null;
            this.closeButton = null;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'create',
        value: function create(options) {
            return new Modal(options);
        }
    }, {
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            return;
        }
    }]);

    return Modal;
}();

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * File module
 * @module File
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var File = function () {
    /**
     * Module constructor
     */
    function File(options) {
        _classCallCheck(this, File);

        if (!options.element) {
            throw new Error('[BulmaJS] The file component requires an element to function.');
        }

        this.element = options.element;
        this.trigger = this.element.querySelector('input');
        this.target = this.element.querySelector('.file-name');

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     */


    _createClass(File, [{
        key: 'registerEvents',
        value: function registerEvents() {
            this.trigger.addEventListener('change', this.handleTriggerChange.bind(this));
        }

        /**
         * Handle the click event on the trigger.
         * @param  {Object} event
         */

    }, {
        key: 'handleTriggerChange',
        value: function handleTriggerChange(event) {
            if (event.target.files.length === 0) {
                this.clearFileName();
            }

            if (event.target.files.length === 1) {
                this.setFileName(event.target.files[0].name);
            }

            if (event.target.files.length > 1) {
                this.setFileName(event.target.files.length + ' files');
            }
        }
    }, {
        key: 'clearFileName',
        value: function clearFileName() {
            this.target.innerHTML = '';
        }
    }, {
        key: 'setFileName',
        value: function setFileName(value) {
            this.target.innerHTML = value;
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            new File({
                element: element
            });
        }
    }]);

    return File;
}();

/* harmony default export */ __webpack_exports__["a"] = (File);

/***/ })
/******/ ]);