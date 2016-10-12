"use strict";

const webpack = require('webpack');

/**
 * Environment Config
 */
const configEnv = function (options) {
  return {
		plugins: [
			new webpack.DefinePlugin(getDefinitions(options.env, options.name, options.version, options.platform))
		]
	};
};

function getDefinitions(env, name, version, platform) {
  return {
    NAME: JSON.stringify(name),
    VERSION: JSON.stringify(version),
    PLATFORM: JSON.stringify(platform),
    CONFIG: JSON.stringify(require(process.cwd() + `/environment/${env}.json`))
	};

}
module.exports = configEnv;
