import Bulma from '../core';

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

    buildNav() {
        this.nav = document.createElement('div');
        this.nav.classList.add('calendar-nav');

        let navLeft = document.createElement('div');
        navLeft.classList.add('calendar-nav-left');

        this.prevMonthButton = document.createElement('button');
        this.prevMonthButton.classList.add('button', 'is-text');
        
        let prevIcon = document.createElement('i');
        prevIcon.classList.add('fa', 'fa-chevron-left');

        this.prevMonthButton.appendChild(prevIcon);

        navLeft.appendChild(this.prevMonthButton);

        let navRight = document.createElement('div');
        navRight.classList.add('calendar-nav-right');

        this.nextMonthButton = document.createElement('button');
        this.nextMonthButton.classList.add('button', 'is-text');
        
        let nextIcon = document.createElement('i');
        nextIcon.classList.add('fa', 'fa-chevron-right');

        this.nextMonthButton.appendChild(nextIcon);

        navRight.appendChild(this.nextMonthButton);

        this.monthYearLabel = document.createElement('div');
        this.monthYearLabel.innerHTML = this.months[this.month] + ' ' + this.year;

        this.nav.appendChild(navLeft);
        this.nav.appendChild(this.monthYearLabel);
        this.nav.appendChild(navRight);
    }

    buildCalendarContainer() {
        this.calendarContainer = document.createElement('div');
        this.calendarContainer.classList.add('calendar-container');
    }

    buildCalendarHeader() {
        this.calendarHeader = document.createElement('div');
        this.calendarHeader.classList.add('calendar-header');

        this.shortDays.forEach((dayName) => {
            let day = document.createElement('div');
            day.classList.add('calendar-date');
            day.innerHTML = dayName;
            this.calendarHeader.appendChild(day);
        });
    }

    buildCalendarBody() {
        this.calendarBody = document.createElement('div');
        this.calendarBody.classList.add('calendar-body');

        let daysInMonth = this.monthDays[this.now.getMonth()];
        let monthStartsOnDay = new Date(null, null, 1).getDay();
        let monthEndsOnDay = new Date(null, null, daysInMonth).getDay();

        let startAt = -monthStartsOnDay + 1;
        let endAt = daysInMonth + monthEndsOnDay + 1;

        let cells = [];

        for(let i = startAt; i < endAt; i++) {
            let d = new Date(this.year, this.now.getMonth(), i);

            let today = false;
            let thisMonth = false;

            if(d.getFullYear() === this.year && d.getMonth() === this.month && d.getDate() === this.day) {
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
            let d = document.createElement('div');
            d.classList.add('calendar-date');

            if(!day.isThisMonth) {
                d.classList.add('is-disabled');
            }

            let button = document.createElement('button');
            button.classList.add('date-item');

            if(day.isToday) {
                button.classList.add('is-today');
            }

            button.innerHTML = day.day;

            d.appendChild(button);

            this.calendarBody.appendChild(d);
        });
    }

    render() {
        this.root.appendChild(this.nav);

        this.calendarContainer.appendChild(this.calendarHeader);
        this.calendarContainer.appendChild(this.calendarBody);

        this.root.appendChild(this.calendarContainer);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        let test = new Calendar({
            element: element
        });

        console.log(test);
    }
}

Bulma.registerPlugin('calendar', Calendar);

export default Calendar;
