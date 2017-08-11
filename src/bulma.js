import Bulma from './core';

import Notification from './plugins/notification';
Bulma.registerPlugin('notification', Notification);

Bulma.traverseDOM();
window.Bulma = Bulma;
