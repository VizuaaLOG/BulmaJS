import Bulma, { Core } from '../../Core';
import DismissableComponent from '../../DismissableComponent';
import NotificationConfig from './NotificationConfig';

export class Notification extends DismissableComponent {
    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.notification');
        }

        Core.each(elements, (element: HTMLElement) => {
            let bulmaElement = Bulma(element);

            if (bulmaElement.data('notification')) {
                return;
            }

            let closeBtn = element.querySelector('.delete') as HTMLButtonElement;

            bulmaElement.notification({
                body: null,
                closeButton: closeBtn,
                isDismissable: !!closeBtn,
                destroyOnDismiss: true,
                dismissInterval: element.hasAttribute('data-dismiss-interval') ? parseInt(element.getAttribute('data-dismiss-interval') ?? '') : null
            });
        });
    }

    constructor(config: NotificationConfig, root: HTMLElement) {
        super('notification', config, Bulma(root));

        // TODO: Move this into the DismissableComponent class. Due to the required
        // changes between different components, we may need a way to trigger this
        // when the component is ready.
        if (this.isDismissable) {
            if (!this.config.has('closeButton')) {
                this.prependCloseButton();
            }

            this.setupCloseEvent();
        }

        Bulma(this.$root).data('notification', this);

        this.trigger('init');
    }
}

Core.registerPlugin('notification', Notification);

export default Bulma;

declare module '../../Core' {
    interface Core {
        notification(config?: NotificationConfig): Notification;
    }
}