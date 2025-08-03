import PluginConfig from '../../PluginConfig';

export default interface ModalConfig extends PluginConfig {
    title?: string;
    body?: string;
    style?: string;
    closable?: boolean;
}