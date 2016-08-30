"use strict";

/**
 * Webpack Plugins
 */
const webpack = require('webpack');
const faviconsWebpackPlugin = require('favicons-webpack-plugin');

/**
 * Favicon config
 */
const configFavicon = function (appName, icon, icons) {
  return {
		plugins: [
			new faviconsWebpackPlugin({
				// Your source logo
				logo: icon || 'favicon.png',
				// Generate a cache file with control hashes and
				// don't rebuild the favicons until those hashes change
				persistentCache: true,
				// Inject the html into the html-webpack-plugin
				inject: true,
				// favicon app title (see https://github.com/haydenbleasel/favicons#usage)
				title: appName,
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
				}, icons)
			})
		]
		};
};
module.exports = configFavicon;
