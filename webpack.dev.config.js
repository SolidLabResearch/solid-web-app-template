import config from './webpack.config.js';

export default Object.assign(config, {
    mode: "development",
    devtool: 'source-map',
    devServer: {
        watchFiles: ['src/**/*.js', 'src/**/*.html'],
    }
})
