const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs =require('fs');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  pages: 'pages'
};

function generateHtmlPlugins (folderPath) {
  function getFilesPath (dirPath) {
    return fs.readdirSync(dirPath).map(item => path.join(dirPath, item));
  }

  let pages = getFilesPath(folderPath);

  pages.map((item, i) => {
    if (path.extname(item.split('\\').pop()) !== '.html') {
      pages.splice(i, 1);
      pages = pages.concat(getFilesPath(item));
    }
  });
  console.log(pages)
  //const pagesPath = pages.map(pages => pages.split('\\').filter((item, i, arr) => i > arr.indexOf(PATHS.pages)))
};

const htmlPlugins = generateHtmlPlugins(`${PATHS.src}/${PATHS.pages}`);

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
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
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
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/assets/images`,
        to: `${PATHS.dist}/images`
      }
    ])
  ].concat(htmlPlugins)
};
