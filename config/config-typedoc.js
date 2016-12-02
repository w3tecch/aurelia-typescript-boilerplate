"use strict";

/**
 * Webpack Plugins
 */
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

/**
 * Typedoc config
 */
const configTypedoc = function () {
  return {
		plugins: [
			new TypedocWebpackPlugin({
        target: 'es6',
        disableOutputCheck: true
      }, ['./typings', './typings_custom', './src/app'])
		]
		};
};
module.exports = configTypedoc;
