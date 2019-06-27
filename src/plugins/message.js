import Bulma from '../core';
import DismissableComponent from '../dismissableComponent';

/**
 * @module Message
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @extends DismissableComponent
 */
class Message extends DismissableComponent {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} config The config object for this instance
     * @return {Message} The newly created message instance
     */
    static create(config) {
        // This checks if this method is being called directly, rather
        // than through the Bulma core. If so make sure we grab the config
        // as we do not need the key.
        if(arguments.length > 1) config = arguments[1];
        
        return new Message(config);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this plugin
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = context.querySelectorAll('.message');

        Bulma.each(elements, (element) => {
            let closeBtn = element.querySelector('.delete');

            Bulma(element)
                .data('message', new Message({
                    body: null,
                    parent: element.parentNode,
                    element: element,
                    closeButton: closeBtn,
                    isDismissable: !!closeBtn,
                    destroyOnDismiss: true,
                    dismissInterval: element.hasAttribute('data-dismiss-interval') ? element.getAttribute('data-dismiss-interval') : null
                }));
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config) {
        super('message', config);

        /**
         * The size of the message
         * @type {String} Possible values are small, normal, medium or large
         */
        this.size = this.config.get('size');

        /**
         * The title of the message
         * @type {String}
         */
        this.title = this.config.get('title');

        if(this.title) {
            this.createMessageHeader();
        }

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if(this.isDismissable) {
            if(!this.config.get('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        if(this.size) {
            this.setSize();
        }

        this.trigger('init');
    }

    /**
     * Create the message header
     * @return {undefined}
     */
    createMessageHeader() {
        let header = document.createElement('div');
        header.classList.add('message-header');

        header.innerHTML = '<p>' + this.title + '</p>';

        this.title = header;

        this.element.insertBefore(this.title, this.element.firstChild);
    }

    /**
     * Set the size of the message.
     * @return {undefined}
     */
    setSize() {
        this.element.classList.add('is-' + this.size);
    }

    /**
     * Insert the body text into the component.
     * @return {undefined}
     */
    insertBody() {
        let body = document.createElement('div');
        body.classList.add('message-body');
        body.innerHTML = this.body;

        this.element.appendChild(body);
    }

    /**
     * Insert the close button before our content.
     * @return {undefined}
     */
    prependCloseButton() {
        this.title.appendChild(this.closeButton);
    }
}

Bulma.registerPlugin('message', Message);

export default Message;
