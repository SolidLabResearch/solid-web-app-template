import path from 'path';
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
