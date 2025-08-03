import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import TabsConfig from './TabsConfig';

export class Tabs extends Plugin {
    hover: boolean;
    nav: HTMLElement;
    navItems: HTMLElement[];
    content: HTMLElement;
    contentItems: HTMLElement[];

    static parseDocument(context: HTMLElement|Document): void {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.tabs-wrapper');
        }

        Core.each(elements, (element: HTMLElement) => {
            Bulma(element).tabs({
                hover: element.hasAttribute('data-hover')
            });
        });
    }

    static defaultConfig(): TabsConfig {
        return {
            hover: false
        };
    }

    constructor(config: TabsConfig, root: HTMLElement) {
        super(config, root);

        this.hover = this.config.get('hover');
        this.nav = this.findNav();
        this.navItems = this.findNavItems();
        this.content = this.findContent();
        this.contentItems = this.findContentItems();

        this.setupNavEvents();

        Bulma(this.$root).data('tabs', this);

        this.trigger('init');
    }

    findNav(): HTMLElement {
        return this.$root.getElement().querySelector<HTMLElement>('.tabs') as HTMLElement;
    }

    findNavItems(): HTMLElement[] {
        return Array.from(this.nav.querySelectorAll<HTMLElement>('li'));
    }

    findContent(): HTMLElement {
        return this.$root.getElement().querySelector<HTMLElement>('.tabs-content') as HTMLElement;
    }

    findContentItems(): HTMLElement[] {
        // We have to use the root here as the querySelectorAll API doesn't
        // support using '>' as the first character. So we have to have a
        // class to start with.
        return Array.from(this.$root.getElement().querySelectorAll<HTMLElement>('.tabs-content > ul > li'));
    }

    setupNavEvents() {
        Core.each(Array.from(this.navItems), (navItem: HTMLElement, index: number) => {
            navItem.addEventListener('click', () => {
                this.setActive(index);
            });

            if (this.hover) {
                navItem.addEventListener('mouseover', () => {
                    this.setActive(index);
                });
            }
        });
    }

    setActive(index: number) {
        Core.each(Array.from(this.navItems), (navItem: HTMLElement) => {
            navItem.classList.remove('is-active');
        });

        Core.each(Array.from(this.contentItems), (contentItem: HTMLElement) => {
            contentItem.classList.remove('is-active');
        });

        this.navItems[index].classList.add('is-active');
        this.contentItems[index].classList.add('is-active');
    }
}

Core.registerPlugin('tabs', Tabs);

export default Bulma;

declare module '../../Core' {
    interface Core {
        tabs(config?: TabsConfig): Tabs;
    }
}