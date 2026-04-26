import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import DropdownConfig from './DropdownConfig';

export class Dropdown extends Plugin {
    $triggerElement: HTMLElement;
    $menuElement: HTMLElement|null;

    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.dropdown');
        }

        Core.each(elements, (element: HTMLElement) => {
            Bulma(element).dropdown({
                closeOthers: element.getAttribute('data-close-others') !== 'false'
            });
        });
    }

    static defaultConfig(): DropdownConfig {
        return {
            closeOthers: true
        };
    }
    
    constructor(config: DropdownConfig, root: HTMLElement) {
        super(config, root);

        this.$root.getElement().setAttribute('data-bulma-attached', 'attached');
        this.$triggerElement = this.findTriggerElement();
        this.$menuElement = this.findMenuElement();

        this.registerEvents();
        this.updateMenuVisibility();

        Bulma(this.$root).data('dropdown', this);

        this.trigger('init');
    }
    
    registerEvents() {
        this.$triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
    }
    
    findTriggerElement(): HTMLElement {
        let root = this.$root.getElement();
        let trigger = Array.from(root.children).find((element: Element) => {
            return element.classList.contains('dropdown-trigger');
        });

        return (trigger ?? root.querySelector<HTMLElement>('.dropdown-trigger')) as HTMLElement;
    }

    findMenuElement(): HTMLElement|null {
        let root = this.$root.getElement();
        let menu = Array.from(root.children).find((element: Element) => {
            return element.classList.contains('dropdown-menu');
        });

        return menu ? menu as HTMLElement : null;
    }

    handleTriggerClick(event: MouseEvent) {
        event.stopPropagation();

        if (this.$root.getElement().classList.contains('is-active')) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.$root.getElement().classList.contains('is-active')) {
            return;
        }

        if (this.config.get('closeOthers')) {
            this.closeOtherDropdowns();
        }

        this.$root.getElement().classList.add('is-active');
        this.updateMenuVisibility();

        this.trigger('open');
    }

    close() {
        if (!this.$root.getElement().classList.contains('is-active')) {
            return;
        }

        this.$root.getElement().classList.remove('is-active');
        this.updateMenuVisibility();

        this.trigger('close');
    }

    updateMenuVisibility() {
        if (!this.$menuElement) {
            return;
        }

        if (this.$root.getElement().classList.contains('is-active')) {
            this.$menuElement.classList.remove('is-hidden');
        } else {
            this.$menuElement.classList.add('is-hidden');
        }
    }

    closeOtherDropdowns() {
        let root = this.$root.getElement();
        let activeDropdowns = document.querySelectorAll<HTMLElement>('.dropdown.is-active');

        Core.each(activeDropdowns, (dropdown: HTMLElement) => {
            if (dropdown === root || dropdown.contains(root) || root.contains(dropdown)) {
                return;
            }

            let instance = Bulma(dropdown).data('dropdown') as Dropdown|null;

            if (instance) {
                instance.close();
                return;
            }

            dropdown.classList.remove('is-active');
            Array.from(dropdown.children).find((element: Element) => {
                return element.classList.contains('dropdown-menu');
            })?.classList.add('is-hidden');
        });
    }
}

Core.registerPlugin('dropdown', Dropdown);

export default Bulma;

declare module '../../Core' {
    interface Core {
        dropdown(config?: DropdownConfig): Dropdown;
    }
}
