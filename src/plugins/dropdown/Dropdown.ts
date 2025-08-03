import Bulma from '../../core';
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

        Bulma.each(elements, (element) => {
            Bulma(element).dropdown();
        });
    }
    
    constructor(config: DropdownConfig, root: HTMLElement) {
        super(config, root);

        this.$root.setAttribute('data-bulma-attached', 'attached');
        this.$triggerElement = this.$root.querySelector<HTMLElement>('.dropdown-trigger') as HTMLElement;

        this.registerEvents();

        Bulma(this.$root).data('dropdown', this);

        this.trigger('init');
    }
    
    registerEvents() {
        this.$triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
    }
    
    handleTriggerClick() {
        if (this.$root.classList.contains('is-active')) {
            this.$root.classList.remove('is-active');

            this.trigger('close');
        } else {
            this.$root.classList.add('is-active');

            this.trigger('open');
        }
    }
}

Bulma.registerPlugin('dropdown', Dropdown);

export default Bulma;
