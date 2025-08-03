import Bulma, { Core } from '../../Core';
import { Modal } from '../modal/Modal';
import AlertConfig from './AlertConfig';

export class Alert extends Modal {
    static defaultConfig(): AlertConfig {
        return {
            ...Modal.defaultConfig(),
            type: 'info',
            title: '',
            body: '',
            confirm: 'Okay',
            cancel: null,
            parent: document.body,
            showHeader: true,
            destroyOnClose: true,
        };
    }

    constructor(config: AlertConfig, root: HTMLElement) {
        super(config, root);

        if(!this.$root) return;

        this.$root.getElement().classList.add('alert');

        Bulma(this.$root).data('alert', this);

        this.trigger('init');

        if(this.config.get('destroyOnClose')) {
            this.on('close', () => this.destroy());
        }

        this.open();
    }

    createCardStructure() {
        if(this.config.get('showHeader')) {
            this.header = Core.findOrCreateElement('.modal-card-head', this.content, 'header', ['modal-card-head', 'has-background-' + this.config.get('type')]);
            this.headerTitle = Core.createElement('p', ['modal-card-title', `has-text-${this.config.get('type')}-00`]);

            this.headerTitle.innerHTML = this.title as string;
            this.header.appendChild(this.headerTitle);
        } else {
            this.$root.getElement()?.classList.add('has-no-header');
        }

        /** @param {HTMLElement} */
        this.cardBody = Core.findOrCreateElement('.modal-card-body', this.content, 'section');
        if(!this.cardBody.innerHTML) {
            this.cardBody.innerHTML = this.body as string;
        }

        /** @param {HTMLElement} */
        this.footer = Core.findOrCreateElement('.modal-card-foot', this.content, 'footer');
    }

    // FIXME: Can this generate config instead so the Modal still handles it?
    createButtons() {
        var defaultButtonOptions = { close: true, destroy: true, onClick: function() {} };

        let buttonsContainer = Core.createElement('div', ['buttons']);

        var confirmOptions = this.config.get('confirm');
        if(typeof confirmOptions === 'string') {
            confirmOptions = {
                label: confirmOptions,
                classes: []
            };
        }
        confirmOptions = { ...defaultButtonOptions, ...confirmOptions};

        var confirmButton = Core.createElement('button', ['button', 'is-' + this.config.get('type')].concat(confirmOptions.classes));
        confirmButton.innerHTML = confirmOptions.label;
        confirmButton.addEventListener('click', e => {
            confirmOptions.onClick(e);

            if(confirmOptions.close) {
                this.close();
            }
        });
        buttonsContainer.appendChild(confirmButton);

        if(this.config.get('cancel')) {
            var cancelOptions = this.config.get('cancel');
            if(typeof cancelOptions === 'string') {
                cancelOptions = {
                    label: cancelOptions,
                    classes: []
                };
            }
            cancelOptions = { ...defaultButtonOptions, ...cancelOptions};

            var cancelButton = Core.createElement('button', ['button'].concat(cancelOptions.classes));
            cancelButton.innerHTML = cancelOptions.label;
            cancelButton.addEventListener('click', e => {
                cancelOptions.onClick(e);

                if(cancelOptions.close) {
                    this.close();
                }
            });
            buttonsContainer.appendChild(cancelButton);

            this.footer?.appendChild(buttonsContainer);
        }
    }
}

Core.registerPlugin('alert', Alert);

export default Bulma;

declare module '../../Core' {
    interface Core {
        alert(config?: AlertConfig): Alert;
    }
}