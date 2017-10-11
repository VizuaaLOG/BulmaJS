import Bulma from '../core';

/**
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Dropdown {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    constructor(options) {
        if(!options.element || !options.trigger) {
            throw new Error('[BulmaJS] The dropdown component requires an element and trigger to function.');
        }

        /**
         * The root dropdown element.
         * @type {HTMLElement}
         */
        this.root = options.element;

        /**
         * The element to trigger when clicked.
         * @type {HTMLElement}
         */
        this.trigger = options.trigger;

        this.registerEvents();
    }

    /**
     * Register all the events this module needs.
     */
    registerEvents() {
        this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
    }

    /**
     * Handle the click event on the trigger.
     * @param  {Object} event
     */
    handleTriggerClick() {
        if(this.root.classList.contains('is-active')) {
            this.root.classList.remove('is-active');
        } else {
            this.root.classList.add('is-active');
        }
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        let trigger = element.querySelector('[data-trigger]');

        new Dropdown({
            element: element,
            trigger: trigger
        });
    }
}

Bulma.registerPlugin('dropdown', Dropdown);

export default Dropdown;
