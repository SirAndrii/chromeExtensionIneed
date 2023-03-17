const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        content:"./scripts/content.js",
        service_worker:"./scripts/service_worker.js",
        options:"./scripts/options.js"
    },
    output: {
        path: path.resolve(__dirname, 'extension'),
        filename: 'scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
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
