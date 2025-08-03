import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export class Navbar extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements;

        if (typeof context.classList === 'object' && context.classList.contains('navbar')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.navbar');
        }

        Bulma.each(elements, (element) => {
            Bulma(element).navbar({
                sticky: element.hasAttribute('data-sticky') ? true : false,
                stickyOffset: element.hasAttribute('data-sticky-offset') ? element.getAttribute('data-sticky-offset') : 0,
                hideOnScroll: element.hasAttribute('data-hide-on-scroll') ? true : false,
                tolerance: element.hasAttribute('data-tolerance') ? element.getAttribute('data-tolerance') : 0,
                hideOffset: element.hasAttribute('data-hide-offset') ? element.getAttribute('data-hide-offset') : null,
                shadow: element.hasAttribute('data-sticky-shadow') ? true : false
            });
        });
    }

    /**
     * Returns an object containing the default config for this plugin.
     * @returns {object} The default config object.
     */
    static defaultconfig() {
        return {
            sticky: false,
            stickyOffset: 0,
            hideOnScroll: false,
            tolerance: 0,
            hideOffset: null,
            shadow: false
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(config, root) {
        super(config, root);

        // Work out the parent if it hasn't been supplied as an option.
        if (this.parent === null) {
            this.parent = this.config.get('root').parentNode;
        }

        /**
         * The root navbar element.
         * @type {HTMLElement}
         */
        this.root = this.config.get('root');
        this.root.setAttribute('data-bulma-attached', 'attached');

        /**
         * The element used for the trigger.
         * @type {HTMLElement}
         */
        this.triggerElement = this.root.querySelector('.navbar-burger');

        /**
         * The target element.
         * @type {HTMLELement}
         */
        this.target = this.root.querySelector('.navbar-menu');

        /**
         * Should this navbar stick to the top of the page?
         * @type {boolean}
         */
        this.sticky = typeof window === 'object' && !!this.config.get('sticky');

        /**
         * The offset in pixels before the navbar will stick to the top of the page
         * @type {number}
         */
        this.stickyOffset = parseInt(this.config.get('stickyOffset'));

        /**
         * Should the navbar hide when scrolling? Note: this just applies a 'is-hidden-scroll' class.
         * @type {boolean}
         */
        this.hideOnScroll = !!this.config.get('hideOnScroll');

        /**
         * The amount of tolerance required before checking the navbar should hide/show
         * @type {number}
         */
        this.tolerance = parseInt(this.config.get('tolerance'));

        /**
         * Add a shadow when the navbar is sticky?
         * @type {boolean}
         */
        this.shadow = !!this.config.get('shadow');

        /**
         * The offset in pixels before the navbar will be hidden, defaults to the height of the navbar
         * @type {number}
         */
        this.hideOffset = parseInt(this.config.get('hideOffset', Math.max(this.root.scrollHeight, this.stickyOffset)));

        /**
         * The last scroll Y known, this is used to calculate scroll direction
         * @type {number}
         */
        this.lastScrollY = 0;

        /**
         * An array of any navbar dropdowns
         * @type {NodeList}
         */
        this.dropdowns = this.root.querySelectorAll('.navbar-item.has-dropdown:not(.is-hoverable)');

        /**
         * Bind the relevant event handlers to this instance. So that we can remove them if needed
         */
        this.handleScroll = this.handleScroll.bind(this);

        Bulma(this.root).data('navbar', this);

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        if(this.triggerElement) {
            this.triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
        }

        if (this.sticky) {
            this.enableSticky();
        }

        Bulma.each(this.dropdowns, (dropdown) => {
            dropdown.addEventListener('click', this.handleDropdownTrigger);
        });
    }

    /**
     * Handle the click event on the trigger.
     * @return {undefined}
     */
    handleTriggerClick() {
        if (this.target.classList.contains('is-active')) {
            this.target.classList.remove('is-active');
            this.triggerElement.classList.remove('is-active');
        } else {
            this.target.classList.add('is-active');
            this.triggerElement.classList.add('is-active');
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
     * Handle the click handler for any dropdowns found within the navbar
     */
    handleDropdownTrigger() {
        if (this.classList.contains('is-active')) {
            this.classList.remove('is-active');
        } else {
            this.classList.add('is-active');
        }
    }

    /**
     * Enable the sticky feature by attaching the scroll event.
     */
    enableSticky() {
        window.addEventListener('scroll', this.handleScroll);
        this.root.setAttribute('data-sticky', '');
        this.sticky = true;
    }

    /**
     * Disable the sticky feature by removing the scroll event.
     */
    disableSticky() {
        window.removeEventListener('scroll', this.handleScroll);
        this.root.removeAttribute('data-sticky');
        this.sticky = false;
    }

    /**
     * Enable hide on scroll. Also enable sticky if it's not already.
     */
    enableHideOnScroll() {
        if (!this.sticky) {
            this.enableSticky();
        }

        this.root.setAttribute('data-hide-on-scroll', '');
        this.hideOnScroll = true;
    }

    /**
     * Disable hide on scroll, and show the navbar again if it's hidden.
     */
    disableHideOnScroll() {
        this.root.removeAttribute('data-hide-on-scroll');
        this.hideOnScroll = false;
        this.root.classList.remove('is-hidden-scroll');
    }

    /**
     * Toggle the navbar's sticky state
     * @param {number} scrollY The amount of pixels that has been scrolled
     * @return {undefined}
     */
    toggleSticky(scrollY) {
        if (scrollY > this.stickyOffset) {
            this.root.classList.add('is-fixed-top');
            document.body.classList.add('has-navbar-fixed-top');

            if (this.shadow) {
                this.root.classList.add('has-shadow');
            }
        } else {
            this.root.classList.remove('is-fixed-top');
            document.body.classList.remove('has-navbar-fixed-top');

            if (this.shadow) {
                this.root.classList.remove('has-shadow');
            }
        }

        if (this.hideOnScroll) {
            let scrollDirection = this.calculateScrollDirection(scrollY, this.lastScrollY);
            let triggeredTolerance = this.difference(scrollY, this.lastScrollY) >= this.tolerance;

            if (scrollDirection === 'down') {
                // only hide the navbar at the top if we reach a certain offset so the hiding is more smooth
                let isBeyondTopOffset = scrollY > this.hideOffset;
                if (triggeredTolerance && isBeyondTopOffset) {
                    this.root.classList.add('is-hidden-scroll');
                }
            } else {
                // if scrolling up to the very top where the navbar would be by default always show it
                let isAtVeryTop = scrollY < this.hideOffset;
                if (triggeredTolerance || isAtVeryTop) {
                    this.root.classList.remove('is-hidden-scroll');
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

export default Bulma;
