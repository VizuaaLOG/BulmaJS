import Bulma from './core';
import Dropdown from './plugins/dropdown';
Bulma.registerPlugin('dropdown', Dropdown);

Bulma.traverseDOM();
window.Bulma = Bulma;
