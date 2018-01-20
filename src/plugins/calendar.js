import Bulma from '../core';

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function isLeapYear(year) {
    // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * @module Calendar
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Calendar {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    constructor(options) {
        if(!options.element) {
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

        if(this.root.nodeName === 'INPUT') {
            this.inputElement = this.root;
            this.root = Bulma.createElement('div');
        }

        this.root.classList.add('calendar');

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

        if(isLeapYear(this.year)) {
            monthDays[1]++;
        } else {
            monthDays[1] = 28;
        }

        if(this.inputElement !== null) {
            this.inputElement.addEventListener('focus', (event) => {
                this.handleInputFocus(event);
            });
        }

        this.render();
    }

    handleInputFocus(event) {
        this.inputElement.parentNode.insertBefore(this.root, this.inputElement.nextSibling);
    }

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
        this.monthYearLabel.innerHTML = months[this.month] + ' ' + this.year;

        nav.appendChild(navLeft);
        nav.appendChild(this.monthYearLabel);
        nav.appendChild(navRight);

        return nav;
    }

    buildContainer() {
        return Bulma.createElement('div', 'calendar-container');
    }

    buildHeader() {
        let calendarHeader = Bulma.createElement('div', 'calendar-header');

        shortDays.forEach((dayName) => {
            let day = Bulma.createElement('div', 'calendar-date');
            day.innerHTML = dayName;
            calendarHeader.appendChild(day);
        });

        return calendarHeader;
    }

    buildBody() {
        let calendarBody = Bulma.createElement('div', 'calendar-body');

        let daysInMonth = monthDays[this.now.getMonth()];
        let daysBefore = new Date(this.year, this.month, 1).getDay();
        let daysAfter;

        if (daysBefore < 0) {
            daysBefore += 7;
        }

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

        cells.forEach((day) => {
            let d = Bulma.createElement('div', 'calendar-date');

            if(!day.isThisMonth) {
                d.classList.add('is-disabled');
            }

            let button = Bulma.createElement('button', 'date-item');

            if(this.inputElement !== null) {
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

    handleDayClick(event, day) {
        day = new Date(this.year, this.month, day.day);

        let dateString = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate();

        this.inputElement.value = dateString;
    }

    handlePrevMonthClick(event) {
        this.month--;

        if(this.month < 0) {
            this.year--;
            this.month = 11;
        }

        this.render();
    }

    handleNextMonthClick(event) {
        this.month++;

        if(this.month > 11) {
            this.year++;
            this.month = 0;
        }

        this.render();
    }

    handlePrevYearClick(event) {
        this.year--;

        this.render();
    }

    handleNextYearClick(event) {
        this.year++;

        this.render();
    }

    clearCalendar() {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
    }

    render() {
        this.clearCalendar();

        this.root.appendChild(this.buildNav());

        let container = this.buildContainer();
        container.appendChild(this.buildHeader());
        container.appendChild(this.buildBody());

        this.root.appendChild(container);
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Calendar}
     */
    static create(options) {
        return new Calendar(options);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        return;
    }
}

Bulma.registerPlugin('calendar', Calendar);

export default Calendar;
