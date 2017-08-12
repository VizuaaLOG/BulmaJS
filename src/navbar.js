import Bulma from './core';
import Navbar from './plugins/navbar';
Bulma.registerPlugin('navbar', Navbar);

Bulma.traverseDOM();
window.Bulma = Bulma;
