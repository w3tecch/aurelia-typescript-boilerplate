"use strict";

/**
 * Webpack Plugins
 */
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

/**
 * Typedoc config
 */
const configTypedoc = function (options) {
  if (!options.run) {
    return {};
  }

  return {
		plugins: [
			new TypedocWebpackPlugin({
        out: options.output,
        target: 'es6',
        disableOutputCheck: true
      }, options.inputs)
		]
	};
};
module.exports = configTypedoc;
