import PluginConfig from "./PluginConfig";
import {Core} from './Core';

export default interface DismissableConfig extends PluginConfig {
    isDismissable?: boolean;
    dismissInterval?: number|null;
    destroyOnDismiss?: boolean;
    element?: HTMLElement|null;
    closeButton?: HTMLButtonElement|undefined;
    parent?: Core|undefined|null;
}