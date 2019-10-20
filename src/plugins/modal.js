import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Modal
 * @since  0.1.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Modal extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options THe options object for the new instance
     * @return {Modal} The newly created instance
     */
    static create(options) {
        return new Modal(options);
    }

    /**
     * Get the root class this plugin is responsible for.
     * This will tell the core to match this plugin to an element with a .modal class.
     * @returns {string} The class this plugin is responsible for.
     */
    static getRootClass() {
        return 'modal';
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            style: 'card',
            closable: true
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
        this.style = this.option('style');

        /** @param {HTMLElement} */
        this.element = this.option('element');

        if(!this.element) {
            this.element = Bulma.createElement('div', 'modal');
        }

        /** @param {HTMLElement} */
        this.parent = this.option('parent');

        if(!this.parent) {
            if(!this.element.parentNode) {
                this.parent = document.body;

                this.parent.appendChild(this.element);
            } else {
                this.parent = this.element.parentNode;
            }
        } else {
            this.parent.appendChild(this.element);
        }

        /** @param {HTMLElement} */
        this.background = Bulma.findOrCreateElement('.modal-background', this.element);

        /** @param {HTMLElement} */
        this.content = this.style === 'card' ? Bulma.findOrCreateElement('.modal-card', this.element) : Bulma.findOrCreateElement('.modal-content', this.element);

        /** @param {boolean} */
        this.closable = this.option('closable');

        /** @param {string|null} */
        this.body = this.option('body');

        /** @param {string|null} */
        this.title = this.option('title');

        if(this.style === 'card') {
            this.createCardStructure();
        } else {
            if(!this.content.innerHTML) {
                this.content.innerHTML = this.body;
            }
        }

        if(this.closable) {
            /** @param {HTMLElement} */
            this.closeButton = this.style === 'card' ? Bulma.findOrCreateElement('.delete', this.header, 'button') : Bulma.findOrCreateElement('.modal-close', this.element, 'button');
        }

        /** @param {function} */
        this.onOpen = this.option('onOpen');

        /** @param {function} */
        this.onClose = this.option('onClose');

        if(this.style === 'card') {
            this.createButtons();
        }

        this.setupEvents();
    }

    /**
     * Create the card style structure
     * @returns {void}
     */
    createCardStructure() {
        /** @param {HTMLElement} */
        this.header = Bulma.findOrCreateElement('.modal-card-head', this.content, 'header');

        /** @param {HTMLElement} */
        this.headerTitle = Bulma.findOrCreateElement('.modal-card-title', this.header, 'p');
        if(!this.headerTitle.innerHTML) {
            this.headerTitle.innerHTML = this.title;
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
     * Setup the events used by this modal.
     * @returns {void}
     */
    setupEvents() {
        if(this.closable) {
            this.closeButton.addEventListener('click', this.close.bind(this));

            this.keyupListenerBound = (evt) => this.keyupListener(evt);
            document.addEventListener('keyup', this.keyupListenerBound);

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

        Bulma.each(buttonsConfig, function(buttonConfig) {
            var button = Bulma.createElement('button', buttonConfig.classes);
            button.innerHTML = buttonConfig.label;

            button.addEventListener('click', function(event) {
                buttonConfig.onClick(event);
            });

            modal.footer.appendChild(button);
        });
    }

    /**
     * Handle the esc key being pressed.
     * @param {MouseEvent} event 
     */
    keyupListener(event) {
        if(!this.element.classList.contains('is-active')) {
            return;
        }

        let key = event.key || event.keyCode;

        if(key === 'Escape' || key === 'Esc' || key === 27) {
            this.close();
        }
    }

    /**
     * Open the modal
     * @returns {void}
     */
    open() {
        this.element.classList.add('is-active');
        document.documentElement.classList.add('is-clipped');

        if(this.onOpen) {
            this.onOpen(this);
        }
    }

    /**
     * Close the modal
     * @returns {void} 
     */
    close() {
        this.element.classList.remove('is-active');
        document.documentElement.classList.remove('is-clipped');

        if(this.onClose) {
            this.onClose(this);
        }
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

        if(this.style === 'card') {
            this.header = null;
            this.headerTitle = null;
            this.cardBody = null;
            this.footer = null;
        }

        if(this.closable) {
            this.closeButton = null;

            document.removeEventListener('keyup', this.keyupListenerBound);
        }

        this.options = [];
    }
}

Bulma.registerPlugin('modal', Modal);

export default Modal;
