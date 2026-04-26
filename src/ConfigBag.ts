import PluginConfig from "./PluginConfig";

export default class ConfigBag<T extends PluginConfig> {
    protected _items: T;

    constructor(initialConfig: T) {
        if(typeof initialConfig !== 'object') {
            throw new TypeError('initialConfig must be of type object.');
        }

        this._items = initialConfig;
    }

    set(key: string, value: any): any {
        if(!key || value === undefined) {
            throw new Error('A key and value must be provided when setting a new option.');
        }

        this._items[key as keyof T] = value;
    }

    has(key: string): boolean {
        if(!key) {
            throw new Error('A key must be provided.');
        }

        return !!(this._items.hasOwnProperty(key) && this._items[key as keyof T]);
    }

    get(key: string, defaultValue: any = null): any {
        if(defaultValue && !this.has(key)) {
            if(typeof defaultValue === 'function') {
                return defaultValue();
            }
            
            return defaultValue;
        }

        return this._items[key as keyof T];
    }
}
