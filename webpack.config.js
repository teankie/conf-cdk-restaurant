const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/website/restaurant-wrapper.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './src/website/dist'),
    },
    devtool: 'source-map', // this ensures sourcemaps are generated as separate files
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        static: {
            directory: './src/website',
        },
        open: true,
        compress: false,
        port: 8001,
        liveReload: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/website/index.html',
            filename: 'index.html',
        }),
    ],
};