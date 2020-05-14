import Bulma from './core';
import Plugin from './plugin';

/**
 * @module DismissableComponent
 * @since  0.2.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class DismissableComponent extends Plugin {
    /**
     * Returns an object containing the default config for this plugin.
     * @returns {object} The default config object.
     */
    static defaultConfig() {
        return {
            isDismissable: false,
            destroyOnDismiss: true,
            element: null
        };
    }

    /**
     * Plugin constructor
     * @param  {string} name Plugin's name
     * @param  {Object} config Plugin's config
     * @return {this} The new plugin instance
     */
    constructor(name, config, root) {
        if(!root._elem.classList.contains(name)) {
            config['parent'] = root;
            root = null;
        }

        super(config, root);

        /**
         * The name of this component, this will be used as the root class
         * @type {string}
         */
        this.name = name;

        /**
        * Body text.
        * @type {string}
        */
        this.body = this.config.get('body');
        
        /**
        * Color modifier.
        * @type {string} Possible values are null, primary, info, success, warning, danger
        */
        this.color = this.config.get('color');
        
        /**
        * How long to wait before auto dismissing the component.
        * @type {int|null} If null component must be dismissed manually.
        */
        this.dismissInterval = this.config.get('dismissInterval') ? this.createDismissInterval(this.config.get('dismissInterval')) : null;
        
        /**
        * Does this component have a dismiss button?
        * @type {Boolean}
        */
        this.isDismissable = this.config.get('isDismissable');
        
        /**
        * Should this component be destroyed when it is dismissed.
        * @type {Boolean}
        */
        this.destroyOnDismiss = this.config.get('destroyOnDismiss');

        // TODO: Make internal element references all be a Bulma instance. This will keep consistency.
        if(!(this.parent instanceof Bulma)) {
            this.parent = Bulma(this.parent);
        }
        
        /**
        * The root element.
        * @type {HTMLElement|null} If this is not provided a new element will be created.
        */
        this.root = this.config.get('root', this.createRootElement.bind(this));
        
        /**
        * The element used to close the component.
        * @type {HTMLElement}
        */
        this.closeButton = this.config.get('closeButton', this.createCloseButton());

        if(this.body) {
            this.insertBody();
        }

        if(this.color) {
            this.setColor();
        }
    }

    /**
     * Create the main element.
     * @return {HTMLElement}
     */
    createRootElement() {
        let elem = document.createElement('div');
        elem.classList.add(this.name, 'is-hidden');
        elem.setAttribute('data-bulma-attached', 'attached');

        this.parent.getElement().appendChild(elem);

        return elem;
    }

    /**
     * Show the component.
     * @return {undefined}
     */
    show() {
        this.root.classList.remove('is-hidden');
    }

    /**
     * Hide the component.
     * @return {undefined}
     */
    hide() {
        this.root.classList.add('is-hidden');
    }

    /**
     * Insert the body text into the component.
     * @return {undefined}
     */
    insertBody() {
        this.root.innerHTML = this.body;
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
        this.root.insertBefore(this.closeButton, this.root.firstChild);
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
        this.trigger('dismissed');
        
        if(this.destroyOnDismiss) {
            this.destroy();
        } else {
            this.hide();
        }

        this.trigger('close');
    }

    /**
     * Set the colour of the component.
     * @return {undefined}
     */
    setColor() {
        this.root.classList.add('is-' + this.color);
    }

    /**
     * Destroy the component, removing the event listener, interval and element.
     * @return {undefined}
     */
    destroy() {
        super.destroy();
        
        if(this.closeButton) {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
        }

        clearInterval(this.dismissInterval);

        this.parent.getElement().removeChild(this.root);
        this.parent = null;
        this.root = null;

        this.trigger('destroyed');
    }
}