"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');

/**
 * Global lib config
 */
const configGlobal = function(level) {
	return {
		plugins: [
			new webpack.ProvidePlugin({
				'moment': 'moment',
				'_': 'lodash'
			})
		]
	};
};
module.exports = configGlobal;