import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Calendar
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Calendar extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options The new calendar's options
     * @return {Calendar} The newly created calendar instance
     */
    static create(options) {
        return new Calendar(options);
    }

    /**
     * Returns a string containing the element class this plugin supports.
     * @returns {string} The class name.
     */
    static getRootClass() {
        return 'calendar';
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            date: new Date(),
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            navButtons: true,
            format: 'yyyy-mm-dd',
            overlay: false
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} options Plugin instance's options
     * @return {this} The newly created instance
     */
    constructor(options) {
        super(options);

        /**
         * The root Calendar element.
         * @type {HTMLElement}
         */
        this.element = Bulma.createElement('div', ['calendar']);

        /**
         * The input element this calendar belongs to.
         * @type {HTMLElement|null}
         */
        this.isInput = this.parent.nodeName === 'INPUT';

        /**
         * The current date for today tests
         * @type {Date}
         */
        this.now = new Date();

        /**
         * The date this calendar starts at
         * @type {Date}
         */
        this.date = this.option('date');

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
         * Month names
         * @type {Array}
         */
        this.months = this.option('months');

        /**
         * Short day names
         * @type {Array}
         */
        this.shortDays = this.option('shortDays');

        /**
         * Number of days in each month
         * @type {Array}
         */
        this.monthDays = [31, this.isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /**
         * Show the navigating buttons
         * @type {boolean}
         */
        this.navButtons = this.option('navButtons');

        /**
         * The format string for the date output. Used when attached to an input element.
         * @type {string}
         */
        this.format = this.option('format');

        /**
         * Should the calendar be shown as a modal. Used when attached to an input element
         * @type {boolean}
         */
        this.overlay = this.option('overlay');

        if(this.overlay) {
            this.buildModal();
        }

        if(this.isInput) {
            this.parent.addEventListener('focus', (event) => {
                this.handleInputFocus(event);
            });
        }

        this.render();
    }

    ////////////////////////////////////////
    ///// HELPER METHODS TO BUILD HTML /////
    ////////////////////////////////////////

    /**
     * If we are to show as an overlay, build the modal's HTML
     * @return {undefined}
     */
    buildModal() {
        this.modal = Bulma.createElement('div', ['modal']);
        this.modalBackground = Bulma.createElement('div', ['modal-background']);

        let modalClose = Bulma.createElement('button', ['modal-close']);

        modalClose.addEventListener('click', () => {
            this.modal.classList.remove('is-active');
        });

        this.modal.appendChild(this.modalBackground);
        this.modal.appendChild(modalClose);

        this.element.appendChild(this.modal);

        this.element.style.zIndex = 40;
    }

    /**
     * Build the calendars nav HTML
     * @return {undefined}
     */
    buildNav() {
        let prevIcon, nextIcon;
        let nav = Bulma.createElement('div', 'calendar-nav');
        let navLeft = Bulma.createElement('div', 'calendar-nav-left');
        let navRight = Bulma.createElement('div', 'calendar-nav-right');
        
        // Left side of nav (prev year/month buttons)
        if(this.navButtons) {
            this.prevYearButton = Bulma.createElement('button', ['button', 'is-text']);
            prevIcon = Bulma.createElement('i', ['fa', 'fa-backward']);
            this.prevYearButton.appendChild(prevIcon);

            this.prevYearButton.addEventListener('click', (event) => {
                this.handlePrevYearClick(event);
            });

            navLeft.appendChild(this.prevYearButton);

            this.prevMonthButton = Bulma.createElement('button', ['button', 'is-text']);
            prevIcon = Bulma.createElement('i', ['fa', 'fa-chevron-left']);
            this.prevMonthButton.appendChild(prevIcon);

            this.prevMonthButton.addEventListener('click', (event) => {
                this.handlePrevMonthClick(event);
            });

            navLeft.appendChild(this.prevMonthButton);

            // Right side of nav (next year/month buttons)
            this.nextMonthButton = Bulma.createElement('button', ['button', 'is-text']);
            nextIcon = Bulma.createElement('i', ['fa', 'fa-chevron-right']);
            this.nextMonthButton.appendChild(nextIcon);

            this.nextMonthButton.addEventListener('click', (event) => {
                this.handleNextMonthClick(event);
            });

            navRight.appendChild(this.nextMonthButton);

            this.nextYearButton = Bulma.createElement('button', ['button', 'is-text']);
            prevIcon = Bulma.createElement('i', ['fa', 'fa-forward']);
            this.nextYearButton.appendChild(prevIcon);

            this.nextYearButton.addEventListener('click', (event) => {
                this.handleNextYearClick(event);
            });

            navRight.appendChild(this.nextYearButton);
        }

        // Month/year label
        this.monthYearLabel = Bulma.createElement('div');
        this.monthYearLabel.innerHTML = this.months[this.month] + ' ' + this.year;

        nav.appendChild(navLeft);
        nav.appendChild(this.monthYearLabel);
        nav.appendChild(navRight);

        return nav;
    }

    /**
     * Build the calendar's container HTML
     * @return {HTMLElement} The calendar's container
     */
    buildContainer() {
        return Bulma.createElement('div', 'calendar-container');
    }

    /**
     * Build the calendar's header HTML
     * @return {HTMLElement} The calendar's header element
     */
    buildHeader() {
        let calendarHeader = Bulma.createElement('div', 'calendar-header');

        Bulma.each(this.shortDays, (dayName) => {
            let day = Bulma.createElement('div', 'calendar-date');
            day.innerHTML = dayName;
            calendarHeader.appendChild(day);
        });

        return calendarHeader;
    }

    /**
     * Build the calendar's body. This includes all days.
     * @return {HTMLElement} The calendar's body element
     */
    buildBody() {
        let calendarBody = Bulma.createElement('div', 'calendar-body');

        let daysInMonth = this.monthDays[this.now.getMonth()];

        // Number of days to show from the previous month.
        let daysBefore = new Date(this.year, this.month, 1).getDay();

        // Number of days to show from the next month
        let daysAfter;

        let numDays = daysInMonth + daysBefore;

        daysAfter = numDays;
        while(daysAfter > 7) {
            daysAfter -= 7;
        }

        numDays += (7 - daysAfter);

        let cells = [];

        for(let i = 0; i < numDays; i++) {
            let d = new Date(this.year, this.month, 1 + (i - daysBefore));

            let today = false;
            let thisMonth = false;

            if(d.getFullYear() === this.now.getFullYear() && d.getMonth() === this.now.getMonth() && d.getDate() === this.now.getDate()) {
                today = true;
            }

            if(d.getMonth() === this.month) {
                thisMonth = true;
            }
            
            cells.push({
                day: d.getDate(),
                isToday: today,
                isThisMonth: thisMonth
            });
        }

        Bulma.each(cells, (day) => {
            let d = Bulma.createElement('div', 'calendar-date');

            if(!day.isThisMonth) {
                d.classList.add('is-disabled');
            }

            let button = Bulma.createElement('button', 'date-item');

            if(this.isInput && day.isThisMonth) {
                button.addEventListener('click', (event) => {
                    this.handleDayClick(event, day);
                });
            }

            if(day.isToday) {
                button.classList.add('is-today');
            }

            button.innerHTML = day.day;

            d.appendChild(button);

            calendarBody.appendChild(d);
        });

        return calendarBody;
    }

    //////////////////////////
    ///// EVENT HANDLERS /////
    //////////////////////////

    /**
     * Called when the input box is in focus.
     * @return {undefined}
     */
    handleInputFocus() {
        if(this.overlay) {
            this.modal.classList.add('is-active');
        }
        
        this.parent.parentNode.insertBefore(this.element, this.parent.nextSibling);
    }

    /**
     * Event hander for when a day is clicked.
     * @param {Object} event The event object
     * @param {Object} day The day that was clicked
     * @return {undefined}
     */
    handleDayClick(event, day) {
        day = new Date(this.year, this.month, day.day);

        let dateString = this.formatDateString(day);

        this.parent.value = dateString;

        if(this.overlay) {
            this.modal.classList.remove('is-active');
        } else {
            this.parent.parentNode.removeChild(this.element);
        }
    }

    /**
     * Event handler for the previous month button.
     * @return {undefined}
     */
    handlePrevMonthClick() {
        this.month--;

        if(this.month < 0) {
            this.year--;
            this.month = 11;
        }

        this.render();
    }

    /**
     * Event handler for the next month button.
     * @return {undefined}
     */
    handleNextMonthClick() {
        this.month++;

        if(this.month > 11) {
            this.year++;
            this.month = 0;
        }

        this.render();
    }

    /**
     * Event handler for the previous year button.
     * @return {undefined}
     */
    handlePrevYearClick() {
        this.year--;

        this.render();
    }

    /**
     * Event handler for the next year button.
     * @return {undefined}
     */
    handleNextYearClick() {
        this.year++;

        this.render();
    }

    /**
     * Format the date based on the supplied format string.
     * @param {Object} day Date object representing the day to format
     * @returns {string} The formatted date string
     */
    formatDateString(day) {
        let dateString = this.format;
        
        // May be a better/faster way of doing this?
        if(dateString.indexOf('yyyy') !== -1) {
            dateString = this.format.replace('yyyy', day.getFullYear());
        } else {
            dateString = this.format.replace('yy', day.getFullYear().toString().substr(-2));
        }

        if(dateString.indexOf('mm') !== -1) {
            let month = day.getMonth() + 1;
            if(month < 10) {
                month = '0' + month.toString();
            }
            dateString = dateString.replace('mm', month);
        } else {
            dateString = dateString.replace('m', day.getMonth() + 1);
        }

        if(dateString.indexOf('dd') !== -1) {
            let date = day.getDate();
            if(date < 10) {
                date = '0' + date.toString();
            }
            dateString = dateString.replace('dd', date);
        } else {
            dateString = dateString.replace('d', day.getDate());
        }

        return dateString;
    }

    /**
     * Clear the calendar HTML, ready for a re-render.
     * @return {undefined}
     */
    clearCalendar() {
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    /**
     * Check if the passed year is a leap year.
     * @param {int} year The year to check against
     * @return {boolean} Is the year a leap year or not
     */
    isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    /**
     * Render/build the calendar's HTML.
     * @return {undefined}
     */
    render() {
        this.clearCalendar();

        this.element.appendChild(this.buildNav());

        let container = this.buildContainer();
        container.appendChild(this.buildHeader());
        container.appendChild(this.buildBody());

        this.element.appendChild(container);

        if(this.overlay) {
            this.modal.insertBefore(this.element, this.modalBackground.nextSibling);
            this.parent.appendChild(this.modal);
        } else {
            this.parent.appendChild(this.element);
        }
    }
}

Bulma.registerPlugin('calendar', Calendar);

export default Calendar;
