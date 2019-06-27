import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @deprecated
 */
class Accordion extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} config The plugin's config
     * @return {Accordion} The newly created instance
     */
    static create(config) {
        // This checks if this method is being called directly, rather
        // than through the Bulma core. If so make sure we grab the config
        // as we do not need the key.
        if(arguments.length > 1) config = arguments[1];
        
        return new Accordion(config);
    }

    /**
     * Handle parsing the DOM.
     * @param {HTMLElement} element The root element for this accordion
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = document.querySelectorAll('.accordions');

        Bulma.each(elements, (element) => {
            Bulma(element)
                .data('accordion', new Accordion({
                    element: element
                }));
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The plugin's config
     * @return {this} The new plugin instance
     */
    constructor(config) {
        super(config);

        console.warn('[BulmaJS] The accordion plugin has been deprecated and will be removed in the 1.0 release. It is recommended to use the Wikiki\'s accordion plugin');

        // Work out the parent if it hasn't been supplied as an option.
        if(this.parent === null) {
            this.parent = this.config.get('element').parentNode;
        }

        /**
         * Accordion element.
         * @type {string}
         */
        this.element = this.config.get('element');
        this.element.setAttribute('data-bulma-attached', 'attached');

        /**
         * Accordion items
         * @type {Array}
         */
        this.accordions = this.findAccordions();

        /**
         * Toggle buttons for each accordion item
         * @type {Array}
         */
        this.toggleButtons = this.findToggleButtons();

        this.addToggleButtonEvents();

        this.trigger('init');
    }

    /**
     * Find the accordion items within this accordions element
     * @returns {Array} The accordion elements found
     */
    findAccordions() {
        return this.element.querySelectorAll('.accordion');
    }

    /**
     * Find the toggle buttons within this accordions element
     * @returns {Array} The toggle buttons found
     */
    findToggleButtons() {
        let buttons = [];

        Bulma.each(this.accordions, (accordion) => {
            buttons.push(accordion.querySelector('button.toggle'));
        });

        return buttons;
    }

    /**
     * Add click events to toggle buttons
     * @return {undefined}
     */
    addToggleButtonEvents() {
        Bulma.each(this.toggleButtons, (toggleButton, index) => {
            // If the button is null, the accordion item has no toggle button
            if(toggleButton !== null) {
                toggleButton.addEventListener('click', (event) => {
                    this.handleToggleClick(event, index);
                });
            }
        });
    }

    /**
     * Handle the click
     * @param {Object} event The event object
     * @param {number} index Index of the accordion to toggle
     * @return {undefined}
     */
    handleToggleClick(event, index) {
        this.toggleAccordionVisibility(this.accordions[index]);
    }

    /**
     * Show or hide the accordion
     * @param {HTMLElement} accordion The accordion element
     * @return {undefined}
     */
    toggleAccordionVisibility(accordion) {
        Bulma.each(this.accordions, function(a) {
            a.classList.remove('is-active');
        });

        if(accordion.classList.contains('is-active')) {
            accordion.classList.remove('is-active');
        } else {
            accordion.classList.add('is-active');
        }
    }

    /**
     * Destroy the accordion
     * @return {undefined}
     */
    destroy() {
        this.element = null;

        this.trigger('destroyed');
    }
}

Bulma.registerPlugin('accordion', Accordion);

export default Accordion;
