import ConfigBag from './ConfigBag';
import Bulma from './core';

/**
 * Base plugin class. Provides basic, common functionality.
 * @class Plugin
 * @since 0.7.0
 * @author  Thomas Erbe <vizuaalog@gmail.com>
 */
export default class Plugin {
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
    constructor(config = {}, root) {
        if(root) {
            config.root = root._elem;
        }

        this.config = new ConfigBag({...this.constructor.defaultConfig(), ...config});
        
        this.parent = this.config.get('parent', config.root.parentNode);

        this._events = {};
    }

    on(event, callback) {
        if(!this._events.hasOwnProperty(event)) {
            this._events[event] = [];
        }

        this._events[event].push(callback);
    }

    trigger(event, data = {}) {
        if(!this._events.hasOwnProperty(event)) {
            return;
        }

        for(let i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    }

    destroy() {
        Bulma(this.root).destroyData();
    }
}