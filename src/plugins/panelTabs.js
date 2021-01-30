import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module PanelTabs
 * @since  0.12.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export class PanelTabs extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} context The root element for this instance
     * @returns {undefined}
     */
    static parseDocument(context) {
        let elements;

        if (typeof context.classList === 'object' && context.classList.contains('panel')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.panel');
        }

        Bulma.each(elements, (element) => {
            if(element.querySelector('.panel-tabs') === null) {
                return;
            }

            Bulma(element).panelTabs();
        });
    }

    /**
     * Returns an object containing the default config for this plugin.
     * @returns {object} The default config object.
     */
    static defaultConfig() {
        return {};
    }

    /**
     * Plugin constructor
     * @param  {Object} config The config object for this plugin
     * @return {this} The newly created instance
     */
    constructor(config, root) {
        super(config, root);

        /**
         * The root tab element
         * @param {HTMLElement}
         */
        this.root = this.config.get('root');
        this.root.setAttribute('data-bulma-attached', 'attached');

        /**
         * The tab nav container
         * @param {HTMLElement}
         */
        this.nav = this.findNav();

        /**
         * The tab's nav items
         * @param {HTMLElement[]}
         */
        this.navItems = this.findNavItems();

        /**
         * The tab's content items
         * @param {HTMLElement[]}
         */
        this.contentItems = this.findContentItems();

        this.setupNavEvents();

        this.on('init', this.showActiveTab.bind(this));

        Bulma(this.root).data('panelTabs', this);

        this.trigger('init');
    }

    /**
     * Find the tab navigation container.
     * @returns {HTMLElement} The navigation container
     */
    findNav() {
        return this.root.querySelector('.panel-tabs');
    }

    /**
     * Find each individual tab item
     * @returns {NodeListOf<Element>} An array of the found items
     */
    findNavItems() {
        return this.nav.querySelectorAll('a');
    }

    /**
     * Find each individual content item
     * @returns {NodeListOf<Element>} An array of the found items
     */
    findContentItems() {
        return this.root.querySelectorAll('.panel-block[data-category]');
    }

    /**
     * Setup the events to handle tab changing
     * @returns {void}
     */
    setupNavEvents() {
        Bulma.each(this.navItems, (navItem) => {
            navItem.addEventListener('click', () => {
                this.setActive(navItem.getAttribute('data-target'));
            });
        });
    }

    /**
     * Show the correct category and mark the tab as active.
     * 
     * @param {string|null} category The new category to set
     */
    setActive(category) {
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

    /**
     * This is called on init and will setup the panel tabs for the current active tab, if any
     */
    showActiveTab() {
        let activeNavFound = false;

        Bulma.each(this.navItems, (navItem) => {
            if(navItem.classList.contains('is-active')) {
                this.setActive(navItem.getAttribute('data-target'));
                activeNavFound = true;
            }
        });

        // If no nav item has is-active then use the first one
        if(!activeNavFound) {
            this.setActive(this.navItems[0].getAttribute('data-target'));
        }
    }
}

Bulma.registerPlugin('panelTabs', PanelTabs);

export default Bulma;
