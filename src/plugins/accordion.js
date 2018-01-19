import Bulma from '../core';

/**
 * @module Accordion
 * @since  0.3.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Accordion {
    /**
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    constructor(options) {
        if(!options) options = {};

        /**
         * Message body text.
         * @type {string}
         */
        this.root = options.hasOwnProperty('element') ? options.element : '';

        this.accordions = this.findAccordions();

        this.toggleButtons = this.findToggleButtons();

        this.addToggleButtonEvents();
    }

    findAccordions() {
        return this.root.querySelectorAll('.accordion');
    }

    findToggleButtons() {
        let buttons = [];

        for(let i = 0; i < this.accordions.length; i++) {
            buttons.push(this.accordions[i].querySelector('button.toggle'));
        }

        return buttons;
    }

    addToggleButtonEvents() {
        for(let i = 0; i < this.toggleButtons.length; i++) {
            // If the button is null, the accordion item has no toggle button
            if(this.toggleButtons[i] !== null) {
                this.toggleButtons[i].addEventListener('click', (event) => {
                    this.handleToggleClick(event, i);
                });
            }
        }
    }

    handleToggleClick(event, index) {
        this.toggleAccordionVisibility(this.accordions[index]);
    }

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
     * @param  {Object} options
     * @return {Accordion}
     */
    static create(options) {
        return new Accordion(options);
    }

    /**
     * Destroy the message, removing the event listener, interval and element.
     */
    destroy() {
        this.root = null;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        new Accordion({
            element
        });
    }
}

Bulma.registerPlugin('accordion', Accordion);

export default Accordion;
