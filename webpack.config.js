const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    performance: {
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000,
    },
    plugins: [
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "src/index.html" },
                { from: "src/style.css" },
            ],
        }),
    ],
    target: ['web', 'es5']
};
