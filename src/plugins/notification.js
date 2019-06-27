import Bulma from '../core';
import DismissableComponent from '../dismissableComponent';

/**
 * @module Notification
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @extends DismissableComponent
 */
class Notification extends DismissableComponent {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} config The config object for this instance
     * @return {Notification} The newly created instance
     */
    static create(config) {
        // This checks if this method is being called directly, rather
        // than through the Bulma core. If so make sure we grab the config
        // as we do not need the key.
        if(arguments.length > 1) config = arguments[1];
        
        return new Notification(config);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements = document.querySelectorAll('.notification');

        Bulma.each(elements, (element) => {
            let closeBtn = element.querySelector('.delete');

            Bulma(element)
                .data('notification', new Notification({
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
     * Returns a string containing the element class this plugin supports.
     * @returns {string} The class name.
     * @throws {Error} Thrown if this method has not been replaced.
     */
    static getRootClass() {
        return 'notification';
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config) {
        super('notification', config);

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if(this.isDismissable) {
            if(!this.config.has('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        this.trigger('init');
    }
}

Bulma.registerPlugin('notification', Notification);

export default Notification;
