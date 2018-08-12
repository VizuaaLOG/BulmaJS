import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Modal extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @return {undefined}
     */
    static handleDomParsing() {
        return;
    }

    /**
     * Get the root class this plugin is responsible for.
     * This will tell the core to match this plugin to an element with a .modal class.
     */
    static getRootClass() {
        return 'modal';
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options THe options object for the new instance
     * @return {Modal} The newly created instance
     */
    static create(options) {
        return new Modal(options);
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created plugin instance
     */
    constructor(options) {
        super(options);

        /**
         * @param {string}
         */
        this.type = this.option('type', 'card');

        /**
         * @param {HTMLElement}
         */
        this.parent = this.option('parent', document.body);

        /**
         * @param {HTMLElement}
         */
        this.element = this.option('element', Bulma.createElement('div', '.modal'));
        if(!this.element.classList.contains('modal')) {
            this.element.classList.add('modal');
        }
        this.parent.appendChild(this.element);

        /**
         * @param {HTMLElement}
         */
        this.background = Bulma.findOrCreateElement('.modal-background', this.element);

        /**
         * @param {HTMLElement}
         */
        this.content = this.type === 'card' ? Bulma.findOrCreateElement('.modal-card', this.element) : Bulma.findOrCreateElement('.modal-content', this.element);

        /**
         * @param {boolean}
         */
        this.closable = this.option('closable', true);

        /**
         * @param {string|null}
         */
        this.body = this.option('body');

        /**
         * @param {string|null}
         */
        this.title = this.option('title');

        if(this.type === 'card') {
            /**
             * @param {HTMLElement}
             */
            this.header = Bulma.findOrCreateElement('.modal-card-head', this.content, 'header');

            /**
             * @param {HTMLElement}
             */
            this.headerTitle = Bulma.findOrCreateElement('.modal-card-title', this.header, 'p');
            this.headerTitle.innerHTML = this.title;

            /**
             * @param {HTMLElement}
             */
            this.cardBody = Bulma.findOrCreateElement('.modal-card-body', this.content, 'section');
            this.cardBody.innerHTML = this.body;

            /**
             * @param {HTMLElement}
             */
            this.footer = Bulma.findOrCreateElement('.modal-card-foot', this.content, 'footer');
        } else {
            this.content.innerHTML = this.body;
        }

        if(this.closable) {
            /**
             * @param {HTMLElement}
             */
            this.closeButton = this.type === 'card' ? Bulma.findOrCreateElement('.delete', this.header, 'button') : Bulma.findOrCreateElement('.modal-close', this.element, 'button');
        }

        if(this.type === 'card') {
            this.createButtons();
        }

        this.setupEvents();
    }

    /**
     * Setup the events used by this modal.
     * @returns {void}
     */
    setupEvents() {
        if(this.closable) {
            this.closeButton.addEventListener('click', this.close.bind(this))
            document.addEventListener('keyup', (event) => {
                if(!this.element.classList.contains('is-active')) {
                    return;
                }

                let key = event.key || event.keyCode;

                if(key === 'Escape' || key === 'Esc' || key === 27) {
                    this.close();
                }
            });
            this.background.addEventListener('click', this.close.bind(this));
        }
    }

    /**
     * Go through the provided buttons option and create the buttons.
     * @returns {void}
     */
    createButtons() {
        var buttonsConfig = this.option('buttons', []);
        var modal = this;

        buttonsConfig.forEach(function(buttonConfig) {
            var button = Bulma.createElement('button', buttonConfig.classes);
            button.innerHTML = buttonConfig.label;

            button.addEventListener('click', function(event) {
                buttonConfig.onClick(event);
            });

            modal.footer.appendChild(button);
        });
    }

    /**
     * Open the modal
     * @returns {void}
     */
    open() {
        this.element.classList.add('is-active');
    }

    /**
     * Close the modal
     * @returns {void}
     */
    close() {
        this.element.classList.remove('is-active');
    }

    /**
     * Destroy this modal, unregistering element references and removing the modal.
     */
    destroy() {
        this.element.remove();

        this.parent = null;
        this.element = null;
        this.background = null;
        this.content = null;

        if(this.type === 'card') {
            this.header = null;
            this.headerTitle = null;
            this.cardBody = null;
            this.footer = null;
        }

        if(this.closable) {
            this.closeButton = null;
        }

        this.options = [];
    }
}

Bulma.registerPlugin('modal', Modal);

export default Modal;
