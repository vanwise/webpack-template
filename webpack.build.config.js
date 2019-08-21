const merge = require('webpack-merge');
const currentMode = 'production';
const rimraf = require('rimraf');

global.currMode = currentMode;

rimraf.sync('./dist');

const baseWebpackConfig = require('./webpack.config.js');

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['src/assets/images/*.{jpg,png}'], 'dist/images', {
	use: [
		imageminWebp({quality: 75})
	]
});

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: currentMode
});

module.exports = new Promise((resolve, reject) => resolve(buildWebpackConfig));