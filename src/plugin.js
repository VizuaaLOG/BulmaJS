/**
 * Base plugin class. Provides basic, common functionality.
 * @class Plugin
 * @since 0.7.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object?} options The options object for this instance
     * @return {Plugin|boolean} The newly created instance or false if method is not used
     */
    static create() {
        return false;
    }

    /**
     * Handle parsing the DOM elements.
     * @param {HTMLElement?} element The root element for this instance
     * @return {Plugin|boolean} The new plugin instance, or false if method is not used
     */
    static parse() {
        return false;
    }
    
    /**
     * Returns a string containing the element class this plugin supports.
     * @returns {string} The class name.
     * @throws {Error} Thrown if this method has not been replaced.
     */
    static getRootClass() {
        throw new Error('The getRootClass method should have been replaced by the plugin being created.');
    }

    /**
     * Returns an object containing the default options for this plugin.
     * @returns {object} The default options object.
     */
    static defaultOptions() {
        return {};
    }

    /**
     * Create a plugin.
     * @param {object} options The options for this plugin
     */
    constructor(options = {}) {
        this.options = {...this.constructor.defaultOptions(), ...options};

        this.parent = this.option('parent', document.body);
    }

    /**
     * Find an option by key.
     * @param {string} key The option key to find.
     * @param {any} defaultValue Default value if an option with key is not found.
     * @returns {any} The value of the option we found, or defaultValue if none found.
     */
    option(key, defaultValue = null) {
        if(!this.options.hasOwnProperty(key) || this.options[key] === null) {
            if(typeof defaultValue === 'function') {
                return defaultValue();
            }
            
            return defaultValue;
        }

        return this.options[key];
    }
}