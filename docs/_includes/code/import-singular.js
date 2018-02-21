// Import BulmaJS plugin
import Notification from 'path/to/bulmajs/src/plugins/notification';
import Navbar from 'path/to/bulmajs/src/plugins/navbar';

// Everything is now setup. One document ready the DOM will be parsed.
// If you would like to register a Bulma global, you can import Bulma
import Bulma from 'path/to/bulmajs/src/core';

// This will allow you to assign Bulma to the window. Your ES6 transpiling
// system should only include the core in your output once.
window.Bulma = Bulma;
