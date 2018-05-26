import Bulma from '../core';

/**
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Dropdown {
    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created instance
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
        if(this.root.classList.contains('is-active')) {
            this.root.classList.remove('is-active');
        } else {
            this.root.classList.add('is-active');
        }
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HtmlElement} element The root element for this instance
     * @return {undefined}
     */
    static handleDomParsing(element) {
        let trigger = element.querySelector('.dropdown-trigger');

        new Dropdown({
            element: element,
            trigger: trigger
        });
    }

    static getRootClass() {
        return 'dropdown';
    }
}

Bulma.registerPlugin('dropdown', Dropdown);

export default Dropdown;
