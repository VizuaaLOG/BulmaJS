const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.7.0',

    /**
     * An index of the registered plugins
     * @type {Object}
     */
    plugins: {},

    /**
     * Helper method to create a new plugin.
     * @param  {String} key The plugin's key
     * @param  {Object} options The options to be passed to the plugin
     * @return {Object} The newly created plugin instance
     */
    create(key, options) {
        if(!key || !Bulma.plugins.hasOwnProperty(key)) {
            throw new Error('[BulmaJS] A plugin with the key \''+key+'\' has not been registered.');
        }

        return Bulma.plugins[key].create(options);
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
        
        this.plugins[key] = plugin;
    },

    /**
     * Parse the HTML DOM searching for data-bulma attributes. We will then pass
     * each element to the appropriate plugin to handle the required processing.
     * 
     * @return {undefined}
     */
    traverseDOM() {
        let elements = document.querySelectorAll(this.getPluginClasses());
        
        elements.forEach((element) => {
            let plugin = this.findCompatiblePlugin(element);

            if(plugin.hasOwnProperty('handleDomParsing')) {
                plugin.handleDomParsing(element);
            }
        });
    },

    /**
     * Return a string of classes to search the DOM for
     * @returns {string}
     */
    getPluginClasses() {
        var classes = [];

        for(var key in this.plugins) {
            if(!this.plugins[key].getRootClass()) {
                continue;
            }

            classes.push('.' + this.plugins[key].getRootClass());
        }

        return classes.join(',');
    },

    /**
     * Search our plugins and find one that matches the element
     * @returns {Object}
     */
    findCompatiblePlugin(element) {
        for(var key in this.plugins) {
            if(element.classList.contains(this.plugins[key].getRootClass())) {
                return this.plugins[key];
            }
        }
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
    },

    /**
     * Helper method to normalise a plugin finding an element.
     * @param {string} query 
     * @param {HTMLElement|null} context 
     * @param {boolean} nullable 
     * @returns {null|HTMLElement}
     * @throws {TypeError}
     */
    findElement(query, context = document, nullable = false) {
        if(!query && !nullable) {
            throw new TypeError('First argument to `findElement` required. Null given.');
        }

        if(!query) {
            return null;
        }

        if(query.toString() === '[object HTMLElement]') {
            return query;
        }

        return context.querySelector(query);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Bulma.traverseDOM();
});

export default Bulma;
