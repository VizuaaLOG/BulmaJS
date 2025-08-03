import DismissableConfig from '../../DismissableConfig';

export default interface NotificationConfig extends DismissableConfig {
    body?: string|null;
}