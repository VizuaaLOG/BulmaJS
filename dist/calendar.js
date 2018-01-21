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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
    VERSION: '0.3.0',

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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
    // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * @module Calendar
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */

var Calendar = function () {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    function Calendar(options) {
        var _this = this;

        _classCallCheck(this, Calendar);

        if (!options.element) {
            throw new Error('[BulmaJS] The Calendar component requires an element.');
        }

        /**
         * The root Calendar element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The input element this calendar belongs to.
         * @type {HTMLElement|null}
         */
        this.inputElement = null;

        if (this.root.nodeName === 'INPUT') {
            this.inputElement = this.root;
            this.root = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div');
        }

        /**
         * The wrapper for the calendar
         * @type {HTMLElement}
         */
        this.wrapper = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', ['calendar']);

        /**
         * The current date for today tests
         * @type {Date}
         */
        this.now = new Date();

        /**
         * The date this calendar starts at
         * @type {Date}
         */
        this.date = options.hasOwnProperty('date') ? options.date : this.now;

        /**
         * The current year for the calendar
         * @type {int}
         */
        this.year = this.date.getFullYear();

        /**
         * The current month for the calendar
         * @type {int}
         */
        this.month = this.date.getMonth();

        /**
         * Show the navigating buttons
         * @type {boolean}
         */
        this.navButtons = options.hasOwnProperty('navButtons') ? options.navButtons : true;

        /**
         * The format string for the date output. Used when attached to an input element.
         * @type {string}
         */
        this.format = options.hasOwnProperty('format') ? options.format : 'yyyy-mm-dd';

        /**
         * Should the calendar be shown as a modal. Used when attached to an input element
         * @type {boolean}
         */
        this.overlay = options.hasOwnProperty('overlay') ? options.overlay : false;

        if (this.overlay) {
            this.buildModal();
        }

        if (isLeapYear(this.year)) {
            monthDays[1] = 29;
        } else {
            monthDays[1] = 28;
        }

        if (this.inputElement !== null) {
            this.inputElement.addEventListener('focus', function (event) {
                _this.handleInputFocus(event);
            });
        }

        this.render();
    }

    /**
     * If we are to show as an overlay, build the modal's HTML
     */


    _createClass(Calendar, [{
        key: 'buildModal',
        value: function buildModal() {
            var _this2 = this;

            this.modal = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', ['modal']);
            this.modalBackground = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', ['modal-background']);

            var modalClose = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', ['modal-close']);

            modalClose.addEventListener('click', function (event) {
                _this2.modal.classList.remove('is-active');
            });

            this.modal.appendChild(this.modalBackground);
            this.modal.appendChild(modalClose);

            this.root.appendChild(this.modal);

            this.wrapper.style.zIndex = 40;
        }

        /**
         * Build the calendars nav HTML
         */

    }, {
        key: 'buildNav',
        value: function buildNav() {
            var _this3 = this;

            var prevIcon = void 0,
                nextIcon = void 0;
            var nav = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-nav');
            var navLeft = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-nav-left');
            var navRight = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-nav-right');

            // Left side of nav (prev year/month buttons)
            if (this.navButtons) {
                this.prevYearButton = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', ['button', 'is-text']);
                prevIcon = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('i', ['fa', 'fa-backward']);
                this.prevYearButton.appendChild(prevIcon);

                this.prevYearButton.addEventListener('click', function (event) {
                    _this3.handlePrevYearClick(event);
                });

                navLeft.appendChild(this.prevYearButton);

                this.prevMonthButton = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', ['button', 'is-text']);
                prevIcon = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('i', ['fa', 'fa-chevron-left']);
                this.prevMonthButton.appendChild(prevIcon);

                this.prevMonthButton.addEventListener('click', function (event) {
                    _this3.handlePrevMonthClick(event);
                });

                navLeft.appendChild(this.prevMonthButton);

                // Right side of nav (next year/month buttons)
                this.nextMonthButton = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', ['button', 'is-text']);
                nextIcon = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('i', ['fa', 'fa-chevron-right']);
                this.nextMonthButton.appendChild(nextIcon);

                this.nextMonthButton.addEventListener('click', function (event) {
                    _this3.handleNextMonthClick(event);
                });

                navRight.appendChild(this.nextMonthButton);

                this.nextYearButton = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', ['button', 'is-text']);
                prevIcon = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('i', ['fa', 'fa-forward']);
                this.nextYearButton.appendChild(prevIcon);

                this.nextYearButton.addEventListener('click', function (event) {
                    _this3.handleNextYearClick(event);
                });

                navRight.appendChild(this.nextYearButton);
            }

            // Month/year label
            this.monthYearLabel = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div');
            this.monthYearLabel.innerHTML = months[this.month] + ' ' + this.year;

            nav.appendChild(navLeft);
            nav.appendChild(this.monthYearLabel);
            nav.appendChild(navRight);

            return nav;
        }

        /**
         * Build the calendar's container HTML
         */

    }, {
        key: 'buildContainer',
        value: function buildContainer() {
            return __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-container');
        }

        /**
         * Build the calendar's header HTML
         */

    }, {
        key: 'buildHeader',
        value: function buildHeader() {
            var calendarHeader = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-header');

            shortDays.forEach(function (dayName) {
                var day = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-date');
                day.innerHTML = dayName;
                calendarHeader.appendChild(day);
            });

            return calendarHeader;
        }

        /**
         * Build the calendar's body. This includes all days.
         */

    }, {
        key: 'buildBody',
        value: function buildBody() {
            var _this4 = this;

            var calendarBody = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-body');

            var daysInMonth = monthDays[this.now.getMonth()];

            // Number of days to show from the previous month.
            var daysBefore = new Date(this.year, this.month, 1).getDay();

            // Number of days to show from the next month
            var daysAfter = void 0;

            var numDays = daysInMonth + daysBefore;

            daysAfter = numDays;
            while (daysAfter > 7) {
                daysAfter -= 7;
            }

            numDays += 7 - daysAfter;

            var cells = [];

            for (var i = 0; i < numDays; i++) {
                var d = new Date(this.year, this.month, 1 + (i - daysBefore));

                var today = false;
                var thisMonth = false;

                if (d.getFullYear() === this.now.getFullYear() && d.getMonth() === this.now.getMonth() && d.getDate() === this.now.getDate()) {
                    today = true;
                }

                if (d.getMonth() === this.month) {
                    thisMonth = true;
                }

                cells.push({
                    day: d.getDate(),
                    isToday: today,
                    isThisMonth: thisMonth
                });
            }

            cells.forEach(function (day) {
                var d = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('div', 'calendar-date');

                if (!day.isThisMonth) {
                    d.classList.add('is-disabled');
                }

                var button = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].createElement('button', 'date-item');

                if (_this4.inputElement !== null && d.isThisMonth) {
                    button.addEventListener('click', function (event) {
                        _this4.handleDayClick(event, day);
                    });
                }

                if (day.isToday) {
                    button.classList.add('is-today');
                }

                button.innerHTML = day.day;

                d.appendChild(button);

                calendarBody.appendChild(d);
            });

            return calendarBody;
        }

        /**
         * Called when the input box is in focus.
         * @param {Object} event 
         */

    }, {
        key: 'handleInputFocus',
        value: function handleInputFocus(event) {
            if (this.overlay) {
                this.modal.classList.add('is-active');
            }

            this.inputElement.parentNode.insertBefore(this.root, this.inputElement.nextSibling);
        }

        /**
         * Event hander for when a day is clicked.
         * @param {Object} event 
         * @param {Object} day 
         */

    }, {
        key: 'handleDayClick',
        value: function handleDayClick(event, day) {
            day = new Date(this.year, this.month, day.day);

            var dateString = this.formatDateString(day);

            this.inputElement.value = dateString;

            if (this.overlay) {
                this.modal.classList.remove('is-active');
            } else {
                this.inputElement.parentNode.removeChild(this.root);
            }
        }

        /**
         * Format the date based on the supplied format string.
         * @param {Object} day
         * @returns {string} 
         */

    }, {
        key: 'formatDateString',
        value: function formatDateString(day) {
            var dateString = this.format;

            // May be a better/faster way of doing this?
            if (dateString.indexOf('yyyy') !== -1) {
                dateString = this.format.replace('yyyy', day.getFullYear());
            } else {
                dateString = this.format.replace('yy', day.getFullYear().toString().substr(-2));
            }

            if (dateString.indexOf('mm') !== -1) {
                var month = day.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month.toString();
                }
                dateString = dateString.replace('mm', month);
            } else {
                dateString = dateString.replace('m', day.getMonth() + 1);
            }

            if (dateString.indexOf('dd') !== -1) {
                var date = day.getDate();
                if (date < 10) {
                    date = '0' + date.toString();
                }
                dateString = dateString.replace('dd', date);
            } else {
                dateString = dateString.replace('d', day.getDate());
            }

            return dateString;
        }

        /**
         * Event handler for the previous month button.
         * @param {Object} event 
         */

    }, {
        key: 'handlePrevMonthClick',
        value: function handlePrevMonthClick(event) {
            this.month--;

            if (this.month < 0) {
                this.year--;
                this.month = 11;
            }

            this.render();
        }

        /**
         * Event handler for the next month button.
         * @param {Object} event 
         */

    }, {
        key: 'handleNextMonthClick',
        value: function handleNextMonthClick(event) {
            this.month++;

            if (this.month > 11) {
                this.year++;
                this.month = 0;
            }

            this.render();
        }

        /**
         * Event handler for the previous year button.
         * @param {Object} event 
         */

    }, {
        key: 'handlePrevYearClick',
        value: function handlePrevYearClick(event) {
            this.year--;

            this.render();
        }

        /**
         * Event handler for the next year button.
         * @param {Object} event 
         */

    }, {
        key: 'handleNextYearClick',
        value: function handleNextYearClick(event) {
            this.year++;

            this.render();
        }

        /**
         * Clear the calendar HTML, ready for a re-render.
         */

    }, {
        key: 'clearCalendar',
        value: function clearCalendar() {
            while (this.wrapper.firstChild) {
                this.wrapper.removeChild(this.wrapper.firstChild);
            }
        }

        /**
         * Render/build the calendar's HTML.
         */

    }, {
        key: 'render',
        value: function render() {
            this.clearCalendar();

            this.wrapper.appendChild(this.buildNav());

            var container = this.buildContainer();
            container.appendChild(this.buildHeader());
            container.appendChild(this.buildBody());

            this.wrapper.appendChild(container);

            if (this.overlay) {
                this.modal.insertBefore(this.wrapper, this.modalBackground.nextSibling);
                this.root.appendChild(this.modal);
            } else {
                this.root.appendChild(this.wrapper);
            }
        }

        /**
         * Helper method used by the Bulma core to create a new instance.
         * @param  {Object} options
         * @return {Calendar}
         */

    }], [{
        key: 'create',
        value: function create(options) {
            return new Calendar(options);
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }, {
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            return;
        }
    }]);

    return Calendar;
}();

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('calendar', Calendar);

/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/***/ })

/******/ });