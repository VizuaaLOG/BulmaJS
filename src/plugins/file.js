import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module File
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class File extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this plugin
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = context.querySelectorAll('.file');

        Bulma.each(elements, (element) => {
            Bulma(element)
                .data('file', new File({
                    element: element
                }));
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(config) {
        super(config);

        // Work out the parent if it hasn't been supplied as an option.
        if(this.parent === null) {
            this.parent = this.config.get('element').parentNode;
        }

        /**
         * The root file element.
         * @type {HTMLElement}
         */
        this.element = this.config.get('element');
        this.element.setAttribute('data-bulma-attached', 'attached');

        /**
         * The element to use as the trigger.
         * @type {HTMLELement}
         */
        this.input = this.element.querySelector('input');

        /**
         * The element to show the file name.
         * @type {HTMLElement}
         */
        this.filename = this.element.querySelector('.file-name');

        this.registerEvents();

        this.trigger('init');
    }

    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents() {
        if (this.filename) {
            this.input.addEventListener('change', this.handleTriggerChange.bind(this));
        }

        this.element.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.element.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.addHoverClass();
        });

        this.element.addEventListener('drop', (e) => {
            e.preventDefault();
            this.removeHoverClass();
            this.input.files = e.dataTransfer.files;
        });
    }

    /**
     * Handle the click event on the trigger.
     * @param  {Object} event The event object
     * @return {undefined}
     */
    handleTriggerChange(event) {
        if(event.target.files.length === 0) {
            this.clearFileName();
        }

        if(event.target.files.length === 1) {
            this.setFileName(event.target.files[0].name);
        }

        if(event.target.files.length > 1) {
            this.setFileName(event.target.files.length + ' files');
        }

        this.trigger('changed', event);
    }

    /**
     * Clear the file name element.
     * @return {undefined}
     */
    clearFileName() {
        this.filename.innerHTML = '';
    }

    /**
     * Set the text for the file name element.
     * @param {string} value The name of the file to update the label with
     * @return {undefined}
     */
    setFileName(value) {
        this.filename.innerHTML = value;
    }

    /**
     * Add hover class to root element.
     * @return {undefined}
     */
    addHoverClass() {
        this.element.classList.add('is-hovered');
    }

    /**
     * Remove hover class from root element.
     * @return {undefined}
     */
    removeHoverClass() {
        this.element.classList.remove('is-hovered');
    }
}

Bulma.registerPlugin('file', File);

export default File;
