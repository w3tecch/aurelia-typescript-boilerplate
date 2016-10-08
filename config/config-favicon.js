"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const faviconsWebpackPlugin = require('favicons-webpack-plugin');

/**
 * Favicon config
 */
const configFavicon = function (options) {
	return {
		plugins: [
			new faviconsWebpackPlugin({
				// Your source logo
				logo: options.logo || 'favicon.png',
				// Generate a cache file with control hashes and
				// don't rebuild the favicons until those hashes change
				persistentCache: true,
				// Inject the html into the html-webpack-plugin
				inject: true,
				// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
				title: options.title,
				// which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
				icons: Object.assign({
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					opengraph: false,
					twitter: false,
					yandex: false,
					windows: false
				}, options.icons)
			})
		]
	};
};
module.exports = configFavicon;