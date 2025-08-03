import Bulma, { Core } from '../core';
import DismissableComponent from '../dismissableComponent';

export class Message extends DismissableComponent {
    size: string;
    title: string;


    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.message');
        }

        Core.each(elements, (element) => {
            let closeBtn = element.querySelector('.delete');

            Bulma(element).message({
                body: null,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true,
                dismissInterval: element.hasAttribute('data-dismiss-interval') ? element.getAttribute('data-dismiss-interval') : null
            });
        });
    }
    
    constructor(config, root) {
        super('message', config, root);
        
        this.size = this.config.get('size');
        this.title = this.config.get('title');

        if (this.title) {
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

    /**
     * Create the message header
     * @return {undefined}
     */
    createMessageHeader() {
        let header = document.createElement('div');
        header.classList.add('message-header');

        header.innerHTML = '<p>' + this.title + '</p>';

        this.title = header;

        this.$root.getElement().insertBefore(this.title, this.$root.getElement().firstChild);
    }

    /**
     * Set the size of the message.
     * @return {undefined}
     */
    setSize() {
        this.$root.getElement().classList.add('is-' + this.size);
    }

    /**
     * Insert the body text into the component.
     * @return {undefined}
     */
    insertBody() {
        let body = document.createElement('div');
        body.classList.add('message-body');
        body.innerHTML = this.body;

        this.$root.getElement().appendChild(body);
    }

    /**
     * Insert the close button before our content.
     * @return {undefined}
     */
    prependCloseButton() {
        this.title.appendChild(this.closeButton);
    }
}

Core.registerPlugin('message', Message);

export default Bulma;
