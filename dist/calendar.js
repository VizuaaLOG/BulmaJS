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
        _classCallCheck(this, Calendar);

        if (!options.element) {
            throw new Error('[BulmaJS] The Calendar component requires an element.');
        }

        /**
         * The root Calendar element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        this.root.classList.add('calendar');
        this.now = new Date();

        this.weekStart = 1;
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.year = this.now.getFullYear();
        this.month = this.now.getMonth();
        this.day = this.now.getDate();

        this.buildNav();
        this.buildCalendarContainer();
        this.buildCalendarHeader();
        this.buildCalendarBody();

        this.render();
    }

    _createClass(Calendar, [{
        key: 'buildNav',
        value: function buildNav() {
            this.nav = document.createElement('div');
            this.nav.classList.add('calendar-nav');

            var navLeft = document.createElement('div');
            navLeft.classList.add('calendar-nav-left');

            this.prevMonthButton = document.createElement('button');
            this.prevMonthButton.classList.add('button', 'is-text');

            var prevIcon = document.createElement('i');
            prevIcon.classList.add('fa', 'fa-chevron-left');

            this.prevMonthButton.appendChild(prevIcon);

            navLeft.appendChild(this.prevMonthButton);

            var navRight = document.createElement('div');
            navRight.classList.add('calendar-nav-right');

            this.nextMonthButton = document.createElement('button');
            this.nextMonthButton.classList.add('button', 'is-text');

            var nextIcon = document.createElement('i');
            nextIcon.classList.add('fa', 'fa-chevron-right');

            this.nextMonthButton.appendChild(nextIcon);

            navRight.appendChild(this.nextMonthButton);

            this.monthYearLabel = document.createElement('div');
            this.monthYearLabel.innerHTML = this.months[this.month] + ' ' + this.year;

            this.nav.appendChild(navLeft);
            this.nav.appendChild(this.monthYearLabel);
            this.nav.appendChild(navRight);
        }
    }, {
        key: 'buildCalendarContainer',
        value: function buildCalendarContainer() {
            this.calendarContainer = document.createElement('div');
            this.calendarContainer.classList.add('calendar-container');
        }
    }, {
        key: 'buildCalendarHeader',
        value: function buildCalendarHeader() {
            var _this = this;

            this.calendarHeader = document.createElement('div');
            this.calendarHeader.classList.add('calendar-header');

            this.shortDays.forEach(function (dayName) {
                var day = document.createElement('div');
                day.classList.add('calendar-date');
                day.innerHTML = dayName;
                _this.calendarHeader.appendChild(day);
            });
        }
    }, {
        key: 'buildCalendarBody',
        value: function buildCalendarBody() {
            var _this2 = this;

            this.calendarBody = document.createElement('div');
            this.calendarBody.classList.add('calendar-body');

            var daysInMonth = this.monthDays[this.now.getMonth()];
            var monthStartsOnDay = new Date(null, null, 1).getDay();
            var monthEndsOnDay = new Date(null, null, daysInMonth).getDay();

            var startAt = -monthStartsOnDay + 1;
            var endAt = daysInMonth + monthEndsOnDay + 1;

            var cells = [];

            for (var i = startAt; i < endAt; i++) {
                var d = new Date(this.year, this.now.getMonth(), i);

                var today = false;
                var thisMonth = false;

                if (d.getFullYear() === this.year && d.getMonth() === this.month && d.getDate() === this.day) {
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
                var d = document.createElement('div');
                d.classList.add('calendar-date');

                if (!day.isThisMonth) {
                    d.classList.add('is-disabled');
                }

                var button = document.createElement('button');
                button.classList.add('date-item');

                if (day.isToday) {
                    button.classList.add('is-today');
                }

                button.innerHTML = day.day;

                d.appendChild(button);

                _this2.calendarBody.appendChild(d);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            this.root.appendChild(this.nav);

            this.calendarContainer.appendChild(this.calendarHeader);
            this.calendarContainer.appendChild(this.calendarBody);

            this.root.appendChild(this.calendarContainer);
        }

        /**
         * Handle parsing the DOMs data attribute API.
         */

    }], [{
        key: 'handleDomParsing',
        value: function handleDomParsing(element) {
            var test = new Calendar({
                element: element
            });

            console.log(test);
        }
    }]);

    return Calendar;
}();

__WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */].registerPlugin('calendar', Calendar);

/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/***/ })

/******/ });