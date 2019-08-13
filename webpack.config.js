const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

function generateEntryPoints () {
  let arrayPath = glob.sync(`./src/layouts/**/*.js`);
  let paths = {};

  arrayPath.unshift(`./src/common`);
  arrayPath = arrayPath.map(entryPath => {
    const pathArray = entryPath.split('/');
    const entryName = pathArray[pathArray.length - 1].split('.')[0];

    return { [entryName]: entryPath };
  });
  arrayPath.forEach(obj => {
    const objKey = Object.keys(obj)[0];

    paths[objKey] = obj[objKey];
  });
  
  return paths;
}

const PATHS = {
  src: './src',
  dist: '/dist',
  entryPoints: generateEntryPoints(),
  scss: './src/assets/scss/index.scss',
  html: '/pages'
};

function generateHtmlPlugins (folderPath) {
  const htmlPaths = glob.sync(`${folderPath}/**/*.html`);

  return htmlPaths.map(item => {
    const pathArr = item.split('/');
    const distPathArray = pathArr.slice(pathArr.indexOf('pages') + 1);
    const distPath = distPathArray.join('/');
    let chunk;
    
    
    if (distPathArray.length > 1) {
      const folder = distPathArray[distPathArray.length - 2];
      
      if (folder === 'ru') {
        if (distPathArray.length === 2) {
          chunk = 'home';
        } else {
          chunk = distPathArray[distPathArray.length - 3];
        }
      } else {
        chunk = folder;
      }
    } else {
      chunk = 'home';
    }

    return new HtmlWebpackPlugin({
      template: item,
      filename: distPath,
      webpackMode: process.env.NODE_ENV,
      chunks: ['common', chunk]
    })
  });
};

const htmlPlugins = generateHtmlPlugins(`${PATHS.src}${PATHS.html}`);

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: PATHS.entryPoints,
  output: {
    path: path.join(__dirname, PATHS.dist),
    filename: '[name].[hash].js'
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
          name: 'images/[name].[ext]',
          publicPath: '/'
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
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/static`,
        to: ''
      }
    ])
  ].concat(htmlPlugins)
};
