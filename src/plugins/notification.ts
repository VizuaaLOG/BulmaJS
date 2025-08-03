import Bulma from '../core';
import DismissableComponent from '../dismissableComponent';

/**
 * @module Notification
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 * @extends DismissableComponent
 */
export class Notification extends DismissableComponent {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static parseDocument(context) {
        let elements;

        if (typeof context.classList === 'object' && context.classList.contains('notification')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.notification');
        }

        Bulma.each(elements, (element) => {
            let bulmaElement = Bulma(element);

            if (bulmaElement.data('notification')) {
                return;
            }

            let closeBtn = element.querySelector('.delete');

            bulmaElement.notification({
                body: null,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true,
                dismissInterval: element.hasAttribute('data-dismiss-interval') ? element.getAttribute('data-dismiss-interval') : null
            });
        });
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config, root) {
        super('notification', config, root);

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if (this.isDismissable) {
            if (!this.config.has('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        Bulma(this.root).data('notification', this);

        this.trigger('init');
    }
}

Bulma.registerPlugin('notification', Notification);

export default Bulma;
