"use strict";

/**
 * Ignore config
 */
const configIgnore = function (options) {
	return {
		module: {
			rules: [
				{ test: /\.html$/, loader: 'ignore-loader' },
				{ test: /\.ejs$/, loader: 'ignore-loader' },
				{ test: /\.scss$/, loader: 'ignore-loader' }
			]
		}
		};
};
module.exports = configIgnore;
