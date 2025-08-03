import PluginConfig from "./PluginConfig";

export default interface DismissableConfig extends PluginConfig {
    isDismissable: boolean;
    destroyOnDismiss: boolean;
    element: HTMLElement|null;
}