let mix = require('laravel-mix');
let path = require('path');
let fs = require('fs');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('src/bulma.js', 'dist/bulma.js')
    .js('./src/plugins/dropdown.js', 'dist/')
    .js('./src/plugins/file.js', 'dist/')
    .js('./src/plugins/message.js', 'dist/')
    .js('./src/plugins/modal.js', 'dist/')
    .js('./src/plugins/navbar.js', 'dist/')
    .js('./src/plugins/notification.js', 'dist/');