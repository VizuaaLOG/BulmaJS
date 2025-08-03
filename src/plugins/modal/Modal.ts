import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import ModalConfig from './ModalConfig';
import ActionConfig from '../../ActionConfig';

export class Modal extends Plugin {
    style: string;
    parent: HTMLElement | undefined;
    background: HTMLElement;
    content: HTMLElement;
    header: HTMLElement | undefined;
    headerTitle: HTMLElement | undefined;
    cardBody: HTMLElement | undefined;
    footer: HTMLElement | undefined;
    closeButton: HTMLButtonElement | undefined;
    closable: boolean;
    body: string|null;
    title: string|null;

    static defaultConfig(): ModalConfig {
        return {
            style: 'card',
            closable: true
        };
    }

    constructor(config: ModalConfig, root: HTMLElement) {
        super(config, root);

        this.style = this.config.get('style');
        
        if(!this.$root.getElement().classList.contains('modal')) {
            this.$root.getElement().classList.add('modal');
        }

        if(!this.$parent) {
            if(!this.$root.getElement().parentNode) {
                this.$parent = Bulma(document.body);

                this.$parent.getElement().appendChild(this.$root.getElement());
            } else {
                this.$parent = Bulma(this.$root.getElement().parentNode as HTMLElement);
            }
        } else {
            Bulma(this.$parent).getElement().appendChild(this.$root.getElement());
        }

        this.background = Core.findOrCreateElement('.modal-background', this.$root.getElement());
        this.content = this.style === 'card' ? Core.findOrCreateElement('.modal-card', this.$root.getElement()) : Core.findOrCreateElement('.modal-content', this.$root.getElement());
        this.closable = this.config.get('closable');
        this.body = this.config.get('body');
        this.title = this.config.get('title');

        if(this.config.get('bodyUrl')) {
            Core.ajax(this.config.get('bodyUrl'))
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
            this.closeButton = this.style === 'card' ? Core.findOrCreateElement<'button'>('.delete', this.header, 'button') : Core.findOrCreateElement<'button'>('.modal-close', this.$root.getElement(), 'button');
        }

        if(this.style === 'card' && this.config.has('buttons')) {
            this.createButtons();
        }

        this.setupEvents();
    }

    createCardStructure() {
        if(!this.content) return;

        this.header = Core.findOrCreateElement('.modal-card-head', this.content, 'header');
        if(!this.header) return;

        this.headerTitle = Core.findOrCreateElement('.modal-card-title', this.header, 'p');
        if(this.headerTitle && !this.headerTitle.innerHTML) {
            this.headerTitle.innerHTML = this.title as string;
        }

        this.cardBody = Core.findOrCreateElement('.modal-card-body', this.content, 'section');
        if(this.cardBody && !this.cardBody.innerHTML) {
            this.cardBody.innerHTML = this.body as string;
        }

        this.footer = Core.findOrCreateElement('.modal-card-foot', this.content, 'footer');
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

        let buttonsContainer = Core.createElement('div', ['buttons']);

        Core.each(buttonsConfig, (buttonConfig: ActionConfig) => {
            var button = Core.createElement('button', buttonConfig.classes ?? []);
            button.innerHTML = buttonConfig.label ?? '';

            if(typeof buttonConfig.onClick === 'function') {
                button.addEventListener('click', function(event) {
                    // @ts-ignore
                    buttonConfig.onClick(event);
                });
            }

            buttonsContainer.appendChild(button);
        });

        this.footer?.appendChild(buttonsContainer);
    }

    open() {
        this.$root.getElement()?.classList.add('is-active');
        document.documentElement.classList.add('is-clipped');

        this.trigger('open');
    }

    close() {
        this.$root.getElement()?.classList.remove('is-active');
        document.documentElement.classList.remove('is-clipped');

        this.trigger('close');
    }

    keyupListener(event: KeyboardEvent) {
        if(!this.$root.getElement()?.classList.contains('is-active')) {
            return;
        }

        let key = event.key || event.keyCode;

        if(key === 'Escape' || key === 'Esc' || key === 27) {
            this.close();
        }
    }
}

Core.registerPlugin('modal', Modal);

export default Bulma;

declare module '../../Core' {
    interface Core {
        modal(config?: ModalConfig): Modal;
    }
}