const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const glob = require('glob');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  html: 'pages'
};

function generateHtmlPlugins (folderPath) {
  const htmlPaths = glob.sync(`${folderPath}/**/*.html`);

  return htmlPaths.map(item => {
    const pathArr = item.split('/');
    const distPath = pathArr.slice(pathArr.indexOf(`${PATHS.html}`) + 1).join('/');

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
  entry: {
    app: PATHS.src
  },
  output: {
    filename: '[name].[hash].js',
    path: PATHS.dist
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
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
    new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/assets/fonts`,
        to: `${PATHS.dist}/fonts`
      },
      {
        from: `${PATHS.src}/assets/images`,
        to: `${PATHS.dist}/images`
      }
    ])
  ].concat(htmlPlugins)
};
