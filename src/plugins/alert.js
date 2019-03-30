import Bulma from '../core';
import Modal from './modal';

/**
 * @module Alert
 * @since  0.8.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Alert extends Modal {
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
            body: '',
            confirm: 'Okay',
            cancel: null,
            style: 'card',
            parent: document.body,
            showHeader: true
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(options) {
        super(options);

        this.element.classList.add('alert');

        this.open();
    }

    /**
     * Create the alerts structure
     * @returns {void}
     */
    createCardStructure() {
        if(this.option('showHeader')) {
            /** @param {HTMLElement} */
            this.header = Bulma.findOrCreateElement('.modal-card-head', this.content, 'header', ['modal-card-head', 'has-background-' + this.option('type')]);

            /** @param {HTMLElement} */
            var textColor = this.option('type') == 'warning' ? 'black' : 'white';
            this.headerTitle = Bulma.createElement('p', ['modal-card-title', 'has-text-' + textColor]);
            this.headerTitle.innerHTML = this.title;
            this.header.appendChild(this.headerTitle);
        }

        /** @param {HTMLElement} */
        this.cardBody = Bulma.findOrCreateElement('.modal-card-body', this.content, 'section');
        if(!this.cardBody.innerHTML) {
            this.cardBody.innerHTML = this.body;
        }

        /** @param {HTMLElement} */
        this.footer = Bulma.findOrCreateElement('.modal-card-foot', this.content, 'footer');
    }

    /**
     * Go through the provided buttons option and create the buttons.
     * @returns {void}
     */
    createButtons() {
        var defaultButtonOptions = { close: true, destroy: true, onClick: function(e) {} };

        var confirmOptions = this.option('confirm');
        if(typeof confirmOptions === 'string') {
            confirmOptions = {
                label: confirmOptions,
                classes: []
            };
        }
        confirmOptions = { ...defaultButtonOptions, ...confirmOptions};

        var confirmButton = Bulma.createElement('button', ['button', 'is-' + this.option('type')].concat(confirmOptions.classes));
        confirmButton.innerHTML = confirmOptions.label;
        confirmButton.addEventListener('click', e => {
            confirmOptions.onClick(e);

            if(confirmOptions.close) {
                this.close();
            }

            if(confirmOptions.destory) {
                this.destroy();
            }
        });
        this.footer.appendChild(confirmButton);

        if(this.option('cancel')) {
            var cancelOptions = this.option('cancel');
            if(typeof cancelOptions === 'string') {
                cancelOptions = {
                    label: cancelOptions,
                    classes: []
                };
            }
            cancelOptions = { ...defaultButtonOptions, ...cancelOptions};

            var cancelButton = Bulma.createElement('button', ['button'].concat(cancelOptions.classes));
            cancelButton.innerHTML = cancelOptions.label;
            cancelButton.addEventListener('click', e => {
                cancelOptions.onClick(e);

                if(cancelOptions.close) {
                    this.close();
                }

                if(cancelOptions.destroy) {
                    this.destroy();
                }
            });
            this.footer.appendChild(cancelButton);
        }
    }
}

Bulma.registerPlugin('alert', Alert);

export default Alert;
