declare interface ActionConfig {
    label?: string;
    onClick?: Function | null;
    classes?: string[];
}

export declare class Alert extends Modal {
    static defaultConfig(): AlertConfig;
    constructor(config: AlertConfig, root: HTMLElement);
    createCardStructure(): void;
    createButtons(): void;
}

declare interface AlertConfig extends ModalConfig {
    type?: 'info' | 'success' | 'warning' | 'danger';
    confirm?: string | ActionConfig | null;
    cancel?: string | ActionConfig | null;
    parent?: HTMLElement;
    showHeader?: boolean;
    destroyOnClose?: boolean;
}

declare function Bulma(selector?: string | HTMLElement | Core | null): Core;
export default Bulma;

declare class ConfigBag<T extends PluginConfig> {
    protected _items: T;
    constructor(initialConfig: T);
    set(key: string, value: any): any;
    has(key: string): boolean;
    get(key: string, defaultValue?: any): any;
}

export declare class Core {
    _elem: HTMLElement;
    static AUTO_PARSE_DOCUMENT: boolean;
    static ON_LOADED: Function | null;
    static ID: string;
    static VERSION: string;
    static CACHE: Data;
    static PLUGINS: Record<string, {
        priority: number;
        handler: typeof Plugin_2;
    }>;
    static registerPlugin(key: string, plugin: typeof Plugin_2, priority?: number): void;
    static parseDocument(root?: HTMLElement | Document): void;
    static createElement<T extends keyof HTMLElementTagNameMap>(name: T, classes: string | string[]): HTMLElementTagNameMap[T];
    static findOrCreateElement<T extends keyof HTMLElementTagNameMap>(query: string, parent?: HTMLElement | Document, elemName?: string, classes?: string[]): HTMLElementTagNameMap[T];
    static each(objects: Array<any> | NodeList | NodeListOf<any>, callback: Function): void;
    static ajax(url: string): Promise<unknown>;
    static _stripScripts(htmlString: string): string;
    constructor(selector: string | HTMLElement | null);
    data(key: string, value?: any): any;
    destroyData(): this;
    getElement(): HTMLElement;
}

declare class Data {
    static UID: number;
    _data: {
        [uid: string]: {
            [key: string]: any;
        };
    };
    set(uid: string, key: string, value: any): void;
    get(uid: string, key: string): any;
    destroy(uid: string): void;
}

declare class DismissableComponent extends Plugin_2 {
    name: string;
    body: string;
    color: string;
    dismissInterval: number | null;
    isDismissable: boolean;
    destroyOnDismiss: boolean;
    parent: typeof Bulma | undefined;
    closeButton: HTMLButtonElement;
    static defaultConfig(): DismissableConfig;
    constructor(name: string, config: DismissableConfig, root: Core | null);
    show(): void;
    hide(): void;
    insertBody(): void;
    createCloseButton(): HTMLButtonElement;
    createDismissInterval(interval: number): number;
    prependCloseButton(): void;
    setupCloseEvent(): void;
    handleCloseEvent(): void;
    setColor(): void;
    destroy(): void;
}

declare interface DismissableConfig extends PluginConfig {
    isDismissable?: boolean;
    dismissInterval?: number | null;
    destroyOnDismiss?: boolean;
    element?: HTMLElement | null;
    closeButton?: HTMLButtonElement | undefined;
    parent?: Core | undefined | null;
}

export declare class Dropdown extends Plugin_2 {
    $triggerElement: HTMLElement;
    static parseDocument(context: HTMLElement | Document): void;
    constructor(config: DropdownConfig, root: HTMLElement);
    registerEvents(): void;
    handleTriggerClick(): void;
}

declare interface DropdownConfig extends PluginConfig {
}

declare interface EventData {
}

declare class File_2 extends Plugin_2 {
    input: HTMLInputElement;
    filename: HTMLElement;
    static parseDocument(context: HTMLElement | Document): void;
    constructor(config: FileConfig, root: HTMLElement);
    /**
     * Register all the events this module needs.
     * @return {undefined}
     */
    registerEvents(): void;
    handleTriggerChange(event: Event): void;
    clearFileName(): void;
    getFilename(): string;
    setFileName(value: string): void;
    addHoverClass(): void;
    removeHoverClass(): void;
}
export { File_2 as File }

declare interface FileConfig extends PluginConfig {
}

