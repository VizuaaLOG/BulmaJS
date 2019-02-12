const path = require('path');
var entry = require('webpack-glob-entry');

module.exports = {
    entry: entry('./src/bulma.js', './src/plugins/*.js'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Bulma',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};