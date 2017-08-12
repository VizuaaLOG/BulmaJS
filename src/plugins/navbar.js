/**
 * Navbar module
 * @module Navbar
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Navbar {
    /**
     * Module constructor
     */
    constructor(options) {
        if(!options.element || !options.trigger || !options.target) {
            throw new Error('[BulmaJS] The navbar component requires an element, trigger and target to function.');
        }

        this.element = options.element;
        this.trigger = options.trigger;
        this.target = options.target;

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
        if(this.target.classList.contains('is-active')) {
            this.target.classList.remove('is-active');
        } else {
            this.target.classList.add('is-active');
        }
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        let trigger = element.querySelector('[data-trigger]'),
            target = trigger.getAttribute('data-target');

        new Navbar({
            element: element,
            trigger: trigger,
            target: element.querySelector('#' + target)
        });
    }
}

export default Navbar;
