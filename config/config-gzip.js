"use strict";

/**
 * Webpack Plugins
 */
const CompressionPlugin = require("compression-webpack-plugin");

/**
 * gzip config
 */
const configGzip = function (options) {
  return {
		plugins: [
			new CompressionPlugin({
      	asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
		]
		};
};
module.exports = configGzip;
