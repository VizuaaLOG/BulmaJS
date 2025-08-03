import Bulma, { Core } from '../../core';
import DismissableComponent from '../../dismissableComponent';
import MessageConfig from './MessageConfig';

export class Message extends DismissableComponent {
    size: string;
    title: HTMLElement;

    static parseDocument(context: HTMLElement|Document) {
        let elements: HTMLElement[];

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context as HTMLElement];
        } else {
            elements = Array.from(context.querySelectorAll('.message'));
        }

        Core.each(elements, (element: HTMLElement) => {
            let closeBtn = element.querySelector('.delete');

            Bulma(element).message({
                body: null,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true,
                dismissInterval: element.hasAttribute('data-dismiss-interval') ? element.getAttribute('data-dismiss-interval') : null,
            }).show();
        });
    }
    
    constructor(config: MessageConfig, root: HTMLElement) {
        super('message', config, root);

        this.size = this.config.get('size');

        if (this.config.has('title')) {
            this.createMessageHeader();
        }

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if (this.isDismissable) {
            if (!this.config.get('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        if (this.size) {
            this.setSize();
        }

        Bulma(this.$root).data('message', this);

        this.trigger('init');
    }

    createMessageHeader() {
        this.title = Core.createElement('div', ['message-header']);
        this.title.innerHTML = `<p>${this.config.get('title')}</p>`;

        this.$root.getElement().insertBefore(this.title, this.$root.getElement().firstChild);
    }

    setSize() {
        this.$root.getElement().classList.add('is-' + this.size);
    }

    insertBody() {
        let body = document.createElement('div');
        body.classList.add('message-body');
        body.innerHTML = this.body;

        this.$root.getElement().appendChild(body);
    }

    prependCloseButton() {
        this.title.appendChild(this.closeButton);
    }
}

Core.registerPlugin('message', Message);

export default Bulma;
