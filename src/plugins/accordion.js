import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Accordion extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options The plugin's options
     * @return {Accordion} The newly created instance
     */
    static create(options) {
        return new Accordion(options);
    }

    /**
     * Handle parsing the DOM.
     * @param {HTMLElement} element The root element for this accordion
     * @return {undefined}
     */
    static parse(element) {
        new Accordion({
            element
        });
    }

    /**
     * Returns a string containing the element class this plugin supports.
     * @returns {string} The class name.
     */
    static getRootClass() {
        return 'accordions';
    }

    /**
     * Plugin constructor
     * @param  {Object} options The plugin's options
     * @return {this} The new plugin instance
     */
    constructor(options) {
        super(options);

        // Work out the parent if it hasn't been supplied as an option.
        if(this.parent === null) {
            this.parent = this.option('element').parentNode;
        }

        /**
         * Accordion element.
         * @type {string}
         */
        this.element = this.option('element');
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
    }
}

Bulma.registerPlugin('accordion', Accordion);

export default Accordion;
