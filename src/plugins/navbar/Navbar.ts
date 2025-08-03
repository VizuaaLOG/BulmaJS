import Bulma, { Core } from '../../Core';
import Plugin from '../../Plugin';
import NavbarConfig from './NavbarConfig';

export class Navbar extends Plugin {
    triggerElement: HTMLElement;
    target: HTMLElement;
    sticky: boolean;
    stickyOffset: number;
    hideOnScroll: boolean;
    tolerance: number;
    hideOffset: number;
    shadow: boolean;
    dropdowns: NodeListOf<HTMLElement>;
    lastScrollY: number | undefined;

    static parseDocument(context: HTMLElement|Document) {
        let elements;

        if (context.hasOwnProperty('classList') && (context as HTMLElement).classList.contains('dropdown')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.navbar');
        }

        Core.each(elements, (element: HTMLElement) => {
            Bulma(element).navbar({
                sticky: element.hasAttribute('data-sticky'),
                stickyOffset: element.hasAttribute('data-sticky-offset') ? parseInt(element.getAttribute('data-sticky-offset') ?? '') : 0,
                hideOnScroll: element.hasAttribute('data-hide-on-scroll'),
                tolerance: element.hasAttribute('data-tolerance') ? parseInt(element.getAttribute('data-tolerance') ?? '') : 0,
                hideOffset: element.hasAttribute('data-hide-offset'),
                shadow: element.hasAttribute('data-sticky-shadow')
            });
        });
    }

    static defaultConfig(): NavbarConfig {
        return {
            sticky: false,
            stickyOffset: 0,
            hideOnScroll: false,
            tolerance: 0,
            hideOffset: null,
            shadow: false
        };
    }

    constructor(config: NavbarConfig, root: HTMLElement) {
        super(config, root);

        // Work out the parent if it hasn't been supplied as an option.
        if (this.$parent === null) {
            this.$parent = this.config.get('root').parentNode;
        }

        this.triggerElement = this.$root.getElement().querySelector('.navbar-burger') as HTMLElement;
        this.target = this.$root.getElement().querySelector('.navbar-menu') as HTMLElement;
        this.sticky = typeof window === 'object' && !!this.config.get('sticky');
        this.stickyOffset = parseInt(this.config.get('stickyOffset'));
        this.hideOnScroll = !!this.config.get('hideOnScroll');
        this.tolerance = parseInt(this.config.get('tolerance'));
        this.shadow = !!this.config.get('shadow');
        this.hideOffset = parseInt(this.config.get('hideOffset', Math.max(this.$root.getElement().scrollHeight, this.stickyOffset)));
        this.dropdowns = this.$root.getElement().querySelectorAll('.navbar-item.has-dropdown:not(.is-hoverable)');
        this.handleScroll = this.handleScroll.bind(this);

        Bulma(this.$root.getElement()).data('navbar', this);

        this.registerEvents();
    }

    registerEvents() {
        if(this.triggerElement) {
            this.triggerElement.addEventListener('click', this.handleTriggerClick.bind(this));
        }

        if (this.sticky) {
            this.enableSticky();
        }
    }

    handleTriggerClick() {
        if (this.target.classList.contains('is-active')) {
            this.target.classList.remove('is-active');
            this.triggerElement.classList.remove('is-active');
        } else {
            this.target.classList.add('is-active');
            this.triggerElement.classList.add('is-active');
        }
    }

    handleScroll() {
        this.toggleSticky(window.pageYOffset);
    }

    enableSticky() {
        window.addEventListener('scroll', this.handleScroll);
        this.$root.getElement().setAttribute('data-sticky', '');
        this.sticky = true;
    }

    // noinspection JSUnusedGlobalSymbols
    disableSticky() {
        window.removeEventListener('scroll', this.handleScroll);
        this.$root.getElement().removeAttribute('data-sticky');
        this.sticky = false;
    }

    // noinspection JSUnusedGlobalSymbols
    enableHideOnScroll() {
        if (!this.sticky) {
            this.enableSticky();
        }

        this.$root.getElement().setAttribute('data-hide-on-scroll', '');
        this.hideOnScroll = true;
    }

    // noinspection JSUnusedGlobalSymbols
    disableHideOnScroll() {
        this.$root.getElement().removeAttribute('data-hide-on-scroll');
        this.hideOnScroll = false;
        this.$root.getElement().classList.remove('is-hidden-scroll');
    }

    toggleSticky(scrollY: number) {
        if (scrollY > this.stickyOffset) {
            this.$root.getElement().classList.add('is-fixed-top');
            document.body.classList.add('has-navbar-fixed-top');

            if (this.shadow) {
                this.$root.getElement().classList.add('has-shadow');
            }
        } else {
            this.$root.getElement().classList.remove('is-fixed-top');
            document.body.classList.remove('has-navbar-fixed-top');

            if (this.shadow) {
                this.$root.getElement().classList.remove('has-shadow');
            }
        }

        if (this.hideOnScroll) {
            let scrollDirection = this.calculateScrollDirection(scrollY, this.lastScrollY ?? 0);
            let triggeredTolerance = this.difference(scrollY, this.lastScrollY ?? 0) >= this.tolerance;

            if (scrollDirection === 'down') {
                // only hide the navbar at the top if we reach a certain offset so the hiding is more smooth
                let isBeyondTopOffset = scrollY > this.hideOffset;
                if (triggeredTolerance && isBeyondTopOffset) {
                    this.$root.getElement().classList.add('is-hidden-scroll');
                }
            } else {
                // if scrolling up to the very top where the navbar would be by default always show it
                let isAtVeryTop = scrollY < this.hideOffset;
                if (triggeredTolerance || isAtVeryTop) {
                    this.$root.getElement().classList.remove('is-hidden-scroll');
                }
            }

            this.lastScrollY = scrollY;
        }
    }

    difference(a: number, b: number) {
        if (a > b) {
            return a - b;
        } else {
            return b - a;
        }
    }

    calculateScrollDirection(currentY: number, lastY: number) {
        return currentY >= lastY ? 'down' : 'up';
    }
}

Core.registerPlugin('navbar', Navbar);

export default Bulma;

declare module '../../Core' {
    interface Core {
        navbar(config?: NavbarConfig): Navbar;
    }
}