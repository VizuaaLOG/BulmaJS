import ActionConfig from '../../ActionConfig';
import ModalConfig from '../modal/ModalConfig';

export default interface AlertConfig extends ModalConfig {
    type?: 'info'|'success'|'warning'|'danger';
    confirm?: string|ActionConfig|null;
    cancel?: string|ActionConfig|null;
    parent?: HTMLElement;
    showHeader?: boolean;
    destroyOnClose?: boolean;
}