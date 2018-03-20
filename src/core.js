const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.4.0',

    /**
     * Helper method to create a new plugin.
     * @param  {String} key The plugin's key
     * @param  {Object} options The options to be passed to the plugin
     * @return {Object} The newly created plugin instance
     */
    create(key, options) {
        if(!key || !Bulma.hasOwnProperty(key)) {
            throw new Error('[BulmaJS] A plugin with the key \''+key+'\' has not been registered.');
        }

        return Bulma[key].create(options);
    },

    /**
     * Register a new plugin
     * @param  {String} key The key to register the plugin under
     * @param  {Object} plugin The plugin's main constructor
     * @return {undefined}
     */
    registerPlugin(key, plugin) {
        if(!key) {
            throw new Error('[BulmaJS] Key attribute is required.');
        }

        this[key] = plugin;
    },

    /**
     * Parse the HTML DOM searching for data-bulma attributes. We will then pass
     * each element to the appropriate plugin to handle the required processing.
     * 
     * @return {undefined}
     */
    traverseDOM() {
        let elements = document.querySelectorAll('[data-bulma]');

        elements.forEach(function(element) {
            let plugin = element.getAttribute('data-bulma');

            if(!Bulma.hasOwnProperty(plugin)) {
                throw new Error('[BulmaJS] Plugin with the key \''+plugin+'\' has not been registered.');
            }

            if(Bulma[plugin].hasOwnProperty('handleDomParsing')) {
                Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);
            }
        });
    },

    /**
     * Create an element and assign classes
     * @param {string} name The name of the element to create
     * @param {array} classes An array of classes to add to the element
     * @return {HTMLElement} The newly created element
     */
    createElement(name, classes) {
        if(!classes) {
            classes = [];
        }

        if(typeof classes === 'string') {
            classes = [classes];
        }

        let elem = document.createElement(name);

        classes.forEach((className) => {
            elem.classList.add(className);
        });

        return elem;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Bulma.traverseDOM();
});

export default Bulma;
