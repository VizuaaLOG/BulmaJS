import Bulma from '../core';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

        this.now = new Date();

        this.date = options.hasOwnProperty('date') ? options.date : this.now;

        /**
         * The root Calendar element.
         * @type {HTMLElement}
         */
        this.root = options.element;
        this.root.classList.add('calendar');

        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();

        this.render();
    }

    buildNav() {
        let nav = Bulma.createElement('div', 'calendar-nav');
        let navLeft = Bulma.createElement('div', 'calendar-nav-left');

        this.prevMonthButton = Bulma.createElement('button', ['button', 'is-text']);
        let prevIcon = Bulma.createElement('i', ['fa', 'fa-chevron-left']);
        this.prevMonthButton.appendChild(prevIcon);

        navLeft.appendChild(this.prevMonthButton);

        let navRight = Bulma.createElement('div', 'calendar-nav-right');

        this.nextMonthButton = Bulma.createElement('button', ['button', 'is-text']);
        let nextIcon = Bulma.createElement('i', ['fa', 'fa-chevron-right']);
        this.nextMonthButton.appendChild(nextIcon);

        navRight.appendChild(this.nextMonthButton);

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
        let monthStartsOnDay = new Date(this.year, this.month, 1).getDay();
        let monthEndsOnDay = new Date(this.year, this.month, daysInMonth).getDay();

        let startAt = -monthStartsOnDay + 1;
        let endAt = daysInMonth + monthEndsOnDay + 1;
        
        if(endAt > 32) {
            while (endAt > 32) {
                endAt--;
            }
        }

        let cells = [];

        for(let i = startAt; i < endAt; i++) {
            let d = new Date(this.year, this.month, i);

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

            if(day.isToday) {
                button.classList.add('is-today');
            }

            button.innerHTML = day.day;

            d.appendChild(button);

            calendarBody.appendChild(d);
        });

        return calendarBody;
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
