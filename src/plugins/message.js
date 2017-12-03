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
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    constructor(options) {
        if(!options) options = {};

        super('message', options);

        /**
         * The size of the message
         * @type {String} Possible values are small, normal, medium or large
         */
        this.size = options.hasOwnProperty('size') ? options.size : '';

        /**
         * The title of the message
         * @type {String}
         */
        this.title = options.hasOwnProperty('title') ? options.title : '';

        if(this.title) {
            this.createMessageHeader();
        }

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if(this.isDismissable) {
            if(!options.hasOwnProperty('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        if(this.size) {
            this.setSize();
        }
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Message}
     */
    static create(options) {
        return new Message(options);
    }

    /**
     * Create the message header
     */
    createMessageHeader() {
        let header = document.createElement('div');
        header.classList.add('message-header');

        header.innerHTML = '<p>' + this.title + '</p>';

        this.title = header;

        this.root.insertBefore(this.title, this.root.firstChild);
    }

    /**
     * Set the size of the message.
     */
    setSize() {
        this.root.classList.add('is-' + this.size);
    }

    /**
     * Insert the body text into the component.
     */
    insertBody() {
        let body = document.createElement('div');
        body.classList.add('message-body');
        body.innerHTML = this.body;

        this.root.appendChild(body);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing(element) {
        let closeBtn = element.querySelector('.delete');
        let dismissInterval = element.getAttribute('data-dismiss-interval');

        let options = {
            body: null,
            parent: element.parentNode,
            element: element,
            closeButton: closeBtn,
            isDismissable: !!closeBtn,
            destroyOnDismiss: true
        };

        if(dismissInterval) {
            options['dismissInterval'] = parseInt(dismissInterval);
        }

        new Message(options);
    }

    /**
     * Insert the close button before our content.
     */
    prependCloseButton() {
        this.title.appendChild(this.closeButton);
    }
}

Bulma.registerPlugin('message', Message);

export default Message;
