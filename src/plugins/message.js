/**
 * @module Message
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Message {
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
        this.body = options.hasOwnProperty('body') ? options.body : '';

        /**
         * The parent element to inject message
         */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;

        /**
         * Message color modifier.
         * @type {string} Possible values are null, primary, info, success, warning, danger
         */
        this.color = options.hasOwnProperty('color') ? options.color : '';

        /**
         * How long to wait before auto dismissing the message.
         * @type {int|null} If null message must be dismissed manually.
         */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;

        /**
         * Does this message had a dismiss button?
         * @type {Boolean}
         */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;

        /**
         * Should this message be destroyed when it is dismissed.
         * @type {Boolean}
         */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;

        /**
         * The root message element.
         * @type {HTMLElement|null} If this is not provided a new message element will be created.
         */
        this.root = options.hasOwnProperty('element') ? options.element : null;

        /**
         * The element used to close the message.
         * @type {HTMLElement}
         */
        this.closeButton = options.hasOwnProperty('closeButton') ? options.closeButton : this.createCloseButton();

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

        if(!this.root) {
            this.createRootElement();
            this.parent.appendChild(this.root);
        }

        if(this.title) {
            this.createMessageHeader();
        }

        if(this.body) {
            this.insertBody();
        }

        if(this.isDismissable) {
            if(!options.hasOwnProperty('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        if(this.color) {
            this.setColor();
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
     * Create the main message element.
     */
    createRootElement() {
        this.root = document.createElement('div');
        this.root.classList.add('message');

        this.hide();
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
     * Show the message.
     */
    show() {
        this.root.classList.remove('is-hidden');
    }

    /**
     * Hide the message.
     */
    hide() {
        this.root.classList.add('is-hidden');
    }

    /**
     * Insert the body text into the message.
     */
    insertBody() {
        let body = document.createElement('div');
        body.classList.add('message-body');
        body.innerHTML = this.body;

        this.root.appendChild(body);
    }

    /**
     * Set the colour of the message.
     */
    setColor() {
        this.root.classList.add('is-' + this.color);
    }

    /**
     * Set the size of the message.
     */
    setSize() {
        this.root.classList.add('is-' + this.size);
    }

    /**
     * Create the element that will be used to close the message.
     * @return {HTMLElement}
     */
    createCloseButton() {
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('delete');

        return closeButton;
    }

    /**
     * Create an interval to dismiss the message after the set number of ms.
     * @param  {int}
     */
    createDismissInterval(interval) {
        return setInterval(() => {
            this.handleCloseEvent();
        }, interval);
    }

    /**
     * Insert the close button before our content.
     */
    prependCloseButton() {
        if(!this.title) {
            this.createMessageHeader();
        }

        this.title.appendChild(this.closeButton);
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
        if(this.destroyOnDismiss) {
            this.destroy();
        } else {
            this.hide();
        }
    }

    /**
     * Destroy the message, removing the event listener, interval and element.
     */
    destroy() {
        if(this.closeButton) {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
        }

        clearInterval(this.dismissInterval);

        this.parent.removeChild(this.root);
        this.parent = null
        this.root = null;
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
        }

        if(dismissInterval) {
            options['dismissInterval'] = parseInt(dismissInterval)
        }

        new Message(options);
    }
}

export default Message;
