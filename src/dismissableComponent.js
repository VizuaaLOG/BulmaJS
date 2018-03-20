/**
 * @module DismissableComponent
 * @since  0.2.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class DismissableComponent {
    /**
     * Plugin constructor
     * @param  {string} name Plugin's name
     * @param  {Object} options Plugin's options
     * @return {this} The new plugin instance
     */
    constructor(name, options) {
        /**
         * The name of this component, this will be used as the root class
         * @type {string}
         */
        this.name = name;

        /**
        * Body text.
        * @type {string}
        */
        this.body = options.hasOwnProperty('body') ? options.body : '';
        
        /**
        * The parent element to inject HTML
        */
        this.parent = options.hasOwnProperty('parent') ? options.parent : document.body;
        
        /**
        * Color modifier.
        * @type {string} Possible values are null, primary, info, success, warning, danger
        */
        this.color = options.hasOwnProperty('color') ? options.color : '';
        
        /**
        * How long to wait before auto dismissing the component.
        * @type {int|null} If null component must be dismissed manually.
        */
        this.dismissInterval = options.hasOwnProperty('dismissInterval') ? this.createDismissInterval(options.dismissInterval) : null;
        
        /**
        * Does this component have a dismiss button?
        * @type {Boolean}
        */
        this.isDismissable = options.hasOwnProperty('isDismissable') ? options.isDismissable : false;
        
        /**
        * Should this component be destroyed when it is dismissed.
        * @type {Boolean}
        */
        this.destroyOnDismiss = options.hasOwnProperty('destroyOnDismiss') ? options.destroyOnDismiss : true;
        
        /**
        * The root element.
        * @type {HTMLElement|null} If this is not provided a new element will be created.
        */
        this.root = options.hasOwnProperty('element') ? options.element : null;
        
        /**
        * The element used to close the component.
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

        if(this.color) {
            this.setColor();
        }
    }

    /**
     * Create the main element.
     * @return {undefined}
     */
    createRootElement() {
        this.root = document.createElement('div');
        
        this.root.classList.add(this.name);
        this.hide();
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
        this.root.classList.add('is-' + this.color);
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

        this.parent.removeChild(this.root);
        this.parent = null;
        this.root = null;
    }
}