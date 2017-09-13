let mix = require('laravel-mix');

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
    .js('src/notification.js', 'dist/')
    .js('src/navbar.js', 'dist/')
    .js('src/dropdown.js', 'dist/')
    .js('src/file.js', 'dist/')
    .js('src/message.js', 'dist/')
    .js('src/modal.js', 'dist/');
