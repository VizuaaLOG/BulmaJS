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
            element: element
        });
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
}

Bulma.registerPlugin('navbar', Navbar);

export default Navbar;
