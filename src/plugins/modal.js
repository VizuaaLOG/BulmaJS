/**
 * Modal module
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Modal {
    /**
     * Module constructor
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

        this.card = options.card ? options.card : false;

        /**
         * The element used to close the message.
         * @type {HTMLElement}
         */
        this.closeButton = this.findCloseButton();

        this.setupCloseEvent();
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Modal}
     */
    static create(options) {
        return new Modal(options);
    }

    /**
     * Show the message.
     */
    open() {
        this.root.classList.add('is-active');
    }

    /**
     * Hide the message.
     */
    close() {
        this.root.classList.remove('is-active');
    }

    findCloseButton() {
        let element = this.root.querySelector('.modal-close');

        if(!element) {
            return this.root.querySelector('.delete');
        }

        return element;
    }

    /**
     * Setup the event listener for the close button.
     */
    setupCloseEvent() {
        this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));
    }

    /**
     * Handle the event when our close button is clicked.
     */
    handleCloseEvent() {
        this.close();
    }

    /**
     * Destroy the message, removing the event listener, interval and element.
     */
    destroy() {
        if(this.closeButton) {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
        }

        this.root = null;
        this.closeButton = null;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        return;
    }
}

export default Modal;