export declare class Message extends DismissableComponent {
    size: string;
    title: HTMLElement | undefined;
    static parseDocument(context: HTMLElement | Document): void;
    constructor(config: MessageConfig, root: HTMLElement);
    createMessageHeader(): void;
    setSize(): void;
    insertBody(): void;
    prependCloseButton(): void;
}

declare interface MessageConfig extends DismissableConfig {
    body?: string | null;
}

export declare class Modal extends Plugin_2 {
    style: string;
    parent: HTMLElement | undefined;
    background: HTMLElement;
    content: HTMLElement;
    header: HTMLElement | undefined;
    headerTitle: HTMLElement | undefined;
    cardBody: HTMLElement | undefined;
    footer: HTMLElement | undefined;
    closeButton: HTMLButtonElement | undefined;
    closable: boolean;
    body: string | null;
    title: string | null;
    static defaultConfig(): ModalConfig;
    constructor(config: ModalConfig, root: HTMLElement);
    buildModal(): void;
    createCardStructure(): void;
    setupEvents(): void;
    createButtons(): void;
    open(): void;
    close(): void;
    keyupListener(event: KeyboardEvent): void;
}

declare interface ModalConfig extends PluginConfig {
    title?: string;
    body?: string;
    style?: string;
    closable?: boolean;
}

export declare class Navbar extends Plugin_2 {
    triggerElement: HTMLElement;
    target: HTMLElement;
    sticky: boolean;
    stickyOffset: number;
    hideOnScroll: boolean;
    tolerance: number;
    hideOffset: number;
    shadow: boolean;
    dropdowns: NodeListOf<HTMLElement>;
    lastScrollY: number | undefined;
    static parseDocument(context: HTMLElement | Document): void;
    static defaultConfig(): NavbarConfig;
    constructor(config: NavbarConfig, root: HTMLElement);
    registerEvents(): void;
    handleTriggerClick(): void;
    handleScroll(): void;
    enableSticky(): void;
    disableSticky(): void;
    enableHideOnScroll(): void;
    disableHideOnScroll(): void;
    toggleSticky(scrollY: number): void;
    difference(a: number, b: number): number;
    calculateScrollDirection(currentY: number, lastY: number): "down" | "up";
}

declare interface NavbarConfig extends PluginConfig {
    sticky?: boolean;
    stickyOffset?: number;
    hideOnScroll?: boolean;
    tolerance?: number;
    hideOffset?: boolean | null;
    shadow?: boolean;
}

declare class Notification_2 extends DismissableComponent {
    static parseDocument(context: HTMLElement | Document): void;
    constructor(config: NotificationConfig, root: HTMLElement);
}
export { Notification_2 as Notification }

declare interface NotificationConfig extends DismissableConfig {
    body?: string | null;
}

export declare class PanelTabs extends Plugin_2 {
    nav: HTMLElement;
    navItems: HTMLElement[];
    contentItems: HTMLElement[];
    static parseDocument(context: HTMLElement | Document): void;
    static defaultConfig(): PanelTabsConfig;
    constructor(config: PanelTabsConfig, root: HTMLElement);
    findNav(): HTMLElement;
    findNavItems(): HTMLElement[];
    findContentItems(): HTMLElement[];
    setupNavEvents(): void;
    setActive(category: string): void;
    showActiveTab(): void;
}

declare interface PanelTabsConfig extends PluginConfig {
}

declare class Plugin_2 {
    $root: Core;
    $parent: Core;
    config: ConfigBag<PluginConfig>;
    _events: {
        [key: string]: Function[];
    };
    static parseDocument(context: HTMLElement | Document): void;
    static defaultConfig(): PluginConfig;
    constructor(config: PluginConfig | undefined, root: Core | HTMLElement | null);
    on(event: string, callback: Function): void;
    trigger(event: string, data?: EventData): void;
    destroy(): void;
}

declare interface PluginConfig {
    root?: HTMLElement;
}

export declare class Tabs extends Plugin_2 {
    hover: boolean;
    nav: HTMLElement;
    navItems: HTMLElement[];
    content: HTMLElement;
    contentItems: HTMLElement[];
    static parseDocument(context: HTMLElement | Document): void;
    static defaultConfig(): TabsConfig;
    constructor(config: TabsConfig, root: HTMLElement);
    findNav(): HTMLElement;
    findNavItems(): HTMLElement[];
    findContent(): HTMLElement;
    findContentItems(): HTMLElement[];
    setupNavEvents(): void;
    setActive(index: number): void;
}

declare interface TabsConfig extends PluginConfig {
    hover?: boolean;
}

export { }
