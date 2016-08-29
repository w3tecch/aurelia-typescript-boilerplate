"use strict";

const webpack = require('webpack');

/**
 * Environment Config
 */
var configEnv = function (options) {
  return {
		plugins: [
			new webpack.DefinePlugin(getDefinitions(options.env, options.name, options.version))
		]
	};
};

function getDefinitions(env, name, version) {
  return {
    NAME: JSON.stringify(name),
    VERSION: JSON.stringify(version),
    CONFIG: JSON.stringify(require(process.cwd() + `/environment/${env}.json`))
	};

}
module.exports = configEnv;
