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

        this.type = this.option('type', 'card');

        this.parent = this.option('parent', document.body);
        this.element = this.option('element', Bulma.findOrCreateElement('.modal', this.parent));
        if(!this.element.classList.contains('modal')) {
            this.element.classList.add('modal');
        }

        this.background = Bulma.findOrCreateElement('.modal-background', this.element);
        this.content = this.type === 'card' ? Bulma.findOrCreateElement('.modal-card', this.element) : Bulma.findOrCreateElement('.modal-content', this.element);

        this.closable = this.option('closable', true);
        this.body = this.option('body');
        this.title = this.option('title');

        if(this.type === 'card') {
            this.header = Bulma.findOrCreateElement('.modal-card-head', this.content, 'header');
            this.headerTitle = Bulma.findOrCreateElement('.modal-card-title', this.header, 'p');
            this.headerTitle.innerHTML = this.title;

            this.cardBody = Bulma.findOrCreateElement('.modal-card-body', this.content, 'section');
            this.cardBody.innerHTML = this.body;

            this.footer = Bulma.findOrCreateElement('.modal-card-foot', this.content, 'footer');
        } else {
            this.content.innerHTML = this.body;
        }

        if(this.closable) {
            this.closeButton = this.type === 'card' ? Bulma.findOrCreateElement('.delete', this.header, 'button') : Bulma.findOrCreateElement('.modal-close', this.element, 'button');
        }

        if(this.type === 'card') {
            this.createButtons();
        }

        this.setupEvents();
    }

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

    open() {
        this.element.classList.add('is-active');
    }

    close() {
        this.element.classList.remove('is-active');
    }

    destroy() {
        this.parent.remove();

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
