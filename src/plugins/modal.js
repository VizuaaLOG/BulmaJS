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
        
        // TODO: Allow a modal to be created via javascript

        this.type = this.option('type', 'card');

        this.parent = this.option('parent', document.body);
        this.element = this.option('element', Bulma.findOrCreateElement('.modal'));
        this.background = Bulma.findOrCreateElement('.modal-background');
        this.content = this.type === 'card' ? Bulma.findOrCreateElement('.modal-card') : Bulma.findOrCreateElement('.modal-content');
        // this.buttons = this.findOrCreateButtons();

        this.closable = this.option('closable', true);
        this.body = this.option('body');
        this.title = this.option('title');

        if(this.type === 'card') {
            this.header = Bulma.findOrCreateElement('.modal-card-head', 'header');
            this.cardBody = Bulma.findOrCreateElement('.modal-card-body', 'section');
            this.footer = Bulma.findOrCreateElement('.modal-card-foot', 'footer');
        }

        this.closeButton = this.type === 'card' ? Bulma.findOrCreateElement('.delete', 'button') : Bulma.findOrCreateElement('.modal-close', 'button');

        this.setupEvents();
    }

    setupEvents() {
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

    open() {
        this.element.classList.add('is-active');
    }

    close() {
        this.element.classList.remove('is-active');
    }

    destroy() {

    }
}

Bulma.registerPlugin('modal', Modal);

export default Modal;
