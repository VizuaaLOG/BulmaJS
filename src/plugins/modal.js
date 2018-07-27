import Bulma from '../core';

/**
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Modal {
    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
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
         * Closable toggle switch.
         * @type {bool}
         */
        this.closable = options.hasOwnProperty('closable') ? options.closable : true ;

        /**
         * The element used to close the message.
         * @type {HTMLElement}
         */
        this.closeButton = this.findCloseButton();

        /**
         * Create a bound version of our close event handler, this will
         * allow us to remove the event listener later on.
         * 
         * @type {Function}
         */
        this.boundHandleCloseEvent = this.handleCloseEvent.bind(this);

        if(this.closeButton && this.closable ) {
            this.setupCloseEvent();
        }

        /**
         * Create a bound version of our event escape event handler, this will
         * allow us to remove the event listener later on.
         * 
         * @type {Function}
         */
        this.boundHandleEscapeClose = this.handleEscapeClose.bind(this);

        document.addEventListener('keyup', this.boundHandleEscapeClose);
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options THe options object for the new instance
     * @return {Modal} The newly created instance
     */
    static create(options) {
        return new Modal(options);
    }

    /**
     * Show the message.
     * @return {undefined}
     */
    open() {
        this.root.classList.add('is-active');
    }

    /**
     * Hide the message.
     * @return {undefined}
     */
    close() {
        this.root.classList.remove('is-active');
    }

    /**
     * Find the close button.
     * @return {HTMLElement} The newly created element
     */
    findCloseButton() {
        let element = this.root.querySelector('.modal-close');

        if(!element) {
            return this.root.querySelector('.delete');
        }

        return element;
    }

    /**
     * Setup the event listener for the close button.
     * @return {undefined}
     */
    setupCloseEvent() {
        this.closeButton.addEventListener('click', this.boundHandleCloseEvent);
    }

    /**
     * Handle the event when our close button is clicked.
     * @return {undefined}
     */
    handleCloseEvent() {
        this.close();
    }

    /**
     * Close the modal if the Escape key is pressed
     * @return {undefined}
     */
    handleEscapeClose(event) {
        let key = event.key || event.keyCode;

        if(key === 'Escape' || key === 'Esc' || key === 27) {
            this.close();
        }
    }

    /**
     * Destroy the message, removing the event listener, interval and element.
     * @return {undefined}
     */
    destroy() {
        if(this.closable && this.closeButton) {
            this.closeButton.removeEventListener('click', this.boundHandleCloseEvent);
        }

        document.removeEventListener('keyup', this.boundHandleEscapeClose);

        this.root = null;
        this.closeButton = null;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @return {undefined}
     */
    static handleDomParsing() {
        return;
    }

    static getRootClass() {
        return 'modal';
    }
}

Bulma.registerPlugin('modal', Modal);

export default Modal;
