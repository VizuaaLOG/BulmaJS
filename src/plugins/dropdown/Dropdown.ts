import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import DropdownConfig from './DropdownConfig';

export class Dropdown extends Plugin {
    protected $triggerElement: HTMLElement;
    protected $menuElement: HTMLElement|null;
    protected readonly _triggerClickHandler: (event: MouseEvent) => void;

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
        this._triggerClickHandler = this.handleTriggerClick.bind(this);

        this.registerEvents();
        this.updateMenuVisibility();

        Bulma(this.$root).data('dropdown', this);

        this.trigger('init');
    }
    
    protected registerEvents() {
        this.$triggerElement.addEventListener('click', this._triggerClickHandler);
    }
    
    protected findTriggerElement(): HTMLElement {
        let root = this.$root.getElement();
        let trigger = Array.from(root.children).find((element: Element) => {
            return element.classList.contains('dropdown-trigger');
        });

        return (trigger ?? root.querySelector<HTMLElement>('.dropdown-trigger')) as HTMLElement;
    }

    protected findMenuElement(): HTMLElement|null {
        let root = this.$root.getElement();
        let menu = Array.from(root.children).find((element: Element) => {
            return element.classList.contains('dropdown-menu');
        });

        return menu ? menu as HTMLElement : null;
    }

    protected handleTriggerClick(event: MouseEvent) {
        event.stopPropagation();

        this.toggle();
    }

    protected updateMenuVisibility() {
        if (!this.$menuElement) {
            return;
        }

        if (this.isOpen()) {
            this.$menuElement.classList.remove('is-hidden');
        } else {
            this.$menuElement.classList.add('is-hidden');
        }
    }

    protected closeOtherDropdowns() {
        let root = this.$root.getElement();
        let activeDropdowns = document.querySelectorAll<HTMLElement>('.dropdown.is-active');

        Core.each(activeDropdowns, (dropdown: HTMLElement) => {
            if (dropdown === root || dropdown.contains(root) || root.contains(dropdown)) {
                return;
            }

            let instance = Bulma(dropdown).data('dropdown') as Dropdown|null;

            if (instance) {
                if (instance.isClosed()) {
                    return;
                }

                instance.close();
                return;
            }

            dropdown.classList.remove('is-active');
            Array.from(dropdown.children).find((element: Element) => {
                return element.classList.contains('dropdown-menu');
            })?.classList.add('is-hidden');
        });
    }

    public open() {
        if (this.isOpen()) {
            return;
        }

        if (this.getCloseOthers()) {
            this.closeOtherDropdowns();
        }

        this.$root.getElement().classList.add('is-active');
        this.updateMenuVisibility();

        this.trigger('open');
    }

    public close() {
        if (this.isClosed()) {
            return;
        }

        this.$root.getElement().classList.remove('is-active');
        this.updateMenuVisibility();

        this.trigger('close');
    }

    public toggle() {
        if (this.isOpen()) {
            this.close();
            return;
        }

        this.open();
    }

    public isOpen(): boolean {
        return this.$root.getElement().classList.contains('is-active');
    }

    public isClosed(): boolean {
        return !this.isOpen();
    }

    // noinspection JSUnusedGlobalSymbols
    public getTriggerElement(): HTMLElement {
        return this.$triggerElement;
    }

    // noinspection JSUnusedGlobalSymbols
    public getMenuElement(): HTMLElement|null {
        return this.$menuElement;
    }

    // noinspection JSUnusedGlobalSymbols
    public setCloseOthers(enabled: boolean) {
        this.config.set('closeOthers', enabled);
    }

    public getCloseOthers(): boolean {
        return !!this.config.get('closeOthers');
    }

    // noinspection JSUnusedGlobalSymbols
    public refresh() {
        this.$triggerElement.removeEventListener('click', this._triggerClickHandler);
        this.$triggerElement = this.findTriggerElement();
        this.$menuElement = this.findMenuElement();
        this.registerEvents();
        this.updateMenuVisibility();
    }

    public destroy() {
        this.$triggerElement.removeEventListener('click', this._triggerClickHandler);

        super.destroy();
    }
}

Core.registerPlugin('dropdown', Dropdown);

export default Bulma;

declare module '../../Core' {
    interface Core {
        dropdown(config?: DropdownConfig): Dropdown;
    }
}
