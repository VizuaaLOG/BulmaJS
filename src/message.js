import Bulma from './core';
import Message from './plugins/message';
Bulma.registerPlugin('message', Message);

Bulma.traverseDOM();
window.Bulma = Bulma;
