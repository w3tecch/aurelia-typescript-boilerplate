"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');

/**
 * Banner config
 */
var configBanner = function (options) {
  return {
		plugins: [
			new webpack.BannerPlugin(
				' @name           ' + options.context.name + '\n' +
				' @description    ' + options.context.description + '\n\n' +
				' @version        ' + options.context.version + '\n' +
				' @author         ' + options.context.author + '\n' +
				' @license        ' + options.context.license + '\n'
			)
		]
		};
};
module.exports = configBanner;
