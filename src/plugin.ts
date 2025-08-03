import ConfigBag from './ConfigBag';
import Bulma, { Core } from './core';
import PluginConfig from './PluginConfig';
import EventData from './EventData';

export default class Plugin {
    $root: Core;
    $parent: Core;
    config: ConfigBag<PluginConfig>;

    _events: {[key: string]: Function[]};

    static parseDocument(context: HTMLElement|Document) {}

    static defaultConfig(): PluginConfig {
        return {};
    }

    constructor(config: PluginConfig = {}, root: Core|HTMLElement|null) {
        if(root === null) {
            this.$root = Bulma();
        } else {
            this.$root = Bulma(root);
        }

        this.config = new ConfigBag({...(this.constructor as typeof Plugin).defaultConfig(), ...config});

        if(!root && !this.config.has('parent')) {
            throw new Error('A plugin requires a root and/or a parent.');
        }

        this.$parent = this.config.get('parent', config.root ? config.root.parentNode : null);

        this._events = {};
    }

    on(event: string, callback: Function) {
        if(!this._events.hasOwnProperty(event)) {
            this._events[event] = [];
        }

        this._events[event].push(callback);
    }

    trigger(event: string, data: EventData = {}) {
        if(!this._events.hasOwnProperty(event)) {
            return;
        }

        for(let i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    }

    destroy() {
        this.$root.destroyData();
        
        this.$root.getElement()?.remove();

        this.trigger('destroyed');
    }
}