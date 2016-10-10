"use strict";

const webpack = require('webpack');
const minimist = require('minimist')(process.argv.slice(2));

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
  const environment = minimist.env || env;
  return {
    NAME: JSON.stringify(name),
    VERSION: JSON.stringify(version),
    PLATFORM: JSON.stringify(platform),
    CONFIG: JSON.stringify(require(process.cwd() + `/environment/${environment}.json`))
	};

}
module.exports = configEnv;
