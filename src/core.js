import Data from './Data';

/**
 * Wrap an element around Bulma.
 * @param {String|HTMLElement} selector The selector or HTMLElement to wrap.
 */
function Bulma(selector) {
    if (!(this instanceof Bulma)) {
        return new Bulma(selector);
    }

    if (selector instanceof Bulma) {
        return selector;
    }

    if (selector instanceof HTMLElement) {
        this._elem = selector;
    } else {
        this._elem = document.querySelector(selector);
    }

    if (!selector) {
        this._elem = document.createElement('div');
    }

    if (!this._elem.hasOwnProperty(Bulma.id)) {
        this._elem[Bulma.id] = Data.uid++;
    }

    return this;
}

/**
 * Current BulmaJS version.
 * @type {String}
 */
Bulma.VERSION = '0.12.1';

/**
 * Unique ID of Bulma
 * @type {String}
 */
Bulma.id = 'bulma-' + new Date().getTime();

/**
 * Global data cache for HTML elements
 * @type {Data}
 */
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
    if (!key || !Bulma.plugins.hasOwnProperty(key)) {
        throw new Error('[BulmaJS] A plugin with the key \'' + key + '\' has not been registered.');
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
    if (!key) {
        throw new Error('[BulmaJS] Key attribute is required.');
    }

    Bulma.plugins[key] = {
        priority: priority,
        handler: plugin
    };

    Bulma.prototype[key] = function (config) {
        return new Bulma.plugins[key].handler(config, this);
    };
};

/**
 * Parse the HTML DOM searching for data-bulma attributes. We will then pass
 * each element to the appropriate plugin to handle the required processing.
 * @param  {HTMLElement} root The root of the document we're going to parse.
 * @return {undefined}
 */
Bulma.parseDocument = (root = document) => {
    let sortedPlugins = Object.keys(Bulma.plugins)
        .sort((a, b) => Bulma.plugins[a].priority < Bulma.plugins[b].priority);

    Bulma.each(sortedPlugins, (key) => {
        if (!Bulma.plugins[key].handler.hasOwnProperty('parseDocument')) {
            // eslint-disable-next-line no-console
            console.error('[BulmaJS] Plugin ' + key + ' does not have a parseDocument method. Automatic document parsing is not possible for this plugin.');
            return;
        }

        Bulma.plugins[key].handler.parseDocument(root);
    });
};

/**
 * Create an element and assign classes
 * @param {string} name The name of the element to create
 * @param {array} classes An array of classes to add to the element
 * @return {HTMLElement} The newly created element
 */
Bulma.createElement = (name, classes) => {
    if (!classes) {
        classes = [];
    }

    if (typeof classes === 'string') {
        classes = [classes];
    }

    let elem = document.createElement(name);

    Bulma.each(classes, (className) => {
        elem.classList.add(className);
    });

    return elem;
};

/**
 * Find an element otherwise create a new one.
 * @param {string} query The CSS selector query to find
 * @param {HTMLElement|null} parent The parent we want to search/create within
 * @param {[string]} elemName The name of the element to create
 * @param {[array]} classes The classes to apply to the element
 * @returns {HTMLElement} The HTML element we found or created
 */
Bulma.findOrCreateElement = (query, parent = document, elemName = 'div', classes = []) => {
    var elem = parent.querySelector(query);

    if (!elem) {
        if (classes.length === 0) {
            classes = query.split('.').filter((item) => {
                return item;
            });
        }

        var newElem = Bulma.createElement(elemName, classes);

        parent.appendChild(newElem);

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

    for (i = 0; i < objects.length; i++) {
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

    return div.innerHTML.replace(/  +/g, ' ');
};

/**
 * Grabs a configuration property from the window.bulmaOptions global, if it's defined,
 * returns defaultValue otherwise.
 * @param {string} key The name of the option to check for
 * @param {*} [defaultValue=null] A default value of the key is not found
 */
Bulma.getGlobalConfig = function (key, defaultValue = null) {
    if (!window.hasOwnProperty('bulmaOptions')) {
        return defaultValue;
    }

    if (!window.bulmaOptions.hasOwnProperty(key)) {
        return defaultValue;
    }

    return window.bulmaOptions[key];
};

/**
 * Get or set custom data on a Bulma element.
 * @type {String} key
 * @type {any} value
 * @returns {Bulma}
 */
Bulma.prototype.data = function (key, value) {
    if (!value) {
        return Bulma.cache.get(this._elem[Bulma.id], key);
    }

    Bulma.cache.set(this._elem[Bulma.id], key, value);

    return this;
};

/**
 * Destroy the data for an element.
 * @returns {Bulma}
 */
Bulma.prototype.destroyData = function () {
    Bulma.cache.destroy(this._elem[Bulma.id]);

    return this;
};

/**
 * Returns the internal HTMLElement we're wrapping.
 *
 * @returns {HTMLElement}
 */
Bulma.prototype.getElement = function () {
    return this._elem;
};

document.addEventListener('DOMContentLoaded', () => {
    if (Bulma.getGlobalConfig('autoParseDocument', true)) {
        Bulma.parseDocument();
    }

    if (Bulma.getGlobalConfig('onLoaded')) {
        Bulma.getGlobalConfig('onLoaded')();
    }
});

export default Bulma;
