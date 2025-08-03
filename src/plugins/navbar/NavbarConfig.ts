import PluginConfig from '../../PluginConfig';

export default interface NavbarConfig extends PluginConfig {
    sticky?: boolean;
    stickyOffset?: number;
    hideOnScroll?: boolean;
    tolerance?: number;
    hideOffset?: boolean|null;
    shadow?: boolean;
}