"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Notifier config
 */
const configNotifier = function (options) {
  return {
		plugins: [
			new WebpackNotifierPlugin(Object.assign({
				title: options.title || 'Webpack'
			}, options))
		]
		};
};
module.exports = configNotifier;
