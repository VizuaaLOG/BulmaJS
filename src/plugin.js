/**
 * Base plugin class. Provides basic, common functionality.
 * @class Plugin
 * @since 0.7.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class Plugin {
    /**
     * Create a plugin.
     * @param {object} options The options for this plugin
     */
    constructor(options) {
        this.options = options || {};
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