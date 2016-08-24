"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');

/**
 * Global lib config
 */
var configGlobal = function (level) {
  return {
		plugins: [
			new webpack.ProvidePlugin({
				'moment': 'moment',
				'_': 'lodash',
				'Hammer': 'hammerjs'
			})
		]
		};
};
module.exports = configGlobal;
