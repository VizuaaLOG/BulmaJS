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

mix.js('src/bulma.js', 'dist/bulma.js');

fs.readdir('./src/plugins', (err, files) => {
    if(err) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    }

    files.forEach((file, index) => {
        mix.js(path.join('./src/plugins', file), 'dist/');
    });
});
