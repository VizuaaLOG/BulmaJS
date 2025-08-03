import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import PanelTabsConfig from './PanelTabsConfig';

export class PanelTabs extends Plugin {
    nav: HTMLElement;
    navItems: HTMLElement[];
    contentItems: HTMLElement[];

    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.panel');
        }

        Core.each(elements, (element: HTMLElement) => {
            if(element.querySelector('.panel-tabs') === null) {
                return;
            }

            Bulma(element).panelTabs();
        });
    }

    static defaultConfig(): PanelTabsConfig {
        return {};
    }

    constructor(config: PanelTabsConfig, root: HTMLElement) {
        super(config, root);

        this.nav = this.findNav();
        this.navItems = this.findNavItems();
        this.contentItems = this.findContentItems();

        this.setupNavEvents();

        this.on('init', this.showActiveTab.bind(this));

        Bulma(this.$root).data('panelTabs', this);

        this.trigger('init');
    }

    findNav(): HTMLElement {
        return this.$root.getElement().querySelector('.panel-tabs') as HTMLElement;
    }

    findNavItems(): HTMLElement[] {
        return Array.from(this.nav.querySelectorAll('a'));
    }

    findContentItems(): HTMLElement[] {
        return Array.from(this.$root.getElement().querySelectorAll('.panel-block[data-category]'));
    }

    setupNavEvents() {
        Core.each(this.navItems, (navItem: HTMLElement) => {
            navItem.addEventListener('click', () => {
                this.setActive(navItem.getAttribute('data-target') as string);
            });
        });
    }

    setActive(category: string) {
        this.navItems.forEach((item) => {
            if(item.getAttribute('data-target') === category) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });

        this.contentItems.forEach((item) => {
            if(item.getAttribute('data-category') === category || category === null) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });
    }

    showActiveTab() {
        let activeNavFound = false;

        Core.each(this.navItems, (navItem: HTMLElement) => {
            if(navItem.classList.contains('is-active')) {
                this.setActive(navItem.getAttribute('data-target') as string);
                activeNavFound = true;
            }
        });

        // If no nav item has is-active then use the first one
        if(!activeNavFound) {
            this.setActive(this.navItems[0].getAttribute('data-target') as string);
        }
    }
}

Core.registerPlugin('panelTabs', PanelTabs);

export default Bulma;

declare module '../../Core' {
    interface Core {
        panelTabs(config?: PanelTabsConfig): PanelTabs;
    }
}