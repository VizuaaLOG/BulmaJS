import Bulma from './core';

import Notification from './plugins/notification';
Bulma.registerPlugin('notification', Notification);

import Navbar from './plugins/navbar';
Bulma.registerPlugin('navbar', Navbar);

import Message from './plugins/message';
Bulma.registerPlugin('message', Message);

import Dropdown from './plugins/dropdown';
Bulma.registerPlugin('dropdown', Dropdown);

import Modal from './plugins/modal';
Bulma.registerPlugin('modal', Modal);

Bulma.traverseDOM();
window.Bulma = Bulma;
