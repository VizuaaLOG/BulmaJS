import DismissableConfig from '../../DismissableConfig';

export default interface MessageConfig extends DismissableConfig {
    body?: string|null;
}