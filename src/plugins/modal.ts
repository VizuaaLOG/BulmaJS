import Bulma from '../core';
import Plugin from '../plugin';
import ModalConfig from './modal/ModalConfig';

export class Modal extends Plugin {
    style: string;
    parent: HTMLElement;
    background: HTMLElement;
    content: HTMLElement;
    header: HTMLElement;
    headerTitle: HTMLElement;
    cardBody: HTMLElement;
    footer: HTMLElement;
    closeButton: HTMLButtonElement;
    closable: boolean;
    body: string|null;
    title: string|null;

    static defaultConfig(): ModalConfig {
        return {
            style: 'card',
            closable: true
        };
    }

    constructor(config, root) {
        super(config, root);

        if(!this.$root) return;

        this.style = this.config.get('style');
        
        if(!this.$root.classList.contains('modal')) {
            this.$root.classList.add('modal');
        }

        if(!this.parent) {
            if(!this.$root.parentNode) {
                this.parent = document.body;

                this.parent.appendChild(this.$root);
            } else {
                this.parent = this.$root.parentNode as HTMLElement;
            }
        } else {
            this.parent.appendChild(this.$root);
        }

        this.background = Bulma.findOrCreateElement('.modal-background', this.$root);
        this.content = this.style === 'card' ? Bulma.findOrCreateElement('.modal-card', this.$root) : Bulma.findOrCreateElement('.modal-content', this.$root);
        this.closable = this.config.get('closable');
        this.body = this.config.get('body');
        this.title = this.config.get('title');

        if(this.config.get('bodyUrl')) {
            Bulma.ajax(this.config.get('bodyUrl'))
                .then((response) => {
                    this.body = response as string|null;
                    this.buildModal();
                });
        } else {
            this.buildModal();
        }

        Bulma(this.$root).data('modal', this);

        this.trigger('init');
    }

    buildModal() {
        if(!this.content) return;

        if(this.style === 'card') {
            this.createCardStructure();
        } else {
            if(!this.content.innerHTML) {
                this.content.innerHTML = this.body as string;
            }
        }

        if(this.header && this.$root && this.closable) {
            /** @param {HTMLElement} */
            this.closeButton = this.style === 'card' ? Bulma.findOrCreateElement<'button'>('.delete', this.header, 'button') : Bulma.findOrCreateElement<'button'>('.modal-close', this.$root, 'button');
        }

        if(this.style === 'card') {
            this.createButtons();
        }

        this.setupEvents();
    }

    createCardStructure() {
        if(!this.content) return;

        this.header = Bulma.findOrCreateElement('.modal-card-head', this.content, 'header');
        if(!this.header) return;

        this.headerTitle = Bulma.findOrCreateElement('.modal-card-title', this.header, 'p');
        if(this.headerTitle && !this.headerTitle.innerHTML) {
            this.headerTitle.innerHTML = this.title as string;
        }

        this.cardBody = Bulma.findOrCreateElement('.modal-card-body', this.content, 'section');
        if(this.cardBody && !this.cardBody.innerHTML) {
            this.cardBody.innerHTML = this.body as string;
        }

        this.footer = Bulma.findOrCreateElement('.modal-card-foot', this.content, 'footer');
    }

    setupEvents() {
        if(this.closable) {
            if(this.closeButton) this.closeButton.addEventListener('click', this.close.bind(this));

            document.addEventListener('keyup', (evt) => this.keyupListener(evt));

            if(this.background) this.background.addEventListener('click', this.close.bind(this));
        }
    }

    createButtons() {
        var buttonsConfig = this.config.get('buttons', []);

        let buttonsContainer = Bulma.createElement('div', ['buttons']);

        Bulma.each(buttonsConfig, (buttonConfig) => {
            var button = Bulma.createElement('button', buttonConfig.classes);
            button.innerHTML = buttonConfig.label;

            button.addEventListener('click', function(event) {
                buttonConfig.onClick(event);
            });

            buttonsContainer.appendChild(button);
        });

        this.footer.appendChild(buttonsContainer);
    }

    open() {
        this.$root?.classList.add('is-active');
        document.documentElement.classList.add('is-clipped');

        this.trigger('open');
    }

    close() {
        this.$root?.classList.remove('is-active');
        document.documentElement.classList.remove('is-clipped');

        this.trigger('close');
    }

    keyupListener(event) {
        if(!this.$root?.classList.contains('is-active')) {
            return;
        }

        let key = event.key || event.keyCode;

        if(key === 'Escape' || key === 'Esc' || key === 27) {
            this.close();
        }
    }
}

Bulma.registerPlugin('modal', Modal);

export default Bulma;
