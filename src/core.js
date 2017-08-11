const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.1.0',

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
            throw new Error('[BulmaJS] Key attribute is required.')
        }

        this[key] = plugin;
    },

    traverseDOM() {
        let elements = document.querySelectorAll('[data-bulma]');

        elements.forEach(function(element) {
            Bulma[element.getAttribute('data-bulma')].handleDomParsing(element);
        });
    }
}

export default Bulma;
