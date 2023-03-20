const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        content:"./scripts/content.ts",
        service_worker:"./scripts/service_worker.ts",
        options:"./scripts/options.ts"
    },
    output: {
        path: path.resolve(__dirname, 'extension'),
        filename: 'scripts/[name].js'
    },
    resolve: {
        extensions: [ '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'manifest/manifest.json', to: 'manifest.json' },
                { from: 'html', to: 'html' },
                { from: 'images', to: 'images' },
            ],
        }),
    ],
};
