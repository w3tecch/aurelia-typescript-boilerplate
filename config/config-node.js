"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');

/**
 * Node lib config
 */
const configNode = function (level) {
  return {
		/*
		 * Include polyfills or mocks for various node stuff
		 * Description: Node configuration
		 *
		 * See: https://webpack.github.io/docs/configuration.html#node
		 */
		node: {
			global: 'window',
			crypto: 'empty',
			fs: 'empty',
			process: true,
			module: false,
			clearImmediate: false,
			setImmediate: false
		}
		};
};
module.exports = configNode;
