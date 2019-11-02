import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @deprecated
 */
export class Accordion extends Plugin {
    /**
     * Handle parsing the DOM.
     * @param {HTMLElement} element The root element for this accordion
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = context.querySelectorAll('.accordions');

        Bulma.each(elements, (element) => {
            Bulma(element).accordion();
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The plugin's config
     * @return {this} The new plugin instance
     */
    constructor(config, root) {
        super(config, root);

        // eslint-disable-next-line no-console
        console.warn('[BulmaJS] The accordion plugin has been deprecated and will be removed in the 1.0 release. It is recommended to use the Wikiki\'s accordion plugin');

        /**
         * Accordion element.
         * @type {string}
         */
        this.root = this.config.get('root');
        this.root.setAttribute('data-bulma-attached', 'attached');

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

        Bulma(this.root).data('accordion', this);

        this.trigger('init');
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
        super.destroy();

        this.root = null;

        this.trigger('destroyed');
    }
}

Bulma.registerPlugin('accordion', Accordion);

export default Bulma;
