import Bulma from './core';
import Plugin from './plugin';
import DismissableConfig from './DismissableConfig';

export default class DismissableComponent extends Plugin {
    name: string;
    body: string;
    color: string;
    dismissInterval: number|null;
    isDismissable: boolean;
    destroyOnDismiss: boolean;
    parent: typeof Bulma;
    closeButton: HTMLButtonElement;

    static defaultConfig(): DismissableConfig {
        return {
            isDismissable: false,
            destroyOnDismiss: true,
            element: null
        };
    }
    
    constructor(name: string, config: DismissableConfig, root: Core) {
        if(!root.getElement().classList.contains(name)) {
            config['parent'] = root;
            root = null;
        }

        super(config, root);
        
        this.name = name;
        this.body = this.config.get('body');
        this.color = this.config.get('color');
        this.dismissInterval = this.config.get('dismissInterval') ? this.createDismissInterval(this.config.get('dismissInterval')) : null;
        this.isDismissable = this.config.get('isDismissable');
        this.destroyOnDismiss = this.config.get('destroyOnDismiss');

        this.$root.getElement().classList.add(this.name, 'is-hidden');

        if(this.$parent) {
            this.$parent.getElement().appendChild(this.$root.getElement());
        }
        
        this.closeButton = this.config.get('closeButton', this.createCloseButton());

        if(this.body) {
            this.insertBody();
        }

        if(this.color) {
            this.setColor();
        }
    }

    show() {
        this.$root.getElement().classList.remove('is-hidden');
    }

    hide() {
        this.$root.getElement().classList.add('is-hidden');
    }

    insertBody() {
        this.$root.getElement().innerHTML = this.body;
    }

    createCloseButton() {
        var closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('delete');

        return closeButton;
    }

    createDismissInterval(interval: number) {
        return setInterval(() => {
            this.handleCloseEvent();
        }, interval);
    }

    prependCloseButton() {
        this.$root.getElement().insertBefore(this.closeButton, this.$root.getElement().firstChild);
    }

    setupCloseEvent() {
        this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));
    }

    handleCloseEvent() {
        this.trigger('dismissed');
        
        if(this.destroyOnDismiss) {
            this.destroy();
        } else {
            this.hide();
        }

        this.trigger('close');
    }

    setColor() {
        this.$root.getElement().classList.add('is-' + this.color);
    }

    destroy() {
        super.destroy();
        
        if(this.closeButton) {
            this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));
        }

        clearInterval(this.dismissInterval);

        this.trigger('destroyed');
    }
}