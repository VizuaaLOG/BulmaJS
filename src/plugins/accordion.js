import Bulma from '../core';

/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Accordion {
    /**
     * Plugin constructor
     * @param  {Object} options The plugin's options
     * @return {this} The new plugin instance
     */
    constructor(options) {
        if(!options) {
            options = {};
        }

        /**
         * Message body text.
         * @type {string}
         */
        this.root = options.hasOwnProperty('element') ? options.element : '';

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
        return this.root.querySelectorAll('.accordion');
    }

    /**
     * Find the toggle buttons within this accordions element
     * @returns {Array} The toggle buttons found
     */
    findToggleButtons() {
        let buttons = [];

        this.accordions.forEach((accordion) => {
            buttons.push(accordion.querySelector('button.toggle'));
        });

        return buttons;
    }

    /**
     * Add click events to toggle buttons
     * @return {undefined}
     */
    addToggleButtonEvents() {
        this.toggleButtons.forEach((toggleButton, index) => {
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
        this.accordions.forEach(function(a) {
            a.classList.remove('is-active');
        });

        if(accordion.classList.contains('is-active')) {
            accordion.classList.remove('is-active');
        } else {
            accordion.classList.add('is-active');
        }
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options The plugin's options
     * @return {Accordion} The newly created instance
     */
    static create(options) {
        return new Accordion(options);
    }

    /**
     * Destroy the message, removing the event listener, interval and element.
     * @return {undefined}
     */
    destroy() {
        this.root = null;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this accordion
     * @return {undefined}
     */
    static handleDomParsing(element) {
        new Accordion({
            element
        });
    }

    static getRootClass() {
        return 'accordions';
    }
}

Bulma.registerPlugin('accordion', Accordion);

export default Accordion;
