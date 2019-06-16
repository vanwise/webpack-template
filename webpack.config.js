const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const glob = require('glob');

const PATHS = {
  src: './src',
  dist: '/dist',
  scss: './src/assets/scss/index.scss',
  html: '/pages'
};

function generateHtmlPlugins (folderPath) {
  const htmlPaths = glob.sync(`${folderPath}/**/*.html`);

  return htmlPaths.map(item => {
    const pathArr = item.split('/');
    const distPath = pathArr.slice(pathArr.indexOf('pages') + 1).join('/');
    
    return new HtmlWebpackPlugin({
      template: item,
      filename: distPath
    })
  });
};

const htmlPlugins = generateHtmlPlugins(`${PATHS.src}${PATHS.html}`);

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: [
    PATHS.src,
    PATHS.scss
  ],
  output: {
    path: path.join(__dirname, PATHS.dist),
    filename: 'bundle.[hash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: 'postcss.config.js' }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.min.js',
      jQuery: 'jquery/dist/jquery.min.js',
      'window.jQuery': 'jquery/dist/jquery.min.js'
    }),
    new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
    new ImageminWebpWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/static`,
        to: ''
      }
    ])
  ].concat(htmlPlugins)
};
