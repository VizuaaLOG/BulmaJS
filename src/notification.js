import utils from './utils';

class Notification {
    constructor(body, options) {
        if(!options) options = {};

        /**
         * Notifications body text.
         * @type {string}
         */
        this.body = body;

        /**
         * The parent element to inject notification
         */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;

        /**
         * Notifications color modifier.
         * @type {string} Possible values are null, primary, info, success, warning, danger
         */
        this.color = options.hasOwnProperty('color') ? options.color : '';

        /**
         * How long to wait before auto dismissing the notification.
         * @type {int|null} If null notification must be dismissed manually.
         */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;

        /**
         * Does this notification had a dismiss button?
         * @type {Boolean}
         */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;

        /**
         * Should this notification be destroyed when it is dismissed.
         * @type {Boolean}
         */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;

        /**
         * The root notification element.
         * @type {HTMLElement|null} If this is not provided a new notification element will be created.
         */
        this.root = options.hasOwnProperty('element') ? options.element : null;

        /**
         * The element used to close the notification.
         * @type {HTMLElement}
         */
        this.closeButton = options.hasOwnProperty('closeButton') ? options.closeButton : this.createCloseButton();

        if(!this.root) {
            this.createRootElement();
            this.parent.appendChild(this.root);
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
    }

    /**
     * Create the main notification element.
     */
    createRootElement() {
        this.root = document.createElement('div');

        utils.addClass(this.root, 'notification');
        this.hide();
    }

    /**
     * Show the notification.
     */
    show() {
        utils.removeClass(this.root, 'is-hidden');
    }

    /**
     * Hide the notification.
     */
    hide() {
        utils.addClass(this.root, 'is-hidden');
    }

    /**
     * Insert the body text into the notification.
     */
    insertBody() {
        this.root.innerHTML = this.body;
    }

    /**
     * Set the colour of the notification.
     */
    setColor() {
        utils.addClass(this.root, 'is-' + this.color);
    }

    /**
     * Create the element that will be used to close the notification.
     * @return {HTMLElement}
     */
    createCloseButton() {
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        utils.addClass(closeButton, 'delete');

        return closeButton;
    }

    /**
     * Create an interval to dismiss the notification after the set number of ms.
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
        this.root.insertBefore(this.closeButton, this.root.firstChild);
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
     * Destroy the notification, removing the event listener, interval and element.
     */
    destroy() {
        this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));

        clearInterval(this.dismissInterval);

        this.parent.removeChild(this.root);
        this.parent = null
        this.root = null;
    }

    /**
     * Handle parsing the DOMs data attribute API.
     */
    static handleDomParsing() {
        let elements = document.querySelectorAll('[data-bulma="notification"]');

        elements.forEach(function(element) {
            let closeBtn = element.querySelector('.delete');
            let dismissInterval = element.getAttribute('data-hide');

            new Notification(null, {
                parent: element.parentNode,
                element: element,
                closeButton: closeBtn,
                dismissInterval: dismissInterval,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true
            });
        });
    }
}

/**
 * Check for DOMContentLoad and then parse the dom finding any notifications that
 * have been setup via the data- attributes.
 */
document.addEventListener('DOMContentLoaded', Notification.handleDomParsing);

/**
 * Add the notification API to the global Bulma object.
 * @type {Object}
 */
window.Bulma = window.Bulma || {};
window.Bulma['Notification'] = Notification;
