import ConfigBag from './ConfigBag';

/**
 * Base plugin class. Provides basic, common functionality.
 * @class Plugin
 * @since 0.7.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class Plugin {
    /**
     * Helper method used by the Bulma core to create a new instance.
     * @param  {Object?} config The config object for this instance
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
     * Returns an object containing the default config for this plugin.
     * @returns {object} The default config object.
     */
    static defaultConfig() {
        return {};
    }

    /**
     * Create a plugin.
     * @param {object} config The config for this plugin
     */
    constructor(config = {}) {
        this.config = new ConfigBag({...this.constructor.defaultConfig(), ...config});

        this.parent = this.config.get('parent', document.body);
    }
}