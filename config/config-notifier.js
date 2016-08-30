"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Notifier config
 */
const configNotifier = function (title, options) {
  return {
		plugins: [
			new WebpackNotifierPlugin(Object.assign({
				title: title || 'Webpack'
			}, options))
		]
		};
};
module.exports = configNotifier;
