const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add rule for markdown files
      webpackConfig.module.rules.push({
        test: /\.md$/,
        type: 'asset/source'
      });

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer/')
      };
      
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer']
        })
      );
      
      return webpackConfig;
    }
  }
}; 