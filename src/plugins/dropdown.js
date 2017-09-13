/**
 * Dropdown module
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Dropdown {
    /**
     * Module constructor
     */
    constructor(options) {
        if(!options.element || !options.trigger) {
            throw new Error('[BulmaJS] The dropdown component requires an element and trigger to function.');
        }

        this.element = options.element;
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
    handleTriggerClick(event) {
        if(this.element.classList.contains('is-active')) {
            this.element.classList.remove('is-active');
        } else {
            this.element.classList.add('is-active');
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

export default Dropdown;
