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
     * Plugin constructor
     * @param  {Object} options
     * @return {this}
     */
    constructor(options) {
        if(!options) options = {};

        super('notification', options);

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if(this.isDismissable) {
            if(!options.hasOwnProperty('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options
     * @return {Notification}
     */
    static create(options) {
        return new Notification(options);
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

        new Notification(options);
    }
}

Bulma.registerPlugin('notification', Notification);

export default Notification;
