import Bulma from './core';
import File from './plugins/file';
Bulma.registerPlugin('file', File);

Bulma.traverseDOM();
window.Bulma = Bulma;
