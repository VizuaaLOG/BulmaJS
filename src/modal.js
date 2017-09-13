import Bulma from './core';
import Modal from './plugins/modal';
Bulma.registerPlugin('modal', Modal);

Bulma.traverseDOM();
window.Bulma = Bulma;
