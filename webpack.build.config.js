const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpWebpackPlugin= require('imagemin-webp-webpack-plugin');
const currentMode = 'production';

process.env.NODE_ENV = currentMode;

const baseWebpackConfig = require('./webpack.config.js');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: currentMode,
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
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ImageminWebpWebpackPlugin()
  ]
});

module.exports = new Promise((resolve, reject) => resolve(buildWebpackConfig));