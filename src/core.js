const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.6.0',

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

    getPluginClasses() {
        var classes = [];

        for(var key in this.plugins) {
            // FIXME: This is temporary, this check should not be required!
            if(this.plugins[key].hasOwnProperty('getRootClass')) {
                classes.push('.' + this.plugins[key].getRootClass());
            }
        }

        return classes.join(',');
    },

    findCompatiblePlugin(element) {
        for(var key in this.plugins) {
            // FIXME: This is temporary, this check should not be required!
            if(this.plugins[key].hasOwnProperty('getRootClass')) {
                if(element.classList.contains(this.plugins[key].getRootClass())) {
                    return this.plugins[key];
                }
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Bulma.traverseDOM();
});

export default Bulma;
