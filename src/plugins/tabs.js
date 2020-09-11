import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Tabs
 * @since  0.4.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export class Tabs extends Plugin {
    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @returns {undefined}
     */
    static parseDocument(context) {
        let elements;

        if (typeof context.classList === 'object' && context.classList.has('tabs-wrapper')) {
            elements = [context];
        } else {
            elements = context.querySelectorAll('.tabs-wrapper');
        }

        Bulma.each(elements, (element) => {
            Bulma(element).tabs({
                hover: element.hasAttribute('data-hover') ? true : false
            });
        });
    }

    /**
     * Returns an object containing the default config for this plugin.
     * @returns {object} The default config object.
     */
    static defaultConfig() {
        return {
            hover: false
        };
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
         * Whether the tabs should be changed when the nav item is hovered over
         * @param {boolean}
         */
        this.hover = this.config.get('hover');

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
         * The tab content container
         * @param {HTMLElement}
         */
        this.content = this.findContent();

        /**
         * The tab's content items
         * @param {HTMLElement[]}
         */
        this.contentItems = this.findContentItems();

        this.setupNavEvents();

        Bulma(this.root).data('tabs', this);

        this.trigger('init');
    }

    /**
     * Find the tab navigation container.
     * @returns {HTMLElement} The navigation container
     */
    findNav() {
        return this.root.querySelector('.tabs');
    }

    /**
     * Find each individual tab item
     * @returns {HTMLElement[]} An array of the found items
     */
    findNavItems() {
        return this.nav.querySelectorAll('li');
    }

    /**
     * Find the tab content container.
     * @returns {HTMLElement} The content container
     */
    findContent() {
        return this.root.querySelector('.tabs-content');
    }

    /**
     * Find each individual content item
     * @returns {HTMLElement[]} An array of the found items
     */
    findContentItems() {
        // We have to use the root here as the querySelectorAll API doesn't
        // support using '>' as the first character. So we have to have a
        // class to start with.
        return this.root.querySelectorAll('.tabs-content > ul > li');
    }

    /**
     * Setup the events to handle tab changing
     * @returns {void}
     */
    setupNavEvents() {
        Bulma.each(this.navItems, (navItem, index) => {
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

    /**
     * Set the provided tab's index as the active tab.
     * 
     * @param {integer} index The new index to set
     */
    setActive(index) {
        Bulma.each(this.navItems, (navItem) => {
            navItem.classList.remove('is-active');
        });

        Bulma.each(this.contentItems, (contentItem) => {
            contentItem.classList.remove('is-active');
        });

        this.navItems[index].classList.add('is-active');
        this.contentItems[index].classList.add('is-active');
    }
}

Bulma.registerPlugin('tabs', Tabs);

export default Bulma;
