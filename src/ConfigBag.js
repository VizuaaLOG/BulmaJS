/**
 * Object to hold a plugin's configuration
 * @class ConfigBag
 * @since 0.11.0
 * @author Thomas Erbe <vizuaalog@gmail.com>
 */
export default class ConfigBag {
    constructor(initialConfig = []) {
        if(typeof initialConfig !== 'object') {
            throw new TypeError('initialConfig must be of type object.');
        }

        this._items = initialConfig;
    }

    /**
     * Set a new config property
     * @param {string} key The config property's key
     * @param {mixed} value The config property's value
     */
    set(key, value) {
        if(!key || !value) {
            throw new Error('A key and value must be provided when setting a new option.');
        }

        this._items[key] = value;
    }

    /**
     * Check if a key exists
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        if(!key) {
            throw new Error('A key must be provided.');
        }

        return (this._items.hasOwnProperty(key) && this._items[key]);
    }

    /**
     * Get a property by it's key. Returns the defaultValue if it doesn't exists
     * @param {string} key 
     * @param {mixed} defaultValue
     * @returns {mixed}
     */
    get(key, defaultValue = null) {
        if(defaultValue && !this.has(key)) {
            if(typeof defaultValue === 'function') {
                return defaultValue();
            }
            
            return defaultValue;
        }

        return this._items[key];
    }
}