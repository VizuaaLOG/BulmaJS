const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.3.0',

    /**
     * Helper method to create a new plugin.
     * @param  {String} key
     * @param  {Object} options
     * @return {Object}
     */
    create(key, options) {
        if(!key || !Bulma.hasOwnProperty(key)) {
            throw new Error('[BulmaJS] A plugin with the key \''+key+'\' has not been registered.');
        }

        return Bulma[key].create(options);
    },

    /**
     * Register a new plugin
     * @param  {String} key
     * @param  {Object} plugin
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Bulma.traverseDOM();
});

export default Bulma;
