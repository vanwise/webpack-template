const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const merge = require('webpack-merge');
const rimraf = require('rimraf');
const currentMode = 'production';

const baseWebpackConfig = require('./webpack.config.js');

global.currMode = currentMode;
rimraf.sync('./dist');

imagemin([ 'src/assets/images/*.{jpg,png}' ],
	{
		destination: 'dist/images',
		plugins: [
			imageminWebp({quality: 75})
		]
	}
);

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: currentMode
});

module.exports = new Promise((resolve, reject) => resolve(buildWebpackConfig));