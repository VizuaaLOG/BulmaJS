const Bulma = {
    /**
     * Current BulmaJS version.
     * @type {String}
     */
    VERSION: '0.10.4',

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

        return Bulma.plugins[key].handler.create(options);
    },

    /**
     * Register a new plugin
     * @param  {String} key The key to register the plugin under
     * @param  {Object} plugin The plugin's main constructor
     * @param  {number?} priority The priority this plugin has over other plugins. Higher means the plugin is registered before lower.
     * @return {undefined}
     */
    registerPlugin(key, plugin, priority = 0) {
        if(!key) {
            throw new Error('[BulmaJS] Key attribute is required.');
        }
        
        this.plugins[key] = {
            priority: priority,
            handler: plugin
        };
    },

    /**
     * Parse the HTML DOM searching for data-bulma attributes. We will then pass
     * each element to the appropriate plugin to handle the required processing.
     * 
     * @return {undefined}
     */
    traverseDOM(root = document) {
        let elements = root.querySelectorAll(this.getPluginClasses());
        
        this.each(elements, (element) => {
            if(element.hasAttribute('data-bulma-attached')) {
                return;
            }

            let plugins = this.findCompatiblePlugins(element);

            this.each(plugins, (plugin) => {
                plugin.handler.parse(element);
            });
        });
    },

    /**
     * Return a string of classes to search the DOM for
     * @returns {string} The string containing the classes
     */
    getPluginClasses() {
        var classes = [];

        for(var key in this.plugins) {
            if(!this.plugins[key].handler.getRootClass()) {
                continue;
            }

            classes.push('.' + this.plugins[key].handler.getRootClass());
        }

        return classes.join(',');
    },

    /**
     * Search our plugins and find one that matches the element
     * @param {HTMLElement} element The element we want to match for
     * @returns {Object} The plugin that matched
     */
    findCompatiblePlugins(element) {
        let compatiblePlugins = [];

        let sortedPlugins = Object.keys(this.plugins)
            .sort((a, b) => this.plugins[a].priority < this.plugins[b].priority);

        this.each(sortedPlugins, (key) => {
            if(element.classList.contains(this.plugins[key].handler.getRootClass())) {
                compatiblePlugins.push(this.plugins[key]);
            }
        });

        return compatiblePlugins;
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

        this.each(classes, (className) => {
            elem.classList.add(className);
        });

        return elem;
    },

    /**
     * Helper method to normalise a plugin finding an element.
     * @param {string} query The CSS selector to query for
     * @param {HTMLElement|null} context The element we want to search within
     * @param {boolean} nullable Do we except a null response?
     * @returns {null|HTMLElement} The element we found, or null if allowed.
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
    },

    /**
     * Find an element otherwise create a new one.
     * @param {string} query The CSS selector query to find
     * @param {HTMLElement|null} parent The parent we want to search/create within
     * @param {[string]} elemName The name of the element to create
     * @param {[array]} classes The classes to apply to the element
     * @returns {HTMLElement} The HTML element we found or created
     */
    findOrCreateElement(query, parent = null, elemName = 'div', classes = []) {
        var elem = this.findElement(query, parent);

        if(!elem) {
            if(classes.length === 0) {
                classes = query.split('.').filter((item) => {
                    return item;
                });
            }

            var newElem = this.createElement(elemName, classes);

            if(parent) {
                parent.appendChild(newElem);
            }

            return newElem;
        }

        return elem;
    },

    /**
     * For loop helper
     * @param {*} objects The array/object to loop through
     * @param {*} callback The callback used for each item
     */
    each(objects, callback) {
        let i;

        for(i = 0; i < objects.length; i++) {
            callback(objects[i], i);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if(window.hasOwnProperty('bulmaOptions') && window.bulmaOptions.autoParseDocument === false) {
        return;
    }

    Bulma.traverseDOM();
});

export default Bulma;
