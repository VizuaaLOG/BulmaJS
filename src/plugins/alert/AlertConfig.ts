import IActionConfig from '../../interfaces/IActionConfig';
import ModalConfig from '../modal/ModalConfig';

export default interface AlertConfig extends ModalConfig {
    type?: 'info'|'success'|'warning'|'danger';
    confirm?: string|IActionConfig|null;
    cancel?: string|IActionConfig|null;
    parent?: HTMLElement;
    showHeader?: boolean;
    destroyOnClose?: boolean;
}