import Bulma from '../core';

/**
 * @module Tabs
 * @since  0.4.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
class Tabs {
    /**
     * Plugin constructor
     * @param  {Object} options The options object for this plugin
     * @return {this} The newly created instance
     */
    constructor(options) {
        if(!options) {
            options = {};
        }

        this.root = options.hasOwnProperty('root') ? options.root : null;

        this.nav = this.findNav();
        this.navItems = this.findNavItems();

        this.content = this.findContent();
        this.contentItems = this.findContentItems();

        this.setupNavEvents();
    }

    findNav() {
        return this.root.querySelector('[data-links]');
    }

    findNavItems() {
        return this.nav.querySelectorAll('li');
    }

    findContent() {
        return this.root.querySelector('[data-content]');
    }

    findContentItems() {
        return this.content.querySelectorAll('li');
    }

    setupNavEvents() {
        this.navItems.forEach((navItem, index) => {
            navItem.addEventListener('click', (event) => {
                this.handleNavClick(navItem, index);
            });
        });
    }

    handleNavClick(navItem, index) {
        this.navItems.forEach((navItem, index) => {
            navItem.classList.remove('is-active');
        });

        this.contentItems.forEach((contentItem, index) => {
            contentItem.classList.remove('is-active');
        });

        navItem.classList.add('is-active');
        this.contentItems[index].classList.add('is-active');
    }

    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object} options The options object for this instance
     * @return {Tabs} The newly created instance
     */
    static create(options) {
        return new Tabs(options);
    }

    /**
     * Handle parsing the DOMs data attribute API.
     * @param {HTMLElement} element The root element for this instance
     * @return {undefined}
     */
    static handleDomParsing(element) {
        let options = {
            root: element
        };

        new Tabs(options);
    }
}

Bulma.registerPlugin('tabs', Tabs);

export default Tabs;
