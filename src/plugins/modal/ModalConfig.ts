import PluginConfig from '../../interfaces/IPluginConfig';

export default interface ModalConfig extends PluginConfig {
    title?: string;
    body?: string;
    style?: string;
    closable?: boolean;
}