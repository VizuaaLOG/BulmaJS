import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Alert
 * @since  0.8.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Alert extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options THe options object for the new instance
     * @return {Alert} The newly created instance
     */
    static create(options) {
        return new Alert(options);
    }

    /**
     * Get the root class this plugin is responsible for.
     * This element has no HTML only equivelent. So this is not required.
     * @returns {string} The class this plugin is responsible for.
     */
    static getRootClass() {
        return '';
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            type: 'info',
            title: '',
            message: '',
            confirm: 'Okay',
            cancel: null,
            onConfirm: function() {},
            onCancel: function() {}
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(options) {
        super(options);

        /** @param {string} */
        this.type = this.option('type');

        /** @param {HTMLElement} */
        this.parent = document.body;

        /** @param {HTMLElement} */
        this.element = Bulma.createElement('div', ['modal', 'is-active']);
        this.parent.appendChild(this.element);

        /** @param {HTMLElement} */
        this.background = Bulma.createElement('div', 'modal-background');
        this.element.appendChild(this.background);

        /** @param {HTMLElement} */
        this.content = Bulma.createElement('div', 'modal-card');
        this.element.appendChild(this.content);

        /** @param {string|null} */
        this.title = this.option('title');

        /** @param {string|null} */
        this.message = this.option('message');

        /** @param {HTMLElement} */
        this.header = Bulma.createElement('header', ['modal-card-head', 'has-background-' + this.type]);
        this.content.appendChild(this.header);

        /** @param {HTMLElement} */
        var textColor = this.type == 'warning' ? 'black' : 'white';
        this.headerTitle = Bulma.createElement('p', ['modal-card-title', 'has-text-' + textColor]);
        this.headerTitle.innerHTML = this.title;
        this.header.appendChild(this.headerTitle);

        /** @param {HTMLElement} */
        this.closeButton = Bulma.createElement('button', 'delete');
        this.header.appendChild(this.closeButton);

        /** @param {HTMLElement} */
        this.cardBody = Bulma.createElement('section', 'modal-card-body');
        this.cardBody.innerHTML = this.message;
        this.content.appendChild(this.cardBody);

        /** @param {HTMLElement} */
        this.footer = Bulma.createElement('footer', 'modal-card-foot');
        this.content.appendChild(this.footer);

        /** @param {function} */
        this.onConfirm = this.option('onConfirm');

        /** @param {function} */
        this.onCancel = this.option('onCancel');

        this.createButtons();

        this.setupEvents();
    }

    /**
     * Setup the events used by this modal.
     * @returns {void}
     */
    setupEvents() {
        this.closeButton.addEventListener('click', this.close.bind(this));

        document.addEventListener('keyup', (event) => {
            if(!this.element.classList.contains('is-active')) {
                return;
            }

            let key = event.key || event.keyCode;

            if(key === 'Escape' || key === 'Esc' || key === 27) {
                this.close();
            }
        });
    }

    /**
     * Go through the provided buttons option and create the buttons.
     * @returns {void}
     */
    createButtons() {
        var confirmButton = Bulma.createElement('button', ['button', 'is-' + this.type]);
        confirmButton.innerHTML = this.option('confirm');
        confirmButton.addEventListener('click', () => {
            this.onConfirm();
            this.destroy();
        });
        this.footer.appendChild(confirmButton);
        
        if(this.option('cancel')) {
            var cancelButton = Bulma.createElement('button', 'button');
            cancelButton.innerHTML = this.option('cancel');
            cancelButton.addEventListener('click', () => {
                this.onCancel();
                this.destroy();
            });
            this.footer.appendChild(cancelButton);
        }
    }

    /**
     * Close the modal
     * @returns {void} 
     */
    close() {
        document.body.classList.remove('is-clipped');

        if(this.onCancel) {
            this.onCancel();
        }

        this.destroy();
    }

    /**
     * Destroy this modal, unregistering element references and removing the modal.
     * @returns {void}
     */
    destroy() {
        this.element.remove();

        this.parent = null;
        this.element = null;
        this.background = null;
        this.content = null;

        this.header = null;
        this.headerTitle = null;
        this.cardBody = null;
        this.footer = null;

        this.closeButton = null;

        this.options = [];
    }
}

Bulma.registerPlugin('alert', Alert);

export default Alert;
