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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugins_message__ = __webpack_require__(3);


__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('message', __WEBPACK_IMPORTED_MODULE_1__plugins_message__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].traverseDOM();
window.Bulma = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */];

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @module Message
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
var Message = function () {
    /**
     * Plugin constructor
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

/***/ })

/******/ });