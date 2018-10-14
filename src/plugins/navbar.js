import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Navbar extends Plugin {
    /**
     * Returns a string containing the element class this plugin supports.
     * @returns {string} The class name.
     * @throws {Error} Thrown if this method has not been replaced.
     */
    static getRootClass() {
        return 'navbar';
    }
    
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static parse(element) {
        new Navbar({
            element: element,
            sticky: element.hasAttribute('data-sticky') ? true : false,
            stickyOffset: element.hasAttribute('data-sticky-offset') ? element.getAttribute('data-sticky-offset') : 0,
            hideOnScroll: element.hasAttribute('data-hide-on-scroll') ? true : false,
            tolerance: element.hasAttribute('data-tolerance') ? element.getAttribute('data-tolerance') : 0
        });
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            sticky: false,
            stickyOffset: 0,
            hideOnScroll: false,
            tolerance: 0
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(options) {
        super(options);

        // Work out the parent if it hasn't been supplied as an option.
        if(this.parent === null) {
            this.parent = this.option('element').parentNode;
        }

        /**
         * The root navbar element.
         * @type {HTMLElement}
         */
        this.element = this.option('element');

        /**
         * The element used for the trigger.
         * @type {HTMLElement}
         */
        this.trigger = this.element.querySelector('.navbar-burger'),

        /**
         * The target element.
         * @type {HTMLELement}
         */
        this.target = this.element.querySelector('.navbar-menu');

        /**
         * Should this navbar stick to the top of the page?
         * @type {boolean}
         */
        this.sticky = this.option('sticky');
        
        /**
         * The offset in pixels before the navbar will stick to the top of the page
         * @type {number}
         */
        this.stickyOffset = parseInt(this.option('stickyOffset'));

        /**
         * Should the navbar hide when scrolling? Note: this just applies a 'is-hidden-scroll' class.
         * @type {boolean}
         */
        this.hideOnScroll = this.option('hideOnScroll');

        /**
         * The amount of tolerance required before checking the navbar should hide/show
         * @type {number}
         */
        this.tolerance = this.option('tolerance');

        /**
         * The last scroll Y known, this is used to calculate scroll direction
         * @type {number}
         */
        this.lastScrollY = 0;

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));

        if(this.sticky) {
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    /**
     * Handle the click event on the trigger.
     * @return {undefined}
     */
    handleTriggerClick() {
        if(this.target.classList.contains('is-active')) {
            this.target.classList.remove('is-active');
            this.trigger.classList.remove('is-active');
        } else {
            this.target.classList.add('is-active');
            this.trigger.classList.add('is-active');
        }
    }

    /**
     * Handle the scroll event
     * @return {undefined}
     */
    handleScroll() {
        this.toggleSticky(window.pageYOffset);
    }

    /**
     * Toggle the navbar's sticky state
     * @param {number} scrollY The amount of pixels that has been scrolled
     * @return {undefined}
     */
    toggleSticky(scrollY) {
        if(scrollY > this.stickyOffset) {
            this.element.classList.add('is-fixed-top');
            document.body.classList.add('has-navbar-fixed-top');
        } else {
            this.element.classList.remove('is-fixed-top');
            document.body.classList.remove('has-navbar-fixed-top');
        }

        if(this.hideOnScroll) {
            let scrollDirection = this.calculateScrollDirection(scrollY, this.lastScrollY);
            let triggeredTolerance = this.difference(scrollY, this.lastScrollY) >= this.tolerance;

            if(triggeredTolerance) {
                if(scrollDirection === 'down') {
                    this.element.classList.add('is-hidden-scroll');
                } else {
                    this.element.classList.remove('is-hidden-scroll');
                }
            }

            this.lastScrollY = scrollY;
        }
    }

    difference(a, b) {
        if (a > b) {
            return a - b;
        } else {
            return b - a;
        }
    }

    calculateScrollDirection(currentY, lastY) {
        return currentY >= lastY ? 'down' : 'up';
    }
}

Bulma.registerPlugin('navbar', Navbar);

export default Navbar;
