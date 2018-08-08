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
        this.element = this.option('element', this.findOrCreateElement.bind(this));
        this.background = this.findOrCreateBackground();
        this.content = this.findOrCreateContent();
        // this.buttons = this.findOrCreateButtons();

        this.closable = this.option('closable', true);
        this.body = this.option('body');
        this.title = this.option('title');

        if(this.type === 'card') {
            this.header = this.findOrCreateHeader();
            this.cardBody = this.findOrCreateCardBody();
            this.footer = this.findOrCreateFooter();
        }

        this.closeButton = this.findOrCreateCloseButton();

        this.setupEvents();
    }

    findOrCreateElement() {
        var el = document.querySelector('.modal');

        if(el) {
            return el;
        }

        return Bulma.createElement('div', 'modal');
    }

    findOrCreateBackground() {
        var el = document.querySelector('.modal-background');

        if(el) {
            return el;
        }

        el = Bulma.createElement('div', 'modal-background');
        this.element.appendChild(el);

        return el;
    }

    findOrCreateContent() {
        if(this.type === 'card') {
            return this.findOrCreateCardContent();
        }

        var el = document.querySelector('.modal-content');

        if(el) {
            return el;
        }

        el = Bulma.createElement('div', 'modal-content');
        this.element.appendChild(el);

        return el;
    }

    findOrCreateCardContent() {
        var el = document.querySelector('.modal-card');

        if(el) {
            return el;
        }

        el = Bulma.createElement('div', 'modal-card');
        this.element.appendChild(el);

        return el;
    }

    findOrCreateHeader() {
        var el = document.querySelector('.modal-card-head');

        if(el) {
            return el;
        }

        el = Bulma.createElement('header', 'modal-card-head');
        var p = Bulma.createElement('p', 'modal-card-title');
        p.innerHTML = this.title;
        el.appendChild(p);

        this.element.appendChild(el);

        return el;
    }

    findOrCreateCardBody() {
        var el = document.querySelector('.modal-card-body');

        if(el) {
            return el;
        }

        el = Bulma.createElement('section', 'modal-card-body');
        el.innerHTML = this.body;
        this.element.appendChild(el);

        return el;
    }

    findOrCreateFooter() {
        var el = document.querySelector('.modal-card-foot');

        if(el) {
            return el;
        }

        el = Bulma.createElement('footer', 'modal-card-foot');
        this.element.appendChild(el);

        return el;
    }

    findOrCreateCloseButton() {
        if(this.type === 'card') {
            return this.findOrCreateCardCloseButton();
        }

        var el = document.querySelector('.modal-close');

        if(el) {
            return el;
        }

        el = Bulma.createElement('button', 'modal-close');
        this.element.appendChild(el);

        return el;
    }

    findOrCreateCardCloseButton() {
        var el = document.querySelector('.delete');

        if(el) {
            return el;
        }

        el = Bulma.createElement('button', 'delete');
        this.header.appendChild(el);

        return el;
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
