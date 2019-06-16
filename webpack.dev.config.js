const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.js');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-inline-module-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 3001,
    overlay: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => resolve(devWebpackConfig));