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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
    VERSION: '0.2.1',

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
                throw new Error('[BulmaJS] Plugin with the key \'' + plugin + '\' has not been registered.');
            }

            if (Bulma[plugin].hasOwnProperty('handleDomParsing')) {
                Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    Bulma.traverseDOM();
});

/* harmony default export */ __webpack_exports__["a"] = (Bulma);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module DismissableComponent
 * @since  0.2.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var DismissableComponent = function () {
    /**
     * Plugin constructor
     * @param  {string} name
     * @param  {Object} options
     * @return {this}
     */
    function DismissableComponent(name, options) {
        _classCallCheck(this, DismissableComponent);

        /**
         * The name of this component, this will be used as the root class
         * @type {string}
         */
        this.name = name;

        /**
        * Body text.
        * @type {string}
        */
        this.body = options.hasOwnProperty('body') ? options.body : '';

        /**
        * The parent element to inject HTML
        */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;

        /**
        * Color modifier.
        * @type {string} Possible values are null, primary, info, success, warning, danger
        */
        this.color = options.hasOwnProperty('color') ? options.color : '';

        /**
        * How long to wait before auto dismissing the component.
        * @type {int|null} If null component must be dismissed manually.
        */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;

        /**
        * Does this component have a dismiss button?
        * @type {Boolean}
        */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;

        /**
        * Should this component be destroyed when it is dismissed.
        * @type {Boolean}
        */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;

        /**
        * The root element.
        * @type {HTMLElement|null} If this is not provided a new element will be created.
        */
        this.root = options.hasOwnProperty('element') ? options.element : null;

        /**
        * The element used to close the component.
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

        if (this.color) {
            this.setColor();
        }
    }

    /**
     * Create the main element.
     */


    _createClass(DismissableComponent, [{
        key: 'createRootElement',
        value: function createRootElement() {
            this.root = document.createElement('div');

            this.root.classList.add(this.name);
            this.hide();
        }

        /**
         * Show the component.
         */

    }, {
        key: 'show',
        value: function show() {
            this.root.classList.remove('is-hidden');
        }

        /**
         * Hide the component.
         */

    }, {
        key: 'hide',
        value: function hide() {
            this.root.classList.add('is-hidden');
        }

        /**
         * Insert the body text into the component.
         */

    }, {
        key: 'insertBody',
        value: function insertBody() {
            this.root.innerHTML = this.body;
        }

        /**
         * Create the element that will be used to close the component.
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
         * Create an interval to dismiss the component after the set number of ms.
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
         * Set the colour of the component.
         */

    }, {
        key: 'setColor',
        value: function setColor() {
            this.root.classList.add('is-' + this.color);
        }

        /**
         * Destroy the component, removing the event listener, interval and element.
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
    }]);

    return DismissableComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (DismissableComponent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dismissableComponent__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * @module Notification
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @extends DismissableComponent
 */

var Notification = function (_DismissableComponent) {
    _inherits(Notification, _DismissableComponent);

    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Notification(options) {
        _classCallCheck(this, Notification);

        if (!options) options = {};

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, 'notification', options));

        if (_this.isDismissable) {
            if (!options.hasOwnProperty('closeButton')) {
                _this.prependCloseButton();
            }

            _this.setupCloseEvent();
        }
        return _this;
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Notification}
     */


    _createClass(Notification, null, [{
        key: 'create',
        value: function create(options) {
            return new Notification(options);
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

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
}(__WEBPACK_IMPORTED_MODULE_1__dismissableComponent__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('notification', Notification);

/* harmony default export */ __webpack_exports__["default"] = (Notification);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var Navbar = function () {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Navbar(options) {
        _classCallCheck(this, Navbar);

        if (!options.element || !options.trigger || !options.target) {
            throw new Error('[BulmaJS] The navbar component requires an element, trigger and target to function.');
        }

        /**
         * The root navbar element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The element used for the trigger.
         * @type {HTMLElement}
         */
        this.trigger = options.trigger;

        /**
         * The target element.
         * @type {HTMLELement}
         */
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
        value: function handleTriggerClick() {
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

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('navbar', Navbar);

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dismissableComponent__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * @module Message
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @extends DismissableComponent
 */

var Message = function (_DismissableComponent) {
    _inherits(Message, _DismissableComponent);

    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Message(options) {
        _classCallCheck(this, Message);

        if (!options) options = {};

        /**
         * The size of the message
         * @type {String} Possible values are small, normal, medium or large
         */
        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, 'message', options));

        _this.size = options.hasOwnProperty('size') ? options.size : '';

        /**
         * The title of the message
         * @type {String}
         */
        _this.title = options.hasOwnProperty('title') ? options.title : '';

        if (_this.title) {
            _this.createMessageHeader();
        }

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if (_this.isDismissable) {
            if (!options.hasOwnProperty('closeButton')) {
                _this.prependCloseButton();
            }

            _this.setupCloseEvent();
        }

        if (_this.size) {
            _this.setSize();
        }
        return _this;
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Message}
     */


    _createClass(Message, [{
        key: 'createMessageHeader',


        /**
         * Create the message header
         */
        value: function createMessageHeader() {
            var header = document.createElement('div');
            header.classList.add('message-header');

            header.innerHTML = '<p>' + this.title + '</p>';

            this.title = header;

            this.root.insertBefore(this.title, this.root.firstChild);
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
         * Insert the body text into the component.
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
         * Handle parsing the DOMs data attribute API.
         */

    }, {
        key: 'prependCloseButton',


        /**
         * Insert the close button before our content.
         */
        value: function prependCloseButton() {
            console.log(this.title);
            this.title.appendChild(this.closeButton);
        }
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
}(__WEBPACK_IMPORTED_MODULE_1__dismissableComponent__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('message', Message);

/* harmony default export */ __webpack_exports__["default"] = (Message);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var Dropdown = function () {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Dropdown(options) {
        _classCallCheck(this, Dropdown);

        if (!options.element || !options.trigger) {
            throw new Error('[BulmaJS] The dropdown component requires an element and trigger to function.');
        }

        /**
         * The root dropdown element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The element to trigger when clicked.
         * @type {HTMLElement}
         */
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
        value: function handleTriggerClick() {
            if (this.root.classList.contains('is-active')) {
                this.root.classList.remove('is-active');
            } else {
                this.root.classList.add('is-active');
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

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('dropdown', Dropdown);

/* harmony default export */ __webpack_exports__["default"] = (Dropdown);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var Modal = function () {
  /**
   * Plugin constructor
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

    /**
     * Find the close button.
     * @return {HTMLElement}
     */

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
    value: function handleDomParsing() {
      return;
    }
  }]);

  return Modal;
}();

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('modal', Modal);

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



/**
 * @module File
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var File = function () {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function File(options) {
        _classCallCheck(this, File);

        if (!options.element) {
            throw new Error('[BulmaJS] The file component requires an element to function.');
        }

        /**
         * The root file element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The element to use as the trigger.
         * @type {HTMLELement}
         */
        this.trigger = this.root.querySelector('input');

        /**
         * The element to show the file name.
         * @type {HTMLElement}
         */
        this.target = this.root.querySelector('.file-name');

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

        /**
         * Clear the file name element.
         */

    }, {
        key: 'clearFileName',
        value: function clearFileName() {
            this.target.innerHTML = '';
        }

        /**
         * Set the text for the file name element.
         * @param {string} value
         */

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

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('file', File);

/* harmony default export */ __webpack_exports__["default"] = (File);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_notification__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugins_navbar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_message__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugins_dropdown__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__plugins_modal__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_file__ = __webpack_require__(7);








window.Bulma = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */];

/***/ })
/******/ ]);