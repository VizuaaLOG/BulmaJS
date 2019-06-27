import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Dropdown extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HtmlElement} element The root element for this instance
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = document.querySelectorAll('.dropdown');

        Bulma.each(elements, (element) => {
            Bulma(element)
                .data('dropdown', new Dropdown({
                    element: element
                }));
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config) {
        super(config);

        // Work out the parent if it hasn't been supplied as an option.
        if(this.parent === null) {
            this.parent = this.config.get('element').parentNode;
        }

        /**
         * The root dropdown element.
         * @type {HTMLElement}
         */
        this.element = this.config.get('element');
        this.element.setAttribute('data-bulma-attached', 'attached');

        /**
         * The element to trigger when clicked.
         * @type {HTMLElement}
         */
        this.trigger = this.element.querySelector('.dropdown-trigger');

        this.registerEvents();

        this.trigger('init');
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
        if(this.element.classList.contains('is-active')) {
            this.element.classList.remove('is-active');

            this.trigger('closed');
        } else {
            this.element.classList.add('is-active');

            this.trigger('opened');
        }
    }
}

Bulma.registerPlugin('dropdown', Dropdown);

export default Dropdown;
