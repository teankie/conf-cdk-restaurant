// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production', // set mode to production
    entry: './website/restaurant-wrapper.js', // your main JS file
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './website/dist'), // output directory
    },
    devServer: {
        static: {
            directory: 'website',
        },
        open: true,
        compress: true,
        port: 8000,
        liveReload: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './website/index.html', // Path to your index.html file
            filename: 'index.html', // Output filename (placed in the 'dist' directory)
        }),
    ],
};