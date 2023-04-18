const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        "process/browser": require.resolve('process'),
    };
    config.plugins = [
      ...(config.plugins ?? []),
      new webpack.ProvidePlugin({
        Buffer: ['buffer/', 'Buffer'],
        process: ['process/browser'],
      }),
    ];
    return config;
}