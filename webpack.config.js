const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const PATHS = {
  src: './src',
  dist: './dist',
  scss: './src/assets/scss/index.scss',
  html: '/html/pages'
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

const htmlPlugins = generateHtmlPlugins(`${PATHS.src}/${PATHS.html}`);

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: [
    PATHS.src,
    PATHS.scss
  ],
  output: {
    filename: 'bundle.[hash].js',
    path: path.join(__dirname, PATHS.dist),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'url-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    }),
    new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/assets/images`,
        to: `images`
      }
    ])
  ].concat(htmlPlugins)
};
