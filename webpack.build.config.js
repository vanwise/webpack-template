const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.js');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          }
        ]
      }
    ]
  }
});

module.exports = new Promise((resolve, reject) => resolve(buildWebpackConfig));