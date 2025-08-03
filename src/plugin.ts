import ConfigBag from './ConfigBag';
import Bulma from './core';
import IBulma from './interfaces/IBulma';
import IPluginConfig from './interfaces/IPluginConfig';
import IEventData from './interfaces/IEventData';

export default class Plugin {
    $root: HTMLElement|null;
    $parent: HTMLElement;
    config: ConfigBag<IPluginConfig>;

    _events: {[key: string]: Function[]};

    static parseDocument() {}

    static defaultConfig(): IPluginConfig {
        return {};
    }

    constructor(config: IPluginConfig = {}, root: IBulma|HTMLElement) {
        this.$root = (root instanceof Bulma) ? (root as IBulma)._elem : root as HTMLElement;

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

    trigger(event: string, data: IEventData = {}) {
        if(!this._events.hasOwnProperty(event)) {
            return;
        }

        for(let i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    }

    destroy() {
        Bulma(this.$root).destroyData();
        
        this.$root?.remove();

        this.trigger('destroyed');
    }
}