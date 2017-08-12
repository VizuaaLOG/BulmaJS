// Import BulmaJS core and plugins
import Bulma from 'path/to/bulmajs/src/core';
import Notification from 'path/to/bulmajs/src/plugins/Notification';

// Register plugins with the core
Bulma.registerPlugin('notification', Notification);

// If you want to use the DOM API, execute the following function
// when the DOM has loaded
Bulma.traverseDOM();

// If you would like global access to Bulma
window.Bulma = Bulma; // This can be anything you want
