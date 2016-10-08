"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');

/**
 * Banner config
 */
const configBanner = function (options) {
  return {
		plugins: [
			new webpack.BannerPlugin(
				' @name           ' + options.title + '\n' +
				' @description    ' + options.description + '\n\n' +
				' @version        ' + options.version + '\n' +
				' @author         ' + options.author + '\n' +
				' @license        ' + options.license + '\n'
			)
		]
		};
};
module.exports = configBanner;
