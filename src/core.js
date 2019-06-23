import Data from './Data';

function Bulma(selector) {
    if(! (this instanceof Bulma)) {
        return new Bulma(selector);
    }

    if(selector instanceof HTMLElement) {
        this._elem = selector;
    } else {
        this._elem = document.querySelector(selector);
    }
    
    if(!this._elem.hasOwnProperty(Bulma.id)) {
        this._elem[Bulma.id] = Data.uid++;
    }

    return this;
};

/**
 * Current BulmaJS version.
 * @type {String}
 */
Bulma.VERSION = '0.11.0';

Bulma.id = 'bulma-' + new Date().getTime();

Bulma.cache = new Data();

/**
 * An index of the registered plugins
 * @type {Object}
 */
Bulma.plugins = {};

/**
 * Helper method to create a new plugin.
 * @param  {String} key The plugin's key
 * @param  {Object} config The config to be passed to the plugin
 * @return {Object} The newly created plugin instance
 */
Bulma.create = (key, config) => {
    if(!key || !Bulma.plugins.hasOwnProperty(key)) {
        throw new Error('[BulmaJS] A plugin with the key \''+key+'\' has not been registered.');
    }

    return new Bulma.plugins[key].handler(config);
};

/**
 * Register a new plugin
 * @param  {String} key The key to register the plugin under
 * @param  {Object} plugin The plugin's main constructor
 * @param  {number?} priority The priority this plugin has over other plugins. Higher means the plugin is registered before lower.
 * @return {undefined}
 */
Bulma.registerPlugin = (key, plugin, priority = 0) => {
    if(!key) {
        throw new Error('[BulmaJS] Key attribute is required.');
    }
    
    Bulma.plugins[key] = {
        priority: priority,
        handler: plugin
    };

    Bulma.prototype[key] = function(config) {
        return Bulma.plugins[key].handler.create(this, config);
    };
};

/**
 * Parse the HTML DOM searching for data-bulma attributes. We will then pass
 * each element to the appropriate plugin to handle the required processing.
 * 
 * @return {undefined}
 */
Bulma.traverseDOM = (root = document) => {
    let elements = root.querySelectorAll(Bulma.getPluginClasses());
    
    Bulma.each(elements, (element) => {
        if(element.hasAttribute('data-bulma-attached')) {
            return;
        }

        let elem = Bulma(element);

        let plugins = Bulma.findCompatiblePlugins(element);
        
        Bulma.each(plugins, (plugin) => {
            plugin.handler.parse(element);
        });
    });
};

/**
 * Return a string of classes to search the DOM for
 * @returns {string} The string containing the classes
 */
Bulma.getPluginClasses = () => {
    var classes = [];

    for(var key in Bulma.plugins) {
        if(!Bulma.plugins[key].handler.getRootClass()) {
            continue;
        }

        classes.push('.' + Bulma.plugins[key].handler.getRootClass());
    }

    return classes.join(',');
};

/**
 * Search our plugins and find one that matches the element
 * @param {HTMLElement} element The element we want to match for
 * @returns {Object} The plugin that matched
 */
Bulma.findCompatiblePlugins = (element) => {
    let compatiblePlugins = [];

    let sortedPlugins = Object.keys(Bulma.plugins)
        .sort((a, b) => Bulma.plugins[a].priority < Bulma.plugins[b].priority);

    Bulma.each(sortedPlugins, (key) => {
        if(element.classList.contains(Bulma.plugins[key].handler.getRootClass())) {
            compatiblePlugins.push(Bulma.plugins[key]);
        }
    });

    return compatiblePlugins;
};

/**
 * Create an element and assign classes
 * @param {string} name The name of the element to create
 * @param {array} classes An array of classes to add to the element
 * @return {HTMLElement} The newly created element
 */
Bulma.createElement = (name, classes) => {
    if(!classes) {
        classes = [];
    }

    if(typeof classes === 'string') {
        classes = [classes];
    }

    let elem = document.createElement(name);

    Bulma.each(classes, (className) => {
        elem.classList.add(className);
    });

    return elem;
};

/**
 * Helper method to normalise a plugin finding an element.
 * @param {string} query The CSS selector to query for
 * @param {HTMLElement|null} context The element we want to search within
 * @param {boolean} nullable Do we except a null response?
 * @returns {null|HTMLElement} The element we found, or null if allowed.
 * @throws {TypeError}
 */
Bulma.findElement = (query, context = document, nullable = false) => {
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
};

/**
 * Find an element otherwise create a new one.
 * @param {string} query The CSS selector query to find
 * @param {HTMLElement|null} parent The parent we want to search/create within
 * @param {[string]} elemName The name of the element to create
 * @param {[array]} classes The classes to apply to the element
 * @returns {HTMLElement} The HTML element we found or created
 */
Bulma.findOrCreateElement = (query, parent = null, elemName = 'div', classes = []) => {
    var elem = Bulma.findElement(query, parent);

    if(!elem) {
        if(classes.length === 0) {
            classes = query.split('.').filter((item) => {
                return item;
            });
        }

        var newElem = Bulma.createElement(elemName, classes);

        if(parent) {
            parent.appendChild(newElem);
        }

        return newElem;
    }

    return elem;
};

/**
 * For loop helper
 * @param {*} objects The array/object to loop through
 * @param {*} callback The callback used for each item
 */
Bulma.each = (objects, callback) => {
    let i;

    for(i = 0; i < objects.length; i++) {
        callback(objects[i], i);
    }
};

/**
 * Make an AJAX GET request to the specified URL. Stripping any script tags from the response.
 * @param {*} url The url to send the request to
 * @returns {Promise} Returns a promise containing the response HTML or error
 */
Bulma.ajax = (url) => {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                resolve(Bulma._stripScripts(request.responseText));
            } else {
                reject();
            }
        };

        request.onerror = () => reject();

        request.send();
    });
};

/**
 * Strip any script tags from a HTML string.
 * @param {string} htmlString 
 * @returns {string} The cleaned HTML string
 * 
 * @private
 */
Bulma._stripScripts = (htmlString) => {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    
    var scripts = div.getElementsByTagName('script');
    
    var i = scripts.length;
    
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    
    return div.innerHTML;
};

Bulma.prototype.data = function(key, value) {
    if(!value) {
        return Bulma.cache.get(this._elem[Bulma.id], key);
    }

    Bulma.cache.set(this._elem[Bulma.id], key, value);
};

document.addEventListener('DOMContentLoaded', () => {
    if(window.hasOwnProperty('bulmaOptions') && window.bulmaOptions.autoParseDocument === false) {
        return;
    }

    Bulma.traverseDOM();
});

export default Bulma;
