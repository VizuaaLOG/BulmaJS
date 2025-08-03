import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Dropdown
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export class Dropdown extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HtmlElement} element The root element for this instance
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements;

        if (typeof context.classList === 'object' && context.classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.dropdown');
        }

        Bulma.each(elements, (element) => {
            Bulma(element).dropdown();
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config, root) {
        super(config, root);

        /**
         * The root dropdown element.
         * @type {HTMLElement}
         */
        this.root = this.config.get('root');
        this.root.setAttribute('data-bulma-attached', 'attached');

        /**
         * The element to trigger when clicked.
         * @type {HTMLElement}
         */
        this.triggerElement = this.root.querySelector('.dropdown-trigger');

        this.registerEvents();

        Bulma(this.root).data('dropdown', this);

        this.trigger('init');
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        this.triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
    }

    /**
     * Handle the click event on the trigger.
     * @return {undefined}
     */
    handleTriggerClick() {
        if (this.root.classList.contains('is-active')) {
            this.root.classList.remove('is-active');

            this.trigger('close');
        } else {
            this.root.classList.add('is-active');

            this.trigger('open');
        }
    }
}

Bulma.registerPlugin('dropdown', Dropdown);

export default Bulma;
