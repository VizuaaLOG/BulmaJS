import Plugin from './plugin';

/**
 * @module DismissableComponent
 * @since  0.2.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class DismissableComponent extends Plugin {
    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            isDismissable: false,
            destroyOnDismiss: true,
            element: null
        };
    }

    /**
     * Plugin constructor
     * @param  {string} name Plugin's name
     * @param  {Object} options Plugin's options
     * @return {this} The new plugin instance
     */
    constructor(name, options) {
        super(options);

        /**
         * The name of this component, this will be used as the root class
         * @type {string}
         */
        this.name = name;

        /**
        * Body text.
        * @type {string}
        */
        this.body = this.option('body');
        
        /**
        * Color modifier.
        * @type {string} Possible values are null, primary, info, success, warning, danger
        */
        this.color = this.option('color');
        
        /**
        * How long to wait before auto dismissing the component.
        * @type {int|null} If null component must be dismissed manually.
        */
        this.dismissInterval = this.option('dismissInterval') ? this.createDismissInterval(this.option('dismissInterval')) : null;
        
        /**
        * Does this component have a dismiss button?
        * @type {Boolean}
        */
        this.isDismissable = this.option('isDismissable');
        
        /**
        * Should this component be destroyed when it is dismissed.
        * @type {Boolean}
        */
        this.destroyOnDismiss = this.option('destroyOnDismiss');
        
        /**
        * The root element.
        * @type {HTMLElement|null} If this is not provided a new element will be created.
        */
        this.element = this.option('element');

        if(!this.element) {
            this.createRootElement();
            this.parent.appendChild(this.element);
        }
        
        this.element.setAttribute('data-bulma-attached', 'attached');
        
        /**
        * The element used to close the component.
        * @type {HTMLElement}
        */
        this.closeButton = this.option('closeButton', this.createCloseButton());

        if(this.body) {
            this.insertBody();
        }

        if(this.color) {
            this.setColor();
        }
    }

    /**
     * Create the main element.
     * @return {undefined}
     */
    createRootElement() {
        this.element = document.createElement('div');
        
        this.element.classList.add(this.name);
        this.hide();
    }

    /**
     * Show the component.
     * @return {undefined}
     */
    show() {
        this.element.classList.remove('is-hidden');
    }

    /**
     * Hide the component.
     * @return {undefined}
     */
    hide() {
        this.element.classList.add('is-hidden');
    }

    /**
     * Insert the body text into the component.
     * @return {undefined}
     */
    insertBody() {
        this.element.innerHTML = this.body;
    }

    /**
     * Create the element that will be used to close the component.
     * @return {HTMLElement} The newly created close button
     */
    createCloseButton() {
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('delete');

        return closeButton;
    }

    /**
     * Create an interval to dismiss the component after the set number of ms.
     * @param  {int} interval The time to wait before dismissing the component
     * @return {undefined}
     */
    createDismissInterval(interval) {
        return setInterval(() => {
            this.handleCloseEvent();
        }, interval);
    }

    /**
     * Insert the close button before our content.
     * @return {undefined}
     */
    prependCloseButton() {
        this.element.insertBefore(this.closeButton, this.element.firstChild);
    }

    /**
     * Setup the event listener for the close button.
     * @return {undefined}
     */
    setupCloseEvent() {
        this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));
    }

    /**
     * Handle the event when our close button is clicked.
     * @return {undefined}
     */
    handleCloseEvent() {
        if(this.destroyOnDismiss) {
            this.destroy();
        } else {
            this.hide();
        }
    }

    /**
     * Set the colour of the component.
     * @return {undefined}
     */
    setColor() {
        this.element.classList.add('is-' + this.color);
    }

    /**
     * Destroy the component, removing the event listener, interval and element.
     * @return {undefined}
     */
    destroy() {
        if(this.closeButton) {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
        }

        clearInterval(this.dismissInterval);

        this.parent.removeChild(this.element);
        this.parent = null;
        this.element = null;
    }
}