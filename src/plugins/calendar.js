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

        this.wrapper = Bulma.createElement('div', ['calendar']);

        // this.root.classList.add('calendar');

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

        this.format = options.hasOwnProperty('format') ? options.format : 'yyyy-mm-dd';

        this.overlay = options.hasOwnProperty('overlay') ? options.overlay : false;

        if(this.overlay) {
            this.buildModal();
        }

        if(isLeapYear(this.year)) {
            monthDays[1] = 29;
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
        if(this.overlay) {
            this.modal.classList.add('is-active');
        }
        
        this.inputElement.parentNode.insertBefore(this.root, this.inputElement.nextSibling);
    }

    buildModal() {
        this.modal = Bulma.createElement('div', ['modal']);
        this.modalBackground = Bulma.createElement('div', ['modal-background']);

        let modalClose = Bulma.createElement('button', ['modal-close']);

        modalClose.addEventListener('click', (event) => {
            this.modal.classList.remove('is-active');
        });

        this.modal.appendChild(this.modalBackground);
        this.modal.appendChild(modalClose);

        this.root.appendChild(this.modal);

        this.wrapper.style.zIndex = 40;
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

        let dateString = this.formatDateString(day);

        this.inputElement.value = dateString;

        if(this.overlay) {
            this.modal.classList.remove('is-active');
        } else {
            this.inputElement.parentNode.removeChild(this.root);
        }
    }

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
            dateString = dateString.replace('d', day.getDate() + 1);
        }

        return dateString;
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

        this.wrapper.appendChild(this.buildNav());

        let container = this.buildContainer();
        container.appendChild(this.buildHeader());
        container.appendChild(this.buildBody());

        this.wrapper.appendChild(container);

        console.log(this.modal);

        if(this.overlay) {
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
