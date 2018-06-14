import Bulma from '../core';

/**
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Navbar {

    static getRootClass() {
        return 'navbar';
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(options) {
        if(!options.element || !options.trigger || !options.target) {
            throw new Error('[BulmaJS] The navbar component requires an element, trigger and target to function.');
        }

        /**
         * The root navbar element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The element used for the trigger.
         * @type {HTMLElement}
         */
        this.trigger = options.trigger;

        /**
         * The target element.
         * @type {HTMLELement}
         */
        this.target = options.target;

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
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
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static handleDomParsing(element) {
        new Navbar({
            element: element,
            trigger: element.querySelector('.navbar-burger'),
            target: element.querySelector('.navbar-menu')
        });
    }
}

Bulma.registerPlugin('navbar', Navbar);

export default Navbar;
