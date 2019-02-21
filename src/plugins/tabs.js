import Bulma from '../core';
import Plugin from '../plugin';

/**
 * @module Tabs
 * @since  0.4.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Tabs extends Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options The options object for this instance
     * @returns {Tabs} The newly created instance
     */
    static create(options) {
        return new Tabs(options);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @returns {undefined}
     */
    static parse(element) {
        let hover = element.hasAttribute('data-hover') ? true : false;

        let options = {
            element: element,
            hover: hover
        };

        new Tabs(options);
    }

    /**
     * The root class used for initialisation
     * @returns {string} The class this plugin is responsible for
     */
    static getRootClass() {
        return 'tabs-wrapper';
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {
            hover: false
        };
    }

    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created instance
     */
    constructor(options) {
        super(options);

        /**
         * The root tab element
         * @param {HTMLElement}
         */
        this.element = this.option('element');
        this.element.setAttribute('data-bulma-attached', 'attached');

        /**
         * Whether the tabs should be changed when the nav item is hovered over
         * @param {boolean}
         */
        this.hover = this.option('hover');

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
    }

    /**
     * Find the tab navigation container.
     * @returns {HTMLElement} The navigation container
     */
    findNav() {
        return this.element.querySelector('.tabs');
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
        return this.element.querySelector('.tabs-content');
    }

    /**
     * Find each individual content item
     * @returns {HTMLElement[]} An array of the found items
     */
    findContentItems() {
        // We have to use the root here as the querySelectorAll API doesn't
        // support using '>' as the first character. So we have to have a
        // class to start with.
        return this.element.querySelectorAll('.tabs-content > ul > li');
    }

    /**
     * Setup the events to handle tab changing
     * @returns {void}
     */
    setupNavEvents() {
        Bulma.each(this.navItems, (navItem, index) => {
            navItem.addEventListener('click', () => {
                this.handleNavClick(navItem, index);
            });

            if(this.hover) {
                navItem.addEventListener('mouseover', () => {
                    this.handleNavClick(navItem, index);
                });
            }
        });
    }

    /**
     * Handle the changing of the visible tab
     * @param {HTMLelement} navItem The nav item we are changing to
     * @param {number} index The internal index of the nav item we're changing to
     * @returns {void}
     */
    handleNavClick(navItem, index) {
        Bulma.each(this.navItems, (navItem) => {
            navItem.classList.remove('is-active');
        });

        Bulma.each(this.contentItems, (contentItem) => {
            contentItem.classList.remove('is-active');
        });

        navItem.classList.add('is-active');
        this.contentItems[index].classList.add('is-active');
    }
}

Bulma.registerPlugin('tabs', Tabs);

export default Tabs;
