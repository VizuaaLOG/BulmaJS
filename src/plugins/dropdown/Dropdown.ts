import Bulma, { Core } from '../../core';
import Plugin from '../../plugin';
import DropdownConfig from './DropdownConfig';

export class Dropdown extends Plugin {
    $triggerElement: HTMLElement;

    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.dropdown');
        }

        Core.each(elements, (element) => {
            Bulma(element).dropdown();
        });
    }
    
    constructor(config: DropdownConfig, root: HTMLElement) {
        super(config, root);

        this.$root.getElement().setAttribute('data-bulma-attached', 'attached');
        this.$triggerElement = this.$root.getElement().querySelector<HTMLElement>('.dropdown-trigger') as HTMLElement;

        this.registerEvents();

        Bulma(this.$root).data('dropdown', this);

        this.trigger('init');
    }
    
    registerEvents() {
        this.$triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
    }
    
    handleTriggerClick() {
        if (this.$root.getElement().classList.contains('is-active')) {
            this.$root.getElement().classList.remove('is-active');

            this.trigger('close');
        } else {
            this.$root.getElement().classList.add('is-active');

            this.trigger('open');
        }
    }
}

Core.registerPlugin('dropdown', Dropdown);

export default Bulma;
