import Data from './Data';
import PluginConfig from './PluginConfig';
import Plugin from './Plugin';

declare module './Core' {
    interface Core {}
}

export class Core {
    _elem: HTMLElement;

    static AUTO_PARSE_DOCUMENT: boolean = true;
    static ON_LOADED: Function|null = null;
    
    static ID: string = 'bulma-' + new Date().getTime();
    static VERSION: string = '1.0.0';
    static CACHE: Data = new Data();
    static PLUGINS: Record<string, { priority: number; handler: typeof Plugin }> = {} = {};

    static registerPlugin(key: string, plugin: typeof Plugin, priority: number = 0): void {
        if (!key) {
            throw new Error('[BulmaJS] Key attribute is required.');
        }

        Core.PLUGINS[key] = {
            priority: priority,
            handler: plugin
        };

        (Core.prototype as any)[key] = function(config: any) {
            return new Core.PLUGINS[key].handler(config, this);
        };
    }

    static parseDocument(root: HTMLElement|Document = document) {
        let sortedPlugins = Object.keys(Core.PLUGINS)
            .sort((a, b) => {
                if(Core.PLUGINS[a].priority < Core.PLUGINS[b].priority) return -1;
                if(Core.PLUGINS[a].priority > Core.PLUGINS[b].priority) return 1;
                return 0;
            });

        Core.each(sortedPlugins, (key: string) => {
            if (!Core.PLUGINS[key].handler.hasOwnProperty('parseDocument')) {
                return;
            }

            Core.PLUGINS[key].handler.parseDocument(root);
        });
    }

    static createElement<T extends keyof HTMLElementTagNameMap>(name: T, classes: string|string[]): HTMLElementTagNameMap[T] {
        if (!classes) {
            classes = [];
        }

        if (typeof classes === 'string') {
            classes = [classes];
        }

        let elem = document.createElement<T>(name);

        Core.each(classes, (className: string) => {
            elem.classList.add(className);
        });

        return elem;
    }

    static findOrCreateElement<T extends keyof HTMLElementTagNameMap>(query: string, parent: HTMLElement|Document = document, elemName: string = 'div', classes: string[] = []): HTMLElementTagNameMap[T] {
        var elem = parent.querySelector<T>(query as T);

        if (!elem) {
            if (classes.length === 0) {
                classes = query.split('.').filter((item) => {
                    return item;
                });
            }

            var newElem = Core.createElement<T>(elemName as T, classes);

            parent.appendChild(newElem);

            return newElem;
        }

        return elem;
    }
    
    static each(objects: Array<any>|NodeList|NodeListOf<any>, callback: Function) {
        let i;

        for (i = 0; i < objects.length; i++) {
            callback(objects[i], i);
        }
    }

    static ajax(url: string) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    resolve(Core._stripScripts(request.responseText));
                } else {
                    reject();
                }
            };

            request.onerror = () => reject();

            request.send();
        });
    }
    
    static _stripScripts(htmlString: string) {
        var div = document.createElement('div');
        div.innerHTML = htmlString;

        var scripts = div.getElementsByTagName('script');

        var i = scripts.length;

        while (i--) {
            scripts[i].parentNode?.removeChild(scripts[i]);
        }

        return div.innerHTML.replace(/  +/g, ' ');
    }

    constructor(selector: string|HTMLElement|null) {
        if (selector as any instanceof HTMLElement) {
            this._elem = selector as HTMLElement;
        } else {
            this._elem = document.querySelector(selector as string) as HTMLElement;
        }

        if (!selector) {
            this._elem = document.createElement('div');
        }

        if (!this._elem.hasOwnProperty(Core.ID)) {
            // @ts-ignore
            this._elem[Core.ID] = Data.UID++;
        }
    }

    data(key: string, value: any = undefined) {
        if (!value) {
            // @ts-ignore
            return Core.CACHE.get(this._elem[Core.ID], key);
        }

        // @ts-ignore
        Core.CACHE.set(this._elem[Core.ID], key, value);

        return this;
    }
    
    destroyData() {
        // @ts-ignore
        Core.CACHE.destroy(this._elem[Core.ID]);

        return this;
    }

    getElement() {
        return this._elem;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (Core.AUTO_PARSE_DOCUMENT) {
        Core.parseDocument();
    }

    if (Core.ON_LOADED) {
        Core.ON_LOADED();
    }
})

export default function Bulma(selector: string|HTMLElement|Core|null = null): Core {
    if (!(selector instanceof Core)) {
        return new Core(selector);
    }

    return selector;
}
